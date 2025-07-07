"use client"

import React, { useState } from 'react'
import { Bell, Menu, X, LogOut, User as UserIcon, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import NotificationButton from '@/components/NotificationButton';


export default function Header() {
    const { user, profile, signOut } = useAuth();
    const router = useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

   const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully",{
        description: "You have been signed out of your account."
      });
      router.push("/");
    } catch (error) {
      toast.error("Error signing out",{
        description: "There was a problem signing you out."
      });
    }
  };

  const isDonor = profile?.user_type === 'donor';
  const dashboardPath = isDonor ? "/donordashboard" : "/recipientdashboard";
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              
              <span className="ml-2 text-xl font-semibold text-green-700">ZeroHunger</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!user && (
              <Link href="/" className="text-neutral700 hover:text-defaultgreen transition-colors">
                Home
              </Link>
            )}
            {user && (
              <Link href={dashboardPath} className="text-neutral700 hover:text-defaultgreen transition-colors">
                Dashboard
              </Link>
            )}
            {!isDonor && (
              <Link href="/browse" className="text-neutral700 hover:text-defaultgreen transition-colors">
                Browse Food
              </Link>
            )}
            {isDonor && (
              <Link href="/donate" className="text-neutral700 hover:text-defaultgreen transition-colors">
                Donate Food
              </Link>
            )}
            {!user && (
              <Link href="/about" className="text-neutral700 hover:text-defaultgreen transition-colors">
                About Us
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <NotificationButton />
                
                {profile && (
                  <span className="text-sm text-neutral600">
                    Welcome, {profile.first_name || 'User'} 
                  </span>
                )}
                <Button 
                  variant="outline" 
                  className="border-defaultorange text-defaultorange hover:text-darkorange hover:border-darkorange"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="border-defaultorange text-defaultorange hover:text-darkorange hover:border-darkorange"
                  onClick={() => router.push("/auth/login")}
                >
                  Sign In
                </Button>
                <Button 
                  className="bg-defaultgreen hover:bg-darkgreen text-white"
                  onClick={() => router.push("/auth/register")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-neutral700" />
            ) : (
              <Menu className="h-6 w-6 text-neutral700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {!user && (
              <Link
                href="/"
                className="block py-2 text-neutral700 hover:text-defaultgreen"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            )}
            {user && (
              <Link
                href={dashboardPath}
                className="block py-2 text-neutral700 hover:text-defaultgreen"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {!isDonor && (
              <Link
                href="/browse"
                className="block py-2 text-neutral700 hover:text-defaultgreen"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Food
              </Link>
            )}
            {isDonor && (
              <Link
                href="/donate"
                className="block py-2 text-neutral700 hover:text-defaultgreen"
                onClick={() => setMobileMenuOpen(false)}
              >
                Donate Food
              </Link>
            )}
            {!user && (
              <Link
                href="/about"
                className="block py-2 text-neutral700 hover:text-defaultgreen"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
            )}
            <div className="flex flex-col space-y-2 pt-2 border-t border-neutral200">
              {user ? (
                <>
                  <div className="flex items-center justify-between py-2">
                    {profile && (
                      <span className="text-sm text-neutral600">
                        Welcome, {profile.first_name || 'User'} 
                      </span>
                    )}
                    <NotificationButton />
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-defaultorange text-defaultorange hover:text-darkorange hover:border-darkorange"
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="border-defaultorange text-defaultorange hover:text-darkorange hover:border-darkorange"
                    onClick={() => {
                      router.push("auth/signin");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="bg-defaultgreen hover:bg-darkgreen text-white"
                    onClick={() => {
                      router.push("/auth/register");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
