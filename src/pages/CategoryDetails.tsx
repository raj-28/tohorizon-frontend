// src/pages/CategoryDetails.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/Cartcontext';

const categoryServices = {
  'home-cleaning': {
    title: 'Home Cleaning Services',
    description: 'Professional home cleaning services for every need',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80',
    services: [
      {
        id: 'basic-cleaning',
        title: 'Basic House Cleaning',
        description: 'Regular cleaning of living spaces including dusting, mopping, and sanitization',
        basePrice: 25,
        estimatedHours: [2, 3, 4],
        rating: 4.8,
        reviews: 1250
      },
      {
        id: 'deep-cleaning',
        title: 'Deep House Cleaning',
        description: 'Thorough cleaning including hard-to-reach areas, appliances, and detailed sanitization',
        basePrice: 35,
        estimatedHours: [4, 6, 8],
        rating: 4.9,
        reviews: 890
      },
      {
        id: 'bathroom-cleaning',
        title: 'Bathroom Deep Cleaning',
        description: 'Specialized cleaning and sanitization of bathrooms',
        basePrice: 30,
        estimatedHours: [1, 2, 3],
        rating: 4.7,
        reviews: 675
      }
    ]
  },

  // carcleaning start
  'car-cleaning': {
    title: 'Car Cleaning Services',
    description: 'Professional car cleaning and detailing services',
    image: 'https://images.unsplash.com/photo-1552930294-6b595f4c2974?auto=format&fit=crop&q=80',
    services: [
      {
        id: 'basic-car-cleaning',
        title: 'Basic Car Cleaning',
        description: 'Exterior wash, interior vacuum, and basic wipe down',
        basePrice: 30,
        estimatedHours: [1, 2, 3],
        rating: 4.7,
        reviews: 850
      },
      {
        id: 'car-detailing',
        title: 'Full Car Detailing',
        description: 'Complete interior and exterior detailing including waxing, polishing, and deep cleaning',
        basePrice: 45,
        estimatedHours: [3, 4, 5],
        rating: 4.9,
        reviews: 620
      },
      {
        id: 'maintenance-service',
        title: 'Maintenance Service',
        description: 'Basic maintenance including fluid checks, tire pressure, and interior sanitization',
        basePrice: 35,
        estimatedHours: [2, 3, 4],
        rating: 4.8,
        reviews: 445
      }
    ]
  }



  // carcleaning end
};

export default function CategoryDetails() {
  const { categoryId } = useParams();
  const category = categoryServices[categoryId as keyof typeof categoryServices];
  const [selectedService, setSelectedService] = React.useState<string | null>(null);
  const [selectedHours, setSelectedHours] = React.useState<number>(0);
  const { dispatch } = useCart();

  const handleAddToCart = (service: any, hours: number) => {
    if (hours === 0) return;

    const totalPrice = service.basePrice * hours;
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: `${service.id}-${hours}`,
        name: service.title,
        description: `${hours} hour(s) of ${service.title}`,
        price: totalPrice,
        quantity: 1,
        hours: hours,
        basePrice: service.basePrice
      }
    });

    setSelectedService(null);
    setSelectedHours(0);
  };

  if (!category) {
    return <div>Category not found</div>;
  }

  const calculatePrice = (basePrice: number, hours: number) => {
    return basePrice * hours;
  };

  return (
    <div className="pt-16">
      <div className="relative h-[300px] bg-cover bg-center" style={{
        backgroundImage: `url(${category.image})`
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <h1 className="text-4xl font-bold text-white mb-4">{category.title}</h1>
            <p className="text-xl text-white/90">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-8">
          {category.services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="ml-1">{service.rating} ({service.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5" />
                        <span className="ml-1">{service.estimatedHours[0]}-{service.estimatedHours[2]} hours</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-blue-600">${service.basePrice}/hour</p>
                  </div>
                </div>

                {selectedService === service.id && (
                  <div className="mt-6 border-t pt-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Select Hours
                        </label>
                        <select
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          value={selectedHours}
                          onChange={(e) => setSelectedHours(Number(e.target.value))}
                        >
                          <option value="0">Select duration</option>
                          {service.estimatedHours.map((hours) => (
                            <option key={hours} value={hours}>{hours} hours</option>
                          ))}
                        </select>
                      </div>

                      {selectedHours > 0 && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <span>Base Price (${service.basePrice}/hour)</span>
                            <span>${service.basePrice} × {selectedHours}</span>
                          </div>
                          <div className="flex justify-between font-semibold text-lg border-t pt-2 mt-2">
                            <span>Total</span>
                            <span>${calculatePrice(service.basePrice, selectedHours)}</span>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleAddToCart(service, selectedHours)}
                          disabled={selectedHours === 0}
                          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
                        >
                          <ShoppingCart className="inline-block w-5 h-5 mr-2" />
                          Add to Cart
                        </button>
                        <button
                          className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedService !== service.id && (
                  <button
                    onClick={() => setSelectedService(service.id)}
                    className="mt-4 w-full bg-gray-100 text-blue-600 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                  >
                    View Details & Book
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}