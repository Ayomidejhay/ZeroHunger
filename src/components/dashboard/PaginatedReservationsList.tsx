'use client';

import React, {useState} from 'react'
import { usePagination } from '@/hooks/usePagination';
import { useReservationFilters } from '@/hooks/useReservationFilters';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Search, Filter, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ReservationWithDetails } from '@/types/supabase';
import { LoadingSpinner } from '../ui/loading-spinner';
import { ErrorBoundary } from '../ui/error-boundary';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';

interface PaginatedReservationsListProps {
  reservations: ReservationWithDetails[];
  isLoading?: boolean;
}

const PaginatedReservationsList = ({ reservations, isLoading}: PaginatedReservationsListProps) => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    search: '',
    sortBy: "newest",
    dateRange: "all",
    location: "all",
    category: "all",
  });

  const filteredReservations = useReservationFilters(reservations, filters);

    const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    previousPage,
    canGoNext,
    canGoPrevious,
    startIndex,
    endIndex,
    totalItems
  } = usePagination({
    data: filteredReservations,
    itemsPerPage: 8
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-defaultorange">Pending</Badge>;
      case 'confirmed':
        return <Badge className="bg-defaultgreen">Confirmed</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Completed</Badge>;
      case 'expired':
        return <Badge variant="secondary">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleViewFoodDetails = (foodListingId: string) => {
    router.push(`/food/${foodListingId}`);
  };

  const uniqueLocations = Array.from(new Set(reservations.map(r => r.food_listing?.location).filter(Boolean)));
  const uniqueCategories = Array.from(new Set(reservations.map(r => r.food_listing?.category))).filter((c): c is string => typeof c === 'string');

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search reservations..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="pl-10"
            />
          </div>
          
          <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="pickup-time">Pickup Time</SelectItem>
              <SelectItem value="title">Food Title</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.dateRange} onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {uniqueLocations.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {uniqueCategories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral600">
            Showing {startIndex}-{endIndex} of {totalItems} reservations
          </p>
          {(filters.search || filters.location !== 'all' || filters.category !== 'all' || filters.dateRange !== 'all') && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilters({
                search: "",
                sortBy: "newest",
                dateRange: "all",
                location: "all",
                category: "all"
              })}
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Reservations List */}
        {paginatedData.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-neutral600">No reservations found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedData.map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-grow">
                  <h4 className="font-semibold">{reservation.food_listing?.title}</h4>
                  <p className="text-sm text-neutral600">
                    {reservation.food_listing?.quantity} • {reservation.food_listing?.location}
                  </p>
                  <p className="text-xs text-neutral500">
                    Requested {new Date(reservation.created_at).toLocaleDateString()}
                  </p>
                  {reservation.food_listing?.donor && (
                    <p className="text-xs text-neutral500">
                      From: {reservation.food_listing.donor.first_name} {reservation.food_listing.donor.last_name}
                    </p>
                  )}
                  {reservation.food_listing?.status === 'expired' && (
                    <p className="text-xs text-red-500">
                      Food listing has expired
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(reservation.status)}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewFoodDetails(reservation.food_listing.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={previousPage}
                  className={!canGoPrevious ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current page
                if (
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => goToPage(page)}
                        isActive={page === currentPage}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                
                // Show ellipsis
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <PaginationItem key={page}>
                      <span className="flex h-9 w-9 items-center justify-center">...</span>
                    </PaginationItem>
                  );
                }
                
                return null;
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={nextPage}
                  className={!canGoNext ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </ErrorBoundary>
  )
}

export default PaginatedReservationsList