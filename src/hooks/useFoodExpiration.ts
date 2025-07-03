'use client';

import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useFoodExpiration = () => {
    // Function to check for expirefood listings

  const expireOldFoodListings = async () => {
    try {
      console.log('Checking for expired food listings...');
      
      // Update food listings that have passed their expiration time
      const { data: expiredListings, error: expireError } = await supabase
        .from('food_listings')
        .update({ 
          status: 'expired', 
          updated_at: new Date().toISOString() 
        })
        .eq('status', 'available')
        .lt('expiration', new Date().toISOString())
        .select('id, title');

      if (expireError) {
        console.error('Error expiring food listings:', expireError);
        return;
      }

      if (expiredListings && expiredListings.length > 0) {
        console.log(`Expired ${expiredListings.length} food listings`);
        
        // Update any pending reservations for expired food
        const expiredIds = expiredListings.map(listing => listing.id);
        const { error: reservationError } = await supabase
          .from('reservations')
          .update({ 
            status: 'expired', 
            updated_at: new Date().toISOString() 
          })
          .eq('status', 'pending')
          .in('food_listing_id', expiredIds);

        if (reservationError) {
          console.error('Error updating expired reservations:', reservationError);
        }
      }
    } catch (error) {
      console.error('Error in expiration check:', error);
    }
  };

  useEffect(() => {
    // Run expiration check immediately
    expireOldFoodListings();

    // Set up interval to check every 5 minutes
    const interval = setInterval(expireOldFoodListings, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return { expireOldFoodListings };
};