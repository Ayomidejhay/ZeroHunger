"use client";

import React, { useState, useEffect } from "react";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GenericPageSkeleton } from "@/components/ui/page-skeleton";

/** Returns the dashboard path for a given user_type. */
function dashboardFor(userType: string | null | undefined): string {
  if (userType === "donor") return "/donordashboard";
  if (userType === "recipient") return "/recipientdashboard";
  return "/";
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // redirecting = true once login succeeds and we are waiting for the
  // dashboard to load. The login form is replaced by the skeleton so the
  // user sees progress instead of a frozen page.
  const [redirecting, setRedirecting] = useState(false);

  const { signIn, user, profile, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");

  // Already-logged-in guard — send straight to dashboard
  useEffect(() => {
    if (!authLoading && user && profile) {
      setRedirecting(true);
      router.replace(nextPath || dashboardFor(profile.user_type));
    }
  }, [authLoading, user, profile, router, nextPath]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error, userType } = await signIn(email, password);

      if (error) {
        toast.error("Sign in failed", {
          description: error.message || "Invalid email or password. Please try again.",
        });
        setIsSubmitting(false);
        return;
      }

      toast.success("Welcome back!", {
        description: "You have been signed in successfully.",
      });

      // Switch to skeleton immediately — the login form disappears and the
      // skeleton fills the viewport while Next.js loads the dashboard bundle.
      // We never call setIsSubmitting(false) on the success path so the
      // button stays in its loading state until the page unmounts.
      setRedirecting(true);
      router.replace(nextPath || dashboardFor(userType));

    } catch {
      toast.error("Sign in failed", {
        description: "Something went wrong. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  // Show the skeleton that matches the dashboard they are heading to.
  // This fills the gap between router.replace() firing and the dashboard
  // page actually rendering — the user sees continuous progress, not a
  // frozen login form or a blank white screen.
  if (redirecting) {
    return <GenericPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-neutral900 mb-2">
              Welcome Back
            </h1>
            <p className="text-neutral600">
              Sign in to continue helping reduce food waste
            </p>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl text-center text-neutral800">
                Sign in to your account
              </CardTitle>
              <p className="text-sm text-center text-neutral600">
                Don't have an account?{" "}
                <Link
                  href="/auth/register"
                  className="font-medium text-defaultgreen hover:text-darkgreen transition-colors"
                >
                  Create one here
                </Link>
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-neutral700">
                    Email address
                  </Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      className="pl-10 focus:ring-defaultgreen focus:border-defaultgreen"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-neutral700">
                    Password
                  </Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral400 h-4 w-4" />
                    <Input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isSubmitting}
                      className="pl-10 focus:ring-defaultgreen focus:border-defaultgreen"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-defaultgreen focus:ring-defaultgreen border-neutral300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-neutral700"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    href="/auth/forgotpassword"
                    className="text-sm text-defaultgreen hover:text-darkgreen transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-defaultgreen hover:bg-darkgreen text-white py-3 text-base font-medium transition-colors duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2 group">
                      Sign In
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-neutral500">
                      New to ZeroHunger?
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-defaultgreen text-defaultgreen hover:bg-defaultgreen hover:text-white transition-colors duration-200"
                  onClick={() => router.push("/auth/register")}
                  disabled={isSubmitting}
                >
                  Create Account
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-xs text-neutral500">
              Having trouble signing in?{" "}
              <Link href="/contact" className="text-defaultgreen hover:underline">
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

