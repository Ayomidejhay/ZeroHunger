"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Clock, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface FoodCardProps {
  id: string;
  title: string;
  image: string;
  quantity: string;
  location: string;
  distance: string;
  expiresIn: string;
  category: string;
  allergens?: string[] | null;
  onReservationSuccess?: () => void;
}

const FoodCard = ({
  id,
  title,
  image,
  quantity,
  location,
  distance,
  expiresIn,
  category,
  allergens,
  onReservationSuccess,
}: FoodCardProps) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const { user, profile } = useAuth();
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/browse/${id}`);
  };

    const handleRequestFood = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when button is clicked
    
    console.log('FoodCard handleRequestFood called with id:', id, 'type:', typeof id);
    console.log('User:', user);
    
    if (!user) {
      toast.error("Authentication required", {
  description: "Please sign in to request food.",
});;
      router.push("/auth/login");
      return;
    }

    // Only recipients can request food
    if (profile?.user_type !== 'recipient') {
      toast.error("Action not allowed", {
  description: "Only recipients can request food. Donors should use the donate page to list food.",
});
      return;
    }

    setIsRequesting(true);
    
    try {
      console.log('Checking for existing reservation with food_listing_id:', id, 'recipient_id:', user.id);
      
      // Check if user already has a pending reservation for this food item
      const { data: existingReservation, error: checkError } = await supabase
        .from('reservations')
        .select('id')
        .eq('food_listing_id', id)
        .eq('recipient_id', user.id)
        .eq('status', 'pending')
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing reservation:', checkError);
        throw checkError;
      }

      if (existingReservation) {
        toast.error("Already requested", {
  description: "You already have a pending request for this food item.",
});
        return;
      }

      console.log('Creating new reservation with food_listing_id:', id, 'recipient_id:', user.id);

      // Create a new reservation
      const { error } = await supabase
        .from('reservations')
        .insert({
          food_listing_id: id,
          recipient_id: user.id,
          status: 'pending'
        });

      if (error) {
        console.error('Error creating reservation:', error);
        throw error;
      }

      toast.success("Request sent!", {
  description: "Your food request has been sent successfully. The donor will be notified.",
});

      // Call the callback to refresh the parent component if needed
      onReservationSuccess?.();
      
    } catch (error: any) {
      console.error('Error requesting food:', error);
      toast.error("Request failed", {
  description: error.message || "Failed to send food request. Please try again.",
});
    } finally {
      setIsRequesting(false);
    }
  };
  return (
    <div 
      className="bg-white rounded-lg overflow-hidden border border-neutral200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-neutral900 line-clamp-1">
            {title}
          </h3>
          <Badge className="bg-defaultorange text-white">
            {category}
          </Badge>
        </div>
        
        <p className="text-neutral600 mb-3">
          Qty: {quantity}
        </p>
        
        {allergens && allergens.length > 0 && (
          <div className="flex items-center mb-3">
            <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />
            <span className="text-sm text-red-600">
              Contains: {allergens.join(', ')}
            </span>
          </div>
        )}
        
        <div className="flex items-center text-neutral500 mb-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location} • {distance} away</span>
        </div>
        
        <div className="flex items-center text-neutral500 mb-3">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm">Available for: {expiresIn}</span>
        </div>
        
        <Button 
          className="w-full bg-defaultgreen hover:bg-darkgreen text-white"
          onClick={handleRequestFood}
          disabled={isRequesting || !user || profile?.user_type !== 'recipient'}
        >
          {!user 
            ? "Sign in to Request" 
            : profile?.user_type !== 'recipient' 
            ? "Recipients Only" 
            : isRequesting 
            ? "Requesting..." 
            : "Request Food"
          }
        </Button>
      </div>
    </div>
  );
};

export default FoodCard;
