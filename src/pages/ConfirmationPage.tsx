import { useEffect, useRef } from 'react';
import { CheckCircle, Copy, MapPin, Package, Home } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

interface ConfirmationPageProps {
  code: string;
  location: string;
  onHome: () => void;
}

export function ConfirmationPage({ code, location, onHome }: ConfirmationPageProps) {
  const { t } = useLang();
  const copiedRef = useRef(false);

  const copyCode = () => {
    if (copiedRef.current) return;
    navigator.clipboard.writeText(code).catch(() => {});
    copiedRef.current = true;
    setTimeout(() => { copiedRef.current = false; }, 2000);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#006633]/5 via-white to-[#D21034]/5 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Success icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#006633]/10 flex items-center justify-center animate-[bounce_1s_ease-in-out_1]">
              <CheckCircle size={48} className="text-[#006633]" />
            </div>
            <span className="absolute -top-1 -right-1 text-3xl animate-[spin_0.8s_ease-in-out_1]">🇩🇿</span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-stone-800 mb-2">
            {t('Order Confirmed!', 'Commande confirmée!')}
          </h1>
          <p className="text-stone-500">
            {t(
              'Your Algerian box is being prepared with love.',
              'Votre boîte algérienne est préparée avec amour.'
            )}
          </p>
        </div>

        {/* Pickup code */}
        <div className="bg-white rounded-2xl border-2 border-dashed border-[#006633] p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500 mb-2">
            {t('Your Pickup Code', 'Votre code de retrait')}
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl font-bold tracking-widest text-[#006633] font-mono">
              {code}
            </span>
            <button
              onClick={copyCode}
              title={t('Copy code', 'Copier le code')}
              className="w-9 h-9 rounded-full bg-stone-100 hover:bg-[#006633]/10 flex items-center justify-center transition-colors"
            >
              <Copy size={16} className="text-stone-500" />
            </button>
          </div>
          <p className="text-xs text-stone-400 mt-3">
            {t('Show this code at your pickup location', 'Montrez ce code à votre point de retrait')}
          </p>
        </div>

        {/* Location */}
        <div className="bg-white rounded-xl border border-stone-100 p-4 shadow-sm text-left flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D21034]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <MapPin size={16} className="text-[#D21034]" />
          </div>
          <div>
            <p className="text-xs font-medium text-stone-400 mb-0.5">{t('Pickup Location', 'Point de retrait')}</p>
            <p className="text-stone-800 font-medium text-sm">{location}</p>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#006633]/5 rounded-xl p-4 text-left">
            <Package size={20} className="text-[#006633] mb-2" />
            <p className="text-sm font-semibold text-stone-800">{t('Box Ready', 'Boîte prête')}</p>
            <p className="text-xs text-stone-500 mt-0.5">{t('At arrival day', 'Le jour de votre arrivée')}</p>
          </div>
          <div className="bg-[#D21034]/5 rounded-xl p-4 text-left">
            <span className="text-xl">🎁</span>
            <p className="text-sm font-semibold text-stone-800 mt-1">{t('Gift Wrapped', 'Emballé cadeau')}</p>
            <p className="text-xs text-stone-500 mt-0.5">{t('Ready to give', 'Prêt à offrir')}</p>
          </div>
        </div>

        <button
          onClick={onHome}
          className="w-full flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-900 text-white font-semibold py-4 rounded-full transition-all hover:scale-[1.02]"
        >
          <Home size={16} />
          {t('Back to Home', 'Retour à l\'accueil')}
        </button>
      </div>
    </div>
  );
}
