"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload, X } from "lucide-react";

const ProfileImageUpload = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    //validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type", {
        description: "Please select an image file.",
      });
      return;
    }

    //validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB", {
        description: "Please select an image smaller than 5MB.",
      });
      return;
    }
    setSelectedFile(file);

    // Create a preview URL for the selected file
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;

    setIsUploading(true);

    try {
      //Generate unique file name
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${user.id}/avatar.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Upload the file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from("profile-images")
        .upload(filePath, selectedFile, {
          upsert: true, //Replace existing file
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: data.publicUrl })
        .eq('id', user.id);

      await refreshProfile();
      setSelectedFile(null);
      setPreviewUrl(null);

      toast.success("Profile image uploaded successfully", {
        description: "Your profile image has been updated.",
      });
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image", {
        description:
          error.message || "Something went wrong. Please try again..",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!user) return;

    setIsUploading(true);

    try {
      // Remove avatar URL from profile
      const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: null })
        .eq("id", user.id);

      if (error) throw error;

      await refreshProfile();

      toast.success("Profile image removed successfully", {
        description: "Your profile image has been removed.",
      });
    } catch (error: any) {
      console.error("Error removing image:", error);
      toast.error("Failed to remove image", {
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const cancelSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const getInitials = () => {
    const firstName = profile?.first_name || "";
    const lastName = profile?.last_name || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-6">
        <Avatar className="w-24 h-24">
          <AvatarImage
            src={previewUrl || profile?.avatar_url || undefined}
            alt="profile"
          />
          <AvatarFallback className="text-lg">
            {getInitials() || <Camera className="w-8 h-8" />}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Profile Image</h3>
          <p className="text-sm text-neutral600">
            Upload a photo to personalize your profile
          </p>
        </div>
      </div>

      {selectedFile ? (
        <div className="space-y-3">
            <p className="text-sm text-neutral600">Selected: {selectedFile.name}</p>
            <div className="flex space-x-2">
                <Button
                    onClick={handleUpload}
                    disabled={isUploading}
                    size="sm"
                    className="bg-defaultgreen hover:bg-darkgreen"
                >
                    <Upload className="w-4 h-4 mr-2" />
                    {isUploading ? "Uploading..." : "Upload Image"}
                </Button>
                <Button
                    variant="outline"
                    onClick={cancelSelection}
                    disabled={isUploading}
                    size="sm"
                >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                </Button>   
            </div>
        </div>
      ) : (
        <div className="space-y-3">
            <div>
                <Label htmlFor="avatar-upload" className="sr-only">
                    Upload profile image
                </Label>
                <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                />
                <Button
                    onClick={() => document.getElementById("avatar-upload")?.click()}
                    variant="outline"
                    size="sm"
                >
                    <Camera className="w-4 h-4 mr-2" />
                    Choose Image
                </Button>
            </div>

            {profile?.avatar_url && (
                <Button
                    variant="outline"
                    onClick={handleRemove}
                    disabled={isUploading}
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                >
                    <X className="w-4 h-4 mr-2" />
                    Remove Image
                </Button>
            )}
        </div>
      )} 
        <p className="text-xs text-neutral500">
            Supported formats: JPG, PNG, GIF. Max size: 5MB.
        </p>
    </div>
  );
};

export default ProfileImageUpload;
