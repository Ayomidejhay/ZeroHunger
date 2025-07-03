"use client";

import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UseRealtimeDonorUpdatesProps {
  userId: string;
  onDataUpdate: () => void;
}

export const useRealtimeDonorUpdates = ({
  userId,
  onDataUpdate,
}: UseRealtimeDonorUpdatesProps) => {
  useEffect(() => {
    console.log("Setting up real-time subscription for donor updates...");

    const channel = supabase
      .channel("donor-updates")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "reservations",
        },
        async (payload) => {
          console.log("New reservation created:", payload);

          // Check if this reservation is for one of the donor's listings
          const { data: foodListing } = await supabase
            .from("food_listings")
            .select("title, donor_id")
            .eq("id", payload.new.food_listing_id)
            .eq("donor_id", userId)
            .single();

          if (foodListing) {
            toast("New Food Request! 🍽️", {
              description: `Someone has requested your "${foodListing.title}". Check your dashboard to confirm.`,
              duration: 6000,
            });
            onDataUpdate();
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "food_listings",
          filter: `donor_id=eq.${userId}`,
        },
        (payload) => {
          console.log("Food listing updated via real-time:", payload);

          const oldStatus = payload.old.status;
          const newStatus = payload.new.status;

          if (newStatus === "reserved" && oldStatus === "available") {
            toast("Food Reserved! 📦", {
              description: `Your "${payload.new.title}" has been reserved by someone.`,
              duration: 5000,
            });
          } else if (newStatus === "completed" && oldStatus === "reserved") {
            toast("Pickup Completed! ✅", {
              description: `"${payload.new.title}" has been successfully picked up. Thank you for reducing food waste!`,
              duration: 5000,
            });
          }

          onDataUpdate();
        }
      )
      .subscribe();

    return () => {
      console.log("Cleaning up donor real-time subscription...");
      supabase.removeChannel(channel);
    };
  }, [userId, onDataUpdate, toast]);
};
