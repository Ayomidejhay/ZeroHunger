// import Image from "next/image";
// import { ArrowRight, Leaf, Utensils, Users, BarChart4 } from "lucide-react";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="bg-white">
//       {/* Hero section */}
//       <div  className="relative bg-cover bg-center py-24 sm:py-32"
//         style={{ 
//           backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://images.pexels.com/photos/6647119/pexels-photo-6647119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
//           backgroundPosition: 'center 35%'
//         }}>
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//             <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
//               <span className="block">Reducing Food Waste</span>
//               <span className="block">Feeding Communities</span>
//             </h1>
//             <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
//               ZeroHunger connects restaurants, supermarkets and food owners with NGOs to redistribute excess food to those who need it most
//             </p>
//             <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
//               <Link href="/auth/register" className="px-8 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:translate-y-1 active:translate-y-0 active:shadow-lg">
//                 Get Started
//               </Link>
//               <Link href="/auth/login" className="px-8 py-3 bg-white text-green-600 font-medium rounded-md hover:bg-gray-100 transition-colors flex items-center">
//                 Log in <ArrowRight  size={16} className="ml-2" />
//               </Link>
//             </div>
//           </div>
//       </div>

//       {/* How it works section */}
//       <div className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">How it Works</h2>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//               Our platform connects food donors with NGOs to ensure excess food reaches those in need.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
//               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
//                 <Utensils className="text-green-600" size={24} />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">1. List Surplus Food</h3>
//               <p className="text-gray-600">
//                  Restaurants, supermarkets, farms and individuals list their surplus food, including type, quantity, and pickup details.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
//               <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
//                 <Users className="text-orange-600" size={24} />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">2. NGOs Claim Food</h3>
//               <p className="text-gray-600">
//                 Registered NGOs browse available food listings and claim items they can distribute to communities in need.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//                 <Leaf className="text-blue-600" size={24} />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Pickup & Distribute</h3>
//               <p className="text-gray-600">
//                 NGOs pick up the claimed food and distribute it to those in need, reducing waste and feeding communities.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Impact section */}
//       <div className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Impact</h2>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//               Together, we're making a difference in reducing food waste and fighting hunger.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
//             <div className="text-center">
//               <p className="text-5xl font-bold text-green-600 mb-2">5,000+</p>
//               <p className="text-xl text-gray-700">Meals Saved</p>
//             </div>
//             <div className="text-center">
//               <p className="text-5xl font-bold text-green-600 mb-2">50+</p>
//               <p className="text-xl text-gray-700">Businesses Participating</p>
//             </div>
//             <div className="text-center">
//               <p className="text-5xl font-bold text-green-600 mb-2">20+</p>
//               <p className="text-xl text-gray-700">NGOs Participating</p>
//             </div>
//           </div>
//           <div className="mt-12 text-center">
//             <Link href="/auth/register" className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors shadow-md">
//               Join the Movement <ArrowRight size={16} className="ml-2" />
//             </Link>
//           </div>
//         </div>
//       </div>
//       {/* Testimonials section */}
//       <div className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <p className="text-gray-600 mb-4 italic">
//                 "ZeroHunger has revolutionized how we handle our surplus food. Instead of throwing away perfectly good items, we can now help those in need while reducing waste. It's a win-win!"
//               </p>
//               <div className="flex items-center">
//                 <img 
//                   src="https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=600" 
//                   alt="Testimonial" 
//                   className="w-12 h-12 rounded-full object-cover mr-4"
//                 />
//                 <div>
//                   <p className="font-medium text-gray-800">Sarah Johnson</p>
//                   <p className="text-sm text-gray-500">Manager, Fresh Harvest Market</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <p className="text-gray-600 mb-4 italic">
//                 "As a small NGO, we were struggling to find consistent food sources for our community pantry. FoodShare has been a game-changer, connecting us with quality food that would otherwise go to waste."
//               </p>
//               <div className="flex items-center">
//                 <img 
//                   src="https://images.pexels.com/photos/4420634/pexels-photo-4420634.jpeg?auto=compress&cs=tinysrgb&w=600" 
//                   alt="Testimonial" 
//                   className="w-12 h-12 rounded-full object-cover mr-4"
//                 />
//                 <div>
//                   <p className="font-medium text-gray-800">Michael Thompson</p>
//                   <p className="text-sm text-gray-500">Director, Community Food Bank</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Call to Action section */}
//       <div className="py-16 bg-cover bg-center"  style={{ 
//           backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.pexels.com/photos/6647029/pexels-photo-6647029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'
//         }}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold text-white mb-4">Ready to Make a Difference</h2>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">Join our community of food donors and NGOs working together to reduce waste and fight hunger.</p>
//           <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
//             <Link href="/auth/register" className="px-8 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors shadow-lg">
//               Get Started Now
//             </Link>
//             <Link href="#" className="px-8 py-3 bg-transparent text-white border border-white font-medium rounded-md hover:bg-white hover:text-green-800 transition-colors ">
//               Learn More
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Leaf, UtensilsCrossed, HeartHandshake,
  TrendingDown, MapPin, Clock, Star, ChevronDown, Zap
} from "lucide-react";

// ─── Animated counter hook ────────────────────────────────────────────────────
function useCounter(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

// ─── Intersection observer hook ───────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Stat card with animated counter ─────────────────────────────────────────
function StatCard({ value, suffix, label, delay }: {
  value: number; suffix: string; label: string; delay: number;
}) {
  const { ref, inView } = useInView(0.3);
  const count = useCounter(value, 2000, inView);
  return (
    <div
      ref={ref}
      className="stat-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="stat-number">
        {inView ? count.toLocaleString() : 0}{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const { ref: statsRef, inView: statsInView } = useInView(0.2);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        /* ── Fonts ── */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --green-deep:   #1a3a2a;
          --green-mid:    #2d5a3d;
          --green-brand:  #76c43b;
          --green-light:  #9be564;
          --cream:        #f7f3ed;
          --cream-dark:   #ede8e0;
          --orange:       #FF9124;
          --text-dark:    #0f1f17;
          --text-mid:     #344054;
          --text-soft:    #667085;
        }

        .zh-page {
          font-family: 'DM Sans', sans-serif;
          background: var(--cream);
          color: var(--text-dark);
          overflow-x: hidden;
        }

        /* ── Hero ── */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          background: var(--green-deep);
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to bottom right, rgba(26,58,42,0.92) 0%, rgba(26,58,42,0.75) 50%, rgba(26,58,42,0.88) 100%),
            url('https://images.pexels.com/photos/6647119/pexels-photo-6647119.jpeg?auto=compress&cs=tinysrgb&w=1600');
          background-size: cover;
          background-position: center 35%;
        }

        .hero-grain {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          padding-top: 5rem;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(118, 196, 59, 0.15);
          border: 1px solid rgba(118, 196, 59, 0.35);
          color: var(--green-light);
          padding: 0.4rem 1rem;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 2rem;
          animation: fadeUp 0.8s ease both;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 7vw, 6.5rem);
          font-weight: 900;
          line-height: 1.0;
          color: #fff;
          margin-bottom: 1.5rem;
          animation: fadeUp 0.8s ease 0.1s both;
        }

        .hero-title .accent {
          color: var(--green-brand);
          font-style: italic;
        }

        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.2rem);
          font-weight: 300;
          color: rgba(255,255,255,0.72);
          max-width: 560px;
          line-height: 1.7;
          margin-bottom: 3rem;
          animation: fadeUp 0.8s ease 0.2s both;
        }

        .hero-cta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          animation: fadeUp 0.8s ease 0.3s both;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--green-brand);
          color: var(--green-deep);
          font-weight: 600;
          font-size: 0.95rem;
          padding: 0.9rem 2rem;
          border-radius: 100px;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 4px 24px rgba(118,196,59,0.3);
        }

        .btn-primary:hover {
          background: var(--green-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(118,196,59,0.4);
        }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.08);
          color: #fff;
          font-weight: 500;
          font-size: 0.95rem;
          padding: 0.9rem 2rem;
          border-radius: 100px;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.18);
          transition: all 0.25s ease;
          backdrop-filter: blur(8px);
        }

        .btn-ghost:hover {
          background: rgba(255,255,255,0.15);
          transform: translateY(-2px);
        }

        .hero-scroll {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          color: rgba(255,255,255,0.4);
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          animation: bounce 2s ease infinite;
          cursor: default;
        }

        .hero-pill-row {
          display: flex;
          gap: 1rem;
          margin-top: 4rem;
          flex-wrap: wrap;
          animation: fadeUp 0.8s ease 0.4s both;
        }

        .hero-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 0.5rem 1rem;
          border-radius: 100px;
          color: rgba(255,255,255,0.7);
          font-size: 0.82rem;
          backdrop-filter: blur(6px);
        }

        .hero-pill span.dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green-brand);
          flex-shrink: 0;
        }

        /* ── Stats ── */
        .stats-section {
          background: var(--green-deep);
          padding: 5rem 2rem;
        }

        .stats-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2px;
          background: rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
        }

        .stat-card {
          background: rgba(26,58,42,0.8);
          padding: 2.5rem 2rem;
          text-align: center;
          opacity: 0;
          animation: fadeUp 0.6s ease both;
        }

        .stat-card:hover {
          background: rgba(45,90,61,0.8);
        }

        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          color: var(--green-brand);
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: rgba(255,255,255,0.55);
          font-size: 0.88rem;
          font-weight: 400;
          letter-spacing: 0.03em;
        }

        /* ── How it works ── */
        .hiw-section {
          padding: 8rem 2rem;
          background: var(--cream);
        }

        .section-label {
          display: inline-block;
          color: var(--green-brand);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 700;
          color: var(--green-deep);
          line-height: 1.15;
          margin-bottom: 1.25rem;
        }

        .section-sub {
          color: var(--text-soft);
          font-size: 1.05rem;
          line-height: 1.7;
          max-width: 520px;
        }

        .hiw-grid {
          max-width: 1100px;
          margin: 5rem auto 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .hiw-card {
          background: #fff;
          border-radius: 24px;
          padding: 2.5rem;
          border: 1px solid var(--cream-dark);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .hiw-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--green-brand), var(--green-light));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .hiw-card:hover::before { transform: scaleX(1); }
        .hiw-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(26,58,42,0.1);
        }

        .hiw-step {
          font-family: 'Playfair Display', serif;
          font-size: 4rem;
          font-weight: 900;
          color: var(--cream-dark);
          line-height: 1;
          margin-bottom: 1.5rem;
        }

        .hiw-icon {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .hiw-card h3 {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--green-deep);
          margin-bottom: 0.75rem;
        }

        .hiw-card p {
          color: var(--text-soft);
          font-size: 0.92rem;
          line-height: 1.7;
        }

        /* ── Mission strip ── */
        .mission-strip {
          background: var(--green-deep);
          padding: 6rem 2rem;
          overflow: hidden;
          position: relative;
        }

        .mission-strip::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(118,196,59,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .mission-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        @media (max-width: 768px) {
          .mission-inner { grid-template-columns: 1fr; gap: 3rem; }
        }

        .mission-quote {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 3.5vw, 2.5rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.3;
        }

        .mission-quote .highlight {
          color: var(--green-brand);
        }

        .mission-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .mstat {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .mstat-val {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: var(--green-brand);
          margin-bottom: 0.25rem;
        }

        .mstat-lbl {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.4;
        }

        /* ── For who ── */
        .forwhom-section {
          padding: 8rem 2rem;
          background: #fff;
        }

        .forwhom-grid {
          max-width: 1100px;
          margin: 4rem auto 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .forwhom-grid { grid-template-columns: 1fr; }
        }

        .forwhom-card {
          border-radius: 28px;
          padding: 3rem;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          text-decoration: none;
          display: block;
          transition: transform 0.3s ease;
        }

        .forwhom-card:hover { transform: scale(1.02); }

        .forwhom-card.donor-card {
          background: linear-gradient(135deg, var(--green-deep) 0%, var(--green-mid) 100%);
        }

        .forwhom-card.recipient-card {
          background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%);
        }

        .forwhom-card::after {
          content: '';
          position: absolute;
          bottom: -40px; right: -40px;
          width: 180px; height: 180px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
        }

        .forwhom-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.7);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.3rem 0.8rem;
          border-radius: 100px;
          margin-bottom: 2rem;
        }

        .forwhom-card h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.9rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1rem;
        }

        .forwhom-card p {
          color: rgba(255,255,255,0.6);
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .forwhom-list {
          list-style: none;
          padding: 0;
          margin: 0 0 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .forwhom-list li {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: rgba(255,255,255,0.75);
          font-size: 0.88rem;
        }

        .forwhom-list li::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green-brand);
          flex-shrink: 0;
        }

        .forwhom-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #fff;
          font-weight: 600;
          font-size: 0.9rem;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 0.7rem 1.4rem;
          border-radius: 100px;
          transition: background 0.2s;
        }

        .forwhom-cta:hover { background: rgba(255,255,255,0.2); }

        /* ── Testimonials ── */
        .testimonials-section {
          padding: 8rem 2rem;
          background: var(--cream);
        }

        .testimonials-grid {
          max-width: 1100px;
          margin: 4rem auto 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .tcard {
          background: #fff;
          border-radius: 24px;
          padding: 2.5rem;
          border: 1px solid var(--cream-dark);
          transition: all 0.3s ease;
        }

        .tcard:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(26,58,42,0.08);
        }

        .tcard-stars {
          display: flex;
          gap: 3px;
          margin-bottom: 1.25rem;
        }

        .tcard-quote {
          font-size: 0.95rem;
          line-height: 1.75;
          color: var(--text-mid);
          margin-bottom: 2rem;
          font-style: italic;
        }

        .tcard-author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .tcard-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }

        .tcard-name {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--green-deep);
        }

        .tcard-role {
          font-size: 0.78rem;
          color: var(--text-soft);
        }

        /* ── Final CTA ── */
        .final-cta {
          background: var(--green-deep);
          padding: 8rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .final-cta::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(118,196,59,0.1) 0%, transparent 65%);
          pointer-events: none;
        }

        .final-cta-inner {
          position: relative;
          z-index: 1;
          max-width: 700px;
          margin: 0 auto;
        }

        .final-cta h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.15;
          margin-bottom: 1.5rem;
        }

        .final-cta p {
          color: rgba(255,255,255,0.6);
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 3rem;
        }

        .final-cta-btns {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* ── Ticker strip ── */
        .ticker {
          background: var(--green-brand);
          padding: 0.85rem 0;
          overflow: hidden;
          white-space: nowrap;
        }

        .ticker-inner {
          display: inline-flex;
          gap: 3rem;
          animation: ticker 20s linear infinite;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--green-deep);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .ticker-inner span {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* ── Animations ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }

        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ── Scrolled-in animations ── */
        .fade-in-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .fade-in-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Utility ── */
        .center { text-align: center; }
        .max-w-inner { max-width: 1100px; margin: 0 auto; }
      `}</style>

      <div className="zh-page">

        {/* ── Ticker ── */}
        <div className="ticker">
          <div className="ticker-inner">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i}>
                <Leaf size={12} />
                Reduce Food Waste
                &nbsp;·&nbsp;
                <HeartHandshake size={12} />
                Feed Communities
                &nbsp;·&nbsp;
                <TrendingDown size={12} />
                Fight Hunger
                &nbsp;·&nbsp;
                <Zap size={12} />
                Zero Hunger
                &nbsp;·&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-grain" />

          <div className="hero-content">
            <div className="hero-tag">
              <Leaf size={12} />
              Fighting hunger, one meal at a time
            </div>

            <h1 className="hero-title">
              Food that feeds<br />
              the <span className="accent">world.</span>
            </h1>

            <p className="hero-sub">
              ZeroHunger connects restaurants, supermarkets and food owners with
              communities in need — turning surplus into sustenance.
            </p>

            <div className="hero-cta">
              <Link href="/auth/register" className="btn-primary">
                Start donating <ArrowRight size={16} />
              </Link>
              <Link href="/browse" className="btn-ghost">
                Browse food near me
              </Link>
            </div>

            <div className="hero-pill-row">
              <div className="hero-pill">
                <span className="dot" />
                Free to join
              </div>
              <div className="hero-pill">
                <span className="dot" />
                Real-time listings
              </div>
              <div className="hero-pill">
                <span className="dot" />
                Verified donors
              </div>
              <div className="hero-pill">
                <span className="dot" />
                Pickup reminders
              </div>
            </div>
          </div>

          <div className="hero-scroll">
            <span>Scroll</span>
            <ChevronDown size={16} />
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="stats-section" ref={statsRef}>
          <div className="stats-inner">
            <StatCard value={12400} suffix="+" label="Meals redistributed" delay={0} />
            <StatCard value={340}   suffix="+"  label="Active donors"         delay={100} />
            <StatCard value={58}    suffix="+"  label="NGO partners"          delay={200} />
            <StatCard value={2800}  suffix="kg" label="Food waste prevented"  delay={300} />
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="hiw-section">
          <div className="max-w-inner center">
            <span className="section-label">How it works</span>
            <h2 className="section-title">Three steps to zero waste</h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              A simple, fast workflow that gets food from surplus to table — all in one platform.
            </p>
          </div>

          <div className="hiw-grid">
            {[
              {
                step: "01",
                icon: <UtensilsCrossed size={22} color="#76c43b" />,
                bg: "rgba(118,196,59,0.1)",
                title: "List surplus food",
                desc: "Restaurants, supermarkets, farms and households list their surplus — food type, quantity, expiry, and pickup window. Takes under two minutes."
              },
              {
                step: "02",
                icon: <MapPin size={22} color="#FF9124" />,
                bg: "rgba(255,145,36,0.1)",
                title: "Recipients browse & reserve",
                desc: "Verified NGOs and community members browse live listings nearby, reserve what they need, and receive instant confirmation with pickup details."
              },
              {
                step: "03",
                icon: <HeartHandshake size={22} color="#3b82f6" />,
                bg: "rgba(59,130,246,0.1)",
                title: "Pickup & distribute",
                desc: "Recipients arrive during the pickup window, collect the food, and mark it complete. Both parties get impact stats added to their profile."
              },
            ].map((item, i) => (
              <div className="hiw-card" key={i}>
                <div className="hiw-step">{item.step}</div>
                <div className="hiw-icon" style={{ background: item.bg }}>
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Mission strip ── */}
        <section className="mission-strip">
          <div className="mission-inner">
            <div>
              <span className="section-label" style={{ color: "rgba(155,229,100,0.7)" }}>Our mission</span>
              <p className="mission-quote">
                One third of all food produced globally is lost or wasted.
                <span className="highlight"> We're building the infrastructure to fix that.</span>
              </p>
            </div>
            <div className="mission-stats">
              {[
                { val: "1.3B", lbl: "Tonnes of food wasted globally each year" },
                { val: "828M", lbl: "People go to bed hungry every night" },
                { val: "8–10%", lbl: "Of global emissions from food waste" },
                { val: "$1T", lbl: "Economic cost of food waste annually" },
              ].map((s, i) => (
                <div className="mstat" key={i}>
                  <div className="mstat-val">{s.val}</div>
                  <div className="mstat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── For whom ── */}
        <section className="forwhom-section">
          <div className="max-w-inner center">
            <span className="section-label">Who it's for</span>
            <h2 className="section-title">Two sides of one mission</h2>
          </div>

          <div className="forwhom-grid">
            <Link href="/auth/register?type=donor" className="forwhom-card donor-card">
              <div className="forwhom-tag">
                <UtensilsCrossed size={11} /> Food Donors
              </div>
              <h3>You have surplus.<br />Someone needs it.</h3>
              <p>
                Restaurants, supermarkets, caterers, farms, and households —
                list your surplus food in minutes and watch it reach people who need it.
              </p>
              <ul className="forwhom-list">
                <li>Instant listing — no paperwork</li>
                <li>Automated expiry tracking</li>
                <li>Real-time reservation alerts</li>
                <li>Impact dashboard and certificates</li>
              </ul>
              <span className="forwhom-cta">
                Start donating <ArrowRight size={14} />
              </span>
            </Link>

            <Link href="/auth/register?type=recipient" className="forwhom-card recipient-card">
              <div className="forwhom-tag">
                <HeartHandshake size={11} /> Recipients & NGOs
              </div>
              <h3>Fresh food.<br />Nearby. Right now.</h3>
              <p>
                NGOs, community kitchens, shelters, and individuals — browse available
                food near you, reserve it, and pick it up during the listed window.
              </p>
              <ul className="forwhom-list">
                <li>Live listings updated in real time</li>
                <li>Filter by distance, category, and expiry</li>
                <li>Pickup reminder notifications</li>
                <li>Reservation history and tracking</li>
              </ul>
              <span className="forwhom-cta" style={{ background: "rgba(118,196,59,0.15)", borderColor: "rgba(118,196,59,0.3)" }}>
                Find food near me <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="testimonials-section">
          <div className="max-w-inner center">
            <span className="section-label">Community voices</span>
            <h2 className="section-title">People making it happen</h2>
          </div>

          <div className="testimonials-grid">
            {[
              {
                quote: "ZeroHunger transformed how we handle end-of-day surplus. Instead of disposal costs, we now have grateful communities and a clean conscience.",
                name: "Sarah Johnson",
                role: "Manager, Fresh Harvest Market",
                img: "https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
              },
              {
                quote: "As a small NGO, finding consistent food sources was our biggest challenge. ZeroHunger solved that completely — we now serve 40% more families every week.",
                name: "Michael Thompson",
                role: "Director, Community Food Bank",
                img: "https://images.pexels.com/photos/4420634/pexels-photo-4420634.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
              },
              {
                quote: "The pickup reminders are a game changer. We've never missed a reservation since we started. The team behind this platform clearly understands our needs.",
                name: "Aisha Bello",
                role: "Coordinator, Urban Relief Kitchen",
                img: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
              },
            ].map((t, i) => (
              <div className="tcard" key={i}>
                <div className="tcard-stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={14} fill="#FF9124" color="#FF9124" />
                  ))}
                </div>
                <p className="tcard-quote">"{t.quote}"</p>
                <div className="tcard-author">
                  <img src={t.img} alt={t.name} className="tcard-avatar" />
                  <div>
                    <div className="tcard-name">{t.name}</div>
                    <div className="tcard-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="final-cta">
          <div className="final-cta-inner">
            <h2>
              The world wastes food.<br />
              <span style={{ color: "var(--green-brand)" }}>You don't have to.</span>
            </h2>
            <p>
              Join thousands of donors and recipients already using ZeroHunger
              to build a food system that works for everyone.
            </p>
            <div className="final-cta-btns">
              <Link href="/auth/register" className="btn-primary">
                Create free account <ArrowRight size={16} />
              </Link>
              <Link href="/browse" className="btn-ghost">
                Browse listings
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
