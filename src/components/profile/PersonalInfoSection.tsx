"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User, Phone, Mail } from "lucide-react";

const PersonalInfoSection = () => {
  const { user, profile, refreshProfile } = useAuth();
  //const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    phone: profile?.phone || "",
    bio: (profile as any)?.bio || "",
  });

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update(formData)
        .eq("id", user.id);

      if (error) throw error;

      await refreshProfile();
      setIsEditing(false);
      toast.success("Profile updated", {
        description: "Your personal information has been updated successfully.",
      });
    } catch (error: any) {
      toast.error("Error updating profile", {
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              value={formData.first_name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, first_name: e.target.value }))
              }
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              value={formData.last_name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, last_name: e.target.value }))
              }
              disabled={!isEditing}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="phone" className="flex items-center">
            <Phone className="h-4 w-4 mr-1" />
            Phone Number
          </Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            disabled={!isEditing}
          />
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, bio: e.target.value }))
            }
            disabled={!isEditing}
            placeholder="Tell others about yourself and your interest in reducing food waste..."
            rows={3}
          />
        </div>

        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-2" />
          <span className="text-sm text-saveplate-neutral-600">
            Email: {user?.email}
          </span>
        </div>

        <div className="flex space-x-2 pt-4">
          {isEditing ? (
            <>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-saveplate-green hover:bg-saveplate-green-dark"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              Edit Profile
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoSection;
