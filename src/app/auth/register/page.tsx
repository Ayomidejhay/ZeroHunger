// "use client";

// import React, { useState } from "react";
// import { Mail, User, Phone, MapPin, Building, AlertCircle } from "lucide-react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { useAuth } from "@/context/AuthContext";

// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import PersonalInfoFields from "@/components/auth/PersonalInfoFields";
// import UserTypeSelector from "@/components/auth/UserTypeSelector";
// import AuthCredentialsFields from "@/components/auth/AuthCredentialsFields";

// const page = () => {
//   // Basic user information state
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");

//   // User type selection
//   const [userType, setUserType] = useState<"donor" | "recipient">("donor");

//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useRouter();
//   const { signUp } = useAuth();

  
//    // Handles form submission with validation
   
//     const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Password validation
//     if (password !== confirmPassword) {
//       toast("Passwords don't match", {
//         description: "Please ensure both passwords match.",
        
//       });
//       return;
//     }

//     if (password.length < 6) {
//       toast("Password too short", {
//         description: "Password must be at least 6 characters long.",
        
//       });
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Prepare metadata for user creation
//       const metadata = {
//         user_type: userType,
//         first_name: firstName,
//         last_name: lastName,
//       };

//       const { error } = await signUp(email, password, userType, firstName, lastName);
      
//       if (error) {
//         toast("Sign up failed", {
//           description: error.message,
          
//         });
//       } else {
//         toast("Welcome to ZeroHunger!", {
//           description: "Your account has been created successfully. Please check your email to verify your account.",
//         });
//         navigate.push("/auth/login");
//       }
//     } catch (err: any) {
//       toast("Error",{
//         description: err.message || "An unexpected error occurred",
        
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="flex items-center justify-center">
//         <div className="w-full max-w-md">
//         <Card className="shadow-lg border-0">
//           <CardHeader className="space-y-1 pb-4">
//             <CardTitle className="text-xl text-center text-neutral800">
//               Create your account
//             </CardTitle>
//             <p className="text-sm text-center text-neutral600">
//               Already have an account?{" "}
//               <Link
//                 href="/auth/login"
//                 className="font-medium text-defaultgreen hover:text-darkgreen transition-colors"
//               >
//                 Sign in here
//               </Link>
//             </p>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Basic user information */}
//               <PersonalInfoFields
//                 firstName={firstName}
//                 lastName={lastName}
//                 onFirstNameChange={setFirstName}
//                 onLastNameChange={setLastName}
//               />

//               {/* User type selection */}
//               <UserTypeSelector
//                 userType={userType}
//                 onUserTypeChange={setUserType}
//               />

//               {/* Account credentials */}
//               <AuthCredentialsFields
//                 email={email}
//                 password={password}
//                 confirmPassword={confirmPassword}
//                 onEmailChange={setEmail}
//                 onPasswordChange={setPassword}
//                 onConfirmPasswordChange={setConfirmPassword}
//               />

//               <Button
//                 type="submit"
//                 className="w-full bg-defaultgreen hover:bg-darkgreen text-white py-3 text-base font-medium transition-colors duration-200"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Creating account..." : "Create Account"}
//               </Button>

//               <div className="text-center pt-4">
//                 <p className="text-xs text-neutral500">
//                   By creating an account, you agree to our{" "}
//                   <Link
//                     href="/terms"
//                     className="text-defaultgreen hover:underline"
//                   >
//                     Terms of Service
//                   </Link>{" "}
//                   and{" "}
//                   <Link
//                     href="/privacy"
//                     className="text-defaultgreen hover:underline"
//                   >
//                     Privacy Policy
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default page;


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail, Lock, User, ArrowRight, Loader2,
  Leaf, Eye, EyeOff, Check, UtensilsCrossed, HeartHandshake
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { GenericPageSkeleton } from "@/components/ui/page-skeleton";

function dashboardFor(userType: string | null | undefined) {
  if (userType === "donor")     return "/donordashboard";
  if (userType === "recipient") return "/recipientdashboard";
  return "/";
}

export default function RegisterPage() {
  const [step, setStep]                 = useState<1 | 2>(1);
  const [userType, setUserType]         = useState<"donor" | "recipient">("donor");
  const [firstName, setFirstName]       = useState("");
  const [lastName, setLastName]         = useState("");
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [confirmPw, setConfirmPw]       = useState("");
  const [showPw, setShowPw]             = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirecting, setRedirecting]   = useState(false);

  const { signUp, user, profile, isLoading: authLoading } = useAuth();
  const router      = useRouter();
  const searchParams = useSearchParams();

  // Pre-select role from URL param (?type=donor or ?type=recipient)
  useEffect(() => {
    const t = searchParams.get("type");
    if (t === "donor" || t === "recipient") setUserType(t);
  }, [searchParams]);

  useEffect(() => {
    if (!authLoading && user && profile) {
      setRedirecting(true);
      router.replace(dashboardFor(profile.user_type));
    }
  }, [authLoading, user, profile, router]);

  const pwStrength = (() => {
    if (password.length === 0) return 0;
    let s = 0;
    if (password.length >= 8)          s++;
    if (/[A-Z]/.test(password))        s++;
    if (/[0-9]/.test(password))        s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const pwColors = ["#ef4444", "#f97316", "#eab308", "#76c43b"];
  const pwLabels = ["Weak", "Fair", "Good", "Strong"];

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPw) {
      toast.error("Passwords don't match.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await signUp(email, password, userType, firstName, lastName);
      if (error) {
        toast.error("Registration failed", { description: error.message });
        setIsSubmitting(false);
        return;
      }
      toast.success("Account created!", {
        description: "Check your email to verify your account.",
      });
      setRedirecting(true);
      router.replace(dashboardFor(userType));
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

        .reg-wrap {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'DM Sans', sans-serif;
        }
        @media(max-width:768px){ .reg-wrap{ grid-template-columns:1fr; } }

        /* ── Left panel ── */
        .reg-left {
          position: relative;
          background: #1a3a2a;
          display: flex; flex-direction: column;
          justify-content: space-between;
          padding: 3rem; overflow: hidden;
        }
        @media(max-width:768px){ .reg-left{ display:none; } }

        .reg-left-bg {
          position: absolute; inset: 0;
          background:
            linear-gradient(135deg, rgba(26,58,42,.92) 0%, rgba(26,58,42,.7) 100%),
            url('https://images.pexels.com/photos/6647119/pexels-photo-6647119.jpeg?auto=compress&cs=tinysrgb&w=900');
          background-size: cover; background-position: center 35%;
        }
        .reg-left-noise {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity:.45; pointer-events:none;
        }
        .reg-left-top { position:relative; z-index:1; }

        .reg-logo {
          display: inline-flex; align-items: center; gap: .45rem;
          text-decoration: none;
        }
        .reg-logo-icon {
          width: 32px; height: 32px; border-radius: 9px;
          background: #76c43b;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .reg-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 900; color: #fff;
        }
        .reg-logo-text span { color: #76c43b; }

        .reg-left-body {
          position: relative; z-index: 1;
          margin-top: auto; padding-top: 4rem;
        }
        .reg-left-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.7rem, 2.5vw, 2.4rem);
          font-weight: 900; color: #fff;
          line-height: 1.2; margin-bottom: 2rem;
        }
        .reg-left-heading em { color: #76c43b; font-style: italic; }

        .reg-left-steps {
          display: flex; flex-direction: column; gap: 1rem;
        }
        .reg-left-step {
          display: flex; align-items: flex-start; gap: .9rem;
        }
        .reg-step-num {
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(118,196,59,.15);
          border: 1px solid rgba(118,196,59,.3);
          color: #76c43b; font-size: .75rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: .1rem;
        }
        .reg-step-num.done {
          background: #76c43b; border-color: #76c43b; color: #1a3a2a;
        }
        .reg-step-title {
          font-size: .88rem; font-weight: 600; color: #fff; margin-bottom: .15rem;
        }
        .reg-step-desc { font-size: .78rem; color: rgba(255,255,255,.4); line-height: 1.5; }

        /* ── Right panel ── */
        .reg-right {
          background: #f7f3ed;
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
          padding: 3rem 2rem; min-height: 100vh;
        }

        .reg-form-wrap { width: 100%; max-width: 440px; }

        /* Mobile logo */
        .reg-mobile-logo {
          display: none; text-align: center; margin-bottom: 2rem;
        }
        @media(max-width:768px){ .reg-mobile-logo{ display:block; } }

        /* Progress bar */
        .reg-progress {
          display: flex; gap: .5rem; margin-bottom: 2.5rem;
        }
        .reg-progress-step {
          height: 3px; flex: 1; border-radius: 100px;
          background: #e8ecef; transition: background .35s;
        }
        .reg-progress-step.active { background: #76c43b; }

        .reg-eyebrow {
          display: inline-flex; align-items: center; gap: .4rem;
          color: #76c43b; font-size: .72rem; font-weight: 700;
          letter-spacing: .12em; text-transform: uppercase;
          margin-bottom: 1.25rem;
        }
        .reg-title {
          font-family: 'Playfair Display', serif;
          font-size: 2rem; font-weight: 900; color: #1a3a2a;
          line-height: 1.1; margin-bottom: .65rem;
        }
        .reg-title em { color: #76c43b; font-style: italic; }
        .reg-sub {
          font-size: .88rem; color: #667085;
          margin-bottom: 2rem; line-height: 1.6;
        }
        .reg-sub a { color: #76c43b; font-weight: 600; text-decoration: none; }
        .reg-sub a:hover { text-decoration: underline; }

        /* Role selector */
        .reg-role-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: .75rem; margin-bottom: 1.75rem;
        }
        .reg-role-card {
          border: 2px solid #e8ecef;
          border-radius: 14px; padding: 1.25rem 1rem;
          cursor: pointer; text-align: left;
          background: #fff; transition: all .22s;
          display: flex; flex-direction: column; gap: .5rem;
        }
        .reg-role-card:hover { border-color: #76c43b; background: rgba(118,196,59,.03); }
        .reg-role-card.selected {
          border-color: #76c43b;
          background: rgba(118,196,59,.06);
          box-shadow: 0 0 0 3px rgba(118,196,59,.12);
        }
        .reg-role-icon {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: .25rem;
        }
        .reg-role-title {
          font-size: .9rem; font-weight: 700; color: #1a3a2a;
        }
        .reg-role-desc {
          font-size: .75rem; color: #667085; line-height: 1.5;
        }
        .reg-role-check {
          width: 18px; height: 18px; border-radius: 50%;
          border: 1.5px solid #e8ecef;
          background: #fff; margin-left: auto;
          display: flex; align-items: center; justify-content: center;
          transition: all .2s;
        }
        .reg-role-card.selected .reg-role-check {
          border-color: #76c43b; background: #76c43b;
        }
        .reg-role-header { display: flex; align-items: flex-start; justify-content: space-between; }

        /* Fields */
        .reg-row { display: grid; grid-template-columns: 1fr 1fr; gap: .75rem; }
        .reg-field { margin-bottom: 1.1rem; }
        .reg-field label {
          display: block; font-size: .8rem; font-weight: 600;
          color: #344054; margin-bottom: .4rem;
        }
        .reg-field-wrap { position: relative; }
        .reg-field-icon {
          position: absolute; left: .9rem; top: 50%;
          transform: translateY(-50%);
          color: #98a2b3; pointer-events: none;
          display: flex; align-items: center;
        }
        .reg-input {
          width: 100%; padding: .72rem 1rem .72rem 2.5rem;
          background: #fff; border: 1.5px solid #e8ecef;
          border-radius: 12px; font-size: .88rem; color: #1a3a2a;
          font-family: 'DM Sans', sans-serif;
          transition: border-color .2s, box-shadow .2s; outline: none;
        }
        .reg-input:focus {
          border-color: #76c43b;
          box-shadow: 0 0 0 3px rgba(118,196,59,.12);
        }
        .reg-input::placeholder { color: #d0d5dd; }
        .reg-pw-toggle {
          position: absolute; right: .9rem; top: 50%;
          transform: translateY(-50%);
          background: none; border: none;
          color: #98a2b3; cursor: pointer; padding: .2rem;
          display: flex; align-items: center; transition: color .18s;
        }
        .reg-pw-toggle:hover { color: #667085; }

        /* Strength meter */
        .reg-strength { margin-top: .5rem; }
        .reg-strength-bars { display: flex; gap: 4px; margin-bottom: .3rem; }
        .reg-strength-bar {
          flex: 1; height: 3px; border-radius: 100px; background: #e8ecef;
          transition: background .3s;
        }
        .reg-strength-label {
          font-size: .72rem; font-weight: 600;
          transition: color .3s;
        }

        /* Buttons */
        .reg-submit {
          width: 100%; padding: .85rem;
          background: #1a3a2a; color: #fff;
          font-weight: 700; font-size: .9rem;
          border: none; border-radius: 12px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: .5rem;
          transition: all .22s; font-family: 'DM Sans', sans-serif;
          margin-bottom: 1rem;
        }
        .reg-submit:hover:not(:disabled) {
          background: #2d5a3d; transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(26,58,42,.2);
        }
        .reg-submit:disabled { opacity: .65; cursor: not-allowed; }

        .reg-back {
          width: 100%; padding: .78rem;
          background: transparent; color: #667085;
          font-weight: 500; font-size: .88rem;
          border: 1.5px solid #e8ecef; border-radius: 12px;
          cursor: pointer; transition: all .2s;
          font-family: 'DM Sans', sans-serif;
        }
        .reg-back:hover { border-color: #98a2b3; color: #344054; }

        .reg-terms {
          font-size: .75rem; color: #98a2b3;
          text-align: center; margin-top: 1rem; line-height: 1.6;
        }
        .reg-terms a { color: #667085; text-decoration: none; }
        .reg-terms a:hover { color: #1a3a2a; }
      `}</style>

      <div className="reg-wrap">

        {/* ── Left panel ── */}
        <div className="reg-left">
          <div className="reg-left-bg" />
          <div className="reg-left-noise" />

          <div className="reg-left-top">
            <Link href="/" className="reg-logo">
              <div className="reg-logo-icon">
                <Leaf size={15} color="#1a3a2a" strokeWidth={2.5} />
              </div>
              <span className="reg-logo-text">Zero<span>Hunger</span></span>
            </Link>
          </div>

          <div className="reg-left-body">
            <h2 className="reg-left-heading">
              Join thousands making<br />
              food waste <em>history.</em>
            </h2>
            <div className="reg-left-steps">
              {[
                { n: 1, title: "Choose your role", desc: "Donor or recipient — two minutes to set up." },
                { n: 2, title: "Create your account", desc: "Secure, free, and no hidden requirements." },
                { n: 3, title: "Start making impact", desc: "List food or browse what's available near you." },
              ].map(s => (
                <div className="reg-left-step" key={s.n}>
                  <div className={`reg-step-num ${step > s.n ? "done" : ""}`}>
                    {step > s.n ? <Check size={13} /> : s.n}
                  </div>
                  <div>
                    <div className="reg-step-title">{s.title}</div>
                    <div className="reg-step-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="reg-right">
          <div className="reg-form-wrap">

            {/* Mobile logo */}
            <div className="reg-mobile-logo">
              <Link href="/" className="reg-logo">
                <div className="reg-logo-icon">
                  <Leaf size={14} color="#1a3a2a" strokeWidth={2.5} />
                </div>
                <span className="reg-logo-text">Zero<span>Hunger</span></span>
              </Link>
            </div>

            {/* Progress bar */}
            <div className="reg-progress">
              <div className={`reg-progress-step ${step >= 1 ? "active" : ""}`} />
              <div className={`reg-progress-step ${step >= 2 ? "active" : ""}`} />
            </div>

            {/* ── Step 1 — role + name ── */}
            {step === 1 && (
              <form onSubmit={handleContinue}>
                <div className="reg-eyebrow">
                  <Leaf size={11} /> Step 1 of 2
                </div>
                <h1 className="reg-title">
                  Who are<br /><em>you?</em>
                </h1>
                <p className="reg-sub">
                  Already have an account?{" "}
                  <Link href="/auth/login">Sign in</Link>
                </p>

                {/* Role cards */}
                <div className="reg-role-grid">
                  {[
                    {
                      value: "donor" as const,
                      icon: <UtensilsCrossed size={18} color={userType === "donor" ? "#76c43b" : "#98a2b3"} />,
                      bg: userType === "donor" ? "rgba(118,196,59,.1)" : "#f7f3ed",
                      title: "Food Donor",
                      desc: "I have surplus food to share with my community.",
                    },
                    {
                      value: "recipient" as const,
                      icon: <HeartHandshake size={18} color={userType === "recipient" ? "#76c43b" : "#98a2b3"} />,
                      bg: userType === "recipient" ? "rgba(118,196,59,.1)" : "#f7f3ed",
                      title: "Recipient / NGO",
                      desc: "I'm looking for available food for myself or my community.",
                    },
                  ].map(r => (
                    <div
                      key={r.value}
                      className={`reg-role-card ${userType === r.value ? "selected" : ""}`}
                      onClick={() => setUserType(r.value)}
                    >
                      <div className="reg-role-header">
                        <div className="reg-role-icon" style={{ background: r.bg }}>
                          {r.icon}
                        </div>
                        <div className="reg-role-check">
                          {userType === r.value && <Check size={11} color="#fff" />}
                        </div>
                      </div>
                      <div className="reg-role-title">{r.title}</div>
                      <div className="reg-role-desc">{r.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Name fields */}
                <div className="reg-row">
                  <div className="reg-field">
                    <label htmlFor="firstName">First name</label>
                    <div className="reg-field-wrap">
                      <div className="reg-field-icon"><User size={15} /></div>
                      <input
                        id="firstName" type="text" required
                        className="reg-input" placeholder="John"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        autoComplete="given-name"
                      />
                    </div>
                  </div>
                  <div className="reg-field">
                    <label htmlFor="lastName">Last name</label>
                    <div className="reg-field-wrap">
                      <div className="reg-field-icon"><User size={15} /></div>
                      <input
                        id="lastName" type="text" required
                        className="reg-input" placeholder="Doe"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        autoComplete="family-name"
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="reg-submit">
                  Continue <ArrowRight size={16} />
                </button>
                <p className="reg-terms">
                  By continuing, you agree to our{" "}
                  <Link href="/terms">Terms of Service</Link> and{" "}
                  <Link href="/privacy">Privacy Policy</Link>.
                </p>
              </form>
            )}

            {/* ── Step 2 — credentials ── */}
            {step === 2 && (
              <form onSubmit={handleSubmit}>
                <div className="reg-eyebrow">
                  <Leaf size={11} /> Step 2 of 2
                </div>
                <h1 className="reg-title">
                  Set up your<br /><em>account.</em>
                </h1>
                <p className="reg-sub">
                  Creating account as a{" "}
                  <strong style={{ color: "#76c43b" }}>
                    {userType === "donor" ? "Food Donor" : "Recipient / NGO"}
                  </strong>
                </p>

                <div className="reg-field">
                  <label htmlFor="email">Email address</label>
                  <div className="reg-field-wrap">
                    <div className="reg-field-icon"><Mail size={15} /></div>
                    <input
                      id="email" type="email" required
                      className="reg-input" placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="reg-field">
                  <label htmlFor="password">Password</label>
                  <div className="reg-field-wrap">
                    <div className="reg-field-icon"><Lock size={15} /></div>
                    <input
                      id="password"
                      type={showPw ? "text" : "password"}
                      required
                      className="reg-input"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      disabled={isSubmitting}
                      autoComplete="new-password"
                    />
                    <button
                      type="button" className="reg-pw-toggle"
                      onClick={() => setShowPw(v => !v)} tabIndex={-1}
                    >
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {password.length > 0 && (
                    <div className="reg-strength">
                      <div className="reg-strength-bars">
                        {[0, 1, 2, 3].map(i => (
                          <div
                            key={i}
                            className="reg-strength-bar"
                            style={{ background: i < pwStrength ? pwColors[pwStrength - 1] : "#e8ecef" }}
                          />
                        ))}
                      </div>
                      <span
                        className="reg-strength-label"
                        style={{ color: pwStrength > 0 ? pwColors[pwStrength - 1] : "#98a2b3" }}
                      >
                        {pwStrength > 0 ? pwLabels[pwStrength - 1] : ""}
                      </span>
                    </div>
                  )}
                </div>

                <div className="reg-field">
                  <label htmlFor="confirmPw">Confirm password</label>
                  <div className="reg-field-wrap">
                    <div className="reg-field-icon"><Lock size={15} /></div>
                    <input
                      id="confirmPw"
                      type={showConfirm ? "text" : "password"}
                      required
                      className="reg-input"
                      placeholder="Repeat your password"
                      value={confirmPw}
                      onChange={e => setConfirmPw(e.target.value)}
                      disabled={isSubmitting}
                      autoComplete="new-password"
                      style={{
                        borderColor: confirmPw.length > 0
                          ? (confirmPw === password ? "#76c43b" : "#ef4444")
                          : undefined
                      }}
                    />
                    <button
                      type="button" className="reg-pw-toggle"
                      onClick={() => setShowConfirm(v => !v)} tabIndex={-1}
                    >
                      {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit" className="reg-submit" disabled={isSubmitting}
                >
                  {isSubmitting
                    ? <><Loader2 size={16} className="animate-spin" /> Creating account...</>
                    : <>Create account <ArrowRight size={16} /></>
                  }
                </button>

                <button
                  type="button" className="reg-back"
                  onClick={() => setStep(1)} disabled={isSubmitting}
                >
                  ← Back
                </button>

                <p className="reg-terms" style={{ marginTop: ".75rem" }}>
                  By creating an account, you agree to our{" "}
                  <Link href="/terms">Terms</Link> and{" "}
                  <Link href="/privacy">Privacy Policy</Link>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
