'use client';

import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AllergenSelectorProps {
  selectedAllergens: string[];
  onAllergensChange: (allergens: string[]) => void;
  label: string;
  placeholder?: string;
}

const commonAllergens = [
  "Milk",
  "Eggs", 
  "Fish",
  "Shellfish",
  "Tree nuts",
  "Peanuts",
  "Wheat",
  "Soybeans",
  "Sesame",
  "Gluten"
];

const AllergenSelector = ({ selectedAllergens, onAllergensChange, label, placeholder}: AllergenSelectorProps) => {

     const [customAllergen, setCustomAllergen] = useState("");

  const addAllergen = (allergen: string) => {
    if (allergen && !selectedAllergens.includes(allergen)) {
      onAllergensChange([...selectedAllergens, allergen]);
    }
  };

  const removeAllergen = (allergen: string) => {
    onAllergensChange(selectedAllergens.filter(a => a !== allergen));
  };

  const addCustomAllergen = () => {
    if (customAllergen.trim()) {
      addAllergen(customAllergen.trim());
      setCustomAllergen("");
    }
  };
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-neutral700">
        {label}
      </label>
      
      {/* Selected allergens */}
      {selectedAllergens.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedAllergens.map((allergen) => (
            <Badge key={allergen} variant="secondary" className="flex items-center gap-1">
              {allergen}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeAllergen(allergen)}
              />
            </Badge>
          ))}
        </div>
      )}

      {/* Common allergens */}
      <div className="space-y-2">
        <p className="text-xs text-neutral600">Common allergens:</p>
        <div className="flex flex-wrap gap-2">
          {commonAllergens.map((allergen) => (
            <Button
              key={allergen}
              type="button"
              variant="outline"
              size="sm"
              className={selectedAllergens.includes(allergen) ? "bg-defaultgreen text-white" : ""}
              onClick={() => 
                selectedAllergens.includes(allergen) 
                  ? removeAllergen(allergen)
                  : addAllergen(allergen)
              }
            >
              {allergen}
            </Button>
          ))}
        </div>
      </div>

      {/* Custom allergen input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={customAllergen}
          onChange={(e) => setCustomAllergen(e.target.value)}
          placeholder={placeholder || "Add custom allergen..."}
          className="flex-1 px-3 py-2 text-sm border border-neutral300 rounded-md focus:outline-none focus:ring-2 focus:ring-defaultgreen"
          onKeyPress={(e) => e.key === 'Enter' && addCustomAllergen()}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addCustomAllergen}
        >
          Add
        </Button>
      </div>
    </div>
  )
}

export default AllergenSelector