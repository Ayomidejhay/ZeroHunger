'use client';

import React, {useState} from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Filter } from 'lucide-react';

export interface FilterState{
    searchQuery: string;
    category: string;
    location: string;
    maxDistance: string;
    allergens: string[];
    expiryRange: string;
    sortBy: string;
}

interface AdvancedFiltersProps {
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    onClearFilters: () => void;
}

const FOOD_CATEGORIES = [
  "Fruits & Vegetables",
  "Dairy & Eggs",
  "Meat & Poultry", 
  "Seafood",
  "Bakery",
  "Pantry Items",
  "Prepared Foods",
  "Beverages",
  "Snacks",
  "Other"
];

const COMMON_ALLERGENS = [
  "Nuts",
  "Dairy",
  "Gluten",
  "Eggs",
  "Soy",
  "Shellfish",
  "Fish",
  "Sesame"
];

const AdvancedFilters = ({ filters, onFiltersChange, onClearFilters}: AdvancedFiltersProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const updateFilter = (key: keyof FilterState, value: any) => {
        onFiltersChange({
            ...filters,
            [key]: value
        });
    }

    const toggleAllergen = (allergen: string) => {
        const newAllergens = filters.allergens.includes(allergen)
            ? filters.allergens.filter(a => a !== allergen)
            : [...filters.allergens, allergen];
        updateFilter('allergens', newAllergens);
    }

    const removeAllergen = (allergen: string) => {
        updateFilter('allergens', filters.allergens.filter(a => a !== allergen));
    }

     const hasActiveFilters = 
    filters.searchQuery || 
    (filters.category && filters.category !== "all") || 
    filters.location || 
    (filters.maxDistance && filters.maxDistance !== "all") || 
    filters.allergens.length > 0 || 
    (filters.expiryRange && filters.expiryRange !== "all") ||
    (filters.sortBy && filters.sortBy !== 'newest');


  return (
    <div>
            <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Search & Filters
          </CardTitle>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="text-xs"
              >
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Less' : 'More'} Filters
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Search Bar */}
        <div>
          <Label htmlFor="search">Search food items</Label>
          <Input
            id="search"
            placeholder="Search by food name, description, or donor..."
            value={filters.searchQuery}
            onChange={(e) => updateFilter('searchQuery', e.target.value)}
            className="mt-1"
          />
        </div>

        {/* Basic Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={filters.category || "all"} onValueChange={(value) => updateFilter('category', value === "all" ? "" : value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {FOOD_CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="City or ZIP code"
              value={filters.location}
              onChange={(e) => updateFilter('location', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="sortBy">Sort by</Label>
            <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Newest first" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="expiry">Expiring soon</SelectItem>
                <SelectItem value="distance">Closest to me</SelectItem>
                <SelectItem value="quantity">Largest quantity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxDistance">Maximum distance</Label>
                <Select value={filters.maxDistance || "all"} onValueChange={(value) => updateFilter('maxDistance', value === "all" ? "" : value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Any distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any distance</SelectItem>
                    <SelectItem value="5">Within 5 miles</SelectItem>
                    <SelectItem value="10">Within 10 miles</SelectItem>
                    <SelectItem value="25">Within 25 miles</SelectItem>
                    <SelectItem value="50">Within 50 miles</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="expiryRange">Expiry timeframe</Label>
                <Select value={filters.expiryRange || "all"} onValueChange={(value) => updateFilter('expiryRange', value === "all" ? "" : value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Any timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any timeframe</SelectItem>
                    <SelectItem value="today">Expires today</SelectItem>
                    <SelectItem value="tomorrow">Expires tomorrow</SelectItem>
                    <SelectItem value="week">Expires this week</SelectItem>
                    <SelectItem value="month">Expires this month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Allergen Filters */}
            <div>
              <Label>Exclude allergens</Label>
              <div className="mt-2 space-y-2">
                <div className="flex flex-wrap gap-2">
                  {COMMON_ALLERGENS.map(allergen => (
                    <Button
                      key={allergen}
                      variant={filters.allergens.includes(allergen) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleAllergen(allergen)}
                      className="text-xs"
                    >
                      {allergen}
                    </Button>
                  ))}
                </div>
                
                {filters.allergens.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="text-sm text-neutral600 mr-2">Active filters:</span>
                    {filters.allergens.map(allergen => (
                      <Badge key={allergen} variant="secondary" className="text-xs">
                        {allergen}
                        <button
                          onClick={() => removeAllergen(allergen)}
                          className="ml-1 hover:bg-neutral300 rounded-full"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
    </div>
  )
}

export default AdvancedFilters