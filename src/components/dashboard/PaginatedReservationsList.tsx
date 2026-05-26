// 'use client';

// import React, {useState} from 'react'
// import { usePagination } from '@/hooks/usePagination';
// import { useReservationFilters } from '@/hooks/useReservationFilters';
// import { Button } from '../ui/button';
// import { Input } from '../ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
// import { Badge } from '../ui/badge';
// import { Search, Filter, Eye } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import type { ReservationWithDetails } from '@/types/supabase';
// import { LoadingSpinner } from '../ui/loading-spinner';
// import { ErrorBoundary } from '../ui/error-boundary';
// import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';

// interface PaginatedReservationsListProps {
//   reservations: ReservationWithDetails[];
//   isLoading?: boolean;
// }

// const PaginatedReservationsList = ({ reservations, isLoading}: PaginatedReservationsListProps) => {
//   const router = useRouter();
//   const [filters, setFilters] = useState({
//     search: '',
//     sortBy: "newest",
//     dateRange: "all",
//     location: "all",
//     category: "all",
//   });

//   const filteredReservations = useReservationFilters(reservations, filters);

//     const {
//     currentPage,
//     totalPages,
//     paginatedData,
//     goToPage,
//     nextPage,
//     previousPage,
//     canGoNext,
//     canGoPrevious,
//     startIndex,
//     endIndex,
//     totalItems
//   } = usePagination({
//     data: filteredReservations,
//     itemsPerPage: 8
//   });

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'pending':
//         return <Badge className="bg-defaultorange">Pending</Badge>;
//       case 'confirmed':
//         return <Badge className="bg-defaultgreen">Confirmed</Badge>;
//       case 'completed':
//         return <Badge className="bg-blue-500">Completed</Badge>;
//       case 'expired':
//         return <Badge variant="secondary">Expired</Badge>;
//       default:
//         return <Badge variant="secondary">{status}</Badge>;
//     }
//   };

//   const handleViewFoodDetails = (foodListingId: string) => {
//     router.push(`/food/${foodListingId}`);
//   };

//   const uniqueLocations = Array.from(new Set(reservations.map(r => r.food_listing?.location).filter(Boolean)));
//   const uniqueCategories = Array.from(new Set(reservations.map(r => r.food_listing?.category))).filter((c): c is string => typeof c === 'string');

//   if (isLoading) {
//     return (
//       <div className="space-y-4">
//         <div className="flex items-center justify-center py-8">
//           <LoadingSpinner size="lg" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ErrorBoundary>
//       <div className="space-y-6">
//         {/* Filters */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input
//               placeholder="Search reservations..."
//               value={filters.search}
//               onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
//               className="pl-10"
//             />
//           </div>
          
//           <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
//             <SelectTrigger>
//               <SelectValue placeholder="Sort by" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="newest">Newest First</SelectItem>
//               <SelectItem value="oldest">Oldest First</SelectItem>
//               <SelectItem value="pickup-time">Pickup Time</SelectItem>
//               <SelectItem value="title">Food Title</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select value={filters.dateRange} onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}>
//             <SelectTrigger>
//               <SelectValue placeholder="Date range" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Time</SelectItem>
//               <SelectItem value="today">Today</SelectItem>
//               <SelectItem value="week">This Week</SelectItem>
//               <SelectItem value="month">This Month</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
//             <SelectTrigger>
//               <SelectValue placeholder="Location" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Locations</SelectItem>
//               {/* {uniqueLocations.map(location => (
//                 <SelectItem key={location} value={location}>{location}</SelectItem>
//               ))} */}
//               {uniqueLocations.filter(l => !!l).map(location => (
//   <SelectItem key={location} value={location}>{location}</SelectItem>
// ))}
//             </SelectContent>
//           </Select>

//           <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
//             <SelectTrigger>
//               <SelectValue placeholder="Category" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Categories</SelectItem>
//               {/* {uniqueCategories.map(category => (
//                 <SelectItem key={category} value={category}>{category}</SelectItem>
//               ))} */}
//               {uniqueCategories.filter(c => !!c).map(category => (
//   <SelectItem key={category} value={category}>{category}</SelectItem>
// ))}
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Results Info */}
//         <div className="flex items-center justify-between">
//           <p className="text-sm text-neutral600">
//             Showing {startIndex}-{endIndex} of {totalItems} reservations
//           </p>
//           {(filters.search || filters.location !== 'all' || filters.category !== 'all' || filters.dateRange !== 'all') && (
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setFilters({
//                 search: "",
//                 sortBy: "newest",
//                 dateRange: "all",
//                 location: "all",
//                 category: "all"
//               })}
//             >
//               <Filter className="h-4 w-4 mr-2" />
//               Clear Filters
//             </Button>
//           )}
//         </div>

//         {/* Reservations List */}
//         {paginatedData.length === 0 ? (
//           <div className="text-center py-8">
//             <p className="text-neutral600">No reservations found</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {paginatedData.map((reservation) => (
//               <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
//                 <div className="flex-grow">
//                   <h4 className="font-semibold">{reservation.food_listing?.title}</h4>
//                   <p className="text-sm text-neutral600">
//                     {reservation.food_listing?.quantity} • {reservation.food_listing?.location}
//                   </p>
//                   <p className="text-xs text-neutral500">
//                     Requested {new Date(reservation.created_at).toLocaleDateString()}
//                   </p>
//                   {reservation.food_listing?.donor && (
//                     <p className="text-xs text-neutral500">
//                       From: {reservation.food_listing.donor.first_name} {reservation.food_listing.donor.last_name}
//                     </p>
//                   )}
//                   {reservation.food_listing?.status === 'expired' && (
//                     <p className="text-xs text-red-500">
//                       Food listing has expired
//                     </p>
//                   )}
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   {getStatusBadge(reservation.status)}
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handleViewFoodDetails(reservation.food_listing.id)}
//                   >
//                     <Eye className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <Pagination>
//             <PaginationContent>
//               <PaginationItem>
//                 <PaginationPrevious 
//                   onClick={previousPage}
//                   className={!canGoPrevious ? "pointer-events-none opacity-50" : "cursor-pointer"}
//                 />
//               </PaginationItem>
              
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
//                 // Show first page, last page, current page, and pages around current page
//                 if (
//                   page === 1 || 
//                   page === totalPages || 
//                   (page >= currentPage - 1 && page <= currentPage + 1)
//                 ) {
//                   return (
//                     <PaginationItem key={page}>
//                       <PaginationLink
//                         onClick={() => goToPage(page)}
//                         isActive={page === currentPage}
//                         className="cursor-pointer"
//                       >
//                         {page}
//                       </PaginationLink>
//                     </PaginationItem>
//                   );
//                 }
                
//                 // Show ellipsis
//                 if (page === currentPage - 2 || page === currentPage + 2) {
//                   return (
//                     <PaginationItem key={page}>
//                       <span className="flex h-9 w-9 items-center justify-center">...</span>
//                     </PaginationItem>
//                   );
//                 }
                
//                 return null;
//               })}
              
//               <PaginationItem>
//                 <PaginationNext 
//                   onClick={nextPage}
//                   className={!canGoNext ? "pointer-events-none opacity-50" : "cursor-pointer"}
//                 />
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>
//         )}
//       </div>
//     </ErrorBoundary>
//   )
// }

// export default PaginatedReservationsList

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePagination } from '@/hooks/usePagination';
import { useReservationFilters } from '@/hooks/useReservationFilters';
import { ErrorBoundary } from '../ui/error-boundary';
import { Skeleton } from '../ui/skeleton';
import {
  MapPin, Clock, Package, ArrowRight,
  ChevronLeft, ChevronRight, User
} from 'lucide-react';
import type { ReservationWithDetails } from '@/types/supabase';

interface Props {
  reservations: ReservationWithDetails[];
  isLoading?: boolean;
}

function statusStyle(status: string) {
  switch (status) {
    case 'pending':   return { bg: '#fff7ed', color: '#f97316', label: 'Pending' };
    case 'confirmed': return { bg: '#f0fdf4', color: '#16a34a', label: 'Confirmed' };
    case 'completed': return { bg: '#eff6ff', color: '#3b82f6', label: 'Completed' };
    case 'expired':   return { bg: '#fef2f2', color: '#ef4444', label: 'Expired' };
    default:          return { bg: '#f7f3ed', color: '#667085', label: status };
  }
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)   return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function SkeletonRow() {
  return (
    <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f0f0f0', display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Skeleton className="h-12 w-12 rounded-xl flex-shrink-0" />
      <div style={{ flex: 1 }} className="space-y-2">
        <Skeleton className="h-4 w-48 rounded-full" />
        <Skeleton className="h-3 w-32 rounded-full" />
      </div>
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>
  );
}

const PaginatedReservationsList = ({ reservations, isLoading }: Props) => {
  const router = useRouter();
  const [filters] = useState({
    search: '', sortBy: 'newest', dateRange: 'all', location: 'all', category: 'all',
  });

  const filtered = useReservationFilters(reservations, filters);
  const {
    currentPage, totalPages, paginatedData,
    goToPage, nextPage, previousPage,
    canGoNext, canGoPrevious, startIndex, endIndex, totalItems,
  } = usePagination({ data: filtered, itemsPerPage: 8 });

  if (isLoading) {
    return (
      <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e8ecef' }}>
        {Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
      </div>
    );
  }

  if (paginatedData.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#98a2b3', fontSize: '.88rem' }}>
        No reservations found
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <style>{`
        .prl-row {
          display: flex; align-items: center; gap: 1rem;
          padding: 1.1rem 1.5rem;
          border-bottom: 1px solid #f7f3ed;
          transition: background .18s;
          cursor: pointer;
        }
        .prl-row:last-child { border-bottom: none; }
        .prl-row:hover { background: #fafaf8; }

        .prl-icon {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .prl-main { flex: 1; min-width: 0; }
        .prl-title {
          font-size: .92rem; font-weight: 700; color: #1a3a2a;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          margin-bottom: .2rem;
        }
        .prl-meta {
          display: flex; align-items: center; gap: 1rem;
          flex-wrap: wrap;
        }
        .prl-meta-item {
          display: flex; align-items: center; gap: .3rem;
          font-size: .75rem; color: #98a2b3;
        }
        .prl-status {
          padding: .25rem .7rem; border-radius: 100px;
          font-size: .72rem; font-weight: 700;
          white-space: nowrap; flex-shrink: 0;
        }
        .prl-arrow {
          color: #d0d5dd; flex-shrink: 0;
          transition: color .18s, transform .18s;
        }
        .prl-row:hover .prl-arrow {
          color: #76c43b; transform: translateX(2px);
        }

        .prl-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 1.5rem 0;
          flex-wrap: wrap; gap: .75rem;
        }
        .prl-count { font-size: .78rem; color: #98a2b3; }
        .prl-pages { display: flex; align-items: center; gap: .4rem; }
        .prl-page-btn {
          width: 32px; height: 32px; border-radius: 8px;
          border: 1px solid #e8ecef;
          background: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #667085; font-size: .8rem; font-weight: 600;
          transition: all .18s; font-family: 'DM Sans', sans-serif;
        }
        .prl-page-btn:hover:not(:disabled) { border-color: #76c43b; color: #1a3a2a; }
        .prl-page-btn.active { background: #1a3a2a; border-color: #1a3a2a; color: #fff; }
        .prl-page-btn:disabled { opacity: .35; cursor: not-allowed; }
      `}</style>

      <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e8ecef' }}>
        {paginatedData.map(r => {
          const s = statusStyle(r.status);
          return (
            <div
              key={r.id}
              className="prl-row"
              onClick={() => r.food_listing?.id && router.push(`/browse/${r.food_listing.id}`)}
            >
              {/* Icon */}
              <div className="prl-icon" style={{ background: s.bg }}>
                <Package size={18} color={s.color} />
              </div>

              {/* Content */}
              <div className="prl-main">
                <div className="prl-title">{r.food_listing?.title || 'Food item'}</div>
                <div className="prl-meta">
                  {r.food_listing?.quantity && (
                    <span className="prl-meta-item">
                      <Package size={11} />{r.food_listing.quantity}
                    </span>
                  )}
                  {r.food_listing?.location && (
                    <span className="prl-meta-item">
                      <MapPin size={11} />{r.food_listing.location}
                    </span>
                  )}
                  {r.food_listing?.donor && (
                    <span className="prl-meta-item">
                      <User size={11} />
                      {r.food_listing.donor.first_name} {r.food_listing.donor.last_name}
                    </span>
                  )}
                  <span className="prl-meta-item">
                    <Clock size={11} />{timeAgo(r.created_at)}
                  </span>
                </div>
              </div>

              {/* Status */}
              <span
                className="prl-status"
                style={{ background: s.bg, color: s.color }}
              >
                {s.label}
              </span>

              <ArrowRight size={15} className="prl-arrow" />
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="prl-footer">
          <span className="prl-count">
            {startIndex}–{endIndex} of {totalItems}
          </span>
          <div className="prl-pages">
            <button
              className="prl-page-btn"
              onClick={previousPage}
              disabled={!canGoPrevious}
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .reduce((acc: (number | '...')[], p, i, arr) => {
                if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push('...');
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === '...'
                  ? <span key={`e${i}`} style={{ padding: '0 .25rem', color: '#d0d5dd' }}>…</span>
                  : <button
                      key={p}
                      className={`prl-page-btn ${p === currentPage ? 'active' : ''}`}
                      onClick={() => goToPage(p as number)}
                    >
                      {p}
                    </button>
              )
            }
            <button
              className="prl-page-btn"
              onClick={nextPage}
              disabled={!canGoNext}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
};

export default PaginatedReservationsList;
