"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getExpirationText } from "@/utils/dateUtils";
import {
  ArrowLeft,
  MapPin,
  Clock,
  User,
  Package,
  AlertTriangle,
} from "lucide-react";

export default function page() {
  const { id } = useParams();
  const router = useRouter();
  const { user, profile } = useAuth();
  const [foodListing, setFoodListing] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchFoodListing();
    }
  }, [id]);

  const fetchFoodListing = async () => {
    if (!id) return;
    const listingId = Array.isArray(id) ? id[0] : id;
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("food_listings")
        .select(
          `
          *,
          donor:profiles(first_name, last_name, phone, city, state)
        `
        )
        .eq("id", listingId)
        .single();

      if (error) throw error;
      console.log("Fetched food listing detail with allergens:", data);
      setFoodListing(data);
    } catch (error: any) {
      console.error("Error fetching food listing:", error);
      toast.error("Error loading food item", {
        description: error.message || "Something went wrong. Please try again.",
      });
      router.push("/browse");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestFood = async () => {
    if (!user) {
      toast.error("Authentication required", {
        description: "Please sign in to request food.",
      });
      router.push("/signin");
      return;
    }

    if (profile?.user_type !== "recipient") {
      toast.error("Action not allowed", {
        description: "Only recipients can request food.",
      });
      return;
    }

    setIsRequesting(true);

    try {
      // Check if user already has a pending reservation for this food item
      const { data: existingReservation, error: checkError } = await supabase
        .from("reservations")
        .select("id")
        .eq("food_listing_id", Array.isArray(id) ? id[0] : id ?? "")
        .eq("recipient_id", user.id)
        .eq("status", "pending")
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingReservation) {
        toast.error("Already requested", {
          description: "You already have a pending request for this food item.",
        });
        return;
      }

      // Create a new reservation
      const { error } = await supabase.from("reservations").insert({
        food_listing_id: Array.isArray(id) ? id[0] : id ?? "",
        recipient_id: user.id,
        status: "pending",
      });

      if (error) throw error;

      toast.success("Request sent!", {
        description:
          "Your food request has been sent successfully. The donor will be notified.",
      });

      // Refresh the food listing data
      fetchFoodListing();
    } catch (error: any) {
      console.error("Error requesting food:", error);
      toast.error("Request failed", {
        description:
          error.message || "Failed to send food request. Please try again.",
      });
    } finally {
      setIsRequesting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center">
          <p className="text-neutral600">Loading food item...</p>
        </main>
      </div>
    );
  }

  if (!foodListing) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center">
          <p className="text-neutral600">Food item not found</p>
        </main>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col">
      
      
      <main className="flex-grow py-10 bg-gray-50">
        <div className="saveplate-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => router.push("/browse")}
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Section */}
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={foodListing.image_url || "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"}
                  alt={foodListing.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details Section */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h1 className="text-3xl font-bold text-neutral900">
                      {foodListing.title}
                    </h1>
                    <Badge 
                      className={
                        foodListing.status === 'available' ? 'bg-defaultgreen' :
                        foodListing.status === 'reserved' ? 'bg-defaultorange' : 
                        'bg-gray-500'
                      }
                    >
                      {foodListing.status}
                    </Badge>
                  </div>
                  <Badge className="bg-defaultorange text-white">
                    {foodListing.category}
                  </Badge>
                </div>

                {foodListing.allergens && foodListing.allergens.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                        Allergen Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-red-600">Contains: {foodListing.allergens.join(', ')}</p>
                    </CardContent>
                  </Card>
                )}

                {foodListing.description && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-neutral600">{foodListing.description}</p>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-neutral600">
                      <Package className="h-5 w-5 mr-3" />
                      <span>Quantity: {foodListing.quantity}</span>
                    </div>
                    <div className="flex items-center text-neutral600">
                      <MapPin className="h-5 w-5 mr-3" />
                      <span>{foodListing.location}</span>
                    </div>
                    <div className="flex items-center text-neutral600">
                      <Clock className="h-5 w-5 mr-3" />
                      <span>Available for: {getExpirationText(foodListing.expiration)}</span>
                    </div>
                    {foodListing.donor && (
                      <div className="flex items-center text-neutral600">
                        <User className="h-5 w-5 mr-3" />
                        <span>
                          Donated by: {foodListing.donor.first_name} {foodListing.donor.last_name}
                          {foodListing.donor.city && ` from ${foodListing.donor.city}`}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {foodListing.pickup_instructions && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Pickup Instructions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-neutral600">{foodListing.pickup_instructions}</p>
                    </CardContent>
                  </Card>
                )}

                {foodListing.status === 'available' && (
                  <Button 
                    className="w-full bg-defaultgreen hover:bg-darkgreen text-white"
                    onClick={handleRequestFood}
                    disabled={isRequesting || !user || profile?.user_type !== 'recipient'}
                    size="lg"
                  >
                    {!user 
                      ? "Sign in to Request" 
                      : profile?.user_type !== 'recipient' 
                      ? "Recipients Only" 
                      : isRequesting 
                      ? "Requesting..." 
                      : "Request This Food"
                    }
                  </Button>
                )}

                {foodListing.status === 'reserved' && (
                  <div className="text-center p-4 bg-defaultorange/10 rounded-lg">
                    <p className="text-defaultorange font-medium">
                      This food item has been reserved by another recipient.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      
    </div>
  );
}
