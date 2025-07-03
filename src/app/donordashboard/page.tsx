'use client';

import React, {useState, useEffect, useCallback} from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Profile from '@/components/Profile';
import NotificationBar from '@/components/NotificationBar';
import EditFoodListingModal from '@/components/EditFoodListingModal';
import DonorHeader from '@/components/dashboard/DonorHeader';
import FoodListingsSection from '@/components/dashboard/FoodListingsSection';
import DonorStats from '@/components/dashboard/DonorStats';
import PendingReservationsAlert from '@/components/dashboard/PendingReservationsAlert';
import { useRealtimeDonorUpdates } from '@/hooks/useRealtimeDonorUpdates';
import { ErrorBoundary } from '@/components/ui/error-boundary';

export default function page() {
    const router = useRouter();
  const { user, profile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [foodListings, setFoodListings] = useState<any[]>([]);
  const [pendingReservations, setPendingReservations] = useState<any[]>([]);
  const [stats, setStats] = useState({ active: 0, completed: 0, expired: 0, reserved: 0 });
  const [editingListing, setEditingListing] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchDonorData = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Fetch food listings
      const { data: listings, error } = await supabase
        .from('food_listings')
        .select('*')
        .eq('donor_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setFoodListings(listings || []);

      // Fetch pending reservations with recipient info
      const { data: reservations, error: reservationsError } = await supabase
        .from('reservations')
        .select(`
          *,
          food_listing:food_listings(*),
          recipient:profiles(first_name, last_name)
        `)
        .eq('status', 'pending')
        .in('food_listing_id', (listings || []).map(l => l.id));

      if (reservationsError) throw reservationsError;

      console.log('Fetched pending reservations:', reservations);
      setPendingReservations(reservations || []);

      const active = listings?.filter(l => l.status === 'available').length || 0;
      const reserved = listings?.filter(l => l.status === 'reserved').length || 0;
      const completed = listings?.filter(l => l.status === 'completed').length || 0;
      const expired = listings?.filter(l => l.status === 'expired').length || 0;
      
      setStats({ active, reserved, completed, expired });
    } catch (error: any) {
      console.error("Error fetching donor data:", error);
      toast.error("Error loading dashboard", {
  description: error.message || "Something went wrong. Please try again.",
});
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    
    if (profile && profile.user_type !== 'donor') {
      router.push("/recipientdashboard");
      return;
    }

    fetchDonorData();
  }, [user, profile, router, fetchDonorData]);

  // Set up real-time updates
  useRealtimeDonorUpdates({
    userId: user?.id || '',
    onDataUpdate: fetchDonorData
  });

  const handleEditListing = (listing: any) => {
    setEditingListing(listing);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingListing(null);
  };

  const handleUpdateSuccess = () => {
    fetchDonorData();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        
        <main className="flex-grow flex items-center justify-center">
          <p className="text-neutral600">Loading dashboard...</p>
        </main>
        
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        
        <NotificationBar />
        
        <main className="flex-grow py-10 bg-gray-50">
          <div className="saveplate-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <DonorHeader firstName={profile?.first_name ?? ''} />

              <PendingReservationsAlert 
                pendingReservations={pendingReservations}
                onUpdate={fetchDonorData}
              />

              <DonorStats stats={stats} />

              {/* Tabs for Dashboard and Profile */}
              <Tabs defaultValue="dashboard" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                </TabsList>
                
                <TabsContent value="dashboard" className="mt-6">
                  <FoodListingsSection
                    foodListings={foodListings}
                    onEditListing={handleEditListing}
                    onDataUpdate={fetchDonorData}
                    isLoading={isLoading}
                  />
                </TabsContent>

                <TabsContent value="profile" className="mt-6">
                  <Profile />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
        
        {editingListing && (
          <EditFoodListingModal
            listing={editingListing}
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            onUpdate={handleUpdateSuccess}
          />
        )}
        
        
      </div>
    </ErrorBoundary>
  )
}
