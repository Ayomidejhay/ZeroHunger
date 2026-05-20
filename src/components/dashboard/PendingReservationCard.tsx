


"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ReservationHeader from "./reservation/ReservationHeader";
import ReservationActions from "./reservation/ReservationActions";
import ReservationDetails from "./reservation/ReservationDetails";
import ReservationNotes from "./reservation/ReservationNotes";
import ReservationTimeAlert from "./reservation/ReservationTimeAlert";

interface Reservation {
  id: string;
  status: string;
  created_at: string;
  notes: string | null;
  food_listing: {
    id: string;
    title: string;
    quantity: string;
    location: string;
    pickup_instructions: string | null;
    pickup_time_start: string | null;
    pickup_time_end: string | null;
  };
  recipient?: {
    first_name: string;
    last_name: string;
  };
}

interface PendingReservationCardProps {
  reservation: Reservation;
  onUpdate: () => void;
}

const PendingReservationCard = ({
  reservation,
  onUpdate,
}: PendingReservationCardProps) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);

  const formatRequestTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 1) return `${Math.round(diffMs / (1000 * 60))} minutes ago`;
    if (diffHours < 24) return `${Math.round(diffHours)} hours ago`;
    return `${Math.round(diffHours / 24)} days ago`;
  };

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      // Fetch recipient_id first so we have a guaranteed string before
      // inserting the notification — avoids the string | undefined type error.
      const { data: reservationData, error: fetchError } = await supabase
        .from("reservations")
        .select("recipient_id")
        .eq("id", reservation.id)
        .single();

      if (fetchError) throw fetchError;

      const { error } = await supabase
        .from("reservations")
        .update({
          status: "confirmed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", reservation.id);

      if (error) throw error;

      // Only insert notification if we have a valid recipient_id
      if (reservationData?.recipient_id) {
        await supabase.from("notifications").insert({
          user_id: reservationData.recipient_id,
          title: "Reservation Confirmed ✅",
          message: `Your request for "${reservation.food_listing.title}" has been confirmed! Head to ${reservation.food_listing.location} during the pickup window.`,
          type: "success",
          read: false,
        });
      }

      toast.success("Reservation Confirmed! ✅", {
        description: "The recipient has been notified and can proceed with pickup.",
      });

      onUpdate();
    } catch (error: any) {
      console.error("Error confirming reservation:", error);
      toast.error("Error", {
        description: "Failed to confirm reservation. Please try again.",
      });
    } finally {
      setIsConfirming(false);
    }
  };

  const handleDecline = async () => {
    setIsDeclining(true);
    try {
      // Get recipient_id before updating so we can notify them
      const { data: reservationData } = await supabase
        .from("reservations")
        .select("recipient_id")
        .eq("id", reservation.id)
        .single();

      const { error: reservationError } = await supabase
        .from("reservations")
        .update({
          status: "expired",
          updated_at: new Date().toISOString(),
        })
        .eq("id", reservation.id);

      if (reservationError) throw reservationError;

      const { error: listingError } = await supabase
        .from("food_listings")
        .update({
          status: "available",
          updated_at: new Date().toISOString(),
        })
        .eq("id", reservation.food_listing.id);

      if (listingError) throw listingError;

      // Notify the recipient that their reservation was declined
      if (reservationData?.recipient_id) {
        await supabase.from("notifications").insert({
          user_id: reservationData.recipient_id,
          title: "Reservation Declined",
          message: `Unfortunately, your request for "${reservation.food_listing.title}" was declined by the donor. The item is now available for others to request.`,
          type: "error",
          read: false,
        });
      }

      toast("Reservation Declined", {
        description: "The food item is now available for other recipients.",
      });

      onUpdate();
    } catch (error: any) {
      console.error("Error declining reservation:", error);
      toast.error("Error", {
        description: "Failed to decline reservation. Please try again.",
      });
    } finally {
      setIsDeclining(false);
    }
  };

  const timeAgo = formatRequestTime(reservation.created_at);
  const isUrgent = timeAgo.includes("hours") && parseInt(timeAgo) > 2;
  const recipientName = `${reservation.recipient?.first_name} ${reservation.recipient?.last_name}`;

  return (
    <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-white">
      <CardHeader className="pb-3">
        <ReservationHeader
          title={reservation.food_listing?.title}
          recipientName={recipientName}
        />
      </CardHeader>

      <CardContent className="space-y-4">
        <ReservationTimeAlert timeAgo={timeAgo} isUrgent={isUrgent} />

        <ReservationDetails
          quantity={reservation.food_listing?.quantity}
          location={reservation.food_listing?.location}
          reservationId={reservation.id}
        />

        {reservation.notes && <ReservationNotes notes={reservation.notes} />}

        <ReservationActions
          onConfirm={handleConfirm}
          onDecline={handleDecline}
          isConfirming={isConfirming}
          isDeclining={isDeclining}
        />
      </CardContent>
    </Card>
  );
};

export default PendingReservationCard;
