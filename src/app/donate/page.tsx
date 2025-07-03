'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Leaf, Upload } from 'lucide-react';
import AllergenSelector from '@/components/AllergenSelector';

const categories = [
  "Fresh Produce",
  "Prepared Food",
  "Canned Goods",
  "Bakery Items",
  "Dairy Products",
  "Frozen Foods",
  "Other"
];


export default function page() {
  const router = useRouter();
  const { user, profile } = useAuth();
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
    if (!user) {
      router.push("/auth/login");
      return;
    }
    
    if (profile && profile.user_type !== 'donor') {
      router.push("/recipientdashboard");
      return;
    }
  }, [user, profile, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('food_listings')
        .insert({
          donor_id: user.id,
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
        });

      if (error) throw error;

      toast.success("Food listed successfully!", {
  description: "Your food item has been listed and recipients will be notified.",
});

      router.push("/donordashboard");
    } catch (error: any) {
      console.error("Error creating food listing:", error);
      toast.error("Error listing food", {
  description: error.message || "Something went wrong. Please try again.",
});
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="">
      
      
      <main className="flex-grow py-10 bg-gray-50">
        <div className="saveplate-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              {/*<div className="flex justify-center mb-4">
                <div className="p-3 bg-defaultgreen rounded-full">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
              </div>*/}
              <h1 className="text-3xl font-bold text-neutral900 mb-2">
                Donate Food
              </h1>
              <p className="text-neutral600">
                List your surplus food to help reduce waste and feed those in need
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Food Details</CardTitle>
                <CardDescription>
                  Provide information about the food you'd like to donate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title">Food Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="e.g., Fresh vegetables, Homemade lasagna"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe the food item, ingredients, cooking method, etc."
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
                      placeholder="Special instructions for pickup (e.g., ring doorbell, go to back door, etc.)"
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-defaultgreen hover:bg-darkgreen"
                  >
                    {isLoading ? "Listing Food..." : "List Food for Donation"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      
    </div>
  )
}
