import { ShoppingBag, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';

export function Header() {
  const { itemCount, setIsOpen } = useCart();
  const { lang, toggleLang, t } = useLang();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇩🇿</span>
            <div>
              <span className="font-bold text-xl text-[#006633]">Algerian</span>
              <span className="font-bold text-xl text-[#D21034]"> Box</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
            <a href="#products" className="hover:text-[#006633] transition-colors">
              {t('Products', 'Produits')}
            </a>
            <a href="#how-it-works" className="hover:text-[#006633] transition-colors">
              {t('How it works', 'Comment ça marche')}
            </a>
            <a href="#pickup" className="hover:text-[#006633] transition-colors">
              {t('Pickup locations', 'Points de retrait')}
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 text-sm font-medium text-stone-600 hover:border-[#006633] hover:text-[#006633] transition-all"
            >
              <Globe size={14} />
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-2 bg-[#006633] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#005229] transition-colors"
            >
              <ShoppingBag size={16} />
              <span className="hidden sm:inline">{t('My Box', 'Ma Boîte')}</span>
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D21034] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
