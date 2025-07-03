"use client";

import React, { useState } from "react";
import { Mail, User, Phone, MapPin, Building, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PersonalInfoFields from "@/components/auth/PersonalInfoFields";
import UserTypeSelector from "@/components/auth/UserTypeSelector";
import AuthCredentialsFields from "@/components/auth/AuthCredentialsFields";

const page = () => {
  // Basic user information state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // User type selection
  const [userType, setUserType] = useState<"donor" | "recipient">("donor");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useRouter();
  const { signUp } = useAuth();

  
   // Handles form submission with validation
   
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Password validation
    if (password !== confirmPassword) {
      toast("Passwords don't match", {
        description: "Please ensure both passwords match.",
        
      });
      return;
    }

    if (password.length < 6) {
      toast("Password too short", {
        description: "Password must be at least 6 characters long.",
        
      });
      return;
    }

    setIsLoading(true);

    try {
      // Prepare metadata for user creation
      const metadata = {
        user_type: userType,
        first_name: firstName,
        last_name: lastName,
      };

      const { error } = await signUp(email, password, userType, firstName, lastName);
      
      if (error) {
        toast("Sign up failed", {
          description: error.message,
          
        });
      } else {
        toast("Welcome to ZeroHunger!", {
          description: "Your account has been created successfully. Please check your email to verify your account.",
        });
        navigate("/auth/login");
      }
    } catch (err: any) {
      toast("Error",{
        description: err.message || "An unexpected error occurred",
        
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center text-neutral800">
              Create your account
            </CardTitle>
            <p className="text-sm text-center text-neutral600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-defaultgreen hover:text-darkgreen transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Basic user information */}
              <PersonalInfoFields
                firstName={firstName}
                lastName={lastName}
                onFirstNameChange={setFirstName}
                onLastNameChange={setLastName}
              />

              {/* User type selection */}
              <UserTypeSelector
                userType={userType}
                onUserTypeChange={setUserType}
              />

              {/* Account credentials */}
              <AuthCredentialsFields
                email={email}
                password={password}
                confirmPassword={confirmPassword}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onConfirmPasswordChange={setConfirmPassword}
              />

              <Button
                type="submit"
                className="w-full bg-defaultgreen hover:bg-darkgreen text-white py-3 text-base font-medium transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>

              <div className="text-center pt-4">
                <p className="text-xs text-neutral500">
                  By creating an account, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="text-defaultgreen hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-defaultgreen hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
};

export default page;
