import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const protectedRoutes = ['/profilepage'];
const donorOnlyRoutes = ['/donordashboard', '/donate'];
const recipientOnlyRoutes = ['/recipientdashboard'];
const adminOnlyRoutes = ['/admin'];
const authRoutes = ['/auth/login', '/auth/register', '/auth/forgotpassword'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // getUser() verifies the token with Supabase server — required in middleware.
  // Now that the browser client uses createBrowserClient, the session cookie
  // is always present and getUser() reliably identifies logged-in users.
  const { data: { user } } = await supabase.auth.getUser();

  const isProtected =
    protectedRoutes.some(r => pathname.startsWith(r)) ||
    donorOnlyRoutes.some(r => pathname.startsWith(r)) ||
    recipientOnlyRoutes.some(r => pathname.startsWith(r)) ||
    adminOnlyRoutes.some(r => pathname.startsWith(r));

  // ── 1. Not logged in → protected route → redirect to login ───────────────
  if (!user && isProtected) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── 2. Logged in → auth page → let the client handle the redirect ─────────
  // We intentionally do NOT redirect here. The login/register pages have their
  // own useEffect that redirects to the correct dashboard after reading the
  // profile from AuthContext. Doing it in middleware requires a DB call and
  // risks a redirect before the session cookie is fully established.
  // The client-side redirect is fast enough and avoids the loop.

  // ── 3. Logged in → wrong-role dashboard → fetch profile once ─────────────
  const isDonorRoute = donorOnlyRoutes.some(r => pathname.startsWith(r));
  const isRecipientRoute = recipientOnlyRoutes.some(r => pathname.startsWith(r));
  const isAdminRoute = adminOnlyRoutes.some(r => pathname.startsWith(r));
  const needsRoleCheck = user && (isDonorRoute || isRecipientRoute || isAdminRoute);

  if (needsRoleCheck) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('user_type')
      .eq('id', user!.id)
      .single();

    const userType = profile?.user_type ?? null;

    if (isDonorRoute && userType && userType !== 'donor') {
      const dest = userType === 'admin' ? '/admin' : '/recipientdashboard';
      return NextResponse.redirect(new URL(dest, request.url));
    }

    if (isRecipientRoute && userType && userType !== 'recipient') {
      const dest = userType === 'admin' ? '/admin' : '/donordashboard';
      return NextResponse.redirect(new URL(dest, request.url));
    }

    if (isAdminRoute && userType !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // ── 4. All checks passed ──────────────────────────────────────────────────
  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
