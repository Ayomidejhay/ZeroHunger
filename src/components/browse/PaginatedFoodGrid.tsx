import React from 'react'
import { usePagination } from '@/hooks/usePagination';
import { LoadingSpinner } from '../ui/loading-spinner';
import { ErrorBoundary } from '../ui/error-boundary';
import FoodCard from '../FoodCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { Skeleton } from '../ui/skeleton';

interface PaginatedFoodGridProps {
  isLoading: boolean;
  foodListings: any[];
  itemsPerPage?: number;
}

const FoodCardSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden border border-neutral200 shadow-sm">
    <Skeleton className="aspect-video w-full" />
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-start">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-10 w-full" />
    </div>
  </div>
);

const PaginatedFoodGrid = ({
  isLoading,
  foodListings,
  itemsPerPage = 12,
}: PaginatedFoodGridProps) => {
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
    data: foodListings,
    itemsPerPage
  });

  const getExpirationText = (expirationDate: string) => {
    const now = new Date();
    const expiry = new Date(expirationDate);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `${diffDays} days`;
  };

  if (isLoading) {
    return (
      <ErrorBoundary>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: itemsPerPage }, (_, i) => (
              <FoodCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  if (foodListings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral600">No food listings found</p>
      </div>
    );
  }
  return (
     <ErrorBoundary>
      <div className="space-y-6">
        {/* Results Info */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-saveplate-neutral-600">
            Showing {startIndex}-{endIndex} of {totalItems} items
          </p>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedData.map((listing) => {
            console.log('Rendering listing with id:', listing.id, 'type:', typeof listing.id, 'allergens:', listing.allergens);
            return (
              <FoodCard
                key={listing.id}
                id={listing.id}
                title={listing.title}
                image={listing.image_url || "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"}
                quantity={listing.quantity}
                location={listing.location}
                distance="Nearby"
                expiresIn={getExpirationText(listing.expiration)}
                category={listing.category}
                allergens={listing.allergens}
                onReservationSuccess={() => {}}
              />
            );
          })}
        </div>

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

export default PaginatedFoodGrid