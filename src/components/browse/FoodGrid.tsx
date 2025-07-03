import React from 'react'
import PaginatedFoodGrid from './PaginatedFoodGrid'

interface FoodGridProps {
  isLoading: boolean;
  foodListings: any[];
}

const FoodGrid = ({isLoading, foodListings}: FoodGridProps) => {
  return (
    <PaginatedFoodGrid
      isLoading={isLoading}
        foodListings={foodListings}
        itemsPerPage={12}
    />
  )
}

export default FoodGrid