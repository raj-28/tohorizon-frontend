import React from 'react';
import { Search, MapPin, User, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/Cartcontext';

export default function Navbar() {
  const { state } = useCart(); // Add this hook
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">UC</span>
          </Link>
          
          <div className="flex items-center space-x-4 flex-1 max-w-2xl mx-8">
            <div className="flex items-center w-full">
              <div className="flex items-center min-w-[140px] border-r border-gray-300 pr-4">
                <MapPin className="h-5 w-5 text-gray-500" />
                <select className="bg-transparent border-none outline-none px-2">
  {/* Greater Toronto Area */}
  <option>Toronto</option>
  <option>Mississauga</option>
  <option>Brampton</option>
  <option>Markham</option>
  <option>Vaughan</option>
  <option>Richmond Hill</option>
  <option>Oakville</option>
  <option>Burlington</option>
  <option>Milton</option>
  
  {/* Durham Region */}
  <option>Oshawa</option>
  <option>Whitby</option>
  <option>Ajax</option>
  <option>Pickering</option>
  
  {/* Other Major Cities */}
  <option>Ottawa</option>
  <option>Hamilton</option>
  <option>London</option>
  <option>Windsor</option>
  <option>Kitchener</option>
  <option>Waterloo</option>
  <option>Cambridge</option>
  <option>Guelph</option>
  <option>Kingston</option>
  <option>Barrie</option>
  <option>St. Catharines</option>
  <option>Niagara Falls</option>
  <option>Newmarket</option>
  <option>Thunder Bay</option>
  <option>Sudbury</option>
</select>
              </div>
              <div className="flex items-center flex-1 bg-gray-100 rounded-md ml-4 px-4 py-2">
                <Search className="h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search for services"
                  className="bg-transparent border-none outline-none px-2 w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Add Cart Link */}
            <Link to="/cart" className="flex items-center space-x-1 hover:text-blue-600 relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
              <span className="hidden sm:inline">Cart</span>
            </Link>
            <Link to="/signin" className="flex items-center space-x-1 hover:text-blue-600">
              <User className="h-5 w-5" />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}