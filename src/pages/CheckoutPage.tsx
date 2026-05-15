import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Lock, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';
import { Stepper } from '../components/Stepper';
import PaymentForm from './PaymentForm';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface CheckoutPageProps {
  onBack: () => void;
  onConfirm: (code: string, location: string) => void;
}

export function CheckoutPage({ onBack, onConfirm }: CheckoutPageProps) {
  const { items, totalPrice, totalWeight, clearCart } = useCart();
  const { t, lang } = useLang();
  const [step, setStep] = useState<'review' | 'pickup' | 'pay'>('review');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [clientSecret, setClientSecret] = useState<string>('');
  const [stripePromise, setStripePromise] = useState<any>(null);

  // Load Stripe public key and create payment intent
  useEffect(() => {
    const initializeStripe = async () => {
      if (step === 'pay' && !clientSecret) {
        try {
          setLoading(true);
          
          // Create payment intent on server
          const response = await fetch(`${API_URL}/api/create-payment-intent`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              items: items.map(item => ({
                id: item.product.id,
                name: lang === 'fr' ? item.product.nameFr : item.product.name,
                price: item.product.price_eur,
                quantity: item.quantity,
              })),
              totalAmount: totalPrice,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to create payment intent');
          }

          const data = await response.json();
          setClientSecret(data.clientSecret);

          // Initialize Stripe with public key
          const stripePubKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_your_public_key';
          const stripeInstance = await loadStripe(stripePubKey);
          setStripePromise(Promise.resolve(stripeInstance));
        } catch (error) {
          console.error('Error initializing Stripe:', error);
          alert(t('Failed to initialize payment. Please try again.', 'Échec de l\'initialisation du paiement. Veuillez réessayer.'));
        } finally {
          setLoading(false);
        }
      }
    };

    initializeStripe();
  }, [step, clientSecret, items, totalPrice, lang, t]);

  const handlePaymentSuccess = () => {
    const code = generateCode();
    clearCart();
    onConfirm(code, locationLabel);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    alert(t('Payment failed. Please try again.', 'Le paiement a échoué. Veuillez réessayer.'));
  };

  function generateCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'DZ-';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  }

  const PICKUP_LOCATIONS = [
    { id: 'airport', label: '✈️ Houari Boumediene Airport - Terminal Arrivals' },
    { id: 'algiers', label: '🏪 Alger Centre - 12 Rue Didouche Mourad' },
    { id: 'oran', label: '🏪 Oran Port - Near Ferry Terminal' },
  ];

  const [location, setLocation] = useState(PICKUP_LOCATIONS[0].id);
  const locationLabel = PICKUP_LOCATIONS.find(l => l.id === location)?.label ?? '';

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
                  <span className="flex items-center gap-2"><Lock size={22} className="text-[#D21034]" />{t('Secure Payment', 'Paiement sécurisé')}</span>
                </h2>

                {loading && !clientSecret ? (
                  <div className="bg-white rounded-2xl border border-stone-100 p-8 text-center">
                    <div className="animate-spin text-4xl mb-4">🇩🇿</div>
                    <p className="text-stone-600">{t('Initializing secure payment...', 'Initialisation du paiement sécurisé...')}</p>
                  </div>
                ) : clientSecret && stripePromise ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <PaymentForm 
                      amount={totalPrice} 
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                      customerName={name}
                      customerEmail={email}
                    />
                  </Elements>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
                    ⚠️ {t('Unable to load payment form. Please refresh the page.', 'Impossible de charger le formulaire de paiement. Veuillez rafraîchir la page.')}
                  </div>
                )}

                {/* Customer Information Form */}
                <div className="mt-6 space-y-4 bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
                  <h3 className="font-semibold text-stone-800 mb-3">{t('Contact Information', 'Informations de contact')}</h3>
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
                </div>
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
