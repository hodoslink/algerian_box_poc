import { ArrowRight, Star } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

interface HeroProps {
  onBuildBox: () => void;
}

export function Hero({ onBuildBox }: HeroProps) {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#006633] via-[#005229] to-[#003d1f] text-white">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D21034] opacity-10 rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#F5E6D3] opacity-5 rounded-full -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white opacity-5 rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span>{t('Trusted by 2,000+ travelers', 'Approuvé par 2 000+ voyageurs')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('Build Your', 'Créez Votre')}
              <br />
              <span className="text-[#F5E6D3]">{t('Algerian Box', 'Boîte Algérienne')}</span>
            </h1>

            <p className="text-lg text-white/80 mb-8 max-w-lg leading-relaxed">
              {t(
                'Curate a custom gift box with authentic Algerian artisanal products — chocolates, dates, spices, pottery & more. Order online, pick up when you land.',
                'Composez une boîte cadeau avec des produits artisanaux algériens authentiques — chocolats, dattes, épices, poteries et plus. Commandez en ligne, récupérez à l\'arrivée.'
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBuildBox}
                className="flex items-center justify-center gap-2 bg-[#D21034] hover:bg-[#b50e2b] text-white font-semibold px-8 py-4 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t('Build Your Box', 'Créer Ma Boîte')}
                <ArrowRight size={20} />
              </button>
              <a
                href="#how-it-works"
                className="flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 text-white font-medium px-8 py-4 rounded-full text-lg transition-all hover:bg-white/10"
              >
                {t('How it works', 'Comment ça marche')}
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-10">
              {[
                { icon: '✅', text: t('Local Artisans', 'Artisans locaux') },
                { icon: '🔒', text: t('Secure Payment', 'Paiement sécurisé') },
                { icon: '📦', text: t('Easy Pickup', 'Retrait facile') },
              ].map(badge => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium"
                >
                  <span>{badge.icon}</span>
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image grid */}
          <div className="hidden lg:grid grid-cols-2 gap-3">
            {[
              'https://images.pexels.com/photos/15913423/pexels-photo-15913423.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
              'https://images.pexels.com/photos/3465380/pexels-photo-3465380.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
              'https://images.pexels.com/photos/16486887/pexels-photo-16486887.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
              'https://images.pexels.com/photos/13431879/pexels-photo-13431879.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
            ].map((src, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden ${i === 1 ? 'mt-6' : ''} ${i === 3 ? '-mt-6' : ''} shadow-xl`}
              >
                <img src={src} alt="" className="w-full h-40 object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
