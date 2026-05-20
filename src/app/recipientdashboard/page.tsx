


"use client";

import React, { useState, useEffect, useCallback } from "react";
import { RecipientDashboardSkeleton } from '@/components/ui/page-skeleton';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Search } from "lucide-react";
import NotificationBar from "@/components/NotificationBar";
import RecipientStats from "@/components/dashboard/RecipientStats";
import ReservationTabs from "@/components/dashboard/ReservationTabs";
import ReservationStats from "@/components/dashboard/ReservationStats";
import QuickActions from "@/components/dashboard/QuickActions";
import EmptyReservations from "@/components/dashboard/EmptyReservations";
import { useFoodExpiration } from "@/hooks/useFoodExpiration";
import { useRealtimeReservations } from "@/hooks/useRealtimeReservations";
import ConnectionStatus from "@/components/dashboard/ConnectionStatus";
import Profilepage from "../profilepage/page";

export default function RecipientDashboard() {
  // authLoading = AuthContext session/profile fetch; dataLoading = our own data fetch
  const { user, profile, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [dataLoading, setDataLoading] = useState(false);
  const [reservations, setReservations] = useState<any[]>([]);
  const [stats, setStats] = useState({
    pending: 0,
    confirmed: 0,
    completed: 0,
    expired: 0,
  });

  useFoodExpiration();

  const fetchRecipientData = useCallback(async () => {
    if (!user) return;
    setDataLoading(true);
    try {
      const { data: reservationsData, error } = await supabase
        .from("reservations")
        .select(
          `
          *,
          food_listing:food_listings(
            id,
            title,
            quantity,
            location,
            category,
            status,
            pickup_instructions,
            pickup_time_start,
            pickup_time_end,
            donor:profiles(first_name, last_name)
          )
        `
        )
        .eq("recipient_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setReservations(reservationsData || []);

      const pending   = reservationsData?.filter((r) => r.status === "pending").length   || 0;
      const confirmed = reservationsData?.filter((r) => r.status === "confirmed").length || 0;
      const completed = reservationsData?.filter((r) => r.status === "completed").length || 0;
      const expired   = reservationsData?.filter((r) => r.status === "expired").length   || 0;

      setStats({ pending, confirmed, completed, expired });
    } catch (error: any) {
      console.error("Error fetching recipient data:", error);
      toast.error("Error loading dashboard", {
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setDataLoading(false);
    }
  }, [user]);

  useRealtimeReservations({
    userId: user?.id || "",
    onReservationUpdate: fetchRecipientData,
  });

  // ── Guard effect ────────────────────────────────────────────────────────────
  // Deps are primitive values only so this runs exactly once when auth settles.
  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.replace('/auth/login'); return; }
    if (profile?.user_type && profile.user_type !== 'recipient') {
      router.replace('/donordashboard');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user?.id, profile?.user_type]);

  // ── Data fetch effect ────────────────────────────────────────────────────
  // Only runs once auth is confirmed and role is correct.
  useEffect(() => {
    if (authLoading || !user || profile?.user_type !== 'recipient') return;
    fetchRecipientData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user?.id, profile?.user_type]);

  const upcomingPickups = reservations.filter((r) => {
    if (r.status !== "confirmed" || !r.food_listing?.pickup_time_start) return false;
    const pickupTime = new Date(r.food_listing.pickup_time_start);
    const now = new Date();
    const in24Hours = new Date(now.getTime() + 86400000);
    return pickupTime >= now && pickupTime <= in24Hours;
  }).length;

  if (authLoading) return <RecipientDashboardSkeleton />;
  if (!user || profile?.user_type !== 'recipient') return null;

  return (
    <div className="min-h-screen flex flex-col">
      <NotificationBar />

      <main className="flex-grow py-10 bg-gray-50">
        <div className="saveplate-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-neutral900">
                    Recipient Dashboard
                  </h1>
                  <ConnectionStatus />
                </div>
                <p className="text-neutral600">
                  Welcome back, {profile?.first_name}! Track your food requests here.
                </p>
              </div>
              <Button
                onClick={() => router.push("/browse")}
                className="bg-defaultgreen hover:bg-darkgreen"
              >
                <Search className="h-4 w-4 mr-2" />
                Browse Food
              </Button>
            </div>

            <ReservationStats stats={stats} reservations={reservations} />
            <QuickActions stats={stats} upcomingPickups={upcomingPickups} />

            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Food Requests</CardTitle>
                    <CardDescription>
                      Track the status of your food pickup requests with real-time updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {reservations.length === 0 ? (
                      <EmptyReservations />
                    ) : (
                      // Pass fetchRecipientData as onUpdate so PickupCard can
                      // refresh this dashboard after marking a pickup as complete
                      <ReservationTabs
                        reservations={reservations}
                        stats={stats}
                        onUpdate={fetchRecipientData}
                      />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="mt-6">
                <Profilepage />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}