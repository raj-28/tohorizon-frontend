import React from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import CategoryCarousel from '../components/CategoryCarousel';

const categories = [
  {
    id: "home-cleaning",
    title: "Home Cleaning",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
    description: "Professional home cleaning services"
  },
  {
    id: "car-cleaning",
    title: "Car Cleaning",
    icon: "Car",
    image: "https://images.unsplash.com/photo-1552930294-6b595f4c2974?auto=format&fit=crop&q=80",
    description: "Expert car wash and detailing"
  },
  {
    id: "outdoor-services",
    title: "Outdoor Services",
    icon: "Trees",
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80",
    description: "Lawn care and outdoor maintenance"
  },
  {
    id: "Personal-Services",
    title: "Personal Services",
    icon: "User",
    image: "https://media.istockphoto.com/id/1152836719/photo/psychiatrist-councelling-his-patient-hands-during-therapy.webp?a=1&b=1&s=612x612&w=0&k=20&c=mVXJdE8BBSj6Y8q0gLLMuqBIlodNm2sbXe6lspqGjHA=",
    description: "Quick appliance repair solutions"
  },
  {
    id: "Beauty-and-Makeup",
    title: "Beauty and Makeup",
    icon: "Eye",
    image: "https://images.unsplash.com/photo-1500840216050-6ffa99d75160?q=80&w=1797&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Complete pest control services"
  },
  {
    id: "event-services",
    title: "Event Services",
    icon: "Gift",
    image: "https://images.unsplash.com/photo-1484156818044-c040038b0719?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXZlbnQlMjBzZXJ2aWNlc3xlbnwwfHwwfHx8MA%3D%3D",
    description: "Complete Event  services"
  }
];

const popularServices = [
  {
    title: "Salon at Home",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80",
    description: "Professional beauty services at your doorstep",
    price: "Starting $29",
    link: "/services/salon"
  },
  {
    title: "Home Cleaning",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
    description: "Deep cleaning by trained professionals",
    price: "Starting $49",
    link: "/services/cleaning"
  },
  {
    title: "Appliance Repair",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80",
    description: "Expert repair for all home appliances",
    price: "Starting $39",
    link: "/services/appliances"
  },
  {
    title: "Plumbing Services",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80",
    description: "Professional plumbing solutions",
    price: "Starting $35",
    link: "/services/plumbing"
  }
];

export default function Home() {
  return (
    <div>
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Service Categories</h2>
        <CategoryCarousel categories={categories} />
        
        <h2 className="text-3xl font-bold mb-8 mt-16">Popular Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularServices.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Professionals</h3>
              <p className="text-gray-600">Verified and trained professionals</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Guaranteed Service</h3>
              <p className="text-gray-600">100% satisfaction guaranteed</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
              <p className="text-gray-600">Service at your convenience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}