import { useLang } from '../context/LanguageContext';

export function HowItWorks() {
  const { t } = useLang();

  const steps = [
    {
      icon: '🛍️',
      titleEn: 'Choose Your Products',
      titleFr: 'Choisissez vos produits',
      descEn: 'Browse authentic Algerian artisanal items and add them to your custom box.',
      descFr: 'Parcourez les produits artisanaux algériens authentiques et ajoutez-les à votre boîte.',
    },
    {
      icon: '💳',
      titleEn: 'Pay Online Securely',
      titleFr: 'Payez en ligne en sécurité',
      descEn: 'Complete your order with a secure card payment. We protect every transaction.',
      descFr: 'Finalisez votre commande par paiement sécurisé. Chaque transaction est protégée.',
    },
    {
      icon: '✈️',
      titleEn: 'Travel to Algeria',
      titleFr: 'Voyagez en Algérie',
      descEn: 'Your box is ready and waiting. Fly in and we\'ll be there when you arrive.',
      descFr: 'Votre boîte est prête. Arrivez en Algérie et nous vous attendons.',
    },
    {
      icon: '📦',
      titleEn: 'Pick Up Your Box',
      titleFr: 'Récupérez votre boîte',
      descEn: 'Show your unique pickup code at one of our convenient airport or city locations.',
      descFr: 'Présentez votre code de retrait unique dans l\'un de nos points de collecte.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#F5E6D3]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-800 mb-3">
            {t('How It Works', 'Comment ça marche')}
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto">
            {t(
              'Four simple steps to get your perfect Algerian gift box.',
              'Quatre étapes simples pour obtenir votre boîte cadeau algérienne parfaite.'
            )}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center group">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-stone-300 to-transparent z-0" />
              )}
              <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md text-3xl mb-4 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#006633] text-white text-xs font-bold mb-2 -mt-2 ml-2">
                {i + 1}
              </div>
              <h3 className="font-bold text-stone-800 mb-2">
                {t(step.titleEn, step.titleFr)}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                {t(step.descEn, step.descFr)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
