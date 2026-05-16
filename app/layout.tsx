import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from './components/CartProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Algerian Box - Premium Products',
  description: 'Discover premium Algerian products with fast delivery',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
              <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-indigo-600">🇩🇿 Algerian Box</h1>
                <nav>
                  <ul className="flex space-x-6">
                    <li><a href="/" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</a></li>
                    <li><a href="/#products" className="text-gray-600 hover:text-indigo-600 transition-colors">Products</a></li>
                    <li>
                      <a href="/cart" className="text-gray-600 hover:text-indigo-600 transition-colors relative">
                        Cart
                        <span className="absolute -top-2 -right-4 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          0
                        </span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </header>

            <main className="container mx-auto px-4 py-8">
              {children}
            </main>

            <footer className="bg-white border-t mt-12 py-6">
              <div className="container mx-auto px-4 text-center text-gray-600">
                <p>&copy; {new Date().getFullYear()} Algerian Box. All rights reserved.</p>
                <p className="text-sm mt-2">Made with ❤️ in Algeria</p>
              </div>
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
