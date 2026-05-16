'use client';

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { Cart, CartItem } from '@/app/types';
import { supabase } from '@/app/lib/supabaseClient';
import { getUserId } from '@/app/utils/userUtils';

interface CartContextType {
  cart: Cart;
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  loadCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: Cart, action: any): Cart => {
  switch(action.type) {
    case 'SET_CART':
      return { items: action.payload };
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity
        };
        return { items: updatedItems };
      }
      return { items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { 
        items: state.items.filter(item => item.id !== action.payload) 
      };
    case 'UPDATE_QUANTITY':
      return {
        items: state.items.map(item => 
          item.id === action.payload.productId 
            ? { ...item, quantity: action.payload.quantity } 
            : item
        )
      };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  }, [cart]);

  const loadCart = async () => {
    const userId = getUserId();
    if (userId && typeof window !== 'undefined') {
      try {
        const { data, error } = await supabase
          .from('carts')
          .select('items')
          .eq('user_id', userId)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error loading cart:', error);
          return;
        }
        
        dispatch({ type: 'SET_CART', payload: data?.items || [] });
      } catch (err) {
        console.error('Error loading cart:', err);
      }
    } else {
      const savedCart = typeof window !== 'undefined' ? localStorage.getItem('cart') : null;
      if (savedCart) {
        dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
      }
    }
  };

  const saveCart = async (newCart: Cart) => {
    const userId = getUserId();
    if (userId && typeof window !== 'undefined') {
      try {
        await supabase
          .from('carts')
          .upsert({ user_id: userId, items: newCart.items }, { onConflict: 'user_id' });
      } catch (err) {
        console.error('Error saving cart to Supabase:', err);
      }
    } else {
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(newCart.items));
      }
    }
  };

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const addToCart = (product: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart,
      loadCart,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
