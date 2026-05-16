'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type Product = { id: string; name: string; price: number; image_url?: string; description?: string };
type CartItem = Product & { quantity: number };

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cart');
      if (stored) setCart(JSON.parse(stored));
    } catch (e) {
      console.error('Erreur lecture panier:', e);
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('💾 Panier sauvegardé:', cart.length, 'articles');
    }
  }, [cart, isReady]);

  const addToCart = (product: Product) => {
    console.log('🛒 CLICK DETECTE pour:', product.name);
    alert('Ajout: ' + product.name);
    
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      let newCart;
      if (existing) {
        newCart = prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCart = [...prev, { ...product, quantity: 1 }];
      }
      console.log('✅ NOUVEAU PANIER:', newCart.length, 'articles');
      return newCart;
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) {
      removeFromCart(id);
    } else {
      setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
    }
  };

  const clearCart = () => setCart([]);

  if (!isReady) return null;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
