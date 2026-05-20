

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Search, Bell, MapPin, Clock, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface QuickActionsProps {
  stats: {
    pending: number;
    confirmed: number;
    completed: number;
    expired: number;
  };
  upcomingPickups: number;
}

const QuickActions = ({ stats, upcomingPickups }: QuickActionsProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const [sendingReminders, setSendingReminders] = useState(false);

  /**
   * Pickup Reminders — fetches all confirmed reservations that have a pickup
   * window starting within the next 24 hours and inserts a notification for
   * each one. Avoids duplicates by checking for an existing reminder today.
   */
  const handlePickupReminders = async () => {
    if (!user || stats.confirmed === 0) return;
    setSendingReminders(true);

    try {
      const now = new Date();
      const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

      // Fetch confirmed reservations with pickup windows in the next 24 hours
      const { data: upcoming, error } = await supabase
        .from('reservations')
        .select(`
          id,
          food_listing:food_listings(
            id, title, location, pickup_time_start, pickup_time_end
          )
        `)
        .eq('recipient_id', user.id)
        .eq('status', 'confirmed');

      if (error) throw error;

      const due = (upcoming || []).filter((r: any) => {
        const start = r.food_listing?.pickup_time_start;
        if (!start) return false;
        const t = new Date(start);
        return t >= now && t <= in24h;
      });

      if (due.length === 0) {
        toast.info('No upcoming pickups', {
          description: 'You have no confirmed pickups scheduled in the next 24 hours.',
        });
        return;
      }

      // Check which ones already have a reminder sent today to avoid duplicates
      const todayStart = new Date(now);
      todayStart.setHours(0, 0, 0, 0);

      const { data: existing } = await supabase
        .from('notifications')
        .select('message')
        .eq('user_id', user.id)
        .eq('title', 'Pickup Reminder')
        .gte('created_at', todayStart.toISOString());

      const alreadySent = new Set((existing || []).map((n: any) => n.message));

      const formatTime = (iso: string) =>
        new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const notifications = due
        .map((r: any) => {
          const listing = r.food_listing;
          const timeStr = listing?.pickup_time_start
            ? `at ${formatTime(listing.pickup_time_start)}`
            : 'today';
          const message = `Don't forget to pick up "${listing?.title}" from ${listing?.location} ${timeStr}.`;
          return { message, listing };
        })
        .filter(({ message }) => !alreadySent.has(message))
        .map(({ message }) => ({
          user_id: user.id,
          title: 'Pickup Reminder',
          message,
          type: 'success',
          read: false,
        }));

      if (notifications.length === 0) {
        toast.info('Already reminded', {
          description: "You've already been reminded about your upcoming pickups today.",
        });
        return;
      }

      const { error: insertError } = await supabase
        .from('notifications')
        .insert(notifications);

      if (insertError) throw insertError;

      toast.success(`${notifications.length} reminder${notifications.length > 1 ? 's' : ''} sent!`, {
        description: 'Check your notification bell for pickup details.',
      });
    } catch (err: any) {
      console.error('Error sending pickup reminders:', err);
      toast.error('Failed to send reminders', {
        description: err.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setSendingReminders(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          Quick Actions
          {upcomingPickups > 0 && (
            <Badge className="bg-defaultorange flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {upcomingPickups} upcoming
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Browse food */}
          <div
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => router.push('/browse')}
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-defaultgreen">
                <Search className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900">Browse New Food</h4>
                <p className="text-sm text-gray-600 mt-1">Find fresh food donations in your area</p>
              </div>
            </div>
          </div>

          {/* View map */}
          <div
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => router.push('/browse?view=map')}
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-gray-100">
                <MapPin className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900">View Map</h4>
                <p className="text-sm text-gray-600 mt-1">See nearby food locations on map</p>
              </div>
            </div>
          </div>

          {/* Pickup reminders — now functional */}
          <div
            className={`p-4 border rounded-lg transition-colors ${
              stats.confirmed > 0 && !sendingReminders
                ? 'hover:bg-gray-50 cursor-pointer'
                : 'opacity-50 cursor-not-allowed'
            }`}
            onClick={stats.confirmed > 0 && !sendingReminders ? handlePickupReminders : undefined}
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-gray-100">
                {sendingReminders ? (
                  <Loader2 className="h-5 w-5 text-gray-600 animate-spin" />
                ) : (
                  <Bell className="h-5 w-5 text-gray-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium ${stats.confirmed === 0 ? 'text-gray-400' : 'text-gray-900'}`}>
                  {sendingReminders ? 'Sending...' : 'Pickup Reminders'}
                </h4>
                <p className={`text-sm mt-1 ${stats.confirmed === 0 ? 'text-gray-300' : 'text-gray-600'}`}>
                  {stats.confirmed === 0
                    ? 'No confirmed pickups yet'
                    : 'Send reminders for upcoming pickups'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
