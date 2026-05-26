


// "use client"

// import React, { useState } from 'react'
// import { Menu, X } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useAuth } from '@/context/AuthContext';
// import { Button } from '@/components/ui/button';
// import { Skeleton } from '@/components/ui/skeleton';
// import { toast } from 'sonner';
// import NotificationButton from '@/components/NotificationButton';




// function HeaderAuthSkeleton() {
//   return (
//     <>
//       {/* Desktop skeleton — hidden on mobile */}
//       <div className="hidden md:flex items-center space-x-8">
//         <Skeleton className="h-4 w-20 rounded-full" />
//         <Skeleton className="h-4 w-24 rounded-full" />
//         <Skeleton className="h-4 w-16 rounded-full" />
//       </div>
//       <div className="hidden md:flex items-center space-x-4">
//         <Skeleton className="h-9 w-20 rounded-md" />
//         <Skeleton className="h-9 w-20 rounded-md" />
//       </div>

//       {/* Mobile skeleton — shown instead of hamburger while auth loads */}
//       <Skeleton className="md:hidden h-9 w-9 rounded-md" />
//     </>
//   );
// }


// // ─── Header ───────────────────────────────────────────────────────────────────

// export default function Header() {
//   const { user, profile, isLoading: authLoading, signOut } = useAuth();
//   const router = useRouter();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       toast.success("Signed out successfully", {
//         description: "You have been signed out of your account.",
//       });
//       router.push("/");
//     } catch {
//       toast.error("Error signing out", {
//         description: "There was a problem signing you out.",
//       });
//     }
//   };

//   const isDonor = profile?.user_type === 'donor';
//   const dashboardPath = isDonor ? "/donordashboard" : "/recipientdashboard";

//   return (
//     <header className="bg-white shadow-sm sticky top-0 z-10">
//       <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">

//           {/* Logo — always visible, never changes */}
//           <div className="flex items-center">
//             <Link href="/" className="flex-shrink-0 flex items-center">
//               <span className="ml-2 text-xl font-semibold text-green-700">ZeroHunger</span>
//             </Link>
//           </div>

//           {/* Auth-dependent content — skeleton until session resolves */}
//           {authLoading ? (
//             <HeaderAuthSkeleton />
//           ) : (
//             <>
//               {/* Desktop nav links */}
//               <div className="hidden md:flex items-center space-x-8">
//                 {!user && (
//                   <Link href="/" className="text-neutral700 hover:text-defaultgreen transition-colors">
//                     Home
//                   </Link>
//                 )}
//                 {user && (
//                   <Link href={dashboardPath} className="text-neutral700 hover:text-defaultgreen transition-colors">
//                     Dashboard
//                   </Link>
//                 )}
//                 {!isDonor && (
//                   <Link href="/browse" className="text-neutral700 hover:text-defaultgreen transition-colors">
//                     Browse Food
//                   </Link>
//                 )}
//                 {isDonor && (
//                   <Link href="/donate" className="text-neutral700 hover:text-defaultgreen transition-colors">
//                     Donate Food
//                   </Link>
//                 )}
//                 {!user && (
//                   <Link href="/about" className="text-neutral700 hover:text-defaultgreen transition-colors">
//                     About Us
//                   </Link>
//                 )}
//               </div>

//               {/* Desktop auth buttons */}
//               <div className="hidden md:flex items-center space-x-4">
//                 {user ? (
//                   <div className="flex items-center space-x-4">
//                     <NotificationButton />
//                     {profile && (
//                       <span className="text-sm text-neutral600">
//                         Welcome, {profile.first_name || 'User'}
//                       </span>
//                     )}
//                     <Button
//                       variant="outline"
//                       className="border-defaultorange text-defaultorange hover:text-darkorange hover:border-darkorange"
//                       onClick={handleSignOut}
//                     >
//                       Sign Out
//                     </Button>
//                   </div>
//                 ) : (
//                   <>
//                     <Button
//                       variant="outline"
//                       className="border-defaultorange text-defaultorange hover:text-darkorange hover:border-darkorange"
//                       onClick={() => router.push("/auth/login")}
//                     >
//                       Sign In
//                     </Button>
//                     <Button
//                       className="bg-defaultgreen hover:bg-darkgreen text-white"
//                       onClick={() => router.push("/auth/register")}
//                     >
//                       Sign Up
//                     </Button>
//                   </>
//                 )}
//               </div>

//               {/* Mobile hamburger — only shown after auth resolves */}
//               <button
//                 className="md:hidden p-2 rounded-md hover:cursor-pointer"
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               >
//                 {mobileMenuOpen ? (
//                   <X className="h-6 w-6 text-neutral700" />
//                 ) : (
//                   <Menu className="h-6 w-6 text-neutral700" />
//                 )}
//               </button>
//             </>
//           )}
//         </div>

//         {/* Mobile menu — only rendered after auth resolves and menu is open */}
//         {!authLoading && mobileMenuOpen && (
//           <div className="md:hidden py-4 space-y-4">
//             {!user && (
//               <Link
//                 href="/"
//                 className="block py-2 text-neutral700 hover:text-defaultgreen"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Home
//               </Link>
//             )}
//             {user && (
//               <Link
//                 href={dashboardPath}
//                 className="block py-2 text-neutral700 hover:text-defaultgreen"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Dashboard
//               </Link>
//             )}
//             {!isDonor && (
//               <Link
//                 href="/browse"
//                 className="block py-2 text-neutral700 hover:text-defaultgreen"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Browse Food
//               </Link>
//             )}
//             {isDonor && (
//               <Link
//                 href="/donate"
//                 className="block py-2 text-neutral700 hover:text-defaultgreen"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Donate Food
//               </Link>
//             )}
//             {!user && (
//               <Link
//                 href="/about"
//                 className="block py-2 text-neutral700 hover:text-defaultgreen"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 About Us
//               </Link>
//             )}

//             <div className="flex flex-col space-y-2 pt-2 border-t border-neutral200">
//               {user ? (
//                 <>
//                   <div className="flex items-center justify-between py-2">
//                     {profile && (
//                       <span className="text-sm text-neutral600">
//                         Welcome, {profile.first_name || 'User'}
//                       </span>
//                     )}
//                     <NotificationButton />
//                   </div>
//                   <Button
//                     variant="outline"
//                     className="border-defaultorange text-defaultorange hover:text-darkorange hover:border-darkorange"
//                     onClick={() => {
//                       handleSignOut();
//                       setMobileMenuOpen(false);
//                     }}
//                   >
//                     Sign Out
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Button
//                     variant="outline"
//                     className="border-defaultorange text-defaultorange hover:text-darkorange hover:border-darkorange"
//                     onClick={() => {
//                       router.push("/auth/login");
//                       setMobileMenuOpen(false);
//                     }}
//                   >
//                     Sign In
//                   </Button>
//                   <Button
//                     className="bg-defaultgreen hover:bg-darkgreen text-white"
//                     onClick={() => {
//                       router.push("/auth/register");
//                       setMobileMenuOpen(false);
//                     }}
//                   >
//                     Sign Up
//                   </Button>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Leaf, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import NotificationButton from "@/components/NotificationButton";

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function HeaderSkeleton() {
  return (
    <div className="hdr-skeleton">
      <div className="hdr-sk-nav">
        <Skeleton className="h-3 w-16 rounded-full" />
        <Skeleton className="h-3 w-20 rounded-full" />
        <Skeleton className="h-3 w-14 rounded-full" />
      </div>
      <div className="hdr-sk-auth">
        <Skeleton className="h-8 w-18 rounded-full" />
        <Skeleton className="h-8 w-22 rounded-full" />
      </div>
      <Skeleton className="hdr-sk-mob h-8 w-8 rounded-md" />
    </div>
  );
}

// ─── Nav link ─────────────────────────────────────────────────────────────────
function NavLink({ href, children, onClick }: {
  href: string; children: React.ReactNode; onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`hdr-nav-link ${active ? "hdr-nav-link--active" : ""}`}
    >
      {children}
    </Link>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
export default function Header() {
  const { user, profile, isLoading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Scrolled state for background blur
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      router.push("/");
    } catch {
      toast.error("Error signing out");
    }
  };

  const isDonor     = profile?.user_type === "donor";
  const isAdmin     = profile?.user_type === "admin";
  const dashPath    = isDonor ? "/donordashboard" : isAdmin ? "/admin" : "/recipientdashboard";
  const firstName   = profile?.first_name || "Account";

  // Decide which nav links to show based on auth + role
  const publicLinks  = [
    { href: "/", label: "Home" },
    { href: "/browse", label: "Browse Food" },
    { href: "/about", label: "About" },
  ];

  const authedLinks = user ? [
    { href: dashPath, label: "Dashboard" },
    ...(isDonor
      ? [{ href: "/donate", label: "Donate Food" }]
      : [{ href: "/browse", label: "Browse Food" }]
    ),
    ...(isAdmin ? [{ href: "/admin", label: "Admin" }] : []),
  ] : [];

  const navLinks = user ? authedLinks : publicLinks;

  return (
    <>
      <style>{`
        /* ── Header shell ── */
        .hdr {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
        }
        .hdr--scrolled {
          background: rgba(26, 58, 42, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 1px 0 rgba(255,255,255,0.06);
        }
        /* .hdr--top { background: transparent; } */
        .hdr--top {
  background: rgba(26, 58, 42, 0.55);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

        .hdr-bar {
          max-width: 1200px; margin: 0 auto;
          padding: 0 2rem;
          height: 68px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 2rem;
        }

        /* ── Logo ── */
        .hdr-logo {
          display: flex; align-items: center; gap: .45rem;
          text-decoration: none; flex-shrink: 0;
        }
        .hdr-logo-icon {
          width: 32px; height: 32px; border-radius: 9px;
          background: var(--zh-green-brand);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .hdr-logo-text {
          font-family: var(--font-editorial, 'Playfair Display', serif);
          font-size: 1.15rem; font-weight: 900;
          color: #fff; letter-spacing: -.01em;
        }
        .hdr-logo-text span { color: var(--zh-green-brand); }

        /* ── Nav links ── */
        .hdr-nav {
          display: flex; align-items: center; gap: 2rem;
        }
        @media(max-width:768px){ .hdr-nav{ display:none; } }

        .hdr-nav-link {
          font-size: .85rem; font-weight: 500;
          color: rgba(255,255,255,.72);
          text-decoration: none; position: relative;
          transition: color .2s;
          padding: .25rem 0;
        }
        .hdr-nav-link::after {
          content: ''; position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 1.5px; background: var(--zh-green-brand);
          transform: scaleX(0); transform-origin: left;
          transition: transform .25s ease;
        }
        .hdr-nav-link:hover,
        .hdr-nav-link--active { color: #fff; }
        .hdr-nav-link:hover::after,
        .hdr-nav-link--active::after { transform: scaleX(1); }

        /* ── Right side ── */
        .hdr-right {
          display: flex; align-items: center; gap: .75rem;
          flex-shrink: 0;
        }
        @media(max-width:768px){ .hdr-right .hdr-auth-desktop { display:none; } }

        .hdr-auth-desktop { display: flex; align-items: center; gap: .75rem; }

        .hdr-btn-signin {
          font-size: .82rem; font-weight: 600;
          color: rgba(255,255,255,.8);
          text-decoration: none; padding: .45rem .9rem;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,.2);
          transition: all .2s;
        }
        .hdr-btn-signin:hover {
          color: #fff; border-color: rgba(255,255,255,.45);
          background: rgba(255,255,255,.07);
        }

        .hdr-btn-signup {
          font-size: .82rem; font-weight: 700;
          color: var(--zh-green-deep, #1a3a2a);
          background: var(--zh-green-brand, #76c43b);
          text-decoration: none; padding: .45rem 1.1rem;
          border-radius: 100px;
          transition: all .2s;
          box-shadow: 0 2px 10px rgba(118,196,59,.3);
        }
        .hdr-btn-signup:hover {
          background: var(--zh-green-light, #9be564);
          transform: translateY(-1px);
        }

        .hdr-welcome {
          font-size: .8rem; color: rgba(255,255,255,.6);
          font-weight: 400; white-space: nowrap;
        }
        .hdr-welcome strong { color: rgba(255,255,255,.9); font-weight: 600; }

        .hdr-btn-out {
          font-size: .82rem; font-weight: 600;
          color: rgba(255,255,255,.7);
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.14);
          padding: .45rem 1rem; border-radius: 100px;
          cursor: pointer; transition: all .2s;
        }
        .hdr-btn-out:hover {
          color: #fff; background: rgba(255,255,255,.13);
          border-color: rgba(255,255,255,.3);
        }

        /* ── Hamburger ── */
        .hdr-hamburger {
          display: none; background: none; border: none;
          color: rgba(255,255,255,.8); cursor: pointer;
          padding: .4rem; border-radius: 8px;
          transition: background .2s;
        }
        @media(max-width:768px){ .hdr-hamburger{ display:flex; align-items:center; justify-content:center; } }
        .hdr-hamburger:hover { background: rgba(255,255,255,.08); }

        /* ── Mobile drawer ── */
        .hdr-drawer {
          position: fixed; inset: 0; z-index: 99;
          display: flex; flex-direction: column;
        }
        .hdr-drawer-backdrop {
          position: absolute; inset: 0;
          background: rgba(0,0,0,.55); backdrop-filter: blur(4px);
        }
        .hdr-drawer-panel {
          position: relative; z-index: 1;
          width: min(360px, 88vw); height: 100%;
          background: var(--zh-green-deep, #1a3a2a);
          border-right: 1px solid rgba(255,255,255,.07);
          display: flex; flex-direction: column;
          padding: 1.5rem;
          animation: hdr-slide-in .28s cubic-bezier(.16,1,.3,1) both;
        }
        @keyframes hdr-slide-in {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }

        .hdr-drawer-top {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 2.5rem;
        }
        .hdr-drawer-close {
          background: rgba(255,255,255,.07); border: none;
          color: rgba(255,255,255,.7); cursor: pointer;
          width: 36px; height: 36px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          transition: background .2s;
        }
        .hdr-drawer-close:hover { background: rgba(255,255,255,.14); }

        .hdr-drawer-nav {
          display: flex; flex-direction: column; gap: .25rem;
          flex: 1;
        }
        .hdr-drawer-link {
          font-size: .95rem; font-weight: 500;
          color: rgba(255,255,255,.72); text-decoration: none;
          padding: .75rem 1rem; border-radius: 12px;
          transition: all .18s;
          display: flex; align-items: center; gap: .6rem;
        }
        .hdr-drawer-link:hover,
        .hdr-drawer-link--active {
          color: #fff; background: rgba(255,255,255,.06);
        }
        .hdr-drawer-link--active { color: var(--zh-green-brand); }

        .hdr-drawer-divider {
          height: 1px; background: rgba(255,255,255,.07);
          margin: 1.25rem 0;
        }

        .hdr-drawer-auth {
          display: flex; flex-direction: column; gap: .75rem;
        }
        .hdr-drawer-btn-primary {
          width: 100%; padding: .75rem;
          background: var(--zh-green-brand); color: var(--zh-green-deep);
          font-weight: 700; font-size: .9rem;
          border: none; border-radius: 100px;
          cursor: pointer; transition: background .2s;
          text-align: center; text-decoration: none;
          display: block;
        }
        .hdr-drawer-btn-primary:hover { background: var(--zh-green-light); }
        .hdr-drawer-btn-secondary {
          width: 100%; padding: .7rem;
          background: rgba(255,255,255,.06);
          color: rgba(255,255,255,.8);
          font-weight: 500; font-size: .9rem;
          border: 1px solid rgba(255,255,255,.12); border-radius: 100px;
          cursor: pointer; transition: all .2s;
          text-align: center; text-decoration: none;
          display: block;
        }
        .hdr-drawer-btn-secondary:hover { background: rgba(255,255,255,.12); }

        .hdr-drawer-user {
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 14px; padding: 1rem;
          margin-bottom: .75rem;
        }
        .hdr-drawer-user-name {
          font-size: .9rem; font-weight: 600; color: #fff;
          margin-bottom: .2rem;
        }
        .hdr-drawer-user-role {
          font-size: .75rem; color: var(--zh-green-brand);
          text-transform: capitalize; font-weight: 500;
        }

        /* ── Skeleton ── */
        .hdr-skeleton {
          display: flex; align-items: center; gap: 1.5rem;
        }
        .hdr-sk-nav { display: flex; gap: 1.5rem; align-items: center; }
        .hdr-sk-auth { display: flex; gap: .75rem; align-items: center; }
        .hdr-sk-mob { display: none; }
        @media(max-width:768px){
          .hdr-sk-nav{ display:none; }
          .hdr-sk-auth{ display:none; }
          .hdr-sk-mob{ display:block; }
        }
      `}</style>

      {/* ── Header bar ── */}
      <header className={`hdr ${scrolled ? "hdr--scrolled" : "hdr--top"}`}>
        <div className="hdr-bar">

          {/* Logo */}
          <Link href="/" className="hdr-logo">
            <div className="hdr-logo-icon">
              <Leaf size={16} color="#1a3a2a" strokeWidth={2.5} />
            </div>
            <span className="hdr-logo-text">
              Zero<span>Hunger</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hdr-nav">
            {authLoading ? (
              <HeaderSkeleton />
            ) : (
              navLinks.map(l => (
                <NavLink key={l.href} href={l.href}>{l.label}</NavLink>
              ))
            )}
          </nav>

          {/* Right side */}
          <div className="hdr-right">
            {authLoading ? null : user ? (
              <div className="hdr-auth-desktop" style={{ gap: "1rem" }}>
                <NotificationButton />
                <span className="hdr-welcome">
                  Hey, <strong>{firstName}</strong>
                </span>
                <button className="hdr-btn-out" onClick={handleSignOut}>
                  Sign out
                </button>
              </div>
            ) : (
              <div className="hdr-auth-desktop">
                <Link href="/auth/login" className="hdr-btn-signin">Sign in</Link>
                <Link href="/auth/register" className="hdr-btn-signup">Get started</Link>
              </div>
            )}

            {/* Hamburger */}
            <button
              className="hdr-hamburger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="hdr-drawer">
          <div
            className="hdr-drawer-backdrop"
            onClick={() => setMobileOpen(false)}
          />
          <div className="hdr-drawer-panel">
            <div className="hdr-drawer-top">
              <Link href="/" className="hdr-logo" onClick={() => setMobileOpen(false)}>
                <div className="hdr-logo-icon">
                  <Leaf size={15} color="#1a3a2a" strokeWidth={2.5} />
                </div>
                <span className="hdr-logo-text">Zero<span>Hunger</span></span>
              </Link>
              <button
                className="hdr-drawer-close"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="hdr-drawer-nav">
              {navLinks.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`hdr-drawer-link ${usePathname() === l.href ? "hdr-drawer-link--active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="hdr-drawer-divider" />

            <div className="hdr-drawer-auth">
              {user ? (
                <>
                  <div className="hdr-drawer-user">
                    <div className="hdr-drawer-user-name">{firstName}</div>
                    <div className="hdr-drawer-user-role">
                      {profile?.user_type || "User"}
                    </div>
                  </div>
                  <div style={{ display:"flex", justifyContent:"center" }}>
                    <NotificationButton />
                  </div>
                  <button
                    className="hdr-drawer-btn-secondary"
                    onClick={() => { handleSignOut(); setMobileOpen(false); }}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/register"
                    className="hdr-drawer-btn-primary"
                    onClick={() => setMobileOpen(false)}
                  >
                    Get started — it's free
                  </Link>
                  <Link
                    href="/auth/login"
                    className="hdr-drawer-btn-secondary"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Spacer so page content starts below fixed header */}
      <div style={{ height: 68 }} />
    </>
  );
}
