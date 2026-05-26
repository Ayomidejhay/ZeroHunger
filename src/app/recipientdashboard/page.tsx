


// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { RecipientDashboardSkeleton } from '@/components/ui/page-skeleton';
// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/integrations/supabase/client";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { toast } from "sonner";
// import { Search } from "lucide-react";
// import NotificationBar from "@/components/NotificationBar";
// import RecipientStats from "@/components/dashboard/RecipientStats";
// import ReservationTabs from "@/components/dashboard/ReservationTabs";
// import ReservationStats from "@/components/dashboard/ReservationStats";
// import QuickActions from "@/components/dashboard/QuickActions";
// import EmptyReservations from "@/components/dashboard/EmptyReservations";
// import { useFoodExpiration } from "@/hooks/useFoodExpiration";
// import { useRealtimeReservations } from "@/hooks/useRealtimeReservations";
// import ConnectionStatus from "@/components/dashboard/ConnectionStatus";
// import Profilepage from "../profilepage/page";

// export default function RecipientDashboard() {
//   // authLoading = AuthContext session/profile fetch; dataLoading = our own data fetch
//   const { user, profile, isLoading: authLoading } = useAuth();
//   const router = useRouter();

//   const [dataLoading, setDataLoading] = useState(false);
//   const [reservations, setReservations] = useState<any[]>([]);
//   const [stats, setStats] = useState({
//     pending: 0,
//     confirmed: 0,
//     completed: 0,
//     expired: 0,
//   });

//   useFoodExpiration();

//   const fetchRecipientData = useCallback(async () => {
//     if (!user) return;
//     setDataLoading(true);
//     try {
//       const { data: reservationsData, error } = await supabase
//         .from("reservations")
//         .select(
//           `
//           *,
//           food_listing:food_listings(
//             id,
//             title,
//             quantity,
//             location,
//             category,
//             status,
//             pickup_instructions,
//             pickup_time_start,
//             pickup_time_end,
//             donor:profiles(first_name, last_name)
//           )
//         `
//         )
//         .eq("recipient_id", user.id)
//         .order("created_at", { ascending: false });

//       if (error) throw error;

//       setReservations(reservationsData || []);

//       const pending   = reservationsData?.filter((r) => r.status === "pending").length   || 0;
//       const confirmed = reservationsData?.filter((r) => r.status === "confirmed").length || 0;
//       const completed = reservationsData?.filter((r) => r.status === "completed").length || 0;
//       const expired   = reservationsData?.filter((r) => r.status === "expired").length   || 0;

//       setStats({ pending, confirmed, completed, expired });
//     } catch (error: any) {
//       console.error("Error fetching recipient data:", error);
//       toast.error("Error loading dashboard", {
//         description: error.message || "Something went wrong. Please try again.",
//       });
//     } finally {
//       setDataLoading(false);
//     }
//   }, [user]);

//   useRealtimeReservations({
//     userId: user?.id || "",
//     onReservationUpdate: fetchRecipientData,
//   });

//   // ── Guard effect ────────────────────────────────────────────────────────────
//   // Deps are primitive values only so this runs exactly once when auth settles.
//   useEffect(() => {
//     if (authLoading) return;
//     if (!user) { router.replace('/auth/login'); return; }
//     if (profile?.user_type && profile.user_type !== 'recipient') {
//       router.replace('/donordashboard');
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [authLoading, user?.id, profile?.user_type]);

//   // ── Data fetch effect ────────────────────────────────────────────────────
//   // Only runs once auth is confirmed and role is correct.
//   useEffect(() => {
//     if (authLoading || !user || profile?.user_type !== 'recipient') return;
//     fetchRecipientData();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [authLoading, user?.id, profile?.user_type]);

//   const upcomingPickups = reservations.filter((r) => {
//     if (r.status !== "confirmed" || !r.food_listing?.pickup_time_start) return false;
//     const pickupTime = new Date(r.food_listing.pickup_time_start);
//     const now = new Date();
//     const in24Hours = new Date(now.getTime() + 86400000);
//     return pickupTime >= now && pickupTime <= in24Hours;
//   }).length;

//   if (authLoading) return <RecipientDashboardSkeleton />;
//   if (!user || profile?.user_type !== 'recipient') return null;

//   return (
//     <div className="min-h-screen flex flex-col">
//       <NotificationBar />

//       <main className="flex-grow py-10 bg-gray-50">
//         <div className="saveplate-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="flex justify-between items-center mb-8">
//               <div>
//                 <div className="flex items-center gap-3 mb-2">
//                   <h1 className="text-3xl font-bold text-neutral900">
//                     Recipient Dashboard
//                   </h1>
//                   <ConnectionStatus />
//                 </div>
//                 <p className="text-neutral600">
//                   Welcome back, {profile?.first_name}! Track your food requests here.
//                 </p>
//               </div>
//               <Button
//                 onClick={() => router.push("/browse")}
//                 className="bg-defaultgreen hover:bg-darkgreen"
//               >
//                 <Search className="h-4 w-4 mr-2" />
//                 Browse Food
//               </Button>
//             </div>

//             <ReservationStats stats={stats} reservations={reservations} />
//             <QuickActions stats={stats} upcomingPickups={upcomingPickups} />

//             <Tabs defaultValue="dashboard" className="w-full">
//               <TabsList className="grid w-full grid-cols-2">
//                 <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
//                 <TabsTrigger value="profile">Profile</TabsTrigger>
//               </TabsList>

//               <TabsContent value="dashboard" className="mt-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Your Food Requests</CardTitle>
//                     <CardDescription>
//                       Track the status of your food pickup requests with real-time updates
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     {reservations.length === 0 ? (
//                       <EmptyReservations />
//                     ) : (
//                       // Pass fetchRecipientData as onUpdate so PickupCard can
//                       // refresh this dashboard after marking a pickup as complete
//                       <ReservationTabs
//                         reservations={reservations}
//                         stats={stats}
//                         onUpdate={fetchRecipientData}
//                       />
//                     )}
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="profile" className="mt-6">
//                 <Profilepage />
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { RecipientDashboardSkeleton } from "@/components/ui/page-skeleton";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Search, TrendingUp, Clock, CheckCircle, AlertCircle,
  Leaf, ArrowRight, Package, Bell, User, LayoutDashboard,
  Calendar, Flame, RefreshCw
} from "lucide-react";
import ReservationTabs from "@/components/dashboard/ReservationTabs";
import QuickActions from "@/components/dashboard/QuickActions";
import StatsSection from "@/components/profile/StatsSection";
import { useFoodExpiration } from "@/hooks/useFoodExpiration";
import { useRealtimeReservations } from "@/hooks/useRealtimeReservations";
import Profilepage from "../profilepage/page";

export default function RecipientDashboard() {
  const { user, profile, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [dataLoading, setDataLoading] = useState(false);
  const [reservations, setReservations] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"dashboard" | "profile">("dashboard");
  const [stats, setStats] = useState({
    pending: 0, confirmed: 0, completed: 0, expired: 0,
  });

  useFoodExpiration();

  const fetchRecipientData = useCallback(async () => {
    if (!user) return;
    setDataLoading(true);
    try {
      const { data, error } = await supabase
        .from("reservations")
        .select(`
          *,
          food_listing:food_listings(
            id, title, quantity, location, category, status,
            pickup_instructions, pickup_time_start, pickup_time_end,
            donor:profiles(first_name, last_name)
          )
        `)
        .eq("recipient_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const rows = data || [];
      setReservations(rows);
      setStats({
        pending:   rows.filter(r => r.status === "pending").length,
        confirmed: rows.filter(r => r.status === "confirmed").length,
        completed: rows.filter(r => r.status === "completed").length,
        expired:   rows.filter(r => r.status === "expired").length,
      });
    } catch (err: any) {
      toast.error("Error loading dashboard", { description: err.message });
    } finally {
      setDataLoading(false);
    }
  }, [user]);

  useRealtimeReservations({ userId: user?.id || "", onReservationUpdate: fetchRecipientData });

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.replace("/auth/login"); return; }
    if (profile?.user_type && profile.user_type !== "recipient") router.replace("/donordashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user?.id, profile?.user_type]);

  useEffect(() => {
    if (authLoading || !user || profile?.user_type !== "recipient") return;
    fetchRecipientData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user?.id, profile?.user_type]);

  const upcomingPickups = reservations.filter(r => {
    if (r.status !== "confirmed" || !r.food_listing?.pickup_time_start) return false;
    const t = new Date(r.food_listing.pickup_time_start);
    const now = new Date();
    return t >= now && t <= new Date(now.getTime() + 86400000);
  }).length;

  const totalReservations = stats.pending + stats.confirmed + stats.completed + stats.expired;
  const successRate = totalReservations > 0 ? Math.round((stats.completed / totalReservations) * 100) : 0;
  const thisWeek = reservations.filter(r => {
    const d = new Date(r.created_at);
    return d >= new Date(Date.now() - 7 * 86400000);
  }).length;

  const firstName = profile?.first_name || "there";

  if (authLoading) return <RecipientDashboardSkeleton />;
  if (!user || profile?.user_type !== "recipient") return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .rd-page {
          min-height: 100vh;
          background: #f7f3ed;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Header band ── */
        .rd-header {
          background: #1a3a2a;
          padding: 2.5rem 2rem 5rem;
          position: relative; overflow: hidden;
        }
        .rd-header-glow {
          position: absolute; top: -150px; right: -150px;
          width: 450px; height: 450px; border-radius: 50%;
          background: radial-gradient(circle, rgba(118,196,59,.1) 0%, transparent 65%);
          pointer-events: none;
        }
        .rd-header-inner {
          position: relative; z-index: 1;
          max-width: 1200px; margin: 0 auto;
          display: flex; justify-content: space-between;
          align-items: flex-start; gap: 1.5rem; flex-wrap: wrap;
        }
        .rd-welcome-tag {
          display: inline-flex; align-items: center; gap: .4rem;
          background: rgba(118,196,59,.12);
          border: 1px solid rgba(118,196,59,.25);
          color: #9be564; padding: .3rem .85rem;
          border-radius: 100px; font-size: .7rem; font-weight: 700;
          letter-spacing: .1em; text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .rd-welcome-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 900; color: #fff; line-height: 1.1;
          margin-bottom: .5rem;
        }
        .rd-welcome-title em { color: #76c43b; font-style: italic; }
        .rd-welcome-sub {
          color: rgba(255,255,255,.5); font-size: .88rem;
        }
        .rd-header-btns {
          display: flex; gap: .75rem; align-items: center; flex-wrap: wrap;
        }
        .rd-btn-primary {
          display: inline-flex; align-items: center; gap: .5rem;
          background: #76c43b; color: #1a3a2a;
          font-weight: 700; font-size: .85rem;
          padding: .7rem 1.4rem; border-radius: 100px;
          text-decoration: none; transition: all .22s;
          box-shadow: 0 3px 14px rgba(118,196,59,.3);
          border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }
        .rd-btn-primary:hover { background: #9be564; transform: translateY(-1px); }
        .rd-btn-ghost {
          display: inline-flex; align-items: center; gap: .5rem;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.15);
          color: rgba(255,255,255,.8);
          font-weight: 500; font-size: .85rem;
          padding: .7rem 1.4rem; border-radius: 100px;
          cursor: pointer; transition: all .22s;
          font-family: 'DM Sans', sans-serif;
        }
        .rd-btn-ghost:hover { background: rgba(255,255,255,.14); }

        /* ── Stat cards floating over header ── */
        .rd-stats-wrap {
          max-width: 1200px; margin: -3rem auto 0;
          padding: 0 2rem; position: relative; z-index: 2;
        }
        .rd-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        @media(max-width:900px){ .rd-stats-grid{ grid-template-columns:repeat(2,1fr); } }
        @media(max-width:520px){ .rd-stats-grid{ grid-template-columns:1fr 1fr; } }

        .rd-stat-card {
          background: #fff;
          border-radius: 18px;
          padding: 1.5rem;
          border: 1px solid #e8ecef;
          box-shadow: 0 4px 24px rgba(26,58,42,.07);
          transition: all .3s;
        }
        .rd-stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(26,58,42,.1);
        }
        .rd-stat-top {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: .75rem;
        }
        .rd-stat-icon {
          width: 40px; height: 40px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .rd-stat-val {
          font-family: 'Playfair Display', serif;
          font-size: 2rem; font-weight: 900;
          color: #1a3a2a; line-height: 1;
          margin-bottom: .3rem;
        }
        .rd-stat-label {
          font-size: .78rem; color: #667085; font-weight: 400;
        }
        .rd-stat-badge {
          font-size: .68rem; font-weight: 700;
          padding: .2rem .55rem; border-radius: 100px;
          white-space: nowrap;
        }

        /* ── Progress bar ── */
        .rd-progress-wrap { margin-top: .75rem; }
        .rd-progress-bar {
          height: 4px; background: #e8ecef; border-radius: 100px;
          overflow: hidden;
        }
        .rd-progress-fill {
          height: 100%; border-radius: 100px;
          transition: width 1s ease;
        }

        /* ── Body ── */
        .rd-body {
          max-width: 1200px; margin: 0 auto;
          padding: 2rem 2rem 4rem;
        }

        /* ── Tabs nav ── */
        .rd-tab-nav {
          display: flex; gap: .25rem;
          background: #fff; border: 1px solid #e8ecef;
          border-radius: 14px; padding: .35rem;
          margin-bottom: 2rem;
          width: fit-content;
        }
        .rd-tab-btn {
          display: flex; align-items: center; gap: .5rem;
          padding: .55rem 1.25rem; border-radius: 10px;
          font-size: .85rem; font-weight: 600;
          border: none; cursor: pointer;
          transition: all .2s; color: #667085;
          background: none; font-family: 'DM Sans', sans-serif;
        }
        .rd-tab-btn.active {
          background: #1a3a2a; color: #fff;
          box-shadow: 0 2px 8px rgba(26,58,42,.2);
        }
        .rd-tab-btn:not(.active):hover { color: #1a3a2a; background: #f7f3ed; }

        /* ── Section headings ── */
        .rd-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; font-weight: 800;
          color: #1a3a2a; margin-bottom: .4rem;
        }
        .rd-section-sub {
          font-size: .85rem; color: #667085; margin-bottom: 1.75rem;
        }

        /* ── Reservations card ── */
        .rd-reservations-card {
          background: #fff; border-radius: 20px;
          border: 1px solid #e8ecef;
          padding: 2rem;
          box-shadow: 0 2px 16px rgba(26,58,42,.04);
        }

        /* ── Empty state ── */
        .rd-empty {
          text-align: center; padding: 5rem 2rem;
        }
        .rd-empty-icon {
          width: 80px; height: 80px; border-radius: 50%;
          background: #f7f3ed;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.5rem;
        }
        .rd-empty h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; font-weight: 700;
          color: #1a3a2a; margin-bottom: .6rem;
        }
        .rd-empty p { color: #667085; font-size: .88rem; line-height: 1.7; max-width: 340px; margin: 0 auto 2rem; }

        /* ── Loading spinner ── */
        .rd-refreshing {
          display: flex; align-items: center; gap: .4rem;
          font-size: .78rem; color: #98a2b3;
          animation: rd-spin .8s linear infinite;
        }
        @keyframes rd-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="rd-page">

        {/* ── Header ── */}
        <div className="rd-header">
          <div className="rd-header-glow" />
          <div className="rd-header-inner">
            <div>
              <div className="rd-welcome-tag">
                <Leaf size={11} />
                Recipient Dashboard
              </div>
              <h1 className="rd-welcome-title">
                Welcome back,<br /><em>{firstName}.</em>
              </h1>
              <p className="rd-welcome-sub">
                {stats.confirmed > 0
                  ? `You have ${stats.confirmed} confirmed pickup${stats.confirmed > 1 ? 's' : ''} waiting.`
                  : "Track your food requests and pickups here."
                }
              </p>
            </div>
            <div className="rd-header-btns">
              <button className="rd-btn-primary" onClick={() => router.push("/browse")}>
                <Search size={14} /> Browse food
              </button>
              <button
                className="rd-btn-ghost"
                onClick={() => fetchRecipientData()}
                disabled={dataLoading}
              >
                <RefreshCw size={14} style={{ animation: dataLoading ? 'rd-spin .8s linear infinite' : 'none' }} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* ── Stats floating cards ── */}
        <div className="rd-stats-wrap">
          <div className="rd-stats-grid">

            <div className="rd-stat-card">
              <div className="rd-stat-top">
                <div>
                  <div className="rd-stat-val">{stats.pending}</div>
                  <div className="rd-stat-label">Pending requests</div>
                </div>
                <div className="rd-stat-icon" style={{ background: "rgba(255,145,36,.1)" }}>
                  <Clock size={18} color="#FF9124" />
                </div>
              </div>
              {stats.pending > 0 && (
                <span className="rd-stat-badge" style={{ background: "#fff7ed", color: "#f97316" }}>
                  Awaiting donor
                </span>
              )}
            </div>

            <div className="rd-stat-card">
              <div className="rd-stat-top">
                <div>
                  <div className="rd-stat-val">{stats.confirmed}</div>
                  <div className="rd-stat-label">Confirmed pickups</div>
                </div>
                <div className="rd-stat-icon" style={{ background: "rgba(118,196,59,.1)" }}>
                  <CheckCircle size={18} color="#76c43b" />
                </div>
              </div>
              {upcomingPickups > 0 && (
                <span className="rd-stat-badge" style={{ background: "#f0fdf4", color: "#16a34a" }}>
                  {upcomingPickups} today
                </span>
              )}
            </div>

            <div className="rd-stat-card">
              <div className="rd-stat-top">
                <div>
                  <div className="rd-stat-val">{successRate}%</div>
                  <div className="rd-stat-label">Success rate</div>
                </div>
                <div className="rd-stat-icon" style={{ background: "rgba(59,130,246,.1)" }}>
                  <TrendingUp size={18} color="#3b82f6" />
                </div>
              </div>
              {totalReservations > 0 && (
                <div className="rd-progress-wrap">
                  <div className="rd-progress-bar">
                    <div
                      className="rd-progress-fill"
                      style={{ width: `${successRate}%`, background: "#76c43b" }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="rd-stat-card">
              <div className="rd-stat-top">
                <div>
                  <div className="rd-stat-val">{thisWeek}</div>
                  <div className="rd-stat-label">This week</div>
                </div>
                <div className="rd-stat-icon" style={{ background: "rgba(168,85,247,.1)" }}>
                  <Calendar size={18} color="#a855f7" />
                </div>
              </div>
              <span className="rd-stat-badge" style={{ background: "#fdf4ff", color: "#a855f7" }}>
                {stats.completed} total done
              </span>
            </div>

          </div>
        </div>

        {/* ── Body ── */}
        <div className="rd-body" style={{ marginTop: "2rem" }}>

          {/* Quick actions */}
          <QuickActions stats={stats} upcomingPickups={upcomingPickups} />

          {/* Tab nav */}
          <div className="rd-tab-nav">
            <button
              className={`rd-tab-btn ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              <LayoutDashboard size={15} /> Dashboard
            </button>
            <button
              className={`rd-tab-btn ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <User size={15} /> Profile
            </button>
          </div>

          {/* ── Dashboard tab ── */}
          {activeTab === "dashboard" && (
            <div>
              {/* Upcoming pickups alert */}
              {upcomingPickups > 0 && (
                <div style={{
                  background: "rgba(118,196,59,.08)",
                  border: "1px solid rgba(118,196,59,.2)",
                  borderRadius: 16, padding: "1rem 1.5rem",
                  marginBottom: "1.75rem",
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between", flexWrap: "wrap", gap: "1rem"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: "#76c43b",
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      <Flame size={16} color="#1a3a2a" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#1a3a2a", fontSize: ".9rem" }}>
                        {upcomingPickups} pickup{upcomingPickups > 1 ? "s" : ""} due in the next 24 hours
                      </div>
                      <div style={{ color: "#667085", fontSize: ".78rem" }}>
                        Check your confirmed tab for pickup details
                      </div>
                    </div>
                  </div>
                  <button
                    className="rd-btn-primary"
                    style={{ padding: ".55rem 1.1rem", fontSize: ".8rem" }}
                    onClick={() => setActiveTab("dashboard")}
                  >
                    View pickups <ArrowRight size={13} />
                  </button>
                </div>
              )}

              {/* Reservations */}
              <div className="rd-section-title">Your Food Requests</div>
              <p className="rd-section-sub">
                Real-time updates on all your reservations — from request to pickup.
              </p>

              <div className="rd-reservations-card">
                {reservations.length === 0 ? (
                  <div className="rd-empty">
                    <div className="rd-empty-icon">
                      <Package size={32} color="#98a2b3" />
                    </div>
                    <h3>No requests yet</h3>
                    <p>
                      Browse available food near you and make your first reservation.
                      Donors will confirm your request within 24 hours.
                    </p>
                    <button className="rd-btn-primary" onClick={() => router.push("/browse")}>
                      <Search size={14} /> Browse food near me
                    </button>
                  </div>
                ) : (
                  <ReservationTabs
                    reservations={reservations}
                    stats={stats}
                    onUpdate={fetchRecipientData}
                  />
                )}
              </div>
            </div>
          )}

          {/* ── Profile tab ── */}
          {activeTab === "profile" && (
            <div>
              <div className="rd-section-title">Your Profile</div>
              <p className="rd-section-sub">
                Manage your personal information and view your impact.
              </p>
              <StatsSection />
              <div style={{ marginTop: "1.5rem" }}>
                <Profilepage />
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
