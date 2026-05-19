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
import { Search, Eye, CheckCircle, XCircle } from "lucide-react";

interface Reservation {
  id: string;
  status: string;
  pickup_time: string | null;
  created_at: string;
  notes: string | null;
  food_listings: {
    title: string;
    location: string;
  } | null;
  profiles: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}

export const ReservationManagement = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    fetchReservations();

    // Set up real-time subscription for reservation updates
    const channel = supabase
      .channel('reservations-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reservations'
        },
        (payload) => {
          console.log('Reservation change detected:', payload);
          fetchReservations(); // Refresh the reservations
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    filterReservations();
  }, [searchTerm, statusFilter, reservations]);

  const fetchReservations = async () => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select(`
          *,
          food_listings:food_listing_id (
            title,
            location
          ),
          profiles:recipient_id (
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReservations(data || []);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      toast.error("Error",
        {description: "Failed to fetch reservations"}
        
      );
    } finally {
      setIsLoading(false);
    }
  };

  const filterReservations = () => {
    let filtered = reservations;

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(reservation => 
        reservation.food_listings?.title.toLowerCase().includes(searchLower) ||
        reservation.food_listings?.location.toLowerCase().includes(searchLower) ||
        `${reservation.profiles?.first_name || ''} ${reservation.profiles?.last_name || ''}`.toLowerCase().includes(searchLower)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(reservation => reservation.status === statusFilter);
    }

    setFilteredReservations(filtered);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'confirmed': return 'default';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const updateReservationStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setReservations(prev => 
        prev.map(reservation => 
          reservation.id === id 
            ? { ...reservation, status: newStatus }
            : reservation
        )
      );

      toast.success("Success",
        {description: `Reservation ${newStatus} successfully`,
      });
    } catch (error) {
      console.error('Error updating reservation:', error);
      toast.error("Error",{
        description: "Failed to update reservation",
       
      });
    }
  };

  if (isLoading) {
    return <div>Loading reservations...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reservation Management</CardTitle>
          <CardDescription>Monitor and manage all food reservations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reservations..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Food Item</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pickup Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell className="font-medium">
                      {reservation.food_listings?.title || 'Unknown food item'}
                    </TableCell>
                    <TableCell>
                      {reservation.profiles?.first_name || reservation.profiles?.last_name
                        ? `${reservation.profiles.first_name || ''} ${reservation.profiles.last_name || ''}`.trim()
                        : 'Unknown recipient'
                      }
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(reservation.status)}>
                        {reservation.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {reservation.pickup_time 
                        ? new Date(reservation.pickup_time).toLocaleString()
                        : 'Not scheduled'
                      }
                    </TableCell>
                    <TableCell>
                      {reservation.food_listings?.location || 'Unknown'}
                    </TableCell>
                    <TableCell>
                      {new Date(reservation.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        {reservation.status === 'pending' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Confirm
                          </Button>
                        )}
                        {(reservation.status === 'pending' || reservation.status === 'confirmed') && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Cancel
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredReservations.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm || statusFilter !== "all" ? 'No reservations found matching your filters.' : 'No reservations found.'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};