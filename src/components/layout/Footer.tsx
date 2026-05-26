// import React from 'react'
// import { Instagram, Twitter, Facebook, Heart } from 'lucide-react';
// import Link from 'next/link';

// export default function Footer() {
//       const currentYear = new Date().getFullYear();
//   return (
//      <footer className="bg-white border-t border-gray-200">
//       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div className="col-span-1 md:col-span-1">
//             <div className="flex items-center">
//               {/*<Logo className="h-10 w-auto" />*/}
//               <p className="ml-2 text-xl font-semibold text-green-700"><span>Zero</span>Hunger</p>
//             </div>
//             <p className="mt-4 text-gray-600 text-sm">
//               Connecting surplus food with those who need it most. Together we can reduce waste and fight hunger.
//             </p>
//             <div className="mt-4 flex space-x-4">
//               <Link href="#" className="text-gray-500 hover:text-green-600 transition-colors">
//                 <Facebook size={20} />
//                 <span className="sr-only">Facebook</span>
//               </Link>
//               <Link href="#" className="text-gray-500 hover:text-green-600 transition-colors">
//                 <Twitter size={20} />
//                 <span className="sr-only">Twitter</span>
//               </Link>
//               <Link href="#" className="text-gray-500 hover:text-green-600 transition-colors">
//                 <Instagram size={20} />
//                 <span className="sr-only">Instagram</span>
//               </Link>
//             </div>
//           </div>
          
//           <div className="col-span-1">
//             <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">For Donors</h3>
//             <ul className="mt-4 space-y-2">
//               <li>
//                 <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
//                   How It Works
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
//                   Donation Guidelines
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
//                   Food Safety
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
//                   Tax Benefits
//                 </Link>
//               </li>
//             </ul>
//           </div>
          
//           <div className="col-span-1">
//             <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">For NGOs</h3>
//             <ul className="mt-4 space-y-2">
//               <li>
//                 <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
//                   Requirements
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
//                   Food Pickup
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
//                   Distribution Tips
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
//                   Partner Organizations
//                 </Link>
//               </li>
//             </ul>
//           </div>
          
//           <div className="col-span-1">
//             <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">About</h3>
//             <ul className="mt-4 space-y-2">
//               <li>
//                 <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
//                   Our Mission
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
//                   Impact
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
//                   Contact Us
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
//                   Privacy Policy
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
        
//         <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-gray-500 text-sm">
//             &copy; {currentYear} ZeroHunger. All rights reserved.
//           </p>
          
//         </div>
//       </div>
//     </footer>
//   )
// }


"use client";

import Link from "next/link";
import { Leaf, Instagram, Twitter, Facebook, Linkedin, ArrowRight, Mail, MapPin } from "lucide-react";

const year = new Date().getFullYear();

const links = {
  donors: [
    { label: "How it works",         href: "/#how-it-works" },
    { label: "List surplus food",    href: "/donate" },
    { label: "Food safety guide",    href: "/about" },
    { label: "Donor dashboard",      href: "/donordashboard" },
  ],
  recipients: [
    { label: "Browse food near me",  href: "/browse" },
    { label: "How to reserve",       href: "/about" },
    { label: "Pickup reminders",     href: "/recipientdashboard" },

  ],
  company: [
    { label: "About ZeroHunger",     href: "/about" },
    
    { label: "Contact us",           href: "/contact" },
    { label: "Privacy policy",       href: "/privacy" },
  ],
};

export default function Footer() {
  return (
    <>
      <style>{`
        .ft {
          background: var(--zh-green-deep, #1a3a2a);
          font-family: var(--font-body, 'DM Sans', sans-serif);
          color: rgba(255,255,255,.6);
          position: relative; overflow: hidden;
        }

        /* top glow */
        .ft::before {
          content: ''; position: absolute;
          top: -200px; right: -200px;
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(118,196,59,.07) 0%, transparent 65%);
          pointer-events: none;
        }

        /* ── CTA strip ── */
        .ft-cta {
          border-bottom: 1px solid rgba(255,255,255,.07);
          padding: 4rem 2rem;
        }
        .ft-cta-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center;
          justify-content: space-between; gap: 2rem;
          flex-wrap: wrap;
        }
        .ft-cta-heading {
          font-family: var(--font-editorial, 'Playfair Display', serif);
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 800; color: #fff;
          line-height: 1.2; margin-bottom: .5rem;
        }
        .ft-cta-heading em { color: var(--zh-green-brand, #76c43b); font-style: italic; }
        .ft-cta-sub { font-size: .9rem; color: rgba(255,255,255,.45); }
        .ft-cta-btn {
          display: inline-flex; align-items: center; gap: .5rem;
          background: var(--zh-green-brand, #76c43b);
          color: var(--zh-green-deep, #1a3a2a);
          font-weight: 700; font-size: .88rem;
          padding: .8rem 1.65rem; border-radius: 100px;
          text-decoration: none; white-space: nowrap;
          transition: all .22s;
          box-shadow: 0 4px 18px rgba(118,196,59,.3);
          flex-shrink: 0;
        }
        .ft-cta-btn:hover {
          background: var(--zh-green-light, #9be564);
          transform: translateY(-2px);
        }

        /* ── Main grid ── */
        .ft-main {
          padding: 4rem 2rem 3rem;
          max-width: 1200px; margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
        }
        @media(max-width:900px){
          .ft-main { grid-template-columns: 1fr 1fr; gap: 2.5rem 3rem; }
        }
        @media(max-width:520px){
          .ft-main { grid-template-columns: 1fr; }
        }

        /* ── Brand column ── */
        .ft-brand-logo {
          display: flex; align-items: center; gap: .45rem;
          text-decoration: none; margin-bottom: 1.25rem;
        }
        .ft-brand-icon {
          width: 34px; height: 34px; border-radius: 10px;
          background: var(--zh-green-brand, #76c43b);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ft-brand-name {
          font-family: var(--font-editorial, 'Playfair Display', serif);
          font-size: 1.15rem; font-weight: 900; color: #fff;
        }
        .ft-brand-name span { color: var(--zh-green-brand, #76c43b); }
        .ft-brand-desc {
          font-size: .875rem; line-height: 1.8;
          color: rgba(255,255,255,.45);
          margin-bottom: 1.75rem;
          max-width: 280px;
        }

        .ft-social {
          display: flex; gap: .6rem;
        }
        .ft-social-link {
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.08);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,.5);
          text-decoration: none;
          transition: all .2s;
        }
        .ft-social-link:hover {
          background: rgba(118,196,59,.15);
          border-color: rgba(118,196,59,.3);
          color: var(--zh-green-brand, #76c43b);
          transform: translateY(-2px);
        }

        .ft-contact {
          margin-top: 1.75rem;
          display: flex; flex-direction: column; gap: .6rem;
        }
        .ft-contact-item {
          display: flex; align-items: center; gap: .6rem;
          font-size: .82rem; color: rgba(255,255,255,.4);
        }

        /* ── Link columns ── */
        .ft-col-title {
          font-size: .7rem; font-weight: 700;
          letter-spacing: .14em; text-transform: uppercase;
          color: rgba(255,255,255,.3);
          margin-bottom: 1.25rem;
        }
        .ft-col-links {
          display: flex; flex-direction: column; gap: .65rem;
          list-style: none; padding: 0; margin: 0;
        }
        .ft-col-link {
          font-size: .85rem; color: rgba(255,255,255,.5);
          text-decoration: none;
          transition: color .18s;
          display: inline-flex; align-items: center; gap: .3rem;
        }
        .ft-col-link:hover { color: var(--zh-green-brand, #76c43b); }

        /* ── Bottom bar ── */
        .ft-bottom {
          border-top: 1px solid rgba(255,255,255,.06);
          padding: 1.5rem 2rem;
        }
        .ft-bottom-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap;
          gap: 1rem;
        }
        .ft-copy {
          font-size: .78rem; color: rgba(255,255,255,.25);
        }
        .ft-bottom-links {
          display: flex; gap: 1.5rem;
        }
        .ft-bottom-link {
          font-size: .78rem; color: rgba(255,255,255,.25);
          text-decoration: none; transition: color .18s;
        }
        .ft-bottom-link:hover { color: rgba(255,255,255,.6); }

        .ft-badge {
          display: inline-flex; align-items: center; gap: .4rem;
          background: rgba(118,196,59,.1);
          border: 1px solid rgba(118,196,59,.2);
          color: var(--zh-green-brand, #76c43b);
          font-size: .72rem; font-weight: 600;
          padding: .25rem .75rem; border-radius: 100px;
          letter-spacing: .05em;
        }
      `}</style>

      <footer className="ft">

        {/* ── CTA strip ── */}
        <div className="ft-cta">
          <div className="ft-cta-inner">
            <div>
              <h2 className="ft-cta-heading">
                Ready to make a <em>difference?</em>
              </h2>
              <p className="ft-cta-sub">
                Join thousands of donors and recipients already using ZeroHunger.
              </p>
            </div>
            <Link href="/auth/register" className="ft-cta-btn">
              Get started free <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* ── Main columns ── */}
        <div className="ft-main">

          {/* Brand */}
          <div>
            <Link href="/" className="ft-brand-logo">
              <div className="ft-brand-icon">
                <Leaf size={17} color="#1a3a2a" strokeWidth={2.5} />
              </div>
              <span className="ft-brand-name">Zero<span>Hunger</span></span>
            </Link>
            <p className="ft-brand-desc">
              Connecting surplus food with communities that need it most. Built to
              reduce waste, fight hunger, and prove that coordination changes everything.
            </p>

            <div className="ft-social">
              {[
                { icon: <Twitter size={15} />,   href: "#", label: "Twitter"   },
                { icon: <Instagram size={15} />, href: "#", label: "Instagram" },
                { icon: <Facebook size={15} />,  href: "#", label: "Facebook"  },
                { icon: <Linkedin size={15} />,  href: "#", label: "LinkedIn"  },
              ].map(s => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="ft-social-link"
                  aria-label={s.label}
                >
                  {s.icon}
                </Link>
              ))}
            </div>

            <div className="ft-contact">
              <div className="ft-contact-item">
                <Mail size={13} />
                hello@zerohunger.org
              </div>
              <div className="ft-contact-item">
                <MapPin size={13} />
                Lagos, Nigeria
              </div>
            </div>
          </div>

          {/* For Donors */}
          <div>
            <p className="ft-col-title">For Donors</p>
            <ul className="ft-col-links">
              {links.donors.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="ft-col-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Recipients */}
          <div>
            <p className="ft-col-title">For Recipients</p>
            <ul className="ft-col-links">
              {links.recipients.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="ft-col-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="ft-col-title">Company</p>
            <ul className="ft-col-links">
              {links.company.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="ft-col-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="ft-bottom">
          <div className="ft-bottom-inner">
            <p className="ft-copy">
              © {year} ZeroHunger. All rights reserved.
            </p>
            <div className="ft-badge">
              <Leaf size={10} />
              Fighting hunger since 2022
            </div>
            <div className="ft-bottom-links">
              <Link href="/privacy" className="ft-bottom-link">Privacy</Link>
              <Link href="/terms" className="ft-bottom-link">Terms</Link>
              <Link href="/contact" className="ft-bottom-link">Contact</Link>
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}
