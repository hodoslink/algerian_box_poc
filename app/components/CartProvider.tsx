'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface Product { id: string; name: string; price: number; image_url?: string; description?: string; }
interface CartItem extends Product { quantity: number; }

interface CartContextType { 
  cart: CartItem[]; 
  addToCart: (product: Product) => void; 
  removeFromCart: (productId: string) => void; 
  updateQuantity: (productId: string, quantity: number) => void; 
  clearCart: () => void; 
  cartCount: number; 
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Charger le panier au montage
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('cart');
      if (stored) setCart(JSON.parse(stored));
    } catch (e) {
      console.error('Failed to load cart', e);
    }
  }, []);

  // Sauvegarder à chaque changement
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, mounted]);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(p => p.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, qty: number) => {
    if (qty < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(p => p.id === id ? { ...p, quantity: qty } : p));
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart([]), []);

  // Ne rien rendre tant que non monté pour éviter la mismatch SSR/Client
  if (!mounted) return null;

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      cartCount: cart.reduce((acc, item) => acc + item.quantity, 0) 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
