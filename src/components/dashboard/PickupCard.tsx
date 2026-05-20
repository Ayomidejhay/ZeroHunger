


'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { 
  Clock, 
  MapPin, 
  Package, 
  FileText, 
  Navigation,
  CheckCircle,
  CheckCheck,
  Info
} from "lucide-react";

interface Reservation {
  id: string;
  status: string;
  created_at: string;
  pickup_time: string | null;
  notes: string | null;
  food_listing: {
    id: string;
    title: string;
    quantity: string;
    location: string;
    status: string;
    pickup_instructions: string | null;
    pickup_time_start: string | null;
    pickup_time_end: string | null;
    donor: {
      first_name: string;
      last_name: string;
    };
  };
}

interface PickupCardProps {
  reservation: Reservation;
  onUpdate?: () => void; // callback to refresh parent data
}

const PickupCard = ({ reservation, onUpdate }: PickupCardProps) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const formatPickupTime = (startTime: string | null, endTime: string | null) => {
    if (!startTime || !endTime) return "Time not specified";
    const start = new Date(startTime);
    const end = new Date(endTime);
    const now = new Date();
    const isToday = start.toDateString() === now.toDateString();
    const isTomorrow = start.toDateString() === new Date(now.getTime() + 86400000).toDateString();
    let dateText = start.toLocaleDateString();
    if (isToday) dateText = "Today";
    if (isTomorrow) dateText = "Tomorrow";
    return `${dateText} from ${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} to ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const getTimeUntilPickup = () => {
    if (!reservation.food_listing.pickup_time_start) return null;
    const pickupTime = new Date(reservation.food_listing.pickup_time_start);
    const now = new Date();
    const diffMs = pickupTime.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    if (diffMs < 0) return "Pickup time has passed";
    if (diffHours < 1) return `${Math.round(diffMs / (1000 * 60))} minutes`;
    if (diffHours < 24) return `${Math.round(diffHours)} hours`;
    return `${Math.round(diffHours / 24)} days`;
  };

  const handleNavigate = () => {
    setIsNavigating(true);
    const encodedLocation = encodeURIComponent(reservation.food_listing.location);
    window.open(`https://www.google.com/maps/search/${encodedLocation}`, '_blank');
    toast("Opening Navigation", { description: "Directions opening in a new tab." });
    setTimeout(() => setIsNavigating(false), 2000);
  };

  // Mark pickup as complete — updates both the reservation and the food listing
  const handleMarkComplete = async () => {
    setIsCompleting(true);
    try {
      const { error: resError } = await supabase
        .from('reservations')
        .update({ status: 'completed', updated_at: new Date().toISOString() })
        .eq('id', reservation.id);

      if (resError) throw resError;

      const { error: listingError } = await supabase
        .from('food_listings')
        .update({ status: 'completed', updated_at: new Date().toISOString() })
        .eq('id', reservation.food_listing.id);

      if (listingError) throw listingError;

      // Notify the donor that the pickup was completed
      const { data: reservationData } = await supabase
        .from('reservations')
        .select('donor_id:food_listings(donor_id)')
        .eq('id', reservation.id)
        .single();

      const donorId = (reservationData as any)?.donor_id?.donor_id;
      if (donorId) {
        await supabase.from('notifications').insert({
          user_id: donorId,
          title: 'Pickup Completed ✅',
          message: `A recipient has picked up "${reservation.food_listing.title}". Thank you for your donation!`,
          type: 'success',
          read: false,
        });
      }

      toast.success("Pickup Completed! ✅", {
        description: "The donation has been marked as completed. Thank you!",
        duration: 5000,
      });

      onUpdate?.();
    } catch (error: any) {
      console.error("Error completing pickup:", error);
      toast.error("Error", { description: "Failed to mark as complete. Please try again." });
    } finally {
      setIsCompleting(false);
    }
  };

  const timeUntilPickup = getTimeUntilPickup();
  const isUrgent = timeUntilPickup && (timeUntilPickup.includes('minutes') || timeUntilPickup.includes('hour'));

  return (
    <Card className="border-l-4 border-l-defaultgreen bg-gradient-to-r from-green-50 to-white">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-grow">
            <CardTitle className="text-lg flex items-center gap-2">
              {reservation.food_listing?.title}
              <Badge className="bg-defaultgreen text-white">Ready for Pickup</Badge>
            </CardTitle>
            <p className="text-sm text-neutral600 mt-1 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              From: {reservation.food_listing?.donor?.first_name} {reservation.food_listing?.donor?.last_name}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {timeUntilPickup && (
          <Alert className={isUrgent ? "border-orange-200 bg-orange-50" : "border-blue-200 bg-blue-50"}>
            <Clock className={`h-4 w-4 ${isUrgent ? "text-orange-600" : "text-blue-600"}`} />
            <AlertDescription className={isUrgent ? "text-orange-800" : "text-blue-800"}>
              <strong>Pickup in {timeUntilPickup}</strong>
              {isUrgent && " - Please plan your trip soon!"}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Package className="h-4 w-4 text-neutral500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Quantity</p>
                <p className="text-sm text-neutral600">{reservation.food_listing?.quantity}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-neutral500 mt-0.5" />
              <div className="flex-grow">
                <p className="text-sm font-medium">Pickup Location</p>
                <p className="text-sm text-neutral600 mb-2">{reservation.food_listing?.location}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNavigate}
                  disabled={isNavigating}
                  className="text-xs"
                >
                  <Navigation className="h-3 w-3 mr-1" />
                  {isNavigating ? "Opening..." : "Get Directions"}
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-neutral500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Pickup Window</p>
                <p className="text-sm text-neutral600">
                  {formatPickupTime(reservation.food_listing?.pickup_time_start, reservation.food_listing?.pickup_time_end)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 text-neutral500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Confirmed</p>
                <p className="text-sm text-neutral600">
                  {new Date(reservation.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {reservation.food_listing?.pickup_instructions && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <p className="font-medium mb-1">Pickup Instructions</p>
              <p className="text-sm">{reservation.food_listing.pickup_instructions}</p>
            </AlertDescription>
          </Alert>
        )}

        {reservation.notes && (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm font-medium mb-1 text-blue-800">Notes</p>
            <p className="text-sm text-blue-700">{reservation.notes}</p>
          </div>
        )}

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-2 border-t">
          <p className="text-xs text-neutral500">
            Reservation ID: {reservation.id.slice(0, 8)}...
          </p>
          <div className="flex items-center gap-2">
            {reservation.status === 'completed' ? (
              // Read-only completed badge — no action buttons
              <Badge className="bg-blue-100 text-blue-700 text-xs border-blue-200">
                <CheckCheck className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            ) : (
              <>
                <Badge variant="outline" className="text-xs">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Confirmed
                </Badge>
                {/* Mark as Complete — only shown for confirmed reservations */}
                {onUpdate && (
                  <Button
                    size="sm"
                    onClick={handleMarkComplete}
                    disabled={isCompleting}
                    className="bg-defaultgreen hover:bg-green-700 text-white text-xs"
                  >
                    <CheckCheck className="h-3 w-3 mr-1" />
                    {isCompleting ? "Completing..." : "Mark as Complete"}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PickupCard;