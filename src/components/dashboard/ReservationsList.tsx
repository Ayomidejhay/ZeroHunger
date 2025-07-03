import React from 'react'
import PaginatedReservationsList from './PaginatedReservationsList';
import type { ReservationWithDetails } from '@/types/supabase';

interface ReservationsListProps {
  reservations: ReservationWithDetails[];
  isLoading?: boolean;
}

const ReservationsList = ({ reservations, isLoading}: ReservationsListProps) => {
  return (
    <PaginatedReservationsList 
      reservations={reservations}
      isLoading={isLoading}
    />
  )
}

export default ReservationsList