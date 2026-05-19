import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * ROUTE PROTECTION MAP
 *
 * Three tiers:
 *   protectedRoutes   — must be logged in (any role)
 *   donorOnlyRoutes   — must be logged in AND user_type === 'donor'
 *   recipientOnlyRoutes — must be logged in AND user_type === 'recipient'
 *
 * SECURITY NOTE:
 * This middleware is the UX layer — it gives fast, clean redirects before the
 * page renders. It is NOT the security layer. Real security lives in Supabase
 * Row Level Security (RLS) policies on every table. Even if someone bypasses
 * this redirect (e.g. via a crafted request), they cannot read or mutate data
 * they don't own because RLS enforces that at the database level.
 *
 * See: CVE-2025-29927 — never rely solely on middleware for auth security.
 */
const protectedRoutes = ['/profilepage'];
const donorOnlyRoutes = ['/donordashboard', '/donate'];
const recipientOnlyRoutes = ['/recipientdashboard'];
const authRoutes = ['/auth/login', '/auth/register', '/auth/forgotpassword'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Build a response we can attach refreshed cookies to
  let supabaseResponse = NextResponse.next({ request });

  // Create a middleware-compatible Supabase client.
  // This pattern (reading + writing cookies on the response) keeps the
  // session token refreshed automatically on every request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Write cookies to both the request (for downstream use) and
          // the response (so the browser receives the refreshed token).
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

  // IMPORTANT: Do not add logic between createServerClient and getUser().
  // A subtle bug in the cookie handling can silently break session refresh.
  const { data: { user } } = await supabase.auth.getUser();

  const isProtected =
    protectedRoutes.some(r => pathname.startsWith(r)) ||
    donorOnlyRoutes.some(r => pathname.startsWith(r)) ||
    recipientOnlyRoutes.some(r => pathname.startsWith(r));

  // ── 1. Not logged in → trying to access a protected route ────────────────
  if (!user && isProtected) {
    const loginUrl = new URL('/auth/login', request.url);
    // Preserve where they were trying to go so we can redirect back after login
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── 2. Logged in → trying to access auth pages (login / register) ────────
  if (user && authRoutes.some(r => pathname.startsWith(r))) {
    // Fetch profile to know which dashboard to send them to
    const { data: profile } = await supabase
      .from('profiles')
      .select('user_type')
      .eq('id', user.id)
      .single();

    const dashboard =
      profile?.user_type === 'donor'
        ? '/donordashboard'
        : profile?.user_type === 'recipient'
        ? '/recipientdashboard'
        : '/';

    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  // ── 3. Logged in → wrong-role dashboard ──────────────────────────────────
  const isDonorRoute = donorOnlyRoutes.some(r => pathname.startsWith(r));
  const isRecipientRoute = recipientOnlyRoutes.some(r => pathname.startsWith(r));

  if (user && (isDonorRoute || isRecipientRoute)) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('user_type')
      .eq('id', user.id)
      .single();

    if (isDonorRoute && profile?.user_type !== 'donor') {
      return NextResponse.redirect(new URL('/recipientdashboard', request.url));
    }

    if (isRecipientRoute && profile?.user_type !== 'recipient') {
      return NextResponse.redirect(new URL('/donordashboard', request.url));
    }
  }

  // ── 4. All checks passed — let the request through ───────────────────────
  // Always return supabaseResponse (not a fresh NextResponse.next()) so the
  // refreshed session cookies are forwarded to the browser.
  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     *   - _next/static  (static files)
     *   - _next/image   (image optimization)
     *   - favicon.ico, sitemap.xml, robots.txt
     *   - public folder files (png, jpg, svg, etc.)
     *
     * This keeps middleware off asset requests so it only runs on real pages.
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
