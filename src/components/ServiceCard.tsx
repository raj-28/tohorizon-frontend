import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  image: string;
  description: string;
  price: string;
  link: string;
}

export default function ServiceCard({ title, image, description, price, link }: ServiceCardProps) {
  return (
    <Link to={link} className="group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
        <div className="h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-blue-600 font-semibold">{price}</span>
            <ArrowRight className="h-5 w-5 text-blue-600 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}