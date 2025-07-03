'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Search, Bell, Star, Calendar, MapPin, Clock } from "lucide-react";
import { useRouter } from 'next/navigation';


interface QuickActionsProps {
  stats: {
    pending: number;
    confirmed: number;
    completed: number;
    expired: number;
  };
  upcomingPickups: number;
}

const QuickActions = ({stats, upcomingPickups}: QuickActionsProps) => {
    const router = useRouter();

      const quickActionItems = [
    {
      title: "Browse New Food",
      description: "Find fresh food donations in your area",
      icon: Search,
      action: () => router.push("/browse"),
      variant: "default" as const,
      color: "bg-saveplate-green"
    },
    {
      title: "View Map",
      description: "See nearby food locations on map",
      icon: MapPin,
      action: () => router.push("/browse?view=map"),
      variant: "outline" as const
    },
    {
      title: "Pickup Reminders",
      description: "Set notifications for your confirmed pickups",
      icon: Bell,
      action: () => {}, // Will implement notification settings
      variant: "outline" as const,
      disabled: stats.confirmed === 0
    }
  ];
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          Quick Actions
          {upcomingPickups > 0 && (
            <Badge className="bg-saveplate-orange flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {upcomingPickups} upcoming
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActionItems.map((item, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={!item.disabled ? item.action : undefined}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${item.color || 'bg-gray-100'}`}>
                  <item.icon className={`h-5 w-5 ${item.color ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium ${item.disabled ? 'text-gray-400' : 'text-gray-900'}`}>
                    {item.title}
                  </h4>
                  <p className={`text-sm ${item.disabled ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default QuickActions