"use client";

import React, { useState} from 'react';
import { Badge } from '@/components/ui/badge';
import ReservationsList from './ReservationsList';
import ConfrimedReservationsList from './ConfirmedReservationsList';
import EmptyReservations from './EmptyReservations';
import ReservationFilters from './ReservationFilters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useReservationFilters } from '@/hooks/useReservationFilters';
import type { ReservationWithDetails } from '@/types/supabase';
import ConfirmedReservationsList from './ConfirmedReservationsList';

interface ReservationTabsProps {
  reservations: ReservationWithDetails[];
  stats: {
    pending: number;
    confirmed: number;
    completed: number;
    expired: number;
  };
}

const ReservationTabs = ({ reservations, stats}: ReservationTabsProps) => {

  const [activeTab, setActiveTab] = useState("pending");
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "newest",
    dateRange: "all",
    location: "all",
    category: "all"
  });

    // Apply filters to all reservations first
  const filteredReservations = useReservationFilters(reservations, filters);

  // Then filter by status for each tab
  const pendingReservations = filteredReservations.filter(r => r.status === 'pending');
  const confirmedReservations = filteredReservations.filter(r => r.status === 'confirmed');
  const completedReservations = filteredReservations.filter(r => r.status === 'completed');
  const expiredReservations = filteredReservations.filter(r => r.status === 'expired');

  // Calculate filtered stats for display
  const filteredStats = {
    pending: pendingReservations.length,
    confirmed: confirmedReservations.length,
    completed: completedReservations.length,
    expired: expiredReservations.length
  };

    const TabTriggerWithBadge = ({ value, label, count }: { value: string; label: string; count: number }) => (
    <TabsTrigger value={value} className="flex items-center gap-2">
      {label}
      {count > 0 && (
        <Badge variant="secondary" className="text-xs">
          {count}
        </Badge>
      )}
    </TabsTrigger>
  );

  const renderEmptyState = (status: string) => {
    const hasActiveFilters = filters.search || filters.location !== 'all' || filters.category !== 'all' || filters.dateRange !== 'all';
    
    if (hasActiveFilters) {
      return (
        <div className="text-center py-8">
          <p className="text-neutral600 mb-4">
            No {status} reservations match your current filters
          </p>
          <p className="text-sm text-neutral500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      );
    }
    
    return (
      <div className="text-center py-8">
        <p className="text-neutral600 mb-4">No {status} requests</p>
      </div>
    );
  };
  return (
        <div className="space-y-6">
      <ReservationFilters
        filters={filters}
        onFiltersChange={setFilters}
        reservations={reservations}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabTriggerWithBadge value="pending" label="Pending" count={filteredStats.pending} />
          <TabTriggerWithBadge value="confirmed" label="Confirmed" count={filteredStats.confirmed} />
          <TabTriggerWithBadge value="completed" label="Completed" count={filteredStats.completed} />
          <TabTriggerWithBadge value="expired" label="Expired" count={filteredStats.expired} />
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          {pendingReservations.length === 0 ? 
            renderEmptyState("pending") : 
            <ReservationsList reservations={pendingReservations} />
          }
        </TabsContent>

        <TabsContent value="confirmed" className="mt-6">
          {confirmedReservations.length === 0 ? 
            renderEmptyState("confirmed") : 
            <ConfirmedReservationsList reservations={confirmedReservations} />
          }
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {completedReservations.length === 0 ? 
            renderEmptyState("completed") : 
            <ReservationsList reservations={completedReservations} />
          }
        </TabsContent>

        <TabsContent value="expired" className="mt-6">
          {expiredReservations.length === 0 ? 
            renderEmptyState("expired") : 
            <ReservationsList reservations={expiredReservations} />
          }
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ReservationTabs