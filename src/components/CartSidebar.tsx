import { X, Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';

interface CartSidebarProps {
  onCheckout: () => void;
}

export function CartSidebar({ onCheckout }: CartSidebarProps) {
  const { items, removeItem, updateQty, totalPrice, totalWeight, itemCount, isOpen, setIsOpen } = useCart();
  const { t, lang } = useLang();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#006633]" />
            <h2 className="font-bold text-lg text-stone-800">
              {t('My Box', 'Ma Boîte')}
              {itemCount > 0 && (
                <span className="ml-2 bg-[#D21034] text-white text-xs rounded-full px-2 py-0.5">
                  {itemCount}
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center transition-colors"
          >
            <X size={18} className="text-stone-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-stone-400 gap-3">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="font-medium">{t('Your box is empty', 'Votre boîte est vide')}</p>
              <p className="text-sm">{t('Browse our artisanal products and start building!', 'Parcourez nos produits artisanaux et commencez à composer!')}</p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-2 text-[#006633] font-medium text-sm hover:underline"
              >
                {t('Explore products →', 'Explorer les produits →')}
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => {
              const name = lang === 'fr' ? product.nameFr : product.name;
              return (
                <div key={product.id} className="flex gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100">
                  <img
                    src={product.image_url}
                    alt={name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-stone-800 text-sm truncate">{name}</p>
                    <p className="text-stone-400 text-xs mt-0.5">{product.origin_city} · {product.weight_grams * quantity}g</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(product.id, quantity - 1)}
                          className="w-6 h-6 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-100 transition-colors"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="text-sm font-semibold w-4 text-center">{quantity}</span>
                        <button
                          onClick={() => updateQty(product.id, quantity + 1)}
                          className="w-6 h-6 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-100 transition-colors"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-stone-800">
                        {(product.price_eur * quantity).toFixed(2)} EUR
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="flex-shrink-0 w-7 h-7 rounded-full hover:bg-red-50 flex items-center justify-center transition-colors group"
                  >
                    <Trash2 size={14} className="text-stone-300 group-hover:text-[#D21034] transition-colors" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-100 p-5 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-stone-500">
                <span>{t('Total weight', 'Poids total')}</span>
                <span>{(totalWeight / 1000).toFixed(2)} kg</span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-800">
                <span>{t('Total', 'Total')}</span>
                <span className="text-[#006633]">{totalPrice.toFixed(2)} EUR</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                onCheckout();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#006633] hover:bg-[#005229] text-white font-semibold py-4 rounded-full text-base transition-all transform hover:scale-[1.02] shadow-lg"
            >
              {t('Continue to Checkout', 'Passer à la Caisse')}
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
