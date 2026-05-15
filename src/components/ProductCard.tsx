import { useState, useRef } from 'react';
import { Plus, Check, MapPin } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';
import { Confetti } from './Confetti';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, setIsOpen } = useCart();
  const { lang, t } = useLang();
  const [added, setAdded] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [confettiOrigin, setConfettiOrigin] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleAdd = () => {
    if (added) return;
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setConfettiOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
    addItem(product);
    setAdded(true);
    setConfettiActive(true);

    setTimeout(() => {
      setAdded(false);
      setConfettiActive(false);
    }, 1800);

    setTimeout(() => setIsOpen(true), 600);
  };

  const name = lang === 'fr' ? product.nameFr : product.name;
  const description = lang === 'fr' ? product.descriptionFr : product.description;

  return (
    <>
      <Confetti active={confettiActive} origin={confettiOrigin} />
      <div className="group bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        {/* Image */}
        <div className="relative overflow-hidden h-48">
          <img
            src={product.image_url}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-[#006633] text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
              {product.price_eur.toFixed(2)} EUR / {product.weight_grams}g
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-stone-800 text-base leading-snug">{name}</h3>
          </div>

          <div className="flex items-center gap-1 text-stone-500 text-xs mb-2">
            <MapPin size={11} />
            <span>{product.artisan} · {product.origin_city}</span>
          </div>

          <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2">{description}</p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-stone-800">
                {product.price_eur.toFixed(2)}
              </span>
              <span className="text-stone-500 text-sm ml-1">EUR</span>
            </div>

            <button
              ref={btnRef}
              onClick={handleAdd}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                added
                  ? 'bg-[#006633] text-white scale-95'
                  : 'bg-[#D21034] hover:bg-[#b50e2b] text-white hover:scale-105 active:scale-95'
              } shadow-md hover:shadow-lg`}
            >
              {added ? (
                <>
                  <Check size={15} />
                  {t('Added!', 'Ajouté!')}
                </>
              ) : (
                <>
                  <Plus size={15} />
                  {t('Add to Box', 'Ajouter')}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
