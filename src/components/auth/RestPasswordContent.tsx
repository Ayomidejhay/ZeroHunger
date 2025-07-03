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
    // Check if we have valid session for password reset
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Session error:", error);
          toast("Invalid or expired link",{
            description: "Please request a new password reset link",
            
          });
          router.push("/auth/forgotpassword");
          }
          return;
        }
        
        if (session) {
          setIsValidSession(true);
        } else {
          // Check URL params for access_token and refresh_token
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');
        };
          if (accessToken && refreshToken) {
            // Set the session from URL params
            const { error: setSessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            
            if (setSessionError) {
              console.error("Set session error:", setSessionError);
              toast("Invalid or expired link",{
                description: "Please request a new password reset link",
                
              });
              router.push("/auth/forgotpassword");
          }
            } else {
              setIsValidSession(true);
            }
          } else {
            toast( "Invalid or expired link",{
              description: "Please request a new password reset link",
              
            });
            router.push("/auth/forgotpassword");
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
        toast("Something went wrong",{
          description: "Please try again or request a new password reset link",
          
        });
        router.push("/auth/forgotpassword");
      }
    };

    checkSession();
  }, [router, toast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      
      toast("Missing fields",{description: "Please fill in all fields"})
      return;
    }

    if (password !== confirmPassword) {
      
      toast.error("Passwords don't match",{description: "Please make sure both passwords are the same"})
      return;
    }

    if (password.length < 6) {
      
      toast.error("Paswword too short", {description: "Password must be at least 6 characters long"})
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      
      toast.success("Password updated",{description: "Your password has been successfully updated"})
      
      router.push("/auth/login");
    } catch (error: any) {
      console.error("Error updating password:", error);
      
      toast.error("Error updating password",{description: error.message || "Something went wrong. Please try again."})
    } finally {
      setIsLoading(false);
    }
  };

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