'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Search, Eye, Trash2, AlertTriangle } from "lucide-react";

interface FoodListing {
  id: string;
  title: string;
  category: string;
  status: string;
  expiration: string;
  location: string;
  created_at: string;
  profiles: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}

export const FoodListingManagement = () => {
  const [listings, setListings] = useState<FoodListing[]>([]);
  const [filteredListings, setFilteredListings] = useState<FoodListing[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
 

  useEffect(() => {
    fetchListings();

    // Set up real-time subscription for food listing updates
    const channel = supabase
      .channel('food-listings-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'food_listings'
        },
        (payload) => {
          console.log('Food listing change detected:', payload);
          fetchListings(); // Refresh the food listings
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    filterListings();
  }, [searchTerm, statusFilter, listings]);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('food_listings')
        .select(`
          *,
          profiles:donor_id (
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      
      toast('Error', {description: "Failed to fetch food listings"})
    } finally {
      setIsLoading(false);
    }
  };

  const filterListings = () => {
    let filtered = listings;

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(searchLower) ||
        listing.category.toLowerCase().includes(searchLower) ||
        listing.location.toLowerCase().includes(searchLower)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(listing => listing.status === statusFilter);
    }

    setFilteredListings(filtered);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'available': return 'default';
      case 'reserved': return 'secondary';
      case 'completed': return 'outline';
      case 'expired': return 'destructive';
      default: return 'outline';
    }
  };

  const isExpiringSoon = (expiration: string) => {
    const expirationDate = new Date(expiration);
    const now = new Date();
    const hoursUntilExpiration = (expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursUntilExpiration < 24 && hoursUntilExpiration > 0;
  };

  const handleDeleteListing = async (id: string) => {
    try {
      const { error } = await supabase
        .from('food_listings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setListings(prev => prev.filter(listing => listing.id !== id));
      
      toast.success("Success", {description: "Food listing deleted successfully"})
    } catch (error) {
      console.error('Error deleting listing:', error);
      
      toast.error("Error", {description: "Failed to delete food listing"})
    }
  };

  if (isLoading) {
    return <div>Loading food listings...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Food Listing Management</CardTitle>
          <CardDescription>Monitor and manage all food listings in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Donor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expiration</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredListings.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {listing.title}
                        {isExpiringSoon(listing.expiration) && (
                          <AlertTriangle className="h-4 w-4 text-yellow-500 ml-2" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {listing.profiles?.first_name || listing.profiles?.last_name
                        ? `${listing.profiles.first_name || ''} ${listing.profiles.last_name || ''}`.trim()
                        : 'Unknown donor'
                      }
                    </TableCell>
                    <TableCell>{listing.category}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(listing.status)}>
                        {listing.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className={isExpiringSoon(listing.expiration) ? "text-yellow-600" : ""}>
                        {new Date(listing.expiration).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>{listing.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => handleDeleteListing(listing.id)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm || statusFilter !== "all" ? 'No listings found matching your filters.' : 'No food listings found.'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};