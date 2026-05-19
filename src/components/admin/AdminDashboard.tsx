'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Users, UtensilsCrossed, Clock, CheckCircle } from "lucide-react";

interface DashboardStats {
  totalUsers: number;
  totalDonors: number;
  totalRecipients: number;
  totalFoodListings: number;
  totalReservations: number;
  completedDonations: number;
}

interface CategoryData {
  category: string;
  count: number;
}

interface StatusData {
  status: string;
  count: number;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))', 'hsl(var(--destructive))'];

export const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalDonors: 0,
    totalRecipients: 0,
    totalFoodListings: 0,
    totalReservations: 0,
    completedDonations: 0,
  });
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [statusData, setStatusData] = useState<StatusData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();

    // Set up real-time subscriptions for dashboard updates
    const channel = supabase
      .channel('admin-dashboard-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        () => {
          console.log('Profile change detected, refreshing dashboard');
          fetchDashboardData();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'food_listings'
        },
        () => {
          console.log('Food listing change detected, refreshing dashboard');
          fetchDashboardData();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reservations'
        },
        () => {
          console.log('Reservation change detected, refreshing dashboard');
          fetchDashboardData();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'donation_history'
        },
        () => {
          console.log('Donation history change detected, refreshing dashboard');
          fetchDashboardData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch user stats
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_type');

      const totalUsers = profiles?.length || 0;
      const totalDonors = profiles?.filter(p => p.user_type === 'donor').length || 0;
      const totalRecipients = profiles?.filter(p => p.user_type === 'recipient').length || 0;

      // Fetch food listings stats
      const { data: listings } = await supabase
        .from('food_listings')
        .select('category, status');

      const totalFoodListings = listings?.length || 0;

      // Fetch reservations stats
      const { data: reservations } = await supabase
        .from('reservations')
        .select('status');

      const totalReservations = reservations?.length || 0;

      // Fetch donation history
      const { data: donations } = await supabase
        .from('donation_history')
        .select('status');

      const completedDonations = donations?.filter(d => d.status === 'completed').length || 0;

      setStats({
        totalUsers,
        totalDonors,
        totalRecipients,
        totalFoodListings,
        totalReservations,
        completedDonations,
      });

      // Process category data for charts
      const categoryMap = new Map<string, number>();
      listings?.forEach(listing => {
        const count = categoryMap.get(listing.category) || 0;
        categoryMap.set(listing.category, count + 1);
      });
      
      const categoryChartData = Array.from(categoryMap.entries()).map(([category, count]) => ({
        category,
        count
      }));
      setCategoryData(categoryChartData);

      // Process status data for charts
      const statusMap = new Map<string, number>();
      reservations?.forEach(reservation => {
        const count = statusMap.get(reservation.status) || 0;
        statusMap.set(reservation.status, count + 1);
      });
      
      const statusChartData = Array.from(statusMap.entries()).map(([status, count]) => ({
        status,
        count
      }));
      setStatusData(statusChartData);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="grid gap-6"><div>Loading dashboard...</div></div>;
  }

  return (
    <div className="grid gap-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalDonors} donors, {stats.totalRecipients} recipients
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Food Listings</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFoodListings}</div>
            <p className="text-xs text-muted-foreground">
              Total food items listed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reservations</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReservations}</div>
            <p className="text-xs text-muted-foreground">
              Total reservations made
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Donations</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedDonations}</div>
            <p className="text-xs text-muted-foreground">
              Successfully completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Food Listings by Category</CardTitle>
            <CardDescription>Distribution of food items by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <ChartTooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reservation Status</CardTitle>
            <CardDescription>Current status of all reservations</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};