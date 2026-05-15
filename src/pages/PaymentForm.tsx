import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Lock } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
  customerName: string;
  customerEmail: string;
}

export default function PaymentForm({ amount, onSuccess, onError, customerName, customerEmail }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/confirmation`,
          payment_method_data: {
            billing_details: {
              name: customerName || 'Customer',
              email: customerEmail || undefined,
            },
          },
        },
        redirect: 'if_required',
      });

      if (error) {
        setMessage(error.message || 'Payment failed');
        onError(error.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setMessage('Payment successful!');
        onSuccess();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setMessage(errorMessage);
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
          <Lock size={18} className="text-[#006633]" />
          Payment Details
        </h3>
        
        {/* Stripe Payment Element */}
        <div className="border border-stone-200 rounded-lg p-4 bg-stone-50">
          <PaymentElement 
            options={{
              layout: 'tabs',
              wallets: { applePay: 'auto', googlePay: 'auto' },
            }}
          />
        </div>
      </div>

      {/* Amount Display */}
      <div className="mb-6 p-4 bg-[#006633]/5 rounded-lg border border-[#006633]/20">
        <div className="flex justify-between items-center">
          <span className="text-stone-700 font-medium">Total Amount:</span>
          <span className="text-2xl font-bold text-[#006633]">{amount.toFixed(2)} EUR</span>
        </div>
      </div>

      {/* Error Message */}
      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          message.includes('successful') 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className={`w-full flex items-center justify-center gap-2 font-semibold py-4 rounded-full transition-all shadow-lg text-white ${
          !stripe || isLoading
            ? 'bg-stone-400 cursor-not-allowed'
            : 'bg-[#D21034] hover:bg-[#b50e2b] hover:scale-[1.02]'
        }`}
      >
        {isLoading ? (
          <>
            <span className="animate-spin">⏳</span>
            Processing...
          </>
        ) : (
          <>
            <Lock size={16} />
            Pay {amount.toFixed(2)} EUR
          </>
        )}
      </button>

      {/* Security Notice */}
      <div className="mt-4 text-center text-xs text-stone-500">
        🔒 Secured by Stripe • Your payment information is encrypted
      </div>
    </form>
  );
}
