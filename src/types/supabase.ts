/**
 * Type definitions for Supabase database entities
 * This file provides TypeScript interfaces for all database tables and operations
 */

import type { Database } from "@/integrations/supabase/types";

// Export type aliases for easier use throughout the application
// These represent the structure of data as it exists in the database
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type FoodListing = Database['public']['Tables']['food_listings']['Row'];
export type Reservation = Database['public']['Tables']['reservations']['Row'];

// Types for inserting new data into the database
// These may have fewer required fields than the full Row types
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type FoodListingInsert = Database['public']['Tables']['food_listings']['Insert'];
export type ReservationInsert = Database['public']['Tables']['reservations']['Insert'];

// Types for updating existing data in the database
// All fields are optional since you might only update specific columns
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];
export type FoodListingUpdate = Database['public']['Tables']['food_listings']['Update'];
export type ReservationUpdate = Database['public']['Tables']['reservations']['Update'];

// Extended types for allergens functionality
// These extend the base types with allergen-specific fields
export interface FoodListingWithAllergens extends FoodListing {
  allergens: string[] | null; // Array of allergen names (e.g., "nuts", "dairy")
}

export interface ProfileWithAllergens extends Profile {
  dietary_restrictions: string[] | null; // Array of dietary restrictions
  allergies: string[] | null; // Array of known allergies
}

// Extended type for reservations with populated related data
// This is used when we need reservation data along with food listing and donor info
export interface ReservationWithDetails extends Reservation {
  food_listing: {
    id: string;
    title: string; // Name of the food item
    quantity: string; // Amount available (e.g., "5 servings")
    location: string; // Pickup address
    category?: string; // Food category (e.g., "Fresh Produce")
    status: string; // Current status of the listing
    pickup_instructions: string | null; // Special pickup instructions from donor
    pickup_time_start: string | null; // Earliest pickup time
    pickup_time_end: string | null; // Latest pickup time
    donor: {
      first_name: string; // Donor's first name
      last_name: string; // Donor's last name
    };
  };
}
