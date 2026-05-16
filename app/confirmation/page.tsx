'use client';

import React from 'react';
import { useCart } from '@/app/components/CartProvider';

const ConfirmationPage = () => {
  const { clearCart } = useCart();

  React.useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. Your order has been confirmed successfully.
      </p>
      <p className="text-gray-600 mb-8">
        You will receive an email confirmation shortly with order details and tracking information.
      </p>
      <div className="flex justify-center space-x-4">
        <a 
          href="/"
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
};

export default ConfirmationPage;
