// import React from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { useAuth } from '@/context/AuthContext';
// import { Star, Heart, User, Award } from "lucide-react";

// const StatsSection = () => {
//     const { profile } = useAuth();
//     const isDonor = profile?.user_type === 'donor';
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center">
//           <Award className="h-5 w-5 mr-2" />
//           Your Impact
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//           <div className="p-4 bg-defaultgreen/10 rounded-lg">
//             <Star className="h-8 w-8 text-defaultgreen mx-auto mb-2" />
//             <div className="text-2xl font-bold text-defaultgreen">4.8</div>
//             <div className="text-sm text-neutral-600">Rating</div>
//           </div>
          
//           {isDonor ? (
//             <>
//               <div className="p-4 bg-defaultorange/10 rounded-lg">
//                 <Heart className="h-8 w-8 text-defaultorange mx-auto mb-2" />
//                 <div className="text-2xl font-bold text-defaultorange">47</div>
//                 <div className="text-sm text-neutral600">Items Donated</div>
//               </div>
//               <div className="p-4 bg-defaultgreen/10 rounded-lg">
//                 <User className="h-8 w-8 text-defaultgreen mx-auto mb-2" />
//                 <div className="text-2xl font-bold text-defaultgreen">23</div>
//                 <div className="text-sm text-neutral600">People Helped</div>
//               </div>
//               <div className="p-4 bg-defaultorange/10 rounded-lg">
//                 <Award className="h-8 w-8 text-defaultorange mx-auto mb-2" />
//                 <div className="text-2xl font-bold text-defaultorange">156</div>
//                 <div className="text-sm text-neutral600">lbs Saved</div>
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="p-4 bg-orange/10 rounded-lg">
//                 <Heart className="h-8 w-8 text-defaultorange mx-auto mb-2" />
//                 <div className="text-2xl font-bold text-defaultorange">12</div>
//                 <div className="text-sm text-neutral600">Items Received</div>
//               </div>
//               <div className="p-4 bg-defaultgreen/10 rounded-lg">
//                 <User className="h-8 w-8 text-defaultgreen mx-auto mb-2" />
//                 <div className="text-2xl font-bold text-defaultgreen">8</div>
//                 <div className="text-sm text-neutral600">Donors Met</div>
//               </div>
//               <div className="p-4 bg-defaultorange/10 rounded-lg">
//                 <Award className="h-8 w-8 text-defaultorange mx-auto mb-2" />
//                 <div className="text-2xl font-bold text-defaultorange">34</div>
//                 <div className="text-sm text-neutral600">lbs Received</div>
//               </div>
//             </>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// export default StatsSection

'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Star, Heart, User, Award, Loader2 } from 'lucide-react';

interface ImpactStats {
  itemsCount: number;       // donations made (donor) or pickups completed (recipient)
  peopleCount: number;      // unique recipients helped (donor) or unique donors met (recipient)
  lbsSaved: number;         // estimated weight — 1 item ≈ 2 lbs as a baseline
  rating: number;           // placeholder — extend when you add a ratings table
}

const StatsSection = () => {
  const { user, profile } = useAuth();
  const isDonor = profile?.user_type === 'donor';
  const [stats, setStats] = useState<ImpactStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      setLoading(true);
      try {
        if (isDonor) {
          // Donor impact: completed food listings they created
          const { data: listings, error } = await supabase
            .from('food_listings')
            .select('id')
            .eq('donor_id', user.id)
            .eq('status', 'completed');

          if (error) throw error;

          const listingIds = (listings || []).map((l) => l.id);
          let peopleCount = 0;

          if (listingIds.length > 0) {
            // Count unique recipients across all completed reservations
            const { data: reservations, error: rErr } = await supabase
              .from('reservations')
              .select('recipient_id')
              .in('food_listing_id', listingIds)
              .eq('status', 'completed');

            if (rErr) throw rErr;
            const uniqueRecipients = new Set((reservations || []).map((r) => r.recipient_id));
            peopleCount = uniqueRecipients.size;
          }

          setStats({
            itemsCount: listingIds.length,
            peopleCount,
            lbsSaved: listingIds.length * 2,
            rating: 4.8,
          });
        } else {
          // Recipient impact: completed reservations they made
          const { data: reservations, error } = await supabase
            .from('reservations')
            .select('food_listing_id, food_listing:food_listings(donor_id)')
            .eq('recipient_id', user.id)
            .eq('status', 'completed');

          if (error) throw error;

          const completed = reservations || [];
          const uniqueDonors = new Set(
            completed
              .map((r: any) => r.food_listing?.donor_id)
              .filter(Boolean)
          );

          setStats({
            itemsCount: completed.length,
            peopleCount: uniqueDonors.size,
            lbsSaved: completed.length * 2,
            rating: 4.8,
          });
        }
      } catch (err) {
        console.error('Error fetching impact stats:', err);
        // Fall back to zeros rather than showing stale hardcoded numbers
        setStats({ itemsCount: 0, peopleCount: 0, lbsSaved: 0, rating: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, isDonor]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="h-5 w-5 mr-2" />
          Your Impact
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-defaultgreen" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-defaultgreen/10 rounded-lg">
              <Star className="h-8 w-8 text-defaultgreen mx-auto mb-2" />
              <div className="text-2xl font-bold text-defaultgreen">
                {stats?.rating?.toFixed(1) ?? '—'}
              </div>
              <div className="text-sm text-neutral-600">Rating</div>
            </div>

            {isDonor ? (
              <>
                <div className="p-4 bg-defaultorange/10 rounded-lg">
                  <Heart className="h-8 w-8 text-defaultorange mx-auto mb-2" />
                  <div className="text-2xl font-bold text-defaultorange">{stats?.itemsCount ?? 0}</div>
                  <div className="text-sm text-neutral600">Items Donated</div>
                </div>
                <div className="p-4 bg-defaultgreen/10 rounded-lg">
                  <User className="h-8 w-8 text-defaultgreen mx-auto mb-2" />
                  <div className="text-2xl font-bold text-defaultgreen">{stats?.peopleCount ?? 0}</div>
                  <div className="text-sm text-neutral600">People Helped</div>
                </div>
                <div className="p-4 bg-defaultorange/10 rounded-lg">
                  <Award className="h-8 w-8 text-defaultorange mx-auto mb-2" />
                  <div className="text-2xl font-bold text-defaultorange">{stats?.lbsSaved ?? 0}</div>
                  <div className="text-sm text-neutral600">lbs Saved</div>
                </div>
              </>
            ) : (
              <>
                <div className="p-4 bg-orange/10 rounded-lg">
                  <Heart className="h-8 w-8 text-defaultorange mx-auto mb-2" />
                  <div className="text-2xl font-bold text-defaultorange">{stats?.itemsCount ?? 0}</div>
                  <div className="text-sm text-neutral600">Items Received</div>
                </div>
                <div className="p-4 bg-defaultgreen/10 rounded-lg">
                  <User className="h-8 w-8 text-defaultgreen mx-auto mb-2" />
                  <div className="text-2xl font-bold text-defaultgreen">{stats?.peopleCount ?? 0}</div>
                  <div className="text-sm text-neutral600">Donors Met</div>
                </div>
                <div className="p-4 bg-defaultorange/10 rounded-lg">
                  <Award className="h-8 w-8 text-defaultorange mx-auto mb-2" />
                  <div className="text-2xl font-bold text-defaultorange">{stats?.lbsSaved ?? 0}</div>
                  <div className="text-sm text-neutral600">lbs Received</div>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsSection;
