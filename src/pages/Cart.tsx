import React from 'react';
import { useCart } from '../context/Cartcontext';
import { Trash2, MinusCircle, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { state, dispatch } = useCart();

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id, quantity }
      });
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <Link to="/" className="text-blue-600 hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-semibold mb-8">Your Cart</h2>
      <div className="grid gap-8">
        {state.items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <MinusCircle className="w-5 h-5" />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <PlusCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-blue-600">${item.price}</p>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-600 hover:text-red-800 mt-4"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-right">
        <p className="text-xl font-semibold">Total: ${state.total}</p>
        {/* <button className="mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition">
          Checkout
        </button> */}
        <Link 
  to="/checkout"
  className="w-full bg-blue-600 text-white mt-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-block text-center"
>
  Proceed to Checkout
</Link>
      </div>
    </div>
  );
}