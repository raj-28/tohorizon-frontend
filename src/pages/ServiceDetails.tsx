import React from 'react';
import { Star, Clock, Shield } from 'lucide-react';

export default function ServiceDetails() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Professional Salon Services</h1>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <img 
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80" 
                alt="Salon Service"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1">4.8 (2.3k reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span className="ml-1">45-60 min</span>
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mb-4">Service Description</h2>
                <p className="text-gray-600 mb-6">
                  Get pampered with our professional salon services at home. Our experienced beauticians 
                  use premium products and follow strict hygiene protocols to ensure a safe and luxurious experience.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-blue-600 mt-1" />
                    <div className="ml-3">
                      <h3 className="font-semibold">100% Safe</h3>
                      <p className="text-gray-600">All safety protocols followed</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Star className="h-5 w-5 text-blue-600 mt-1" />
                    <div className="ml-3">
                      <h3 className="font-semibold">Expert Professionals</h3>
                      <p className="text-gray-600">Trained and certified beauticians</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Book Service</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Time
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option>09:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                  </select>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <span>Base Price</span>
                    <span>$49.00</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Convenience Fee</span>
                    <span>$5.00</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2 mt-2">
                    <span>Total</span>
                    <span>$54.00</span>
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}