import React from 'react';
import { Button } from '@/components/ui/button'
import Link from 'next/link';


export default function page() {
  return (
    <div className="min-h-screen flex flex-col">
      
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-defaultgreen text-white py-16">
          <div className="saveplate-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About ZeroHunger</h1>
              <p className="text-xl text-white/90">
                Connecting surplus food to those who need it most
              </p>
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="saveplate-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-neutral900">Our Mission</h2>
              <p className="text-lg text-neutral700 mb-6">
                At ZeroHunger, we believe that good food should never go to waste. Our mission is to create a world where everyone has access to nutritious food, and where we minimize the environmental impact of food waste.
              </p>
              <p className="text-lg text-neutral700 mb-6">
                We connect food donors—including restaurants, bakeries, grocery stores, and individuals—with community members, NGOs who can benefit from perfectly good surplus food that would otherwise be thrown away.
              </p>
              <p className="text-lg text-neutral700">
                Through our platform, we aim to foster community connections, reduce environmental impact, and ensure that more people have access to quality food.
              </p>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 bg-neutral50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="saveplate-container">
            <h2 className="text-3xl font-bold mb-12 text-center text-neutral900">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-defaultgreen-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-defaultgreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-neutral900">Sustainability</h3>
                <p className="text-neutral600">
                  We are committed to reducing food waste and its environmental impact. By saving food from landfills, we help reduce greenhouse gas emissions and conserve resources.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-defaultgreen-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-defaultgreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-neutral900">Community</h3>
                <p className="text-neutral600">
                  We believe in the power of community connections. Our platform brings people together through the shared value of good food and mutual support.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-defaultgreen-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-defaultgreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-neutral900">Food Security</h3>
                <p className="text-neutral600">
                  We are dedicated to increasing access to nutritious food for everyone in our communities, regardless of socioeconomic status.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="saveplate-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-neutral900">Our Team</h2>
              <p className="text-lg text-neutral700 mb-12">
                ZeroHunger was founded by a group of passionate individuals dedicated to fighting food waste and hunger in our communities. Our team brings together expertise in food systems, technology, community organizing, and sustainability.
              </p>
              
              {/* Add team members here */}
            </div>
          </div>
        </section>
        
        {/* Join Us CTA */}
        <section className="py-16 bg-defaultgreen text-white">
          <div className="saveplate-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="">
              <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
              <p className="text-xl mb-8 opacity-90">
                Be part of the solution to reduce food waste and increase access to good food
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-defaultgreen hover:bg-neutral100">
                  <Link href="/donate">Start Donating</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-darkgreen">
                  <Link href="/browse">Find Food</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      
    </div>
  )
}
