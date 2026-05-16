'use client';
import React, { useState } from 'react';
import { useCart } from './CartProvider';
// Note: StripeService n'est pas utilisé ici car on gère le checkout directement

const CartSummary: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  // Correction: Typage explicite pour sum et item
  const subtotal = cart.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; 
  const total = subtotal + tax;

  const handleCheckout = async () => {
    if (cart.items.length === 0) return;
    
    setIsProcessing(true);
    alert('Fonctionnalité de paiement Stripe à connecter ! (Panier prêt: ' + total.toFixed(2) + '€)');
    // Ici vous intégrerez plus tard l'appel à Stripe
    setIsProcessing(false);
  };

  if (cart.items.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">Votre panier est vide</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        {cart.items.map((item: any) => (
          <div key={item.id} className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-medium text-gray-800">{item.name}</h3>
              <p className="text-gray-600 text-sm">${item.price.toFixed(2)} × {item.quantity}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
              >-</button>
              <span>{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
              >+</button>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="ml-2 text-red-500 hover:text-red-700"
              >Remove</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-2 mb-6">
        <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span className="text-gray-600">Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
        <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
      </div>
      
      <button
        onClick={handleCheckout}
        disabled={isProcessing}
        className={`w-full py-3 px-4 rounded-md text-white font-medium ${isProcessing ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
      >
        {isProcessing ? 'Processing...' : 'Checkout'}
      </button>
    </div>
  );
};

export default CartSummary;
