// "use client";

// import React, { useState, useEffect } from "react";
// import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { useAuth } from "@/context/AuthContext";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { GenericPageSkeleton } from "@/components/ui/page-skeleton";

// /** Returns the dashboard path for a given user_type. */
// function dashboardFor(userType: string | null | undefined): string {
//   if (userType === "donor") return "/donordashboard";
//   if (userType === "recipient") return "/recipientdashboard";
//   return "/";
// }

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   // redirecting = true once login succeeds and we are waiting for the
//   // dashboard to load. The login form is replaced by the skeleton so the
//   // user sees progress instead of a frozen page.
//   const [redirecting, setRedirecting] = useState(false);

//   const { signIn, user, profile, isLoading: authLoading } = useAuth();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const nextPath = searchParams.get("next");

//   // Already-logged-in guard — send straight to dashboard
//   useEffect(() => {
//     if (!authLoading && user && profile) {
//       setRedirecting(true);
//       router.replace(nextPath || dashboardFor(profile.user_type));
//     }
//   }, [authLoading, user, profile, router, nextPath]);

//   const handleSignIn = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const { error, userType } = await signIn(email, password);

//       if (error) {
//         toast.error("Sign in failed", {
//           description: error.message || "Invalid email or password. Please try again.",
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       toast.success("Welcome back!", {
//         description: "You have been signed in successfully.",
//       });

//       // Switch to skeleton immediately — the login form disappears and the
//       // skeleton fills the viewport while Next.js loads the dashboard bundle.
//       // We never call setIsSubmitting(false) on the success path so the
//       // button stays in its loading state until the page unmounts.
//       setRedirecting(true);
//       router.replace(nextPath || dashboardFor(userType));

//     } catch {
//       toast.error("Sign in failed", {
//         description: "Something went wrong. Please try again.",
//       });
//       setIsSubmitting(false);
//     }
//   };

//   // Show the skeleton that matches the dashboard they are heading to.
//   // This fills the gap between router.replace() firing and the dashboard
//   // page actually rendering — the user sees continuous progress, not a
//   // frozen login form or a blank white screen.
//   if (redirecting) {
//     return <GenericPageSkeleton />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//         <div className="w-full max-w-md">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-neutral900 mb-2">
//               Welcome Back
//             </h1>
//             <p className="text-neutral600">
//               Sign in to continue helping reduce food waste
//             </p>
//           </div>

//           <Card className="shadow-lg border-0">
//             <CardHeader className="space-y-1 pb-4">
//               <CardTitle className="text-xl text-center text-neutral800">
//                 Sign in to your account
//               </CardTitle>
//               <p className="text-sm text-center text-neutral600">
//                 Don't have an account?{" "}
//                 <Link
//                   href="/auth/register"
//                   className="font-medium text-defaultgreen hover:text-darkgreen transition-colors"
//                 >
//                   Create one here
//                 </Link>
//               </p>
//             </CardHeader>

//             <CardContent>
//               <form onSubmit={handleSignIn} className="space-y-4">
//                 <div>
//                   <Label htmlFor="email" className="text-neutral700">
//                     Email address
//                   </Label>
//                   <div className="relative mt-1">
//                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral400 h-4 w-4" />
//                     <Input
//                       id="email"
//                       type="email"
//                       autoComplete="email"
//                       required
//                       placeholder="Enter your email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       disabled={isSubmitting}
//                       className="pl-10 focus:ring-defaultgreen focus:border-defaultgreen"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <Label htmlFor="password" className="text-neutral700">
//                     Password
//                   </Label>
//                   <div className="relative mt-1">
//                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral400 h-4 w-4" />
//                     <Input
//                       id="password"
//                       type="password"
//                       autoComplete="current-password"
//                       required
//                       placeholder="Enter your password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       disabled={isSubmitting}
//                       className="pl-10 focus:ring-defaultgreen focus:border-defaultgreen"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <input
//                       id="remember-me"
//                       name="remember-me"
//                       type="checkbox"
//                       className="h-4 w-4 text-defaultgreen focus:ring-defaultgreen border-neutral300 rounded"
//                     />
//                     <label
//                       htmlFor="remember-me"
//                       className="ml-2 block text-sm text-neutral700"
//                     >
//                       Remember me
//                     </label>
//                   </div>
//                   <Link
//                     href="/auth/forgotpassword"
//                     className="text-sm text-defaultgreen hover:text-darkgreen transition-colors"
//                   >
//                     Forgot password?
//                   </Link>
//                 </div>

//                 <Button
//                   type="submit"
//                   className="w-full bg-defaultgreen hover:bg-darkgreen text-white py-3 text-base font-medium transition-colors duration-200"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <span className="flex items-center justify-center gap-2">
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                       Signing in...
//                     </span>
//                   ) : (
//                     <span className="flex items-center justify-center gap-2 group">
//                       Sign In
//                       <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                     </span>
//                   )}
//                 </Button>

//                 <div className="relative my-6">
//                   <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-neutral200" />
//                   </div>
//                   <div className="relative flex justify-center text-sm">
//                     <span className="px-2 bg-white text-neutral500">
//                       New to ZeroHunger?
//                     </span>
//                   </div>
//                 </div>

//                 <Button
//                   type="button"
//                   variant="outline"
//                   className="w-full border-defaultgreen text-defaultgreen hover:bg-defaultgreen hover:text-white transition-colors duration-200"
//                   onClick={() => router.push("/auth/register")}
//                   disabled={isSubmitting}
//                 >
//                   Create Account
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>

//           <div className="mt-8 text-center">
//             <p className="text-xs text-neutral500">
//               Having trouble signing in?{" "}
//               <Link href="/contact" className="text-defaultgreen hover:underline">
//                 Contact support
//               </Link>
//             </p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, ArrowRight, Loader2, Leaf, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { GenericPageSkeleton } from "@/components/ui/page-skeleton";

function dashboardFor(userType: string | null | undefined) {
  if (userType === "donor")     return "/donordashboard";
  if (userType === "recipient") return "/recipientdashboard";
  if (userType === "admin")     return "/admin";
  return "/";
}

export default function LoginPage() {
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [showPw, setShowPw]         = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirecting, setRedirecting]   = useState(false);

  const { signIn, user, profile, isLoading: authLoading } = useAuth();
  const router      = useRouter();
  const searchParams = useSearchParams();
  const nextPath    = searchParams.get("next");

  useEffect(() => {
    if (!authLoading && user && profile) {
      setRedirecting(true);
      router.replace(nextPath || dashboardFor(profile.user_type));
    }
  }, [authLoading, user, profile, router, nextPath]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error, userType } = await signIn(email, password);
      if (error) {
        toast.error("Sign in failed", { description: error.message || "Invalid email or password." });
        setIsSubmitting(false);
        return;
      }
      toast.success("Welcome back!");
      setRedirecting(true);
      router.replace(nextPath || dashboardFor(userType));
    } catch {
      toast.error("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (redirecting) return <GenericPageSkeleton />;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .auth-wrap {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'DM Sans', sans-serif;
        }
        @media(max-width:768px){ .auth-wrap{ grid-template-columns:1fr; } }

        /* ── Left panel — editorial ── */
        .auth-left {
          position: relative;
          background: #1a3a2a;
          display: flex; flex-direction: column;
          justify-content: space-between;
          padding: 3rem;
          overflow: hidden;
          min-height: 50vh;
        }
        @media(max-width:768px){ .auth-left{ display:none; } }

        .auth-left-bg {
          position: absolute; inset: 0;
          background:
            linear-gradient(to bottom right, rgba(26,58,42,.88) 0%, rgba(26,58,42,.7) 100%),
            url('https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=900');
          background-size: cover; background-position: center;
        }
        .auth-left-noise {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity:.45; pointer-events:none;
        }
        .auth-left-content { position: relative; z-index: 1; }

        .auth-left-logo {
          display: inline-flex; align-items: center; gap: .45rem;
          text-decoration: none;
        }
        .auth-left-logo-icon {
          width: 32px; height: 32px; border-radius: 9px;
          background: #76c43b;
          display: flex; align-items: center; justify-content: center;
        }
        .auth-left-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 900; color: #fff;
        }
        .auth-left-logo-text span { color: #76c43b; }

        .auth-left-quote {
          position: relative; z-index: 1;
          margin-top: auto; padding-top: 4rem;
        }
        .auth-left-q {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 2.5vw, 2.3rem);
          font-weight: 900; font-style: italic;
          color: #fff; line-height: 1.25;
          margin-bottom: 1.5rem;
        }
        .auth-left-q em { color: #76c43b; font-style: normal; }
        .auth-left-stat {
          display: flex; gap: 2rem;
        }
        .auth-left-stat-item { }
        .auth-left-stat-val {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem; font-weight: 900;
          color: #76c43b; line-height: 1;
          margin-bottom: .25rem;
        }
        .auth-left-stat-lbl {
          font-size: .75rem; color: rgba(255,255,255,.45);
          font-weight: 400;
        }

        /* ── Right panel — form ── */
        .auth-right {
          background: #f7f3ed;
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
          padding: 3rem 2rem;
          min-height: 100vh;
        }

        .auth-form-wrap {
          width: 100%; max-width: 420px;
        }

        .auth-form-eyebrow {
          display: inline-flex; align-items: center; gap: .4rem;
          color: #76c43b; font-size: .72rem; font-weight: 700;
          letter-spacing: .12em; text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        .auth-form-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem; font-weight: 900;
          color: #1a3a2a; line-height: 1.1;
          margin-bottom: .75rem;
        }
        .auth-form-title em { color: #76c43b; font-style: italic; }
        .auth-form-sub {
          font-size: .9rem; color: #667085;
          margin-bottom: 2.5rem; line-height: 1.6;
        }
        .auth-form-sub a { color: #76c43b; font-weight: 600; text-decoration: none; }
        .auth-form-sub a:hover { text-decoration: underline; }

        .auth-field { margin-bottom: 1.25rem; }
        .auth-field label {
          display: block; font-size: .8rem; font-weight: 600;
          color: #344054; margin-bottom: .45rem;
        }
        .auth-field-wrap { position: relative; }
        .auth-field-icon {
          position: absolute; left: .9rem; top: 50%;
          transform: translateY(-50%);
          color: #98a2b3; pointer-events: none;
          display: flex; align-items: center;
        }
        .auth-input {
          width: 100%; padding: .75rem 1rem .75rem 2.6rem;
          background: #fff; border: 1.5px solid #e8ecef;
          border-radius: 12px; font-size: .9rem; color: #1a3a2a;
          font-family: 'DM Sans', sans-serif;
          transition: border-color .2s, box-shadow .2s;
          outline: none;
        }
        .auth-input:focus {
          border-color: #76c43b;
          box-shadow: 0 0 0 3px rgba(118,196,59,.12);
        }
        .auth-input::placeholder { color: #d0d5dd; }
        .auth-pw-toggle {
          position: absolute; right: .9rem; top: 50%;
          transform: translateY(-50%);
          background: none; border: none;
          color: #98a2b3; cursor: pointer; padding: .2rem;
          display: flex; align-items: center;
          transition: color .18s;
        }
        .auth-pw-toggle:hover { color: #667085; }

        .auth-forgot {
          text-align: right; margin-top: -.75rem; margin-bottom: 1.25rem;
        }
        .auth-forgot a {
          font-size: .8rem; color: #667085; text-decoration: none;
          transition: color .18s;
        }
        .auth-forgot a:hover { color: #76c43b; }

        .auth-submit {
          width: 100%; padding: .85rem;
          background: #1a3a2a; color: #fff;
          font-weight: 700; font-size: .92rem;
          border: none; border-radius: 12px;
          cursor: pointer; display: flex;
          align-items: center; justify-content: center; gap: .5rem;
          transition: all .22s;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 1.25rem;
        }
        .auth-submit:hover:not(:disabled) {
          background: #2d5a3d;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(26,58,42,.2);
        }
        .auth-submit:disabled { opacity: .65; cursor: not-allowed; }

        .auth-divider {
          display: flex; align-items: center; gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .auth-divider-line { flex: 1; height: 1px; background: #e8ecef; }
        .auth-divider-text { font-size: .78rem; color: #98a2b3; white-space: nowrap; }

        .auth-alt-btn {
          width: 100%; padding: .8rem;
          background: #fff; color: #344054;
          font-weight: 600; font-size: .88rem;
          border: 1.5px solid #e8ecef; border-radius: 12px;
          cursor: pointer; text-align: center;
          text-decoration: none; display: block;
          transition: all .2s;
          font-family: 'DM Sans', sans-serif;
        }
        .auth-alt-btn:hover {
          border-color: #76c43b; color: #1a3a2a;
          background: rgba(118,196,59,.04);
        }

        .auth-mobile-logo {
          display: none; text-align: center; margin-bottom: 2rem;
        }
        @media(max-width:768px){ .auth-mobile-logo{ display:block; } }
        .auth-mobile-logo a {
          display: inline-flex; align-items: center; gap: .4rem;
          text-decoration: none;
        }
        .auth-mobile-logo-icon {
          width: 28px; height: 28px; border-radius: 8px;
          background: #76c43b;
          display: flex; align-items: center; justify-content: center;
        }
        .auth-mobile-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 900; color: #1a3a2a;
        }
        .auth-mobile-logo-text span { color: #76c43b; }
      `}</style>

      <div className="auth-wrap">

        {/* ── Left — editorial panel ── */}
        <div className="auth-left">
          <div className="auth-left-bg" />
          <div className="auth-left-noise" />
          <div className="auth-left-content">
            <Link href="/" className="auth-left-logo">
              <div className="auth-left-logo-icon">
                <Leaf size={15} color="#1a3a2a" strokeWidth={2.5} />
              </div>
              <span className="auth-left-logo-text">Zero<span>Hunger</span></span>
            </Link>
          </div>
          <div className="auth-left-quote">
            <p className="auth-left-q">
              Every meal shared is<br />
              a world <em>changed.</em>
            </p>
            <div className="auth-left-stat">
              <div className="auth-left-stat-item">
                <div className="auth-left-stat-val">12,400+</div>
                <div className="auth-left-stat-lbl">Meals redistributed</div>
              </div>
              <div className="auth-left-stat-item">
                <div className="auth-left-stat-val">340+</div>
                <div className="auth-left-stat-lbl">Active donors</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right — form ── */}
        <div className="auth-right">
          <div className="auth-form-wrap">

            {/* Mobile logo */}
            <div className="auth-mobile-logo">
              <Link href="/">
                <div className="auth-mobile-logo-icon">
                  <Leaf size={14} color="#1a3a2a" strokeWidth={2.5} />
                </div>
                <span className="auth-mobile-logo-text">Zero<span>Hunger</span></span>
              </Link>
            </div>

            <div className="auth-form-eyebrow">
              <Leaf size={11} /> Welcome back
            </div>
            <h1 className="auth-form-title">
              Sign in to your<br /><em>account.</em>
            </h1>
            <p className="auth-form-sub">
              Don't have an account?{" "}
              <Link href="/auth/register">Create one free</Link>
            </p>

            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label htmlFor="email">Email address</label>
                <div className="auth-field-wrap">
                  <div className="auth-field-icon"><Mail size={16} /></div>
                  <input
                    id="email" type="email" required
                    className="auth-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="password">Password</label>
                <div className="auth-field-wrap">
                  <div className="auth-field-icon"><Lock size={16} /></div>
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    required
                    className="auth-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={isSubmitting}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="auth-pw-toggle"
                    onClick={() => setShowPw(v => !v)}
                    tabIndex={-1}
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="auth-forgot">
                <Link href="/auth/forgotpassword">Forgot password?</Link>
              </div>

              <button type="submit" className="auth-submit" disabled={isSubmitting}>
                {isSubmitting
                  ? <><Loader2 size={16} className="animate-spin" /> Signing in...</>
                  : <>Sign in <ArrowRight size={16} /></>
                }
              </button>

              <div className="auth-divider">
                <div className="auth-divider-line" />
                <span className="auth-divider-text">New to ZeroHunger?</span>
                <div className="auth-divider-line" />
              </div>

              <Link href="/auth/register" className="auth-alt-btn">
                Create a free account
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
