'use client';

import React, {useState} from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import {toast} from 'sonner';
import { Package, Edit3, Check} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '../ui/loading-spinner';
import { ErrorBoundary } from '../ui/error-boundary';

interface FoodListingsSectionProps {
    foodListings: any[];
    isLoading: boolean;
    onEditListing: (listing: any) => void;
    onDataUpdate: () => void;
}

const FoodListingsSection = ({foodListings, isLoading, onEditListing, onDataUpdate}: FoodListingsSectionProps) => {
    const router = useRouter();
  
  const [completingListings, setCompletingListings] = useState<Set<string>>(new Set());

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-defaultgreen">Available</Badge>;
      case 'reserved':
        return <Badge className="bg-defaultorange">Reserved</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Completed</Badge>;
      case 'expired':
        return <Badge variant="secondary">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const markAsCompleted = async (listingId: string) => {
    setCompletingListings(prev => new Set(prev.add(listingId)));
    
    try {
      const { error } = await supabase
        .from('food_listings')
        .update({ 
          status: 'completed',
          updated_at: new Date().toISOString()
        })
        .eq('id', listingId);

      if (error) throw error;

      toast.success("Success!", {
  description: "Food listing marked as completed. Thank you for helping reduce food waste!",
});

      onDataUpdate();
    } catch (error: any) {
      console.error("Error marking listing as completed:", error);
      toast.error("Error", {
  description: "Failed to mark listing as completed. Please try again.",
});
    } finally {
      setCompletingListings(prev => {
        const newSet = new Set(prev);
        newSet.delete(listingId);
        return newSet;
      });
    }
  };
  return (
    <ErrorBoundary>
      <Card>
        <CardHeader>
          <CardTitle>Your Food Listings</CardTitle>
          <CardDescription>
            Manage your active and past food donations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : foodListings.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-neutral400 mx-auto mb-4" />
              <p className="text-neutral600 mb-4">
                You haven't listed any food yet
              </p>
              <Button onClick={() => router.push("/donate")}>
                List Your First Item
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {foodListings.map((listing) => (
                <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-grow">
                    <h4 className="font-semibold">{listing.title}</h4>
                    <p className="text-sm text-neutral600">
                      {listing.quantity} • {listing.location}
                    </p>
                    <p className="text-xs text-neutral500">
                      Listed {new Date(listing.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(listing.status)}
                    <div className="flex space-x-1">
                      {listing.status === 'available' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEditListing(listing)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      )}
                      {listing.status === 'reserved' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsCompleted(listing.id)}
                          disabled={completingListings.has(listing.id)}
                          className="text-blue-600 border-blue-600 hover:bg-blue-50"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          {completingListings.has(listing.id) ? "Completing..." : "Mark Complete"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </ErrorBoundary>
  )
}

export default FoodListingsSection