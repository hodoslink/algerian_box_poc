import { Check } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

export type Step = 'select' | 'review' | 'pickup' | 'pay' | 'confirm';

const STEPS: { id: Step; en: string; fr: string }[] = [
  { id: 'select', en: 'Select', fr: 'Sélect.' },
  { id: 'review', en: 'Review', fr: 'Réviser' },
  { id: 'pickup', en: 'Pickup', fr: 'Retrait' },
  { id: 'pay', en: 'Pay', fr: 'Payer' },
  { id: 'confirm', en: 'Confirm', fr: 'Confirmé' },
];

interface StepperProps {
  current: Step;
}

export function Stepper({ current }: StepperProps) {
  const { lang } = useLang();
  const currentIdx = STEPS.findIndex(s => s.id === current);

  return (
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((step, idx) => {
        const isCompleted = idx < currentIdx;
        const isActive = idx === currentIdx;
        const label = lang === 'fr' ? step.fr : step.en;

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  isCompleted
                    ? 'bg-[#006633] text-white'
                    : isActive
                    ? 'bg-[#D21034] text-white ring-4 ring-red-100'
                    : 'bg-stone-100 text-stone-400'
                }`}
              >
                {isCompleted ? <Check size={14} /> : idx + 1}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  isActive ? 'text-[#D21034]' : isCompleted ? 'text-[#006633]' : 'text-stone-400'
                }`}
              >
                {label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`w-8 sm:w-12 h-0.5 mx-1 transition-colors ${
                  idx < currentIdx ? 'bg-[#006633]' : 'bg-stone-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
