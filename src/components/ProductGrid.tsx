import { useState } from 'react';
import { products, Category, categoryLabels } from '../data/products';
import { ProductCard } from './ProductCard';
import { useLang } from '../context/LanguageContext';

const CATEGORIES: Category[] = ['chocolate', 'cosmetics', 'pottery', 'olive-oil', 'dates', 'spices'];

const CATEGORY_ICONS: Record<Category, string> = {
  chocolate: '🍫',
  cosmetics: '✨',
  pottery: '🏺',
  'olive-oil': '🫒',
  dates: '🌴',
  spices: '🌶️',
};

export function ProductGrid() {
  const [active, setActive] = useState<Category | 'all'>('all');
  const { lang, t } = useLang();

  const filtered = active === 'all' ? products : products.filter(p => p.category === active);

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-stone-800 mb-3">
            {t('Artisanal Products', 'Produits Artisanaux')}
          </h2>
          <p className="text-stone-500">
            {t(
              'Every item is made by hand and sourced directly from Algerian artisans.',
              'Chaque article est fait à la main et provient directement d\'artisans algériens.'
            )}
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <button
            onClick={() => setActive('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              active === 'all'
                ? 'bg-[#006633] text-white shadow-md'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {t('All', 'Tout')}
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat
                  ? 'bg-[#006633] text-white shadow-md'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <span>{CATEGORY_ICONS[cat]}</span>
              {lang === 'fr' ? categoryLabels[cat].fr : categoryLabels[cat].en}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
