import React from 'react'
import type { ReservationWithDetails } from '@/types/supabase';
import PickupCard from './PickupCard';

interface ConfirmedReservationsListProps {
  reservations: ReservationWithDetails[];
}

const ConfirmedReservationsList = ({reservations}: ConfirmedReservationsListProps) => {

    // Sort reservations by pickup time (earliest first)
  const sortedReservations = [...reservations].sort((a, b) => {
    const aTime = a.food_listing?.pickup_time_start;
    const bTime = b.food_listing?.pickup_time_start;
    
    if (!aTime && !bTime) return 0;
    if (!aTime) return 1;
    if (!bTime) return -1;
    
    return new Date(aTime).getTime() - new Date(bTime).getTime();
  });
  return (
    <div className='space-y-6'>
        {sortedReservations.map((reservation) => (
      <PickupCard key={reservation.id} reservation={reservation}/>))}
    </div>
  )
}

export default ConfirmedReservationsList