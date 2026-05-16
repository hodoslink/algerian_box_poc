'use client';

import React, { useState } from 'react';
import { useCart } from './CartProvider';
import { loadStripe } from '@stripe/stripe-js';

const CartSummary: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = async () => {
    if (cart.items.length === 0) return;
    
    setIsProcessing(true);
    try {
      const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || 'anonymous' : 'anonymous';
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems: cart.items,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      await stripe!.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('There was an error processing your checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        {cart.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-medium text-gray-800">{item.name}</h3>
              <p className="text-gray-600 text-sm">${item.price.toFixed(2)} × {item.quantity}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
              >
                +
              </button>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        
        {cart.items.length === 0 && (
          <p className="text-gray-500 text-center py-4">Your cart is empty</p>
        )}
      </div>
      
      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-gray-200">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-lg font-semibold">${total.toFixed(2)}</span>
        </div>
      </div>
      
      <button
        onClick={handleCheckout}
        disabled={cart.items.length === 0 || isProcessing}
        className={`w-full py-3 px-4 rounded-md text-white font-medium ${
          cart.items.length === 0 || isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700'
        } transition-colors duration-300`}
      >
        {isProcessing ? 'Processing...' : 'Checkout'}
      </button>
    </div>
  );
};

export default CartSummary;
