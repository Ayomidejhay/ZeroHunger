'use client'

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { RefreshCw, AlertTriangle, Database, Users, Activity } from "lucide-react";

interface SystemHealth {
  totalUsers: number;
  activeListings: number;
  pendingReservations: number;
  expiredListings: number;
  recentSignups: number;
  lastWeekDonations: number;
}

export const SystemOverview = () => {
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    totalUsers: 0,
    activeListings: 0,
    pendingReservations: 0,
    expiredListings: 0,
    recentSignups: 0,
    lastWeekDonations: 0,
  });
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetchSystemHealth();
  }, []);

  const fetchSystemHealth = async () => {
    try {
      setIsLoading(true);
      
      // Fetch total users
      const { data: profiles } = await supabase
        .from('profiles')
        .select('created_at');

      const totalUsers = profiles?.length || 0;
      
      // Recent signups (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentSignups = profiles?.filter(
        profile => new Date(profile.created_at) > sevenDaysAgo
      ).length || 0;

      // Fetch active food listings
      const { data: listings } = await supabase
        .from('food_listings')
        .select('status, expiration');

      const activeListings = listings?.filter(listing => listing.status === 'available').length || 0;
      
      // Check for expired listings
      const now = new Date();
      const expiredListings = listings?.filter(
        listing => new Date(listing.expiration) < now
      ).length || 0;

      // Fetch pending reservations
      const { data: reservations } = await supabase
        .from('reservations')
        .select('status');

      const pendingReservations = reservations?.filter(
        reservation => reservation.status === 'pending'
      ).length || 0;

      // Fetch last week donations
      const { data: donations } = await supabase
        .from('donation_history')
        .select('donated_at')
        .gte('donated_at', sevenDaysAgo.toISOString());

      const lastWeekDonations = donations?.length || 0;

      setSystemHealth({
        totalUsers,
        activeListings,
        pendingReservations,
        expiredListings,
        recentSignups,
        lastWeekDonations,
      });

    } catch (error) {
      console.error('Error fetching system health:', error);
      toast.success("Error",{
        description: "Failed to fetch system health data",
        
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getSystemStatus = () => {
    if (systemHealth.expiredListings > 10) return 'warning';
    if (systemHealth.pendingReservations > 20) return 'warning';
    return 'healthy';
  };

  const handleRefresh = () => {
    fetchSystemHealth();
    toast("Refreshed",{
      description: "System data has been refreshed",
    });
  };

  if (isLoading) {
    return <div>Loading system overview...</div>;
  }

  const systemStatus = getSystemStatus();

  return (
    <div className="space-y-6">
      {/* System Status Alert */}
      {systemStatus === 'warning' && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            System requires attention: {systemHealth.expiredListings > 10 && 'High number of expired listings. '}
            {systemHealth.pendingReservations > 20 && 'High number of pending reservations.'}
          </AlertDescription>
        </Alert>
      )}

      {/* System Health Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Badge variant={systemStatus === 'healthy' ? 'default' : 'destructive'}>
                {systemStatus === 'healthy' ? 'Healthy' : 'Needs Attention'}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.activeListings}</div>
            <p className="text-xs text-muted-foreground">
              {systemHealth.expiredListings} expired listings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.recentSignups}</div>
            <p className="text-xs text-muted-foreground">
              New users this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Information */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Metrics</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Users</span>
              <Badge variant="outline">{systemHealth.totalUsers}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Pending Reservations</span>
              <Badge variant={systemHealth.pendingReservations > 20 ? 'destructive' : 'outline'}>
                {systemHealth.pendingReservations}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Weekly Donations</span>
              <Badge variant="outline">{systemHealth.lastWeekDonations}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Expired Listings</span>
              <Badge variant={systemHealth.expiredListings > 10 ? 'destructive' : 'outline'}>
                {systemHealth.expiredListings}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Admin Actions</CardTitle>
            <CardDescription>Quick administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="outline">
              Send System Notification
            </Button>
            <Button className="w-full" variant="outline">
              Export User Data
            </Button>
            <Button className="w-full" variant="outline">
              Generate Report
            </Button>
            <Button className="w-full" variant="outline">
              Clean Expired Listings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};