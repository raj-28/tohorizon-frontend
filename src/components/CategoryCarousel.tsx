import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

interface Category {
  id: string;
  title: string;
  icon: keyof typeof Icons;
  image: string;
  description: string;
}

interface CategoryCarouselProps {
  categories: Category[];
}

export default function CategoryCarousel({ categories }: CategoryCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 4;

  const nextSlide = () => {
    setStartIndex((prev) => 
      prev + itemsToShow >= categories.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setStartIndex((prev) => 
      prev === 0 ? categories.length - itemsToShow : prev - 1
    );
  };

  const visibleCategories = categories.slice(startIndex, startIndex + itemsToShow);

  return (
    <div className="relative">
      <div className="flex space-x-6 overflow-hidden">
        {visibleCategories.map((category) => {
          const IconComponent = Icons[category.icon as keyof typeof Icons];
          return (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex-none w-1/4"
            >
              <div className="group bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        {IconComponent && <IconComponent className="h-6 w-6" />}
                        <h3 className="text-xl font-semibold">{category.title}</h3>
                      </div>
                      <p className="text-sm opacity-90">{category.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}