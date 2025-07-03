'use client';

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FoodListing } from "@/types/supabase";
import { FilterState } from "@/components/browse/AdvancedFilters";

export const useAdvancedSearch = () => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    category: "",
    location: "",
    maxDistance: "",
    allergens: [],
    expiryRange: "",
    sortBy: "newest"
  });

  const { data: foodListings = [], isLoading } = useQuery({
    queryKey: ['food-listings-search', filters],
    queryFn: async () => {
      let query = supabase
        .from('food_listings')
        .select(`
          *,
          profiles:donor_id (
            first_name,
            last_name,
            city,
            state
          )
        `)
        .eq('status', 'available');

      // Apply search query filter
      if (filters.searchQuery) {
        query = query.or(`title.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`);
      }

      // Apply category filter
      if (filters.category && filters.category !== "all") {
        query = query.eq('category', filters.category);
      }

      // Apply location filter
      if (filters.location) {
        query = query.or(`location.ilike.%${filters.location}%,pickup_location.ilike.%${filters.location}%`);
      }

      // Apply expiry range filter
      if (filters.expiryRange && filters.expiryRange !== "all") {
        const now = new Date();
        let endDate: Date;
        
        switch (filters.expiryRange) {
          case 'today':
            endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
            break;
          case 'tomorrow':
            endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 59, 59);
            break;
          case 'week':
            endDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            break;
          case 'month':
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
            break;
          default:
            endDate = new Date('2099-12-31');
        }
        
        query = query.lte('expires_at', endDate.toISOString());
      }

      // Apply sorting
      switch (filters.sortBy) {
        case 'expiry':
          query = query.order('expires_at', { ascending: true });
          break;
        case 'quantity':
          query = query.order('quantity', { ascending: false });
          break;
        case 'newest':
        default:
          query = query.order('created_at', { ascending: false });
          break;
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching food listings:', error);
        throw error;
      }
      
      return data as (FoodListing & { profiles: any })[];
    }
  });

  // Client-side filtering for allergens (since this requires array operations)
  const filteredListings = useMemo(() => {
    if (filters.allergens.length === 0) {
      return foodListings;
    }

    return foodListings.filter(listing => {
      const listingAllergens = listing.allergens || [];
      return !filters.allergens.some(allergen => 
        listingAllergens.includes(allergen)
      );
    });
  }, [foodListings, filters.allergens]);

  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      category: "",
      location: "",
      maxDistance: "",
      allergens: [],
      expiryRange: "",
      sortBy: "newest"
    });
  };

  return {
    filters,
    setFilters,
    clearFilters,
    foodListings: filteredListings,
    isLoading,
    resultsCount: filteredListings.length
  };
};
