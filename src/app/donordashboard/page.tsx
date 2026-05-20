



// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import { supabase } from '@/integrations/supabase/client';
// import { useAuth } from '@/context/AuthContext';
// import { toast } from 'sonner';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Badge } from '@/components/ui/badge';
// import Profile from '@/components/Profile';
// import NotificationBar from '@/components/NotificationBar';
// import EditFoodListingModal from '@/components/EditFoodListingModal';
// import DonorHeader from '@/components/dashboard/DonorHeader';
// import FoodListingsSection from '@/components/dashboard/FoodListingsSection';
// import DonorStats from '@/components/dashboard/DonorStats';
// import PendingReservationsAlert from '@/components/dashboard/PendingReservationsAlert';
// import PickupCard from '@/components/dashboard/PickupCard';
// import PendingReservationCard from '@/components/dashboard/PendingReservationCard';
// import { useRealtimeDonorUpdates } from '@/hooks/useRealtimeDonorUpdates';
// import { ErrorBoundary } from '@/components/ui/error-boundary';
// import { DonorDashboardSkeleton } from '@/components/ui/page-skeleton';

// export default function DonorDashboard() {
//   const router = useRouter();
//   // isLoading here is the AUTH loading state — true while the session/profile
//   // is being fetched on mount. Renamed to authLoading to avoid collision with
//   // the local data-loading state below.
//   const { user, profile, isLoading: authLoading } = useAuth();
//   const [dataLoading, setDataLoading] = useState(true);
//   const [foodListings, setFoodListings] = useState<any[]>([]);
//   const [allReservations, setAllReservations] = useState<any[]>([]);
//   const [stats, setStats] = useState({ active: 0, completed: 0, expired: 0, reserved: 0 });
//   const [editingListing, setEditingListing] = useState<any>(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//   const fetchDonorData = useCallback(async () => {
//     if (!user) return;
//     setDataLoading(true);
//     try {
//       // Fetch food listings
//       const { data: listings, error } = await supabase
//         .from('food_listings')
//         .select('*')
//         .eq('donor_id', user.id)
//         .order('created_at', { ascending: false });

//       if (error) throw error;
//       setFoodListings(listings || []);

//       const listingIds = (listings || []).map(l => l.id);

//       // Fetch ALL reservations for this donor's listings (all statuses)
//       if (listingIds.length > 0) {
//         const { data: reservations, error: reservationsError } = await supabase
//           .from('reservations')
//           .select(`
//             *,
//             food_listing:food_listings(*),
//             recipient:profiles(first_name, last_name, phone)
//           `)
//           .in('food_listing_id', listingIds)
//           .order('created_at', { ascending: false });

//         if (reservationsError) throw reservationsError;
//         setAllReservations(reservations || []);
//       } else {
//         setAllReservations([]);
//       }

//       const active = listings?.filter(l => l.status === 'available').length || 0;
//       const reserved = listings?.filter(l => l.status === 'reserved').length || 0;
//       const completed = listings?.filter(l => l.status === 'completed').length || 0;
//       const expired = listings?.filter(l => l.status === 'expired').length || 0;
//       setStats({ active, reserved, completed, expired });
//     } catch (error: any) {
//       console.error("Error fetching donor data:", error);
//       toast.error("Error loading dashboard", {
//         description: error.message || "Something went wrong. Please try again.",
//       });
//     } finally {
//       setDataLoading(false);
//     }
//   }, [user]);

//   useEffect(() => {
//     // Wait for AuthContext to finish its initial session + profile fetch.
//     // Without this guard, the effect runs with user=null and profile=null on
//     // first render, incorrectly sending logged-in users to /auth/login.
//     if (authLoading) return;

//     if (!user) {
//       router.push("/auth/login");
//       return;
//     }

//     // Profile is guaranteed loaded once authLoading=false and user exists.
//     if (profile?.user_type !== 'donor') {
//       router.push("/recipientdashboard");
//       return;
//     }

//     fetchDonorData();
//   }, [authLoading, user, profile, router, fetchDonorData]);

//   useRealtimeDonorUpdates({ userId: user?.id || '', onDataUpdate: fetchDonorData });

//   const handleEditListing = (listing: any) => {
//     setEditingListing(listing);
//     setIsEditModalOpen(true);
//   };

//   const handleCloseEditModal = () => {
//     setIsEditModalOpen(false);
//     setEditingListing(null);
//   };

//   // Derived reservation lists by status
//   const pendingReservations = allReservations.filter(r => r.status === 'pending');
//   const confirmedReservations = allReservations.filter(r => r.status === 'confirmed');
//   const completedReservations = allReservations.filter(r => r.status === 'completed');
//   const expiredReservations = allReservations.filter(r => r.status === 'expired');

//   const TabBadge = ({ count }: { count: number }) =>
//     count > 0 ? (
//       <Badge variant="secondary" className="ml-1 text-xs">{count}</Badge>
//     ) : null;

//   // Show spinner while auth session is being established OR while data is fetching.
//   // if (authLoading || dataLoading) {
//   //   return (
//   //     <div className="min-h-screen flex flex-col">
//   //       <main className="flex-grow flex items-center justify-center">
//   //         <p className="text-neutral600">Loading dashboard...</p>
//   //       </main>
//   //     </div>
//   //   );
//   // }
//   if (authLoading || dataLoading) return <DonorDashboardSkeleton/>;

//   return (
//     <ErrorBoundary>
//       <div className="min-h-screen flex flex-col">
//         <NotificationBar />

//         <main className="flex-grow py-10 bg-gray-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <DonorHeader firstName={profile?.first_name ?? ''} />

//             {/* Pending alert banner — quick glance at top */}
//             <PendingReservationsAlert
//               pendingReservations={pendingReservations}
//               onUpdate={fetchDonorData}
//             />

//             <DonorStats stats={stats} />

//             <Tabs defaultValue="dashboard" className="w-full">
//               <TabsList className="grid w-full grid-cols-3">
//                 <TabsTrigger value="dashboard">My Listings</TabsTrigger>
//                 <TabsTrigger value="reservations">
//                   Reservations
//                   <TabBadge count={pendingReservations.length} />
//                 </TabsTrigger>
//                 <TabsTrigger value="profile">Profile</TabsTrigger>
//               </TabsList>

//               {/* ── MY LISTINGS ── */}
//               <TabsContent value="dashboard" className="mt-6">
//                 <FoodListingsSection
//                   foodListings={foodListings}
//                   onEditListing={handleEditListing}
//                   onDataUpdate={fetchDonorData}
//                   isLoading={dataLoading}
//                 />
//               </TabsContent>

//               {/* ── RESERVATIONS ── */}
//               <TabsContent value="reservations" className="mt-6">
//                 <Tabs defaultValue="pending" className="w-full">
//                   <TabsList className="grid w-full grid-cols-4">
//                     <TabsTrigger value="pending">
//                       Pending <TabBadge count={pendingReservations.length} />
//                     </TabsTrigger>
//                     <TabsTrigger value="confirmed">
//                       Confirmed <TabBadge count={confirmedReservations.length} />
//                     </TabsTrigger>
//                     <TabsTrigger value="completed">
//                       Completed <TabBadge count={completedReservations.length} />
//                     </TabsTrigger>
//                     <TabsTrigger value="expired">
//                       Expired <TabBadge count={expiredReservations.length} />
//                     </TabsTrigger>
//                   </TabsList>

//                   {/* Pending */}
//                   <TabsContent value="pending" className="mt-4 space-y-4">
//                     {pendingReservations.length === 0 ? (
//                       <p className="text-center text-neutral600 py-10">No pending reservation requests.</p>
//                     ) : (
//                       pendingReservations.map(r => (
//                         <PendingReservationCard key={r.id} reservation={r} onUpdate={fetchDonorData} />
//                       ))
//                     )}
//                   </TabsContent>

//                   {/* Confirmed — donor can mark these as complete */}
//                   <TabsContent value="confirmed" className="mt-4 space-y-4">
//                     {confirmedReservations.length === 0 ? (
//                       <p className="text-center text-neutral600 py-10">No confirmed reservations.</p>
//                     ) : (
//                       confirmedReservations.map(r => (
//                         <PickupCard key={r.id} reservation={r} onUpdate={fetchDonorData} />
//                       ))
//                     )}
//                   </TabsContent>

//                   {/* Completed */}
//                   <TabsContent value="completed" className="mt-4 space-y-4">
//                     {completedReservations.length === 0 ? (
//                       <p className="text-center text-neutral600 py-10">No completed reservations yet.</p>
//                     ) : (
//                       completedReservations.map(r => (
//                         <PickupCard key={r.id} reservation={r} />
//                       ))
//                     )}
//                   </TabsContent>

//                   {/* Expired — read-only history, no action buttons needed */}
//                   <TabsContent value="expired" className="mt-4 space-y-4">
//                     {expiredReservations.length === 0 ? (
//                       <p className="text-center text-neutral600 py-10">No expired reservations.</p>
//                     ) : (
//                       expiredReservations.map(r => (
//                         <PickupCard key={r.id} reservation={r} />
//                       ))
//                     )}
//                   </TabsContent>
//                 </Tabs>
//               </TabsContent>

//               {/* ── PROFILE ── */}
//               <TabsContent value="profile" className="mt-6">
//                 <Profile />
//               </TabsContent>
//             </Tabs>
//           </div>
//         </main>

//         {editingListing && (
//           <EditFoodListingModal
//             listing={editingListing}
//             isOpen={isEditModalOpen}
//             onClose={handleCloseEditModal}
//             onUpdate={fetchDonorData}
//           />
//         )}
//       </div>
//     </ErrorBoundary>
//   );
// }


'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Profile from '@/components/Profile';
import NotificationBar from '@/components/NotificationBar';
import EditFoodListingModal from '@/components/EditFoodListingModal';
import DonorHeader from '@/components/dashboard/DonorHeader';
import FoodListingsSection from '@/components/dashboard/FoodListingsSection';
import DonorStats from '@/components/dashboard/DonorStats';
import { DonorDashboardSkeleton } from '@/components/ui/page-skeleton';
import PendingReservationsAlert from '@/components/dashboard/PendingReservationsAlert';
import PickupCard from '@/components/dashboard/PickupCard';
import PendingReservationCard from '@/components/dashboard/PendingReservationCard';
import { useRealtimeDonorUpdates } from '@/hooks/useRealtimeDonorUpdates';
import { ErrorBoundary } from '@/components/ui/error-boundary';

export default function DonorDashboard() {
  const router = useRouter();
  // isLoading here is the AUTH loading state — true while the session/profile
  // is being fetched on mount. Renamed to authLoading to avoid collision with
  // the local data-loading state below.
  const { user, profile, isLoading: authLoading } = useAuth();
  const [dataLoading, setDataLoading] = useState(false);
  const [foodListings, setFoodListings] = useState<any[]>([]);
  const [allReservations, setAllReservations] = useState<any[]>([]);
  const [stats, setStats] = useState({ active: 0, completed: 0, expired: 0, reserved: 0 });
  const [editingListing, setEditingListing] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchDonorData = useCallback(async () => {
    if (!user) return;
    setDataLoading(true);
    try {
      // Fetch food listings
      const { data: listings, error } = await supabase
        .from('food_listings')
        .select('*')
        .eq('donor_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFoodListings(listings || []);

      const listingIds = (listings || []).map(l => l.id);

      // Fetch ALL reservations for this donor's listings (all statuses)
      if (listingIds.length > 0) {
        const { data: reservations, error: reservationsError } = await supabase
          .from('reservations')
          .select(`
            *,
            food_listing:food_listings(*),
            recipient:profiles(first_name, last_name, phone)
          `)
          .in('food_listing_id', listingIds)
          .order('created_at', { ascending: false });

        if (reservationsError) throw reservationsError;
        setAllReservations(reservations || []);
      } else {
        setAllReservations([]);
      }

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
      setDataLoading(false);
    }
  }, [user]);

  // ── Guard effect ────────────────────────────────────────────────────────────
  // Deps are primitive values only (not objects/functions) so this runs
  // exactly once when auth settles — never on profile object re-renders.
  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.replace('/auth/login'); return; }
    if (profile?.user_type && profile.user_type !== 'donor') {
      router.replace('/recipientdashboard');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user?.id, profile?.user_type]);

  // ── Data fetch effect ────────────────────────────────────────────────────
  // Only runs once auth is confirmed and role is correct.
  useEffect(() => {
    if (authLoading || !user || profile?.user_type !== 'donor') return;
    fetchDonorData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user?.id, profile?.user_type]);

  useRealtimeDonorUpdates({ userId: user?.id || '', onDataUpdate: fetchDonorData });

  const handleEditListing = (listing: any) => {
    setEditingListing(listing);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingListing(null);
  };

  // Derived reservation lists by status
  const pendingReservations = allReservations.filter(r => r.status === 'pending');
  const confirmedReservations = allReservations.filter(r => r.status === 'confirmed');
  const completedReservations = allReservations.filter(r => r.status === 'completed');
  const expiredReservations = allReservations.filter(r => r.status === 'expired');

  const TabBadge = ({ count }: { count: number }) =>
    count > 0 ? (
      <Badge variant="secondary" className="ml-1 text-xs">{count}</Badge>
    ) : null;

  // Block render only while auth is being established.
  // dataLoading is handled inline — showing a skeleton for data re-fetches
  // would hide an already-rendered dashboard unnecessarily.
  if (authLoading) return <DonorDashboardSkeleton />;
  if (!user || profile?.user_type !== 'donor') return null;

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <NotificationBar />

        <main className="flex-grow py-10 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <DonorHeader firstName={profile?.first_name ?? ''} />

            {/* Pending alert banner — quick glance at top */}
            <PendingReservationsAlert
              pendingReservations={pendingReservations}
              onUpdate={fetchDonorData}
            />

            <DonorStats stats={stats} />

            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="dashboard">My Listings</TabsTrigger>
                <TabsTrigger value="reservations">
                  Reservations
                  <TabBadge count={pendingReservations.length} />
                </TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              {/* ── MY LISTINGS ── */}
              <TabsContent value="dashboard" className="mt-6">
                <FoodListingsSection
                  foodListings={foodListings}
                  onEditListing={handleEditListing}
                  onDataUpdate={fetchDonorData}
                  isLoading={dataLoading}
                />
              </TabsContent>

              {/* ── RESERVATIONS ── */}
              <TabsContent value="reservations" className="mt-6">
                <Tabs defaultValue="pending" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="pending">
                      Pending <TabBadge count={pendingReservations.length} />
                    </TabsTrigger>
                    <TabsTrigger value="confirmed">
                      Confirmed <TabBadge count={confirmedReservations.length} />
                    </TabsTrigger>
                    <TabsTrigger value="completed">
                      Completed <TabBadge count={completedReservations.length} />
                    </TabsTrigger>
                    <TabsTrigger value="expired">
                      Expired <TabBadge count={expiredReservations.length} />
                    </TabsTrigger>
                  </TabsList>

                  {/* Pending */}
                  <TabsContent value="pending" className="mt-4 space-y-4">
                    {pendingReservations.length === 0 ? (
                      <p className="text-center text-neutral600 py-10">No pending reservation requests.</p>
                    ) : (
                      pendingReservations.map(r => (
                        <PendingReservationCard key={r.id} reservation={r} onUpdate={fetchDonorData} />
                      ))
                    )}
                  </TabsContent>

                  {/* Confirmed — donor can mark these as complete */}
                  <TabsContent value="confirmed" className="mt-4 space-y-4">
                    {confirmedReservations.length === 0 ? (
                      <p className="text-center text-neutral600 py-10">No confirmed reservations.</p>
                    ) : (
                      confirmedReservations.map(r => (
                        <PickupCard key={r.id} reservation={r} onUpdate={fetchDonorData} />
                      ))
                    )}
                  </TabsContent>

                  {/* Completed */}
                  <TabsContent value="completed" className="mt-4 space-y-4">
                    {completedReservations.length === 0 ? (
                      <p className="text-center text-neutral600 py-10">No completed reservations yet.</p>
                    ) : (
                      completedReservations.map(r => (
                        <PickupCard key={r.id} reservation={r} />
                      ))
                    )}
                  </TabsContent>

                  {/* Expired — read-only history, no action buttons needed */}
                  <TabsContent value="expired" className="mt-4 space-y-4">
                    {expiredReservations.length === 0 ? (
                      <p className="text-center text-neutral600 py-10">No expired reservations.</p>
                    ) : (
                      expiredReservations.map(r => (
                        <PickupCard key={r.id} reservation={r} />
                      ))
                    )}
                  </TabsContent>
                </Tabs>
              </TabsContent>

              {/* ── PROFILE ── */}
              <TabsContent value="profile" className="mt-6">
                <Profile />
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {editingListing && (
          <EditFoodListingModal
            listing={editingListing}
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            onUpdate={fetchDonorData}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}