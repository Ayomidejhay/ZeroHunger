'use client';

import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * useFoodExpiration
 *
 * Runs a client-side expiration sweep on mount and every 5 minutes.
 * Marks food listings as expired when their expiration timestamp has passed,
 * cascades to both pending AND confirmed reservations, and inserts
 * notifications for affected recipients so they know what happened.
 *
 * NOTE: In a production app this logic should live in a Supabase Edge Function
 * or a scheduled pg_cron job so it runs even when no user has the app open.
 * This hook acts as a client-side fallback.
 */
export const useFoodExpiration = () => {

  const expireOldFoodListings = async () => {
    try {
      const now = new Date().toISOString();

      // 1. Expire all available AND reserved listings past their expiration date.
      //    'reserved' must be included — a confirmed reservation doesn't stop
      //    food from going bad.
      const { data: expiredListings, error: expireError } = await supabase
        .from('food_listings')
        .update({ status: 'expired', updated_at: now })
        .in('status', ['available', 'reserved'])
        .lt('expiration', now)
        .select('id, title, donor_id');

      if (expireError) {
        console.error('Error expiring food listings:', expireError);
        return;
      }

      if (!expiredListings || expiredListings.length === 0) return;

      const expiredIds = expiredListings.map((l) => l.id);

      // 2. Expire ALL active reservations (pending + confirmed) for those listings.
      const { data: affectedReservations, error: reservationError } = await supabase
        .from('reservations')
        .update({ status: 'expired', updated_at: now })
        .in('food_listing_id', expiredIds)
        .in('status', ['pending', 'confirmed'])
        .select('id, recipient_id, food_listing_id');

      if (reservationError) {
        console.error('Error expiring reservations:', reservationError);
      }

      // 3. Notify each affected recipient so they know their reservation expired.
      if (affectedReservations && affectedReservations.length > 0) {
        const listingMap = Object.fromEntries(
          expiredListings.map((l) => [l.id, l.title])
        );

        const notifications = affectedReservations.map((r) => ({
          user_id: r.recipient_id,
          title: 'Reservation Expired',
          message: `Your reservation for "${listingMap[r.food_listing_id] ?? 'a food item'}" has expired because the listing is no longer available.`,
          type: 'error',
          read: false,
        }));

        const { error: notifError } = await supabase
          .from('notifications')
          .insert(notifications);

        if (notifError) {
          console.error('Error inserting expiration notifications:', notifError);
        }
      }
    } catch (error) {
      console.error('Error in expiration check:', error);
    }
  };

  useEffect(() => {
    expireOldFoodListings();
    const interval = setInterval(expireOldFoodListings, 5 * 60 * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { expireOldFoodListings };
};
