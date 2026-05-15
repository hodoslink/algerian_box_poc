import { Hero } from '../components/Hero';
import { ProductGrid } from '../components/ProductGrid';
import { HowItWorks } from '../components/HowItWorks';
import { useLang } from '../context/LanguageContext';

interface HomePageProps {
  onCheckout: () => void;
}

const PICKUP_LOCATIONS = [
  { id: 'airport', label: '✈️ Houari Boumediene Airport - Terminal Arrivals', city: 'Algiers' },
  { id: 'algiers', label: '🏪 Alger Centre - 12 Rue Didouche Mourad', city: 'Algiers' },
  { id: 'oran', label: '🏪 Oran Port - Near Ferry Terminal', city: 'Oran' },
];

export function HomePage({}: HomePageProps) {
  const { t } = useLang();

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero onBuildBox={scrollToProducts} />
      <HowItWorks />
      <ProductGrid />

      {/* Pickup locations section */}
      <section id="pickup" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-3">
              {t('Pickup Locations', 'Points de retrait')}
            </h2>
            <p className="text-stone-500">
              {t('Convenient spots across Algeria for easy box collection.', 'Des points pratiques à travers l\'Algérie pour récupérer votre boîte.')}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PICKUP_LOCATIONS.map(loc => (
              <div key={loc.id} className="bg-[#F5E6D3]/40 rounded-2xl p-6 border border-[#F5E6D3] hover:shadow-md transition-shadow">
                <p className="text-2xl mb-3">{loc.label.split(' ')[0]}</p>
                <p className="font-semibold text-stone-800 text-sm leading-snug">{loc.label.replace(/^[^\s]+\s/, '')}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 bg-[#006633]/10 text-[#006633] text-xs font-medium px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006633] animate-pulse" />
                  {t('Open for pickup', 'Ouvert pour retrait')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇩🇿</span>
              <div>
                <span className="font-bold text-lg text-[#4ade80]">Algerian</span>
                <span className="font-bold text-lg text-[#f87171]"> Box</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-stone-400">
              {[
                { icon: '✅', label: t('Local Artisans', 'Artisans locaux') },
                { icon: '🔒', label: t('Secure Payment', 'Paiement sécurisé') },
                { icon: '📦', label: t('Easy Pickup', 'Retrait facile') },
                { icon: '💚', label: t('Made in Algeria', 'Fabriqué en Algérie') },
              ].map(b => (
                <span key={b.label}>{b.icon} {b.label}</span>
              ))}
            </div>
            <p className="text-stone-500 text-sm">
              © 2024 Algerian Box · {t('POC Demo', 'Démo POC')}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
