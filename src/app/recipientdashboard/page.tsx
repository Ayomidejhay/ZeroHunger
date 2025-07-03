"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import Profilepage from "../profilepage/page"

export default function page() {
  const { user, profile } = useAuth();
  const router = useRouter();

  // Component state for managing dashboard data
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState<any[]>([]); // Array of user's reservations
  const [stats, setStats] = useState({
    pending: 0,
    confirmed: 0,
    completed: 0,
    expired: 0,
  }); // Reservation statistics

  // Initialize food expiration checking for real-time alerts
  useFoodExpiration();

  /**
   * Fetches all reservation data for the current recipient
   * Includes related food listing and donor information
   */
  const fetchRecipientData = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      console.log("Fetching recipient data for user:", user.id);

      // Fetch reservations with detailed food listing and donor info
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
        .eq("recipient_id", user.id) // Only get current user's reservations
        .order("created_at", { ascending: false }); // Newest first

      if (error) throw error;

      console.log("Fetched reservations:", reservationsData);
      setReservations(reservationsData || []);

      // Calculate statistics for dashboard widgets
      const pending =
        reservationsData?.filter((r) => r.status === "pending").length || 0;
      const confirmed =
        reservationsData?.filter((r) => r.status === "confirmed").length || 0;
      const completed =
        reservationsData?.filter((r) => r.status === "completed").length || 0;
      const expired =
        reservationsData?.filter((r) => r.status === "expired").length || 0;

      setStats({ pending, confirmed, completed, expired });

      console.log("Updated stats:", { pending, confirmed, completed, expired });
    } catch (error: any) {
      console.error("Error fetching recipient data:", error);
      toast.error("Error loading dashboard", {
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  // Set up real-time subscription for reservations
  // This ensures the dashboard updates automatically when reservations change
  useRealtimeReservations({
    userId: user?.id || "",
    onReservationUpdate: fetchRecipientData,
  });

  /**
   * Effect hook for authentication and authorization checks
   * Redirects users based on their authentication status and user type
   */
  useEffect(() => {
    // Redirect to signin if user is not authenticated
    if (!user) {
      router.push("/auth/login");
      return;
    }

    // Redirect to donor dashboard if user is not a recipient (NGO)
    if (profile && profile.user_type !== "recipient") {
      router.push("/donordashboard");
      return;
    }

    // Fetch initial data once user is verified
    fetchRecipientData();
  }, [user, profile, router, fetchRecipientData]);

  // Calculate upcoming pickups for quick actions section
  // Shows pickups that are confirmed and scheduled within the next 24 hours
  const upcomingPickups = reservations.filter((r) => {
    if (r.status !== "confirmed" || !r.food_listing?.pickup_time_start)
      return false;
    const pickupTime = new Date(r.food_listing.pickup_time_start);
    const now = new Date();
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return pickupTime >= now && pickupTime <= in24Hours;
  }).length;

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center">
          <p className="text-neutral600">Loading dashboard...</p>
        </main>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col">
      
      <NotificationBar />

      <main className="flex-grow py-10 bg-gray-50">
        <div className="saveplate-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard Header with greeting and browse button */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-neutral900">
                    Recipient Dashboard
                  </h1>
                  {/* Real-time connection status indicator */}
                  <ConnectionStatus />
                </div>
                <p className="text-neutral600">
                  Welcome back, {profile?.first_name}! Track your food requests
                  here.
                </p>
              </div>
              {/* Quick access to browse available food */}
              <Button
                onClick={() => router.push("/browse")}
                className="bg-defaultgreen hover:bg-darkgreen"
              >
                <Search className="h-4 w-4 mr-2" />
                Browse Food
              </Button>
            </div>

            {/* Enhanced Stats Section - shows reservation statistics with visual indicators */}
            <ReservationStats stats={stats} reservations={reservations} />

            {/* Quick Actions Section - provides shortcuts for common tasks */}
            <QuickActions stats={stats} upcomingPickups={upcomingPickups} />

            {/* Main Content Tabs - Dashboard and Profile management */}
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              {/* Dashboard Tab - main reservation management interface */}
              <TabsContent value="dashboard" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Food Requests</CardTitle>
                    <CardDescription>
                      Track the status of your food pickup requests with
                      real-time updates and enhanced filtering
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Show appropriate content based on whether user has reservations */}
                    {reservations.length === 0 ? (
                      <EmptyReservations />
                    ) : (
                      <ReservationTabs
                        reservations={reservations}
                        stats={stats}
                      />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profile Tab - user profile management */}
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
