import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FOOD_CATEGORIES = [
  "All Categories",
  "Baked Goods",
  "Produce",
  "Dairy",
  "Prepared Food",
  "Canned Goods",
  "Beverages",
  "Other",
];

interface BrowseFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onRefresh: () => void;
}

const BrowseFilters = ({searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, onRefresh}: BrowseFiltersProps) => {
  return (
        <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="flex-grow">
        <Input
          placeholder="Search by title, description, or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="w-full md:w-60">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            {FOOD_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button variant="outline" onClick={onRefresh}>
        Refresh
      </Button>
    </div>
  )
}

export default BrowseFilters