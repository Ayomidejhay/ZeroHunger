'use client'

import React, {useState, useEffect} from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";


const RestPasswordContent = () => {
    const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  
  const router = useRouter();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
      const checkSessionAndHandleTokens = async () => {
        try {
          // 1. Try to get existing session
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
          if (sessionError) {
            console.error("Supabase getSession error:", sessionError);
            toast("Error checking session", {
              description: "Please try again or request a new password reset link."
            });
            router.push("/auth/forgotpassword");
            return;
          }
  
          if (session) {
            // If a valid session already exists, we're good to go
            setIsValidSession(true);
            return;
          }
  
          // 2. If no active session, check URL hash for tokens (from password reset email link)
          // Ensure this runs only on the client
          if (typeof window !== 'undefined') {
            const hashParams = new URLSearchParams(window.location.hash.substring(1));
            const accessToken = hashParams.get('access_token');
            const refreshToken = hashParams.get('refresh_token');
  
            if (accessToken && refreshToken) {
              // 3. Try to set the session from URL tokens
              const { error: setSessionError } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              });
  
              if (setSessionError) {
                console.error("Supabase setSession error:", setSessionError);
                toast("Invalid or expired link", {
                  description: "The reset link is invalid or has expired. Please request a new one."
                });
                router.push("/auth/forgotpassword");
                return;
              }
              
              // Session successfully set, now valid
              setIsValidSession(true);
              // Clean the URL hash after setting the session (optional but good practice)
              // You might want to redirect to a clean URL without the hash
              // router.replace(window.location.pathname); 
  
            } else {
              // No session and no tokens in hash, redirect to request new link
              toast("Invalid or expired link", {
                description: "No active session or valid reset tokens found. Please request a new password reset link."
              });
              router.push("/auth/forgotpassword");
            }
          } else {
            // This case should ideally not be hit with 'use client' and Suspense,
            // but is a safeguard if window isn't available
            console.warn("Window object not available during session check in client component.");
            // Optionally, you could also redirect here or show a different message
            // if this scenario means the page can't proceed.
          }
  
        } catch (error) {
          console.error("Unexpected error in checkSessionAndHandleTokens:", error);
          toast("An unexpected error occurred", {
            description: "Please try again or request a new password reset link."
          });
          router.push("/auth/forgotpassword");
        }
      };
  
      checkSessionAndHandleTokens();
    }, [router, toast]); // Dependency array: router and toast. Ensure toast is stable or memoized if it causes issues.
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      if (!password || !confirmPassword) {
        toast("Missing fields",{description: "Please fill in all fields"});
        return;
      }
  
      if (password !== confirmPassword) {
        toast.error("Passwords don't match",{description: "Please make sure both passwords are the same"});
        return;
      }
  
      if (password.length < 6) {
        toast.error("Password too short", {description: "Password must be at least 6 characters long"});
        return;
      }
  
      setIsLoading(true);
      
      try {
        const { error } = await supabase.auth.updateUser({
          password: password,
        });
  
        if (error) throw error;
  
        toast.success("Password updated",{description: "Your password has been successfully updated"});
        router.push("/auth/login");
      } catch (error: any) {
        console.error("Error updating password:", error);
        toast.error("Error updating password",{description: error.message || "Something went wrong. Please try again."});
      } finally {
        setIsLoading(false);
      }
    };
  
    // Show loading state until session validity is determined
    if (!isValidSession) {
      return (
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
            <div className="text-center">
              <p>Checking session...</p>
            </div>
          </main>
        </div>
      );
    }
  return (
    <div className="min-h-screen flex flex-col">
      
      
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Set New Password</CardTitle>
              <p className="text-center text-saveplate-neutral-600">
                Enter your new password below
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-defaultgreen hover:bg-darkgreen"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      
    </div>
  )
}

export default RestPasswordContent