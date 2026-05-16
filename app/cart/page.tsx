'use client';

import React from 'react';
import CartSummary from '../components/CartSummary';
import { useCart } from '../components/CartProvider';

const CartPage = () => {
  const { cart } = useCart();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.items.length > 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Items in your cart</h2>
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center border-b pb-4 last:border-0 last:pb-0">
                    {item.image_url && (
                      <div className="w-16 h-16 mr-4 relative flex-shrink-0">
                        <img 
                          src={item.image_url} 
                          alt={item.name} 
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)} × {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-gray-600 text-lg">Your cart is empty</p>
              <a 
                href="/" 
                className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
              >
                Browse Products
              </a>
            </div>
          )}
        </div>
        
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
