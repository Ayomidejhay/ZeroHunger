"use client";

/**
 * Custom hook for fetching and managing food listings
 * Handles real-time updates and category filtering
 */

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
//import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { FoodListingWithAllergens } from "@/types/supabase";

/**
 * Hook for fetching food listings with real-time updates
 * @param selectedCategory - Category filter for food listings
 * @returns Object containing food listings, loading state, and refetch function
 */
export const useFoodListings = (selectedCategory: string) => {
  //const { toast } = useToast();

  /**
   * Fetches food listings from Supabase with filtering and joins
   * Only returns available listings that haven't expired
   */
  const fetchFoodListings = async (): Promise<FoodListingWithAllergens[]> => {
    // Build the query with joins to get donor information
    let query = supabase
      .from("food_listings")
      .select(
        `
        *,
        donor:profiles(first_name, last_name)
      `
      )
      .eq("status", "available") // Only show available food
      .gt("expiration", new Date().toISOString()) // Only show non-expired food
      .order("created_at", { ascending: false }); // Newest first

    // Apply category filter if not showing all categories
    if (selectedCategory !== "All Categories") {
      query = query.eq("category", selectedCategory);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching food listings:", error);
      throw error;
    }

    console.log("Fetched food listings with allergens:", data);
    return data || [];
  };

  // Use React Query for caching, background updates, and error handling
  const {
    data: foodListings = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["foodListings", selectedCategory], // Cache key includes category for proper invalidation
    queryFn: fetchFoodListings,
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
  });

  // Show user-friendly error messages
  if (error) {
    toast.error("Failed to load food listings. Please try again later.");
    console.error("Error fetching food listings:", error);
  }

  return {
    foodListings,
    isLoading,
    refetchFoodListings: refetch, // Function to manually trigger a refetch
  };
};
