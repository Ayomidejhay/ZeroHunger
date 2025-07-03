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
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsValidSession(true);
      } else {
        
        toast("Invalid or expired link",{description: "Please request a new password reset link"})
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
              <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
              <p className="text-center text-neutral600">
                Enter your email address and we'll send you a link to reset your password
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-defaultgreen hover:bg-darkgreen"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center text-sm text-defaultgreen hover:text-darkgreen"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Sign In
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      
    </div>
  )
}

export default RestPasswordContent