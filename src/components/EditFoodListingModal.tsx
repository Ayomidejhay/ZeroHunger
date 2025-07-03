' use client ';

import React, { useState, useEffect} from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import AllergenSelector from './AllergenSelector';

interface FoodListing {
  id: string;
  title: string;
  description: string;
  quantity: string;
  category: string;
  location: string;
  pickup_instructions: string;
  expiration: string;
  pickup_time_start?: string;
  pickup_time_end?: string;
  allergens?: string[] | null;
}

interface EditFoodListingModalProps {
  listing: FoodListing;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const categories = [
  "Fresh Produce",
  "Prepared Food",
  "Canned Goods",
  "Bakery Items",
  "Dairy Products",
  "Frozen Foods",
  "Other"
];

const EditFoodListingModal = ({ listing, isOpen, onClose, onUpdate }: EditFoodListingModalProps) => {

      const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    category: "",
    location: "",
    pickup_instructions: "",
    expiration: "",
    pickup_time_start: "",
    pickup_time_end: "",
  });
  const [allergens, setAllergens] = useState<string[]>([]);

    useEffect(() => {
    if (listing) {
      setFormData({
        title: listing.title || "",
        description: listing.description || "",
        quantity: listing.quantity || "",
        category: listing.category || "",
        location: listing.location || "",
        pickup_instructions: listing.pickup_instructions || "",
        expiration: listing.expiration ? new Date(listing.expiration).toISOString().slice(0, 16) : "",
        pickup_time_start: listing.pickup_time_start ? new Date(listing.pickup_time_start).toISOString().slice(0, 16) : "",
        pickup_time_end: listing.pickup_time_end ? new Date(listing.pickup_time_end).toISOString().slice(0, 16) : "",
      });
      setAllergens(listing.allergens || []);
    }
  }, [listing]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('food_listings')
        .update({
          title: formData.title,
          description: formData.description,
          quantity: formData.quantity,
          category: formData.category,
          location: formData.location,
          pickup_instructions: formData.pickup_instructions,
          expiration: formData.expiration,
          pickup_time_start: formData.pickup_time_start || null,
          pickup_time_end: formData.pickup_time_end || null,
          allergens: allergens.length > 0 ? allergens : null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', listing.id);

      if (error) throw error;

     toast.success("Food listing updated", {
  description: "Your food listing has been updated successfully.",
});

      onUpdate();
      onClose();
    } catch (error: any) {
      console.error("Error updating food listing:", error);
      toast.error("Error updating listing", {
  description: error.message || "Something went wrong. Please try again.",
});
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Edit Food Listing</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Food Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                  placeholder="e.g., 5 servings, 2 loaves"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <AllergenSelector
              selectedAllergens={allergens}
              onAllergensChange={setAllergens}
              label="Contains Allergens"
              placeholder="Add allergen not listed above..."
            />

            <div>
              <Label htmlFor="location">Pickup Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="e.g., 123 Main St, City, State"
                required
              />
            </div>

            <div>
              <Label htmlFor="expiration">Available Until *</Label>
              <Input
                id="expiration"
                type="datetime-local"
                value={formData.expiration}
                onChange={(e) => handleInputChange("expiration", e.target.value)}
                required
              />
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Pickup Window (Optional)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pickup_time_start" className="text-sm">Earliest Pickup Time</Label>
                  <Input
                    id="pickup_time_start"
                    type="datetime-local"
                    value={formData.pickup_time_start}
                    onChange={(e) => handleInputChange("pickup_time_start", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="pickup_time_end" className="text-sm">Latest Pickup Time</Label>
                  <Input
                    id="pickup_time_end"
                    type="datetime-local"
                    value={formData.pickup_time_end}
                    onChange={(e) => handleInputChange("pickup_time_end", e.target.value)}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Specify when recipients can pick up the food. Leave empty if flexible.
              </p>
            </div>

            <div>
              <Label htmlFor="pickup_instructions">Pickup Instructions</Label>
              <Textarea
                id="pickup_instructions"
                value={formData.pickup_instructions}
                onChange={(e) => handleInputChange("pickup_instructions", e.target.value)}
                placeholder="Special instructions for pickup..."
                rows={3}
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-defaultgreen hover:bg-darkgreen"
              >
                {isLoading ? "Updating..." : "Update Listing"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditFoodListingModal