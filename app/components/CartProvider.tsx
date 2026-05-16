'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
interface Product { id: string; name: string; price: number; image_url?: string; description?: string; }
interface CartItem extends Product { quantity: number; }
interface CartContextType { cart: CartItem[]; addToCart: (product: Product) => void; removeFromCart: (productId: string) => void; updateQuantity: (productId: string, quantity: number) => void; clearCart: () => void; cartCount: number; }
const CartContext = createContext<CartContextType | undefined>(undefined);
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) { try { setCart(JSON.parse(savedCart)); } catch (e) { console.error(e); } }
    setIsLoaded(true);
  }, []);
  useEffect(() => {
    if (isLoaded) { localStorage.setItem('cart', JSON.stringify(cart)); }
  }, [cart, isLoaded]);
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) { return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item); }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  const removeFromCart = (productId: string) => setCart(prev => prev.filter(item => item.id !== productId));
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) { removeFromCart(productId); return; }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };
  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
