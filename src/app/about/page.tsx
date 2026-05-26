// import React from 'react';
// import { Button } from '@/components/ui/button'
// import Link from 'next/link';


// export default function page() {
//   return (
//     <div className="min-h-screen flex flex-col">
      
      
//       <main className="flex-grow">
//         {/* Hero Section */}
//         <section className="bg-defaultgreen text-white py-16">
//           <div className="saveplate-container">
//             <div className="max-w-3xl mx-auto text-center">
//               <h1 className="text-4xl md:text-5xl font-bold mb-4">About ZeroHunger</h1>
//               <p className="text-xl text-white/90">
//                 Connecting surplus food to those who need it most
//               </p>
//             </div>
//           </div>
//         </section>
        
//         {/* Mission Section */}
//         <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
//           <div className="saveplate-container">
//             <div className="max-w-4xl mx-auto">
//               <h2 className="text-3xl font-bold mb-6 text-neutral900">Our Mission</h2>
//               <p className="text-lg text-neutral700 mb-6">
//                 At ZeroHunger, we believe that good food should never go to waste. Our mission is to create a world where everyone has access to nutritious food, and where we minimize the environmental impact of food waste.
//               </p>
//               <p className="text-lg text-neutral700 mb-6">
//                 We connect food donors—including restaurants, bakeries, grocery stores, and individuals—with community members, NGOs who can benefit from perfectly good surplus food that would otherwise be thrown away.
//               </p>
//               <p className="text-lg text-neutral700">
//                 Through our platform, we aim to foster community connections, reduce environmental impact, and ensure that more people have access to quality food.
//               </p>
//             </div>
//           </div>
//         </section>
        
//         {/* Values Section */}
//         <section className="py-16 bg-neutral50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
//           <div className="saveplate-container">
//             <h2 className="text-3xl font-bold mb-12 text-center text-neutral900">Our Values</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div className="bg-white p-8 rounded-lg shadow-sm">
//                 <div className="w-12 h-12 bg-defaultgreen-100 rounded-full flex items-center justify-center mb-4">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-defaultgreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-bold mb-2 text-neutral900">Sustainability</h3>
//                 <p className="text-neutral600">
//                   We are committed to reducing food waste and its environmental impact. By saving food from landfills, we help reduce greenhouse gas emissions and conserve resources.
//                 </p>
//               </div>
              
//               <div className="bg-white p-8 rounded-lg shadow-sm">
//                 <div className="w-12 h-12 bg-defaultgreen-100 rounded-full flex items-center justify-center mb-4">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-defaultgreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-bold mb-2 text-neutral900">Community</h3>
//                 <p className="text-neutral600">
//                   We believe in the power of community connections. Our platform brings people together through the shared value of good food and mutual support.
//                 </p>
//               </div>
              
//               <div className="bg-white p-8 rounded-lg shadow-sm">
//                 <div className="w-12 h-12 bg-defaultgreen-100 rounded-full flex items-center justify-center mb-4">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-defaultgreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-bold mb-2 text-neutral900">Food Security</h3>
//                 <p className="text-neutral600">
//                   We are dedicated to increasing access to nutritious food for everyone in our communities, regardless of socioeconomic status.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
        
//         {/* Team Section */}
//         <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
//           <div className="saveplate-container">
//             <div className="max-w-4xl mx-auto">
//               <h2 className="text-3xl font-bold mb-6 text-neutral900">Our Team</h2>
//               <p className="text-lg text-neutral700 mb-12">
//                 ZeroHunger was founded by a group of passionate individuals dedicated to fighting food waste and hunger in our communities. Our team brings together expertise in food systems, technology, community organizing, and sustainability.
//               </p>
              
//               {/* Add team members here */}
//             </div>
//           </div>
//         </section>
        
//         {/* Join Us CTA */}
//         <section className="py-16 bg-defaultgreen text-white">
//           <div className="saveplate-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
//             <div className="">
//               <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
//               <p className="text-xl mb-8 opacity-90">
//                 Be part of the solution to reduce food waste and increase access to good food
//               </p>
//               <div className="flex flex-col sm:flex-row justify-center gap-4">
//                 <Button asChild size="lg" className="bg-white text-defaultgreen hover:bg-neutral100">
//                   <Link href="/donate">Start Donating</Link>
//                 </Button>
//                 <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-darkgreen">
//                   <Link href="/browse">Find Food</Link>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
      
      
//     </div>
//   )
// }

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Leaf, Globe, Shield, HeartHandshake,
  Sprout, Users, Lightbulb, Quote, Play, Pause
} from "lucide-react";

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCounter(end: number, duration = 2200, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0: number;
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(e * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [end, duration, start]);
  return count;
}

function Reveal({
  children, delay = 0, className = "", y = 28
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                     transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ImpactNumber({ value, suffix, label, prefix = "" }: {
  value: number; suffix: string; label: string; prefix?: string;
}) {
  const { ref, inView } = useInView(0.4);
  const n = useCounter(value, 2200, inView);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.6s ease, transform 0.6s ease",
    }}>
      <div className="imp-num">{prefix}{inView ? n.toLocaleString() : 0}{suffix}</div>
      <div className="imp-lbl">{label}</div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        :root {
          --gd: #1a3a2a; --gm: #2d5a3d; --gb: #76c43b; --gl: #9be564;
          --cr: #f7f3ed; --cd: #ede8e0; --or: #FF9124;
          --td: #0f1f17; --tm: #344054; --ts: #667085;
        }

        .ab { font-family:'DM Sans',sans-serif; background:var(--cr); color:var(--td); overflow-x:hidden; }

        /* ─ MANIFESTO HERO ─ */
        .mh {
          position:relative; min-height:100vh;
          display:flex; flex-direction:column; justify-content:flex-end;
          padding:0 0 6rem; overflow:hidden;
          background:var(--gd);
        }
        .mh-media {
          position:absolute; inset:0;
          background:
            linear-gradient(to bottom, rgba(26,58,42,0.55) 0%, rgba(26,58,42,0.5) 40%, rgba(26,58,42,0.92) 100%),
            url('https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1600');
          background-size:cover; background-position:center 40%;
        }
        .mh-noise {
          position:absolute; inset:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          opacity:.5; pointer-events:none;
        }
        .mh-inner {
          position:relative; z-index:2;
          max-width:1200px; margin:0 auto;
          padding:0 2rem;
          display:grid; grid-template-columns:1fr 1fr;
          gap:4rem; align-items:flex-end;
        }
        @media(max-width:768px){ .mh-inner{grid-template-columns:1fr; gap:2.5rem;} }

        .mh-eyebrow {
          display:inline-flex; align-items:center; gap:.5rem;
          background:rgba(118,196,59,.12); border:1px solid rgba(118,196,59,.3);
          color:var(--gl); padding:.35rem 1rem; border-radius:100px;
          font-size:.72rem; font-weight:600; letter-spacing:.1em;
          text-transform:uppercase; margin-bottom:2rem;
        }
        .mh-title {
          font-family:'Playfair Display',serif;
          font-size:clamp(3rem,6vw,5.5rem);
          font-weight:900; color:#fff; line-height:1.02;
          margin-bottom:2rem;
        }
        .mh-title em { color:var(--gb); font-style:italic; }

        .mh-right { padding-bottom:.5rem; }
        .mh-pull {
          font-family:'Playfair Display',serif;
          font-size:clamp(1.1rem,2vw,1.5rem);
          font-style:italic; font-weight:400;
          color:rgba(255,255,255,.7);
          line-height:1.65; margin-bottom:2.5rem;
          padding-left:1.5rem;
          border-left:2px solid rgba(118,196,59,.4);
        }
        .mh-ctas { display:flex; gap:1rem; flex-wrap:wrap; }
        .btn-p {
          display:inline-flex; align-items:center; gap:.5rem;
          background:var(--gb); color:var(--gd);
          font-weight:700; font-size:.88rem;
          padding:.8rem 1.65rem; border-radius:100px;
          text-decoration:none; transition:all .22s;
          box-shadow:0 4px 20px rgba(118,196,59,.3);
        }
        .btn-p:hover{ background:var(--gl); transform:translateY(-2px); }
        .btn-g {
          display:inline-flex; align-items:center; gap:.5rem;
          background:rgba(255,255,255,.08); color:#fff;
          font-weight:500; font-size:.88rem;
          padding:.8rem 1.65rem; border-radius:100px;
          text-decoration:none;
          border:1px solid rgba(255,255,255,.18);
          backdrop-filter:blur(6px); transition:all .22s;
        }
        .btn-g:hover{ background:rgba(255,255,255,.15); transform:translateY(-2px); }

        .mh-scroll-hint {
          position:absolute; bottom:2rem; left:50%;
          transform:translateX(-50%);
          display:flex; flex-direction:column; align-items:center; gap:.3rem;
          color:rgba(255,255,255,.3); font-size:.68rem;
          letter-spacing:.14em; text-transform:uppercase;
          animation:bob 2.2s ease infinite;
        }
        .mh-scroll-hint div {
          width:1px; height:40px;
          background:linear-gradient(to bottom, rgba(255,255,255,.3), transparent);
        }
        @keyframes bob{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(7px)}}

        /* ─ NUMBERS BAR ─ */
        .nb { background:var(--gd); padding:0; }
        .nb-inner {
          max-width:1200px; margin:0 auto;
          display:grid; grid-template-columns:repeat(4,1fr);
          border-top:1px solid rgba(255,255,255,.06);
          border-bottom:1px solid rgba(255,255,255,.06);
        }
        @media(max-width:640px){ .nb-inner{grid-template-columns:repeat(2,1fr);} }
        .nb-cell {
          padding:3.5rem 2rem; text-align:center;
          border-right:1px solid rgba(255,255,255,.06);
          transition:background .3s;
        }
        .nb-cell:last-child{border-right:none;}
        .nb-cell:hover{background:rgba(255,255,255,.03);}
        .imp-num {
          font-family:'Playfair Display',serif;
          font-size:clamp(2.4rem,4vw,3.2rem);
          font-weight:900; color:var(--gb);
          line-height:1; margin-bottom:.5rem;
        }
        .imp-lbl { color:rgba(255,255,255,.45); font-size:.82rem; font-weight:400; }

        /* ─ STORY ─ */
        .st { padding:9rem 2rem; background:#fff; }
        .st-inner {
          max-width:1200px; margin:0 auto;
          display:grid; grid-template-columns:5fr 7fr;
          gap:7rem; align-items:start;
        }
        @media(max-width:900px){ .st-inner{grid-template-columns:1fr; gap:4rem;} }
        .st-sticky { position:sticky; top:7rem; }
        .eyebrow {
          display:inline-block; color:var(--gb);
          font-size:.7rem; font-weight:700;
          letter-spacing:.16em; text-transform:uppercase;
          margin-bottom:1rem;
        }
        .h2 {
          font-family:'Playfair Display',serif;
          font-size:clamp(2rem,3.5vw,3rem);
          font-weight:800; color:var(--gd);
          line-height:1.15; margin-bottom:1.25rem;
        }
        .h2 em { color:var(--gb); font-style:italic; }
        .body-text { color:var(--ts); font-size:.95rem; line-height:1.85; }
        .st-right { display:flex; flex-direction:column; gap:0; }

        .st-img-wrap {
          position:relative; border-radius:20px;
          overflow:hidden; margin-bottom:3rem;
          aspect-ratio:16/9;
        }
        .st-img-wrap img {
          width:100%; height:100%; object-fit:cover;
          transition:transform 6s ease;
        }
        .st-img-wrap:hover img{ transform:scale(1.03); }
        .st-img-badge {
          position:absolute; bottom:1.25rem; left:1.25rem;
          background:rgba(26,58,42,.85);
          border:1px solid rgba(118,196,59,.25);
          backdrop-filter:blur(10px);
          padding:.6rem 1.1rem; border-radius:100px;
          color:rgba(255,255,255,.8); font-size:.78rem;
        }

        .st-para { display:flex; flex-direction:column; gap:1.75rem; }
        .st-para p { color:var(--tm); font-size:1rem; line-height:1.85; }
        .st-para p strong { color:var(--gd); font-weight:600; }
        .st-para p em { color:var(--gb); font-style:normal; font-weight:600; }

        .st-pull {
          margin:2.5rem 0;
          padding:2rem 2.5rem;
          background:var(--cr);
          border-left:3px solid var(--gb);
          border-radius:0 16px 16px 0;
        }
        .st-pull p {
          font-family:'Playfair Display',serif;
          font-size:1.25rem; font-weight:700; font-style:italic;
          color:var(--gd); line-height:1.55; margin:0;
        }

        /* ─ VALUES ─ */
        .vl { padding:9rem 2rem; background:var(--cr); }
        .vl-header {
          max-width:1200px; margin:0 auto 5rem;
          display:grid; grid-template-columns:1fr 1fr;
          gap:4rem; align-items:end;
        }
        @media(max-width:768px){ .vl-header{grid-template-columns:1fr; gap:1.5rem;} }
        .vl-grid {
          max-width:1200px; margin:0 auto;
          display:grid; grid-template-columns:repeat(3,1fr);
          gap:1.25rem;
        }
        @media(max-width:900px){ .vl-grid{grid-template-columns:repeat(2,1fr);} }
        @media(max-width:580px){ .vl-grid{grid-template-columns:1fr;} }

        .vc {
          background:#fff; border-radius:20px;
          padding:2.5rem; border:1px solid var(--cd);
          transition:all .3s ease;
          position:relative; overflow:hidden;
        }
        .vc::before {
          content:''; position:absolute;
          inset:0; background:linear-gradient(135deg, rgba(118,196,59,.04) 0%, transparent 60%);
          opacity:0; transition:opacity .3s;
        }
        .vc:hover::before{ opacity:1; }
        .vc:hover{
          transform:translateY(-5px);
          box-shadow:0 18px 50px rgba(26,58,42,.08);
          border-color:rgba(118,196,59,.2);
        }
        .vc-num {
          font-family:'Playfair Display',serif;
          font-size:3.5rem; font-weight:900;
          color:var(--cd); line-height:1; margin-bottom:1.25rem;
        }
        .vc-icon {
          width:48px; height:48px; border-radius:14px;
          display:flex; align-items:center; justify-content:center;
          margin-bottom:1.25rem;
        }
        .vc h3 {
          font-size:1.05rem; font-weight:700;
          color:var(--gd); margin-bottom:.65rem;
        }
        .vc p { color:var(--ts); font-size:.88rem; line-height:1.75; }

        /* ─ MANIFESTO ─ */
        .mf {
          padding:9rem 2rem; background:var(--gd);
          position:relative; overflow:hidden;
        }
        .mf::before {
          content:''; position:absolute;
          top:-200px; right:-200px;
          width:700px; height:700px; border-radius:50%;
          background:radial-gradient(circle, rgba(118,196,59,.09) 0%, transparent 65%);
          pointer-events:none;
        }
        .mf::after {
          content:''; position:absolute;
          bottom:-150px; left:-150px;
          width:500px; height:500px; border-radius:50%;
          background:radial-gradient(circle, rgba(255,145,36,.06) 0%, transparent 65%);
          pointer-events:none;
        }
        .mf-inner {
          position:relative; z-index:1;
          max-width:900px; margin:0 auto; text-align:center;
        }
        .mf-q { color:var(--gb); margin-bottom:2rem; opacity:.7; }
        .mf-quote {
          font-family:'Playfair Display',serif;
          font-size:clamp(1.8rem,4vw,3.2rem);
          font-weight:900; font-style:italic;
          color:#fff; line-height:1.25;
          margin-bottom:2rem;
        }
        .mf-quote em { color:var(--gb); font-style:normal; }
        .mf-attr {
          font-size:.82rem; color:rgba(255,255,255,.4);
          letter-spacing:.08em; font-weight:500;
        }

        .mf-pillars {
          margin-top:5rem;
          display:grid; grid-template-columns:repeat(3,1fr);
          gap:1px; background:rgba(255,255,255,.06);
          border-radius:20px; overflow:hidden;
          border:1px solid rgba(255,255,255,.06);
        }
        @media(max-width:640px){ .mf-pillars{grid-template-columns:1fr;} }
        .mf-pill {
          background:rgba(26,58,42,.7);
          padding:2.5rem 2rem; text-align:center;
          transition:background .3s;
        }
        .mf-pill:hover{ background:rgba(45,90,61,.7); }
        .mf-pill-icon {
          width:44px; height:44px; border-radius:12px;
          background:rgba(118,196,59,.12);
          display:flex; align-items:center; justify-content:center;
          margin:0 auto 1rem;
        }
        .mf-pill h4 {
          font-size:.95rem; font-weight:700;
          color:#fff; margin-bottom:.5rem;
        }
        .mf-pill p { font-size:.82rem; color:rgba(255,255,255,.45); line-height:1.65; }

        /* ─ TEAM ─ */
        .tm { padding:9rem 2rem; background:#fff; }
        .tm-header {
          max-width:1200px; margin:0 auto 5rem;
          text-align:center;
        }
        .tm-grid {
          max-width:1200px; margin:0 auto;
          display:grid; grid-template-columns:repeat(4,1fr);
          gap:2rem;
        }
        @media(max-width:900px){ .tm-grid{grid-template-columns:repeat(2,1fr);} }
        @media(max-width:520px){ .tm-grid{grid-template-columns:1fr;} }

        .tc {
          text-align:center;
          transition:transform .3s;
        }
        .tc:hover{ transform:translateY(-6px); }
        .tc-img-ring {
          position:relative;
          width:130px; height:130px; margin:0 auto 1.5rem;
        }
        .tc-ring {
          position:absolute; inset:-4px;
          border-radius:50%;
          background:conic-gradient(var(--gb) 0deg, transparent 180deg, var(--gb) 360deg);
          animation:spin 8s linear infinite;
          opacity:0; transition:opacity .3s;
        }
        .tc:hover .tc-ring{ opacity:.5; }
        @keyframes spin{ to{transform:rotate(360deg);} }
        .tc-img {
          position:relative; z-index:1;
          width:130px; height:130px; border-radius:50%;
          object-fit:cover;
          border:3px solid #fff;
          box-shadow:0 4px 20px rgba(26,58,42,.12);
        }
        .tc-badge {
          position:absolute; z-index:2;
          bottom:4px; right:4px;
          width:30px; height:30px; border-radius:50%;
          background:var(--gb);
          display:flex; align-items:center; justify-content:center;
          border:2px solid #fff;
        }
        .tc-name {
          font-family:'Playfair Display',serif;
          font-size:1.05rem; font-weight:700;
          color:var(--gd); margin-bottom:.25rem;
        }
        .tc-role {
          font-size:.75rem; font-weight:700;
          color:var(--gb); letter-spacing:.08em;
          text-transform:uppercase; margin-bottom:.75rem;
        }
        .tc-bio { font-size:.83rem; color:var(--ts); line-height:1.7; }

        /* ─ PRESS ─ */
        .pr { padding:5rem 2rem; background:var(--cr); }
        .pr-inner { max-width:1200px; margin:0 auto; text-align:center; }
        .pr-label {
          font-size:.72rem; font-weight:700;
          letter-spacing:.16em; text-transform:uppercase;
          color:var(--ts); margin-bottom:2.5rem;
        }
        .pr-logos {
          display:flex; align-items:center; justify-content:center;
          gap:3rem; flex-wrap:wrap;
        }
        .pr-logo {
          font-family:'Playfair Display',serif;
          font-size:1.1rem; font-weight:700;
          color:var(--cd); letter-spacing:.04em;
          transition:color .2s;
          cursor:default;
        }
        .pr-logo:hover{ color:var(--ts); }

        /* ─ FINAL CTA ─ */
        .fc {
          padding:9rem 2rem; background:var(--gd);
          text-align:center; position:relative; overflow:hidden;
        }
        .fc::before {
          content:''; position:absolute;
          top:50%; left:50%;
          transform:translate(-50%,-50%);
          width:800px; height:800px; border-radius:50%;
          background:radial-gradient(circle, rgba(118,196,59,.1) 0%, transparent 60%);
          pointer-events:none;
        }
        .fc-inner {
          position:relative; z-index:1;
          max-width:700px; margin:0 auto;
        }
        .fc h2 {
          font-family:'Playfair Display',serif;
          font-size:clamp(2.5rem,5vw,4rem);
          font-weight:900; color:#fff;
          line-height:1.1; margin-bottom:1.5rem;
        }
        .fc h2 em{ color:var(--gb); font-style:italic; }
        .fc p {
          color:rgba(255,255,255,.55);
          font-size:1rem; line-height:1.8;
          margin-bottom:3rem;
        }
        .fc-btns{ display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; }
      `}</style>

      <div className="ab">

        {/* ══ HERO — MANIFESTO ══ */}
        <section className="mh">
          <div className="mh-media" />
          <div className="mh-noise" />

          <div className="mh-inner">
            <div>
              <div className="mh-eyebrow" style={{ animationDelay: "0ms", opacity: 1 }}>
                <Leaf size={11} /> About ZeroHunger
              </div>
              <h1 className="mh-title">
                We exist so<br />
                good food finds<br />
                <em>good people.</em>
              </h1>
            </div>

            <div className="mh-right">
              <p className="mh-pull">
                "Every year, 1.3 billion tonnes of food is wasted while 828 million
                people go hungry. We decided that was a coordination problem —
                and coordination problems have technological solutions."
              </p>
              <div className="mh-ctas">
                <Link href="/auth/register" className="btn-p">
                  Join ZeroHunger <ArrowRight size={15} />
                </Link>
                <Link href="/browse" className="btn-g">
                  Browse food
                </Link>
              </div>
            </div>
          </div>

          <div className="mh-scroll-hint">
            <span>Scroll</span>
            <div />
          </div>
        </section>

        {/* ══ NUMBERS BAR ══ */}
        <section className="nb">
          <div className="nb-inner">
            <div className="nb-cell">
              <ImpactNumber value={12400} suffix="+" label="Meals redistributed" />
            </div>
            <div className="nb-cell">
              <ImpactNumber value={2800} suffix="kg" label="Food waste prevented" />
            </div>
            <div className="nb-cell">
              <ImpactNumber value={340} suffix="+" label="Verified donors" />
            </div>
            <div className="nb-cell">
              <ImpactNumber value={58} suffix="+" label="NGO partners" />
            </div>
          </div>
        </section>

        {/* ══ STORY ══ */}
        <section className="st">
          <div className="st-inner">

            {/* Sticky left */}
            <div className="st-sticky">
              <Reveal>
                <span className="eyebrow">Our story</span>
                <h2 className="h2">
                  A problem hiding<br />
                  in plain <em>sight.</em>
                </h2>
                <p className="body-text">
                  ZeroHunger began the same way most necessary things do — someone
                  refused to accept that a broken situation was just the way things are.
                </p>
              </Reveal>
            </div>

            {/* Scrolling right */}
            <div className="st-right">
              <Reveal delay={0}>
                <div className="st-img-wrap">
                  <img
                    src="https://images.pexels.com/photos/6647029/pexels-photo-6647029.jpeg?auto=compress&cs=tinysrgb&w=900"
                    alt="Food distribution"
                  />
                  <div className="st-img-badge">
                    <Leaf size={11} style={{ display:"inline", marginRight:5 }} />
                    Community pickup, Lagos 2023
                  </div>
                </div>
              </Reveal>

              <div className="st-para">
                <Reveal delay={60}>
                  <p>
                    <strong>It started with a number: 20 kilograms.</strong> That's how
                    much food one restaurant manager told us she threw away every single
                    night. Not because the food was bad — it was perfectly good. But
                    because she had no way to get it to anyone before it expired. Two
                    streets away, a food bank was turning families away for the same reason:
                    not enough supply.
                  </p>
                </Reveal>

                <div className="st-pull">
                  <Reveal delay={80}>
                    <p>
                      "The food existed. The need existed. All that was missing was the
                      bridge between them."
                    </p>
                  </Reveal>
                </div>

                <Reveal delay={100}>
                  <p>
                    We built the first version of ZeroHunger in six weeks. It was
                    deliberately simple: list food, browse food, reserve food, collect food.
                    In the first month, we facilitated <em>400 meals' worth</em> of
                    redistribution in a single city with 12 donors and no marketing budget.
                    That number doubled the following month without us changing anything.
                    The demand was already there. It just needed a place to meet.
                  </p>
                </Reveal>

                <Reveal delay={120}>
                  <p>
                    <strong>Today, ZeroHunger is infrastructure.</strong> A platform that
                    handles real-time listings, instant reservation confirmation, automated
                    expiry management, pickup reminders, and full impact tracking — all
                    designed around how food actually moves, not how a boardroom imagines
                    it does. We've grown to serve donors and recipients across multiple
                    cities, with an expanding network of NGO partners, restaurants,
                    supermarkets, farms, and households all on one platform.
                  </p>
                </Reveal>

                <Reveal delay={140}>
                  <p>
                    We are not a charity. We're not a marketplace. We're a coordination
                    layer — the missing piece that lets the goodwill that already exists
                    in every community translate into actual food reaching actual people.
                    <strong> Every listing is a decision to not waste. Every pickup is
                    someone's meal. Every completed donation is proof that this works.</strong>
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ══ VALUES ══ */}
        <section className="vl">
          <div className="vl-header">
            <Reveal>
              <span className="eyebrow">What we stand for</span>
              <h2 className="h2">
                Six principles that shape<br />
                <em>every decision we make.</em>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="body-text">
                Values aren't decoration. Ours are the reason we built the product
                the way we did, priced it the way we did, and will grow the way we will.
              </p>
            </Reveal>
          </div>

          <div className="vl-grid">
            {[
              { n:"01", icon:<Leaf size={20} color="#76c43b"/>, bg:"rgba(118,196,59,.1)",
                title:"Sustainability first",
                desc:"Every food item saved is carbon not emitted, water not wasted, land not over-farmed. The environmental case for zero waste isn't secondary to the human case — it's the same case." },
              { n:"02", icon:<Users size={20} color="#FF9124"/>, bg:"rgba(255,145,36,.1)",
                title:"Dignity by design",
                desc:"We build for people, not beneficiaries. No recipient on ZeroHunger should ever feel like a charity case. The product is designed to make access feel natural, not clinical." },
              { n:"03", icon:<Shield size={20} color="#3b82f6"/>, bg:"rgba(59,130,246,.1)",
                title:"Trust is infrastructure",
                desc:"Verified donors, transparent listings, honest impact data. We don't inflate numbers or hide failures. Trust is the actual product — everything else is features on top of it." },
              { n:"04", icon:<Lightbulb size={20} color="#a855f7"/>, bg:"rgba(168,85,247,.1)",
                title:"Radical simplicity",
                desc:"Good technology disappears. If a donor needs a tutorial to list food, we've failed. The entire experience should feel as fast and obvious as sending a message." },
              { n:"05", icon:<Globe size={20} color="#14b8a6"/>, bg:"rgba(20,184,166,.1)",
                title:"Openness",
                desc:"Open to all food types, all donor sizes, all recipient organisations. A home cook with leftover rice and a supermarket with 200kg of surplus both belong here." },
              { n:"06", icon:<Sprout size={20} color="#76c43b"/>, bg:"rgba(118,196,59,.08)",
                title:"Long-term thinking",
                desc:"We optimise for a food system that still works in 20 years, not a growth chart that looks good in a deck. Every feature we ship must pass that test." },
            ].map((v, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="vc">
                  <div className="vc-num">{v.n}</div>
                  <div className="vc-icon" style={{ background:v.bg }}>{v.icon}</div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ MANIFESTO QUOTE ══ */}
        <section className="mf">
          <div className="mf-inner">
            <Reveal>
              <Quote size={32} className="mf-q" />
              <p className="mf-quote">
                The world doesn't have a food shortage.<br />
                It has a <em>distribution problem.</em><br />
                We're the fix.
              </p>
              <p className="mf-attr">— ZeroHunger founding principle</p>
            </Reveal>

            <Reveal delay={150}>
              <div className="mf-pillars">
                {[
                  { icon:<HeartHandshake size={20} color="#76c43b"/>,
                    title:"Community-first",
                    desc:"Built with NGOs, food banks and communities — not for them from the outside." },
                  { icon:<Sprout size={20} color="#76c43b"/>,
                    title:"Zero margin model",
                    desc:"We charge nothing to list, nothing to reserve. The food gets there — full stop." },
                  { icon:<Globe size={20} color="#76c43b"/>,
                    title:"Built to scale",
                    desc:"Every city we enter, the infrastructure is already there. The network effect is the product." },
                ].map((p, i) => (
                  <div className="mf-pill" key={i}>
                    <div className="mf-pill-icon">{p.icon}</div>
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ TEAM ══ */}
        <section className="tm">
          <Reveal>
            <div className="tm-header">
              <span className="eyebrow">The team</span>
              <h2 className="h2" style={{ margin:"0 auto .75rem" }}>
                Built by people who<br />
                <em>refuse to accept the status quo.</em>
              </h2>
              <p className="body-text" style={{ maxWidth:480, margin:"0 auto" }}>
                A small, focused team combining deep expertise in food systems,
                engineering, and community organising.
              </p>
            </div>
          </Reveal>

          <div className="tm-grid">
            {[
              { name:"Ayomide Olaniyan", role:"Founder & CEO",
                bio:"Former food systems researcher. Spent three years documenting food insecurity before deciding documentation wasn't enough.",
                img:"https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
                icon:<Sprout size={13} color="#fff"/> },
              { name:"Chidinma Okafor", role:"Head of Community",
                bio:"10 years running NGO partnerships across West Africa. Knows every food bank coordinator in Lagos by first name.",
                img:"https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=300",
                icon:<HeartHandshake size={13} color="#fff"/> },
              { name:"Emeka Adeyemi", role:"Lead Engineer",
                bio:"Built platforms used by millions. Chose ZeroHunger because scale that matters beats scale that impresses.",
                img:"https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=300",
                icon:<Lightbulb size={13} color="#fff"/> },
              { name:"Fatima Al-Rashid", role:"Operations",
                bio:"Supply chain veteran who turned down three logistics multinationals to apply her skills where they're needed most.",
                img:"https://images.pexels.com/photos/4420634/pexels-photo-4420634.jpeg?auto=compress&cs=tinysrgb&w=300",
                icon:<Globe size={13} color="#fff"/> },
            ].map((m, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="tc">
                  <div className="tc-img-ring">
                    <div className="tc-ring" />
                    <img src={m.img} alt={m.name} className="tc-img" />
                    <div className="tc-badge">{m.icon}</div>
                  </div>
                  <div className="tc-name">{m.name}</div>
                  <div className="tc-role">{m.role}</div>
                  <p className="tc-bio">{m.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ PRESS / AS SEEN IN ══ */}
        <section className="pr">
          <div className="pr-inner">
            <Reveal>
              <p className="pr-label">As seen in</p>
              <div className="pr-logos">
                {["TechCabal", "The Guardian", "Vanguard", "Punch", "BusinessDay", "CNN Africa"].map((name) => (
                  <span key={name} className="pr-logo">{name}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ FINAL CTA ══ */}
        <section className="fc">
          <div className="fc-inner">
            <Reveal>
              <h2>
                The mission is simple.<br />
                <em>Join it.</em>
              </h2>
              <p>
                Whether you have surplus food to give or need access to fresh food
                in your community — ZeroHunger is the platform that makes the
                connection happen. Free, fast and built for real life.
              </p>
              <div className="fc-btns">
                <Link href="/auth/register" className="btn-p">
                  Create free account <ArrowRight size={15} />
                </Link>
                <Link href="/browse" className="btn-g">
                  Browse listings
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}
