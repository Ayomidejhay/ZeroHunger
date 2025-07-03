'use client';

import React from 'react'
import FoodGrid from '@/components/browse/FoodGrid';
import AdvancedFilters from '@/components/browse/AdvancedFilters';
import { useAdvancedSearch } from '@/hooks/useAdvancedSearch';
import { Badge } from '@/components/ui/badge';
import { ErrorBoundary } from '@/components/ui/error-boundary';

export default function page() {
    const {filters, setFilters, clearFilters, isLoading, foodListings, resultsCount} = useAdvancedSearch();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-defaultgreen/5 to-defaultorange/5">
      
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="saveplate-container py-8">
          <ErrorBoundary>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-neutral900 mb-2">
                Browse Available Food
              </h1>
              <p className="text-neutral600 mb-4">
                Discover fresh food donations in your community and help reduce waste
              </p>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="px-3 py-1">
                  {resultsCount} {resultsCount === 1 ? 'item' : 'items'} found
                </Badge>
                {(filters.searchQuery || filters.category || filters.location || 
                  filters.allergens.length > 0 || filters.expiryRange) && (
                  <Badge variant="secondary" className="px-3 py-1">
                    Filters active
                  </Badge>
                )}
              </div>
            </div>

            <AdvancedFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
            />

            <FoodGrid 
              foodListings={foodListings} 
              isLoading={isLoading}
            />
          </ErrorBoundary>
        </div>
      </main>
      
      
    </div>
  )
}
