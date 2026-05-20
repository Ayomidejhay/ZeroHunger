import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

/**
 * Browser-side Supabase client.
 *
 * Uses createBrowserClient from @supabase/ssr instead of createClient from
 * @supabase/supabase-js. The critical difference: createBrowserClient stores
 * the session in COOKIES instead of localStorage. This means the middleware
 * (which runs on the server and can only read cookies, not localStorage) can
 * see the session and correctly identify logged-in users.
 *
 * Using the plain createClient caused an infinite redirect loop in production:
 *   login → session saved to localStorage
 *   → navigate to /donordashboard
 *   → middleware checks cookie → finds nothing → redirects to /auth/login
 *   → login page sees ?next=/donordashboard → redirects back
 *   → middleware redirects back to login → loop forever
 */
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
