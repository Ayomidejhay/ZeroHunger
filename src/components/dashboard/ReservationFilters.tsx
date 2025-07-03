'use client';

import React, {useState} from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { X, Filter, Search, Calendar, MapPin, Package } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

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
    reservations: any[]; // Replace with actual type for reservations
}


const ReservationFilters = ({filters, onFiltersChange, reservations}: ReservationFiltersProps) => {

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Extract unique values for filter options
  const uniqueLocations = [...new Set(reservations.map(r => r.food_listing?.location).filter(Boolean))];
  const uniqueCategories = [...new Set(reservations.map(r => r.food_listing?.category).filter(Boolean))];

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      sortBy: "newest",
      dateRange: "all",
      location: "all",
      category: "all"
    });
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => 
    key !== 'search' && key !== 'sortBy' && value !== "all" && value !== ""
  ).length;

  return (
    <div>
        <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search & Filter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by food title, location, or donor name..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Quick Filters and Sort */}
        <div className="flex flex-wrap gap-3 items-center">
          <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="pickup-time">Pickup Time</SelectItem>
              <SelectItem value="title">Title A-Z</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange('dateRange', value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>

          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Advanced Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Advanced Filters</h4>
                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="h-4 w-4 mr-1" />
                      Clear All
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </label>
                    <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="All locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All locations</SelectItem>
                        {uniqueLocations.map(location => (
                          <SelectItem key={location} value={location}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium flex items-center gap-2 mb-2">
                      <Package className="h-4 w-4" />
                      Category
                    </label>
                    <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All categories</SelectItem>
                        {uniqueCategories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Active Filters Display */}
        {(filters.search || activeFiltersCount > 0) && (
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            <span className="text-sm text-gray-600">Active filters:</span>
            {filters.search && (
              <Badge variant="outline" className="flex items-center gap-1">
                Search: "{filters.search}"
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => handleSearchChange("")}
                />
              </Badge>
            )}
            {filters.location && filters.location !== "all" && (
              <Badge variant="outline" className="flex items-center gap-1">
                Location: {filters.location}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => handleFilterChange('location', "all")}
                />
              </Badge>
            )}
            {filters.category && filters.category !== "all" && (
              <Badge variant="outline" className="flex items-center gap-1">
                Category: {filters.category}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => handleFilterChange('category', "all")}
                />
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
    </div>
  )
}

export default ReservationFilters