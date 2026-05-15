import { useState } from 'react';
import { ArrowLeft, MapPin, CreditCard, Package, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';
import { Stepper } from '../components/Stepper';

const PICKUP_LOCATIONS = [
  { id: 'airport', label: '✈️ Houari Boumediene Airport - Terminal Arrivals' },
  { id: 'algiers', label: '🏪 Alger Centre - 12 Rue Didouche Mourad' },
  { id: 'oran', label: '🏪 Oran Port - Near Ferry Terminal' },
];

interface CheckoutPageProps {
  onBack: () => void;
  onConfirm: (code: string, location: string) => void;
}

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'DZ-';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export function CheckoutPage({ onBack, onConfirm }: CheckoutPageProps) {
  const { items, totalPrice, totalWeight, clearCart } = useCart();
  const { t, lang } = useLang();
  const [step, setStep] = useState<'review' | 'pickup' | 'pay'>('review');
  const [location, setLocation] = useState(PICKUP_LOCATIONS[0].id);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const locationLabel = PICKUP_LOCATIONS.find(l => l.id === location)?.label ?? '';

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      const code = generateCode();
      clearCart();
      onConfirm(code, locationLabel);
    }, 2000);
  };

  const stepperStep = step === 'review' ? 'review' : step === 'pickup' ? 'pickup' : 'pay';

  return (
    <div className="min-h-screen bg-[#F5E6D3]/20">
      {/* Top bar */}
      <div className="bg-white border-b border-stone-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors text-sm">
            <ArrowLeft size={16} />
            {t('Back', 'Retour')}
          </button>
          <div className="flex-1">
            <Stepper current={stepperStep} />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3 space-y-6">
            {step === 'review' && (
              <div>
                <h2 className="text-2xl font-bold text-stone-800 mb-6">
                  {t('Review Your Box', 'Réviser votre boîte')}
                </h2>
                <div className="space-y-3">
                  {items.map(({ product, quantity }) => {
                    const name = lang === 'fr' ? product.nameFr : product.name;
                    return (
                      <div key={product.id} className="flex gap-4 bg-white rounded-xl p-4 border border-stone-100 shadow-sm">
                        <img src={product.image_url} alt={name} className="w-14 h-14 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="font-semibold text-stone-800">{name}</p>
                          <p className="text-stone-400 text-sm">{product.origin_city} · ×{quantity}</p>
                        </div>
                        <p className="font-bold text-stone-800">{(product.price_eur * quantity).toFixed(2)} EUR</p>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={() => setStep('pickup')}
                  className="mt-6 w-full bg-[#006633] hover:bg-[#005229] text-white font-semibold py-4 rounded-full transition-all hover:scale-[1.02] shadow-lg"
                >
                  {t('Choose Pickup Location →', 'Choisir le point de retrait →')}
                </button>
              </div>
            )}

            {step === 'pickup' && (
              <div>
                <h2 className="text-2xl font-bold text-stone-800 mb-6">
                  <span className="flex items-center gap-2"><MapPin size={22} className="text-[#D21034]" />{t('Select Pickup Location', 'Choisir le point de retrait')}</span>
                </h2>
                <div className="space-y-3">
                  {PICKUP_LOCATIONS.map(loc => (
                    <label
                      key={loc.id}
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        location === loc.id
                          ? 'border-[#006633] bg-[#006633]/5'
                          : 'border-stone-100 bg-white hover:border-stone-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="location"
                        value={loc.id}
                        checked={location === loc.id}
                        onChange={() => setLocation(loc.id)}
                        className="mt-0.5 accent-[#006633]"
                      />
                      <span className="text-stone-700 font-medium leading-snug">{loc.label}</span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={() => setStep('pay')}
                  className="mt-6 w-full bg-[#006633] hover:bg-[#005229] text-white font-semibold py-4 rounded-full transition-all hover:scale-[1.02] shadow-lg"
                >
                  {t('Continue to Payment →', 'Continuer au paiement →')}
                </button>
              </div>
            )}

            {step === 'pay' && (
              <div>
                <h2 className="text-2xl font-bold text-stone-800 mb-6">
                  <span className="flex items-center gap-2"><CreditCard size={22} className="text-[#D21034]" />{t('Payment Details', 'Détails du paiement')}</span>
                </h2>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
                  🔔 {t('This is a DEMO — no real payment will be processed.', 'Ceci est une DÉMO — aucun paiement réel ne sera effectué.')}
                </div>

                <div className="space-y-4 bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">{t('Full Name', 'Nom complet')}</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Ahmed Benali"
                      className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006633] focus:ring-2 focus:ring-[#006633]/20 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">{t('Email', 'Email')}</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="ahmed@example.com"
                      className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#006633] focus:ring-2 focus:ring-[#006633]/20 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">{t('Card Number', 'Numéro de carte')}</label>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      defaultValue="4242 4242 4242 4242"
                      readOnly
                      className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm bg-stone-50 text-stone-400 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">{t('Expiry', 'Expiration')}</label>
                      <input type="text" placeholder="12/28" defaultValue="12/28" readOnly className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm bg-stone-50 text-stone-400 font-mono" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">CVC</label>
                      <input type="text" placeholder="123" defaultValue="123" readOnly className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm bg-stone-50 text-stone-400 font-mono" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePay}
                  disabled={loading}
                  className={`mt-6 w-full flex items-center justify-center gap-3 font-semibold py-4 rounded-full transition-all shadow-lg text-white ${
                    loading
                      ? 'bg-stone-400 cursor-not-allowed'
                      : 'bg-[#D21034] hover:bg-[#b50e2b] hover:scale-[1.02]'
                  }`}
                >
                  {loading ? (
                    <>
                      <span className="animate-spin text-xl">🇩🇿</span>
                      {t('Processing...', 'Traitement...')}
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      {t(`Pay ${totalPrice.toFixed(2)} EUR (Demo)`, `Payer ${totalPrice.toFixed(2)} EUR (Démo)`)}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 sticky top-24">
              <h3 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
                <Package size={16} className="text-[#006633]" />
                {t('Box Summary', 'Résumé de la boîte')}
              </h3>
              <div className="space-y-2 mb-4">
                {items.map(({ product, quantity }) => {
                  const pName = lang === 'fr' ? product.nameFr : product.name;
                  return (
                    <div key={product.id} className="flex justify-between text-sm">
                      <span className="text-stone-600 truncate mr-2">{pName} ×{quantity}</span>
                      <span className="text-stone-800 font-medium whitespace-nowrap">{(product.price_eur * quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-stone-100 pt-3 space-y-1.5">
                <div className="flex justify-between text-sm text-stone-500">
                  <span>{t('Weight', 'Poids')}</span>
                  <span>{(totalWeight / 1000).toFixed(2)} kg</span>
                </div>
                {step === 'pickup' || step === 'pay' ? (
                  <div className="flex justify-between text-sm text-stone-500">
                    <span>{t('Pickup', 'Retrait')}</span>
                    <span className="text-right text-xs max-w-[140px] leading-tight">{locationLabel.split(' - ')[0]}</span>
                  </div>
                ) : null}
                <div className="flex justify-between font-bold text-stone-800 text-base pt-1">
                  <span>{t('Total', 'Total')}</span>
                  <span className="text-[#006633]">{totalPrice.toFixed(2)} EUR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
