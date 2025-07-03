import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  CheckCircle,
  Package,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ReservationStatsProps {
  stats: {
    pending: number;
    confirmed: number;
    completed: number;
    expired: number;
  };
  reservations: any[];
}

const ReservationStats = ({ stats, reservations }: ReservationStatsProps) => {
  const totalReservations =
    stats.pending + stats.confirmed + stats.completed + stats.expired;
  const successRate =
    totalReservations > 0
      ? Math.round((stats.completed / totalReservations) * 100)
      : 0;

  // Calculate upcoming pickups (confirmed reservations with pickup time in next 24 hours)
  const upcomingPickups = reservations.filter((r) => {
    if (r.status !== "confirmed" || !r.food_listing?.pickup_time_start)
      return false;
    const pickupTime = new Date(r.food_listing.pickup_time_start);
    const now = new Date();
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return pickupTime >= now && pickupTime <= in24Hours;
  }).length;

  // Calculate this week's activity
  const thisWeekReservations = reservations.filter((r) => {
    const created = new Date(r.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return created >= weekAgo;
  }).length;

  const statCards = [
    {
      title: "Success Rate",
      value: `${successRate}%`,
      description: "Completed pickups",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "This Week",
      value: thisWeekReservations,
      description: "New requests",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Upcoming",
      value: upcomingPickups,
      description: "Next 24 hours",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>

            {stat.title === "Success Rate" && totalReservations > 0 && (
              <div className="mt-3">
                <Progress value={successRate} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReservationStats;
