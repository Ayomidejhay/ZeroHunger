// 'use client';

// import React, {useState} from 'react'
// import { Input } from '../ui/input';
// import { Button } from '../ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
// import { Label } from '../ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
// import { Badge } from '../ui/badge';
// import { X, Filter, Search, Calendar, MapPin, Package } from 'lucide-react';
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

// interface FilterState {
//     search: string;
//     sortBy: string;
//     dateRange: string;
//     location: string;
//     category: string;
// }

// interface ReservationFiltersProps {
//     filters: FilterState;
//     onFiltersChange: (filters: FilterState) => void;
//     reservations: any[]; // Replace with actual type for reservations
// }


// const ReservationFilters = ({filters, onFiltersChange, reservations}: ReservationFiltersProps) => {

//     const [isFilterOpen, setIsFilterOpen] = useState(false);

//     // Extract unique values for filter options
//   const uniqueLocations = [...new Set(reservations.map(r => r.food_listing?.location).filter(Boolean))];
//   const uniqueCategories = [...new Set(reservations.map(r => r.food_listing?.category).filter(Boolean))];

//   const handleSearchChange = (value: string) => {
//     onFiltersChange({ ...filters, search: value });
//   };

//   const handleFilterChange = (key: keyof FilterState, value: string) => {
//     onFiltersChange({ ...filters, [key]: value });
//   };

//   const clearFilters = () => {
//     onFiltersChange({
//       search: "",
//       sortBy: "newest",
//       dateRange: "all",
//       location: "all",
//       category: "all"
//     });
//   };

//   const activeFiltersCount = Object.entries(filters).filter(([key, value]) => 
//     key !== 'search' && key !== 'sortBy' && value !== "all" && value !== ""
//   ).length;

//   return (
//     <div>
//         <Card className="mb-6">
//       <CardHeader className="pb-3">
//         <CardTitle className="text-lg flex items-center gap-2">
//           <Search className="h-5 w-5" />
//           Search & Filter
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {/* Search Bar */}
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//           <Input
//             placeholder="Search by food title, location, or donor name..."
//             value={filters.search}
//             onChange={(e) => handleSearchChange(e.target.value)}
//             className="pl-10"
//           />
//         </div>

//         {/* Quick Filters and Sort */}
//         <div className="flex flex-wrap gap-3 items-center">
//           <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
//             <SelectTrigger className="w-40">
//               <SelectValue placeholder="Sort by" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="newest">Newest First</SelectItem>
//               <SelectItem value="oldest">Oldest First</SelectItem>
//               <SelectItem value="pickup-time">Pickup Time</SelectItem>
//               <SelectItem value="title">Title A-Z</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange('dateRange', value)}>
//             <SelectTrigger className="w-40">
//               <SelectValue placeholder="Date Range" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Time</SelectItem>
//               <SelectItem value="today">Today</SelectItem>
//               <SelectItem value="week">This Week</SelectItem>
//               <SelectItem value="month">This Month</SelectItem>
//             </SelectContent>
//           </Select>

//           <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
//             <PopoverTrigger asChild>
//               <Button variant="outline" className="flex items-center gap-2">
//                 <Filter className="h-4 w-4" />
//                 Advanced Filters
//                 {activeFiltersCount > 0 && (
//                   <Badge variant="secondary" className="ml-1">
//                     {activeFiltersCount}
//                   </Badge>
//                 )}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-80 p-4">
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <h4 className="font-medium">Advanced Filters</h4>
//                   {activeFiltersCount > 0 && (
//                     <Button variant="ghost" size="sm" onClick={clearFilters}>
//                       <X className="h-4 w-4 mr-1" />
//                       Clear All
//                     </Button>
//                   )}
//                 </div>

//                 <div className="space-y-3">
//                   <div>
//                     <label className="text-sm font-medium flex items-center gap-2 mb-2">
//                       <MapPin className="h-4 w-4" />
//                       Location
//                     </label>
//                     <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
//                       <SelectTrigger>
//                         <SelectValue placeholder="All locations" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="all">All locations</SelectItem>
//                         {uniqueLocations.map(location => (
//                           <SelectItem key={location} value={location}>{location}</SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium flex items-center gap-2 mb-2">
//                       <Package className="h-4 w-4" />
//                       Category
//                     </label>
//                     <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
//                       <SelectTrigger>
//                         <SelectValue placeholder="All categories" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="all">All categories</SelectItem>
//                         {uniqueCategories.map(category => (
//                           <SelectItem key={category} value={category}>{category}</SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//               </div>
//             </PopoverContent>
//           </Popover>
//         </div>

//         {/* Active Filters Display */}
//         {(filters.search || activeFiltersCount > 0) && (
//           <div className="flex flex-wrap gap-2 pt-2 border-t">
//             <span className="text-sm text-gray-600">Active filters:</span>
//             {filters.search && (
//               <Badge variant="outline" className="flex items-center gap-1">
//                 Search: "{filters.search}"
//                 <X 
//                   className="h-3 w-3 cursor-pointer" 
//                   onClick={() => handleSearchChange("")}
//                 />
//               </Badge>
//             )}
//             {filters.location && filters.location !== "all" && (
//               <Badge variant="outline" className="flex items-center gap-1">
//                 Location: {filters.location}
//                 <X 
//                   className="h-3 w-3 cursor-pointer" 
//                   onClick={() => handleFilterChange('location', "all")}
//                 />
//               </Badge>
//             )}
//             {filters.category && filters.category !== "all" && (
//               <Badge variant="outline" className="flex items-center gap-1">
//                 Category: {filters.category}
//                 <X 
//                   className="h-3 w-3 cursor-pointer" 
//                   onClick={() => handleFilterChange('category', "all")}
//                 />
//               </Badge>
//             )}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//     </div>
//   )
// }

// export default ReservationFilters

'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';

interface FilterState {
  search: string;
  sortBy: string;
  dateRange: string;
  location: string;
  category: string;
}

interface ReservationFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  reservations: any[];
}

const ReservationFilters = ({ filters, onFiltersChange, reservations }: ReservationFiltersProps) => {
  const [open, setOpen] = useState(false);

  const update = (key: keyof FilterState, value: string) =>
    onFiltersChange({ ...filters, [key]: value });

  const clear = () => onFiltersChange({
    search: '', sortBy: 'newest', dateRange: 'all', location: 'all', category: 'all'
  });

  const locations   = [...new Set(reservations.map(r => r.food_listing?.location).filter(Boolean))];
  const categories  = [...new Set(reservations.map(r => r.food_listing?.category).filter(Boolean))];

  const activeCount = [
    filters.location !== 'all' && filters.location,
    filters.category !== 'all' && filters.category,
    filters.dateRange !== 'all' && filters.dateRange,
  ].filter(Boolean).length;

  const hasAny = filters.search || activeCount > 0;

  return (
    <>
      <style>{`
        .rf-wrap { margin-bottom: 1.5rem; }
        .rf-bar {
          display: flex; gap: .75rem; flex-wrap: wrap;
          align-items: center;
        }
        .rf-search-wrap { position: relative; flex: 1; min-width: 200px; }
        .rf-search-icon {
          position: absolute; left: .85rem; top: 50%;
          transform: translateY(-50%); color: #98a2b3; pointer-events: none;
        }
        .rf-search {
          width: 100%; padding: .6rem .9rem .6rem 2.4rem;
          background: #f7f3ed; border: 1.5px solid #e8ecef;
          border-radius: 10px; font-size: .85rem; color: #1a3a2a;
          font-family: 'DM Sans', sans-serif; outline: none;
          transition: border-color .2s, background .2s;
        }
        .rf-search:focus { border-color: #76c43b; background: #fff; }
        .rf-search::placeholder { color: #d0d5dd; }

        .rf-select {
          padding: .6rem 2rem .6rem .9rem;
          background: #f7f3ed url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%2398a2b3' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right .65rem center;
          border: 1.5px solid #e8ecef; border-radius: 10px;
          font-size: .82rem; color: #344054;
          font-family: 'DM Sans', sans-serif; outline: none;
          -webkit-appearance: none; appearance: none; cursor: pointer;
          transition: border-color .2s, background .2s;
        }
        .rf-select:focus { border-color: #76c43b; background: #fff; }

        .rf-filter-btn {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .6rem 1rem;
          background: #f7f3ed; border: 1.5px solid #e8ecef;
          border-radius: 10px; font-size: .82rem; font-weight: 600;
          color: #344054; cursor: pointer; white-space: nowrap;
          font-family: 'DM Sans', sans-serif; transition: all .2s;
        }
        .rf-filter-btn.open,
        .rf-filter-btn:hover { border-color: #76c43b; color: #1a3a2a; background: #fff; }
        .rf-badge {
          background: #76c43b; color: #1a3a2a; font-size: .65rem;
          font-weight: 800; width: 17px; height: 17px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }

        .rf-clear {
          display: inline-flex; align-items: center; gap: .35rem;
          color: #98a2b3; font-size: .78rem; font-weight: 500;
          background: none; border: none; cursor: pointer;
          padding: .4rem .5rem; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; transition: all .2s;
        }
        .rf-clear:hover { color: #ef4444; background: rgba(239,68,68,.06); }

        .rf-panel {
          margin-top: .75rem;
          background: #fff; border: 1px solid #e8ecef;
          border-radius: 14px; padding: 1.25rem;
          display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          animation: rf-drop .2s ease both;
        }
        @keyframes rf-drop {
          from { opacity:0; transform:translateY(-6px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .rf-field label {
          display: block; font-size: .75rem; font-weight: 700;
          color: #344054; margin-bottom: .4rem;
        }
        .rf-field-select {
          width: 100%;
          padding: .6rem 2rem .6rem .85rem;
          background: #f7f3ed url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%2398a2b3' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right .65rem center;
          border: 1.5px solid #e8ecef; border-radius: 10px;
          font-size: .82rem; color: #344054;
          font-family: 'DM Sans', sans-serif; outline: none;
          -webkit-appearance: none; appearance: none; cursor: pointer;
          transition: border-color .2s, background .2s;
        }
        .rf-field-select:focus { border-color: #76c43b; background: #fff; }
      `}</style>

      <div className="rf-wrap">
        <div className="rf-bar">
          {/* Search */}
          <div className="rf-search-wrap">
            <div className="rf-search-icon"><Search size={15} /></div>
            <input
              className="rf-search"
              placeholder="Search by title, location, donor..."
              value={filters.search}
              onChange={e => update('search', e.target.value)}
            />
          </div>

          {/* Sort */}
          <select
            className="rf-select"
            value={filters.sortBy}
            onChange={e => update('sortBy', e.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="pickup-time">Pickup time</option>
            <option value="title">Title A–Z</option>
          </select>

          {/* Advanced toggle */}
          <button
            className={`rf-filter-btn ${open ? 'open' : ''}`}
            onClick={() => setOpen(v => !v)}
          >
            <SlidersHorizontal size={13} />
            Filters
            {activeCount > 0 && <span className="rf-badge">{activeCount}</span>}
            <ChevronDown
              size={12}
              style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .2s' }}
            />
          </button>

          {hasAny && (
            <button className="rf-clear" onClick={clear}>
              <X size={12} /> Clear
            </button>
          )}
        </div>

        {open && (
          <div className="rf-panel">
            <div className="rf-field">
              <label>Date range</label>
              <select
                className="rf-field-select"
                value={filters.dateRange}
                onChange={e => update('dateRange', e.target.value)}
              >
                <option value="all">All time</option>
                <option value="today">Today</option>
                <option value="week">This week</option>
                <option value="month">This month</option>
              </select>
            </div>
            <div className="rf-field">
              <label>Location</label>
              <select
                className="rf-field-select"
                value={filters.location}
                onChange={e => update('location', e.target.value)}
              >
                <option value="all">All locations</option>
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="rf-field">
              <label>Category</label>
              <select
                className="rf-field-select"
                value={filters.category}
                onChange={e => update('category', e.target.value)}
              >
                <option value="all">All categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ReservationFilters;
