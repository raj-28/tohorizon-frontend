import React, { useState } from 'react';
import { useCart } from '../context/Cartcontext';
import { Check, X } from 'lucide-react';

interface CouponType {
  code: string;
  discount: number;
  description: string;
}

// This would typically come from your API
const availableCoupons: CouponType[] = [
  {
    code: 'SAVE20',
    discount: 20,
    description: '20% off on your first booking'
  },
  {
    code: 'CLEAN10',
    discount: 10,
    description: '10% off on cleaning services'
  }
];

export default function Checkout() {
  const { state } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponType | null>(null);
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = () => {
    const coupon = availableCoupons.find(
      c => c.code.toLowerCase() === couponCode.toLowerCase()
    );

    if (coupon) {
      setAppliedCoupon(coupon);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setAppliedCoupon(null);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const calculateDiscount = (): number => {
    if (!appliedCoupon) return 0;
    return (state.total * appliedCoupon.discount) / 100;
  };

  const finalTotal = state.total - calculateDiscount();

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items Summary */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Order Items</h2>
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${item.price}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Apply Coupon</h2>
              
              {!appliedCoupon ? (
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-red-600 text-sm">{couponError}</p>
                  
                  {/* Available Coupons */}
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Available Coupons</h3>
                    <div className="space-y-2">
                      {availableCoupons.map((coupon) => (
                        <div
                          key={coupon.code}
                          className="border border-gray-200 rounded-lg p-3 flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium">{coupon.code}</p>
                            <p className="text-sm text-gray-600">{coupon.description}</p>
                          </div>
                          <button
                            onClick={() => {
                              setCouponCode(coupon.code);
                              handleApplyCoupon();
                            }}
                            className="text-blue-600 text-sm hover:underline"
                          >
                            Apply
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-600">
                        Coupon {appliedCoupon.code} applied
                      </p>
                      <p className="text-sm text-green-600">
                        {appliedCoupon.discount}% discount
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${state.total}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between">
                    <span>Discount ({appliedCoupon.discount}%)</span>
                    <span>-${calculateDiscount()}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${finalTotal}</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-4">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}