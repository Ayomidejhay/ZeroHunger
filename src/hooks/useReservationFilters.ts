'use client';

/**
 * Custom hook for filtering and sorting reservations
 * Provides advanced filtering capabilities for the reservations dashboard
 */

import { useMemo } from 'react';
import type { ReservationWithDetails } from '@/types/supabase';

// Interface defining all available filter options
interface FilterState {
  search: string; // Text search across food titles, locations, and donor names
  sortBy: string; // Sorting method (newest, oldest, pickup-time, title)
  dateRange: string; // Time period filter (all, today, week, month)
  location: string; // Filter by pickup location
  category: string; // Filter by food category
}

/**
 * Hook that applies filters and sorting to a list of reservations
 * @param reservations - Array of reservations to filter
 * @param filters - Current filter state
 * @returns Filtered and sorted array of reservations
 */
export const useReservationFilters = (reservations: ReservationWithDetails[], filters: FilterState) => {
  const filteredAndSortedReservations = useMemo(() => {
    // Start with a copy of all reservations to avoid mutating the original array
    let filtered = [...reservations];

    // Apply search filter - searches across multiple fields
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(reservation => 
        // Search in food title
        reservation.food_listing?.title?.toLowerCase().includes(searchLower) ||
        // Search in pickup location
        reservation.food_listing?.location?.toLowerCase().includes(searchLower) ||
        // Search in donor's full name
        `${reservation.food_listing?.donor?.first_name} ${reservation.food_listing?.donor?.last_name}`.toLowerCase().includes(searchLower)
      );
    }

    // Apply location filter - exact match filtering
    if (filters.location && filters.location !== 'all') {
      filtered = filtered.filter(reservation => 
        reservation.food_listing?.location === filters.location
      );
    }

    // Apply category filter - exact match filtering
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(reservation => 
        reservation.food_listing?.category === filters.category
      );
    }

    // Apply date range filter based on reservation creation date
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filtered = filtered.filter(reservation => {
        const createdAt = new Date(reservation.created_at);
        
        switch (filters.dateRange) {
          case 'today':
            // Show reservations created today
            return createdAt >= startOfDay;
          case 'week':
            // Show reservations created in the last 7 days
            const weekAgo = new Date(startOfDay);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return createdAt >= weekAgo;
          case 'month':
            // Show reservations created in the last 30 days
            const monthAgo = new Date(startOfDay);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return createdAt >= monthAgo;
          default:
            return true;
        }
      });
    }

    // Apply sorting based on selected sort method
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'oldest':
          // Sort by creation date - oldest first
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'pickup-time':
          // Sort by pickup time - earliest first
          const aPickupTime = a.food_listing?.pickup_time_start;
          const bPickupTime = b.food_listing?.pickup_time_start;
          // Handle cases where pickup time might be null
          if (!aPickupTime && !bPickupTime) return 0;
          if (!aPickupTime) return 1; // Push items without pickup time to end
          if (!bPickupTime) return -1;
          return new Date(aPickupTime).getTime() - new Date(bPickupTime).getTime();
        case 'title':
          // Sort alphabetically by food title
          return (a.food_listing?.title || '').localeCompare(b.food_listing?.title || '');
        case 'newest':
        default:
          // Default sort - newest first
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    return filtered;
  }, [reservations, filters]); // Recalculate when reservations or filters change

  return filteredAndSortedReservations;
};
