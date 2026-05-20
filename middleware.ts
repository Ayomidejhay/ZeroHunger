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

  // getUser() verifies the token with the Supabase server — more reliable
  // than getSession() in production where cookies may not be read correctly.
  const { data: { user } } = await supabase.auth.getUser();

  const isProtected =
    protectedRoutes.some(r => pathname.startsWith(r)) ||
    donorOnlyRoutes.some(r => pathname.startsWith(r)) ||
    recipientOnlyRoutes.some(r => pathname.startsWith(r)) ||
    adminOnlyRoutes.some(r => pathname.startsWith(r));

  // ── 1. Not logged in → redirect to login ─────────────────────────────────
  if (!user && isProtected) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── 2. Logged in → fetch profile ONCE for all role checks ────────────────
  // Only fetch when the user is logged in AND the route needs a role check.
  // A single fetch is shared across all three checks below — no repeated
  // DB calls per request which caused timeouts on hosted environments.
  let userType: string | null = null;

  const needsRoleCheck =
    (user && authRoutes.some(r => pathname.startsWith(r))) ||
    (user && donorOnlyRoutes.some(r => pathname.startsWith(r))) ||
    (user && recipientOnlyRoutes.some(r => pathname.startsWith(r))) ||
    (user && adminOnlyRoutes.some(r => pathname.startsWith(r)));

  if (needsRoleCheck) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('user_type')
      .eq('id', user!.id)
      .single();

    userType = profile?.user_type ?? null;
  }

  // ── 3. Logged in → on auth page → redirect to dashboard ──────────────────
  if (user && authRoutes.some(r => pathname.startsWith(r))) {
    const dashboard =
      userType === 'donor' ? '/donordashboard' :
      userType === 'recipient' ? '/recipientdashboard' :
      userType === 'admin' ? '/admin' : '/';
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  // ── 4. Wrong role dashboard ───────────────────────────────────────────────
  const isDonorRoute = donorOnlyRoutes.some(r => pathname.startsWith(r));
  const isRecipientRoute = recipientOnlyRoutes.some(r => pathname.startsWith(r));
  const isAdminRoute = adminOnlyRoutes.some(r => pathname.startsWith(r));

  if (user && isDonorRoute && userType !== 'donor') {
    const dest = userType === 'admin' ? '/admin' : '/recipientdashboard';
    return NextResponse.redirect(new URL(dest, request.url));
  }

  if (user && isRecipientRoute && userType !== 'recipient') {
    const dest = userType === 'admin' ? '/admin' : '/donordashboard';
    return NextResponse.redirect(new URL(dest, request.url));
  }

  if (user && isAdminRoute && userType !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // ── 5. All checks passed ──────────────────────────────────────────────────
  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
