'use client';

import React, {useState} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Heart, X } from 'lucide-react';

const DIETARY_RESTRICTIONS = [
  "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", 
  "Nut-Free", "Kosher", "Halal", "Low-Sodium", "Diabetic-Friendly"
];

const ALLERGENS = [
  "Nuts", "Dairy", "Gluten", "Eggs", "Soy", "Shellfish", "Fish", "Sesame"
];

const PreferencesSection = () => {
      const { user, profile, refreshProfile } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>(
    profile?.dietary_restrictions || []
  );
  const [allergies, setAllergies] = useState<string[]>(
    profile?.allergies || []
  );

  const toggleDietaryRestriction = (restriction: string) => {
    setDietaryRestrictions(prev => 
      prev.includes(restriction) 
        ? prev.filter(r => r !== restriction)
        : [...prev, restriction]
    );
  };

  const toggleAllergy = (allergy: string) => {
    setAllergies(prev => 
      prev.includes(allergy) 
        ? prev.filter(a => a !== allergy)
        : [...prev, allergy]
    );
  };

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          dietary_restrictions: dietaryRestrictions,
          allergies: allergies
        })
        .eq('id', user.id);

      if (error) throw error;

      await refreshProfile();
      toast.success("Preferences updated", {
  description: "Your dietary preferences have been saved.",
});
    } catch (error: any) {
      toast.error("Error updating preferences", {
  description: error.message || "Something went wrong. Please try again.",
});
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Heart className="h-5 w-5 mr-2" />
          Dietary Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-base font-medium">Dietary Restrictions</Label>
          <p className="text-sm text-saveplate-neutral-600 mb-3">
            Select any dietary restrictions you follow
          </p>
          <div className="flex flex-wrap gap-2">
            {DIETARY_RESTRICTIONS.map(restriction => (
              <Button
                key={restriction}
                variant={dietaryRestrictions.includes(restriction) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleDietaryRestriction(restriction)}
                className="text-xs"
              >
                {restriction}
              </Button>
            ))}
          </div>
          {dietaryRestrictions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {dietaryRestrictions.map(restriction => (
                <Badge key={restriction} variant="secondary">
                  {restriction}
                  <button
                    onClick={() => toggleDietaryRestriction(restriction)}
                    className="ml-1 hover:bg-neutral300 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div>
          <Label className="text-base font-medium">Allergies</Label>
          <p className="text-sm text-neutral600 mb-3">
            Select any allergies you have to help filter food listings
          </p>
          <div className="flex flex-wrap gap-2">
            {ALLERGENS.map(allergy => (
              <Button
                key={allergy}
                variant={allergies.includes(allergy) ? "destructive" : "outline"}
                size="sm"
                onClick={() => toggleAllergy(allergy)}
                className="text-xs"
              >
                {allergy}
              </Button>
            ))}
          </div>
          {allergies.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {allergies.map(allergy => (
                <Badge key={allergy} variant="destructive">
                  {allergy}
                  <button
                    onClick={() => toggleAllergy(allergy)}
                    className="ml-1 hover:bg-red-200 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Button 
          onClick={handleSave} 
          disabled={isLoading}
          className="bg-defaultgreen hover:bg-darkgreen"
        >
          {isLoading ? "Saving..." : "Save Preferences"}
        </Button>
      </CardContent>
    </Card>
  )
}

export default PreferencesSection