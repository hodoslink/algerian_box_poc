'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import { Product } from './types';
import { createSupabaseClient } from './lib/supabaseClient';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const supabase = createSupabaseClient();
        if (!supabase) {
          throw new Error('Supabase client not initialized');
        }

        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setProducts(data || []);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div id="products">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Featured Algerian Products</h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No products available at the moment.</p>
          <p className="text-sm text-gray-500 mt-2">Check back soon for amazing Algerian products!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
