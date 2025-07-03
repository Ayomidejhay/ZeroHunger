import Image from "next/image";
import { ArrowRight, Leaf, Utensils, Users, BarChart4 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div  className="relative bg-cover bg-center py-24 sm:py-32"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://images.pexels.com/photos/6647119/pexels-photo-6647119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          backgroundPosition: 'center 35%'
        }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              <span className="block">Reducing Food Waste</span>
              <span className="block">Feeding Communities</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              ZeroHunger connects restaurants, supermarkets and food owners with NGOs to redistribute excess food to those who need it most
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/auth/register" className="px-8 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:translate-y-1 active:translate-y-0 active:shadow-lg">
                Get Started
              </Link>
              <Link href="/auth/login" className="px-8 py-3 bg-white text-green-600 font-medium rounded-md hover:bg-gray-100 transition-colors flex items-center">
                Log in <ArrowRight  size={16} className="ml-2" />
              </Link>
            </div>
          </div>
      </div>

      {/* How it works section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How it Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform connects food donors with NGOs to ensure excess food reaches those in need.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Utensils className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">1. List Surplus Food</h3>
              <p className="text-gray-600">
                 Restaurants, supermarkets, farms and individuals list their surplus food, including type, quantity, and pickup details.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Users className="text-orange-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">2. NGOs Claim Food</h3>
              <p className="text-gray-600">
                Registered NGOs browse available food listings and claim items they can distribute to communities in need.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Leaf className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Pickup & Distribute</h3>
              <p className="text-gray-600">
                NGOs pick up the claimed food and distribute it to those in need, reducing waste and feeding communities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Together, we're making a difference in reducing food waste and fighting hunger.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
            <div className="text-center">
              <p className="text-5xl font-bold text-green-600 mb-2">5,000+</p>
              <p className="text-xl text-gray-700">Meals Saved</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-green-600 mb-2">50+</p>
              <p className="text-xl text-gray-700">Businesses Participating</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-green-600 mb-2">20+</p>
              <p className="text-xl text-gray-700">NGOs Participating</p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link href="/auth/register" className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors shadow-md">
              Join the Movement <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
      {/* Testimonials section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4 italic">
                "ZeroHunger has revolutionized how we handle our surplus food. Instead of throwing away perfectly good items, we can now help those in need while reducing waste. It's a win-win!"
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Testimonial" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-medium text-gray-800">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Manager, Fresh Harvest Market</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4 italic">
                "As a small NGO, we were struggling to find consistent food sources for our community pantry. FoodShare has been a game-changer, connecting us with quality food that would otherwise go to waste."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/4420634/pexels-photo-4420634.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Testimonial" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-medium text-gray-800">Michael Thompson</p>
                  <p className="text-sm text-gray-500">Director, Community Food Bank</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action section */}
      <div className="py-16 bg-cover bg-center"  style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.pexels.com/photos/6647029/pexels-photo-6647029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Make a Difference</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">Join our community of food donors and NGOs working together to reduce waste and fight hunger.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/auth/register" className="px-8 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors shadow-lg">
              Get Started Now
            </Link>
            <Link href="#" className="px-8 py-3 bg-transparent text-white border border-white font-medium rounded-md hover:bg-white hover:text-green-800 transition-colors ">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
