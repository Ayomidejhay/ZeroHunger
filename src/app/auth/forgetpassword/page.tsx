'use client';

import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';
import { toast }from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function page() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email) {
      
      toast("Email required",{description: "Please enter your email address"})
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setEmailSent(true);
      
      toast('Reset email sent',{description: "Check your email for password reset instructions"})
    } catch (error: any) {
      console.error("Error sending reset email:", error);
      
      toast.error("Error sending reset email", {description: error.message || "Something went wrong."})
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex flex-col">
        
        
        <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
          <div className="w-full max-w-md">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-defaultgreen-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-defaultgreen" />
                </div>
                <CardTitle className="text-2xl">Check your email</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-neutral600">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-center text-sm text-neutral500">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <div className="space-y-2">
                  <Button
                    onClick={() => setEmailSent(false)}
                    variant="outline"
                    className="w-full"
                  >
                    Try different email
                  </Button>
                  <Button
                    onClick={() => router.push("/auth/login")}
                    className="w-full bg-defaultgreen hover:bg-darkgreen"
                  >
                    Back to Sign In
                  </Button>
                </div>
              </CardContent>
            </Card>
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
