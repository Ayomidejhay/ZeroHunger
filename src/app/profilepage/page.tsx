"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileImageUpload from "@/components/ProfileImageUpload";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import PersonalInfoSection from "@/components/profile/PersonalInfoSection";
import PreferencesSection from "@/components/profile/PreferencesSection";
import StatsSection from "@/components/profile/StatsSection";
import { User, Settings, Bell, BarChart3, MapPin } from "lucide-react";

export default function Profilepage() {
  const { user, profile } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center">
          <p>Please sign in to view your profile.</p>
        </main>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-defaultgreen/5 to-defaultorange/5">
      <main className="flex-grow">
        <div className="saveplate-container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral900 mb-2">
              My Profile
            </h1>
            <p className="text-neutral600">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Profile Image Section */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 text-center">
                  <ProfileImageUpload />
                  <h3 className="font-semibold text-lg mt-4">
                    {profile?.first_name} {profile?.last_name}
                  </h3>
                  <p className="text-neutral600 text-sm">
                    {profile?.user_type === "donor"
                      ? "Food Donor"
                      : "Food Recipient"}
                  </p>
                  {profile?.city && profile?.state && (
                    <p className="text-neutral500 text-sm flex items-center justify-center mt-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      {profile.city}, {profile.state}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="personal" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="personal" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Personal
                  </TabsTrigger>
                  <TabsTrigger
                    value="preferences"
                    className="flex items-center"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Preferences
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="flex items-center"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="stats" className="flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Impact
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                  <PersonalInfoSection />
                </TabsContent>

                <TabsContent value="preferences">
                  <PreferencesSection />
                </TabsContent>

                <TabsContent value="notifications">
                  <NotificationCenter />
                </TabsContent>

                <TabsContent value="stats">
                  <StatsSection />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
