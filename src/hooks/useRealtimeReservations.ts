"use client";

import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
//import { useToast } from '@/hooks/use-toast';
import { toast } from "sonner";

interface UseRealtimeReservationsProps {
  userId: string;
  onReservationUpdate: () => void;
}

export const useRealtimeReservations = ({
  userId,
  onReservationUpdate,
}: UseRealtimeReservationsProps) => {
  //const { toast } = useToast();

  useEffect(() => {
    console.log("Setting up real-time subscription for reservations...");

    const channel = supabase
      .channel("reservations-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "reservations",
          filter: `recipient_id=eq.${userId}`,
        },
        (payload) => {
          console.log("Reservation updated via real-time:", payload);

          // Refresh data when a reservation is updated
          onReservationUpdate();

          // Show enhanced toasts based on status changes
          const oldStatus = payload.old.status;
          const newStatus = payload.new.status;

          if (newStatus === "confirmed" && oldStatus === "pending") {
            toast("Reservation Confirmed! 🎉", {
              description:
                "Your food request has been approved. Check the pickup details below.",
              duration: 5000,
            });
          } else if (newStatus === "completed" && oldStatus === "confirmed") {
            toast("Pickup Completed! ✅", {
              description:
                "Your food pickup has been marked as completed by the donor. Thank you!",
              duration: 5000,
            });
          } else if (newStatus === "expired" && oldStatus !== "expired") {
            toast.error("Reservation Expired ⏰", {
              description:
                "A food reservation has expired. Please check for new available items.",
              duration: 7000,
            });
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "food_listings",
          filter: `status=eq.available`,
        },
        (payload) => {
          console.log("New food listing available:", payload);

          // Show toast for new food availability
          toast("New Food Available! 🍽️", {
            description: `${payload.new.title} is now available in ${payload.new.location}`,
            duration: 6000,
          });
        }
      )
      .subscribe();

    return () => {
      console.log("Cleaning up real-time subscription...");
      supabase.removeChannel(channel);
    };
  }, [userId, onReservationUpdate, toast]);
};
