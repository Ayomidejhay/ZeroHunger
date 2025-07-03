import React from 'react'
import { Instagram, Twitter, Facebook, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
      const currentYear = new Date().getFullYear();
  return (
     <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              {/*<Logo className="h-10 w-auto" />*/}
              <p className="ml-2 text-xl font-semibold text-green-700"><span>Zero</span>Hunger</p>
            </div>
            <p className="mt-4 text-gray-600 text-sm">
              Connecting surplus food with those who need it most. Together we can reduce waste and fight hunger.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">For Donors</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
                  Donation Guidelines
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
                  Food Safety
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
                  Tax Benefits
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">For NGOs</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
                  Requirements
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
                  Food Pickup
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
                  Distribution Tips
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
                  Partner Organizations
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">About</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
                  Impact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-600 text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} ZeroHunger. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  )
}
