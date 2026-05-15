import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { CartSidebar } from './components/CartSidebar';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmationPage } from './pages/ConfirmationPage';

type Page = 'home' | 'checkout' | 'confirmation';

interface OrderState {
  code: string;
  location: string;
}

function AppContent() {
  const [page, setPage] = useState<Page>('home');
  const [order, setOrder] = useState<OrderState | null>(null);

  const goCheckout = () => {
    setPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirm = (code: string, location: string) => {
    setOrder({ code, location });
    setPage('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setPage('home');
    setOrder(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-stone-900">
      {page !== 'confirmation' && (
        <>
          <Header />
          <CartSidebar onCheckout={goCheckout} />
        </>
      )}

      {page === 'home' && <HomePage onCheckout={goCheckout} />}
      {page === 'checkout' && (
        <CheckoutPage onBack={goHome} onConfirm={handleConfirm} />
      )}
      {page === 'confirmation' && order && (
        <ConfirmationPage code={order.code} location={order.location} onHome={goHome} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </LanguageProvider>
  );
}
