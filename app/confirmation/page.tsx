'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Package, CheckCircle, ArrowRight } from 'lucide-react';
import Confetti from '@/components/Confetti';

export default function ConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const [orderCode, setOrderCode] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch order details from the API
    // For now, we'll use URL query parameters or session storage
    const storedCode = sessionStorage.getItem('orderCode');
    const storedLocation = sessionStorage.getItem('pickupLocation');
    
    if (storedCode) {
      setOrderCode(storedCode);
    } else if (params.code) {
      setOrderCode(params.code as string);
    }

    if (storedLocation) {
      setLocation(storedLocation);
    } else if (params.location) {
      setLocation(params.location as string);
    }

    setLoading(false);
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5E6D3]/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">🇩🇿</div>
          <p className="text-stone-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5E6D3]/20 py-12 px-4">
      <Confetti />
      
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-stone-800 mb-2">
            Shukran! Thank You for Your Order
          </h1>
          <p className="text-stone-600">
            Your Algerian box has been confirmed and will be ready for pickup.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Package size={24} className="text-[#006633]" />
            <h2 className="text-xl font-bold text-stone-800">Order Details</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-[#006633]/5 rounded-lg">
              <span className="text-stone-600">Order Code</span>
              <span className="text-2xl font-bold text-[#006633] tracking-wider">
                {orderCode || 'DZ-XXXXXX'}
              </span>
            </div>

            <div className="p-4 bg-stone-50 rounded-lg">
              <p className="text-sm text-stone-500 mb-1">Pickup Location</p>
              <p className="font-semibold text-stone-800">
                {location || 'Location to be confirmed'}
              </p>
            </div>

            <div className="border-t border-stone-100 pt-4">
              <p className="text-sm text-stone-600 mb-2">
                📧 A confirmation email has been sent to your inbox with all the details.
              </p>
              <p className="text-sm text-stone-600">
                📱 Please save your order code and present it at the pickup location.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 mb-6">
          <h3 className="font-bold text-stone-800 mb-4">What's Next?</h3>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-[#006633] text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              <p className="text-stone-700">
                We'll prepare your box with fresh Algerian products
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-[#006633] text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              <p className="text-stone-700">
                You'll receive a notification when your order is ready for pickup
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-[#006633] text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              <p className="text-stone-700">
                Pick up your box at the selected location with your order code
              </p>
            </li>
          </ol>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => router.push('/')}
          className="w-full bg-[#D21034] hover:bg-[#b50e2b] text-white font-semibold py-4 rounded-full transition-all hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
        >
          Continue Shopping
          <ArrowRight size={20} />
        </button>

        {/* Support Info */}
        <div className="mt-6 text-center text-sm text-stone-500">
          <p>Questions? Contact us at support@algerianbox.com</p>
        </div>
      </div>
    </div>
  );
}
