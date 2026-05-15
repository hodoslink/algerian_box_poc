# Algerian Box MVP - E-commerce Website

A modern e-commerce platform for selling authentic Algerian artisanal products with real payment processing.

## Features

- 🛍️ **Product Catalog**: Browse Algerian artisanal products (dates, chocolate, cosmetics, pottery, olive oil, spices)
- 🛒 **Shopping Cart**: Add/remove items, update quantities
- 🌐 **Bilingual**: English and French language support
- 💳 **Real Payment Processing**: Stripe integration for secure payments
- 📍 **Pickup Locations**: Choose from multiple pickup points in Algeria
- 📦 **Order Confirmation**: Generate unique order codes

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- TailwindCSS for styling
- Stripe Elements for payment UI
- Lucide React for icons

### Backend
- Node.js with Express
- TypeScript
- Stripe API for payments
- CORS enabled for frontend communication

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Stripe account (get free test API keys at https://dashboard.stripe.com/apikeys)

### Installation

1. **Clone the repository**
   ```bash
   cd /workspace
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd server && npm install && cd ..
   ```

3. **Configure environment variables**

   **Frontend (.env)**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Stripe public key:
   ```
   VITE_STRIPE_PUBLIC_KEY=pk_test_your_public_key_here
   VITE_API_URL=http://localhost:3001
   ```

   **Backend (server/.env)**:
   ```bash
   cp server/.env.example server/.env
   ```
   
   Edit `server/.env` and add your Stripe secret key:
   ```
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   FRONTEND_URL=http://localhost:5173
   PORT=3001
   ```

4. **Get Stripe API Keys**
   - Go to https://dashboard.stripe.com/test/apikeys
   - Copy your **Publishable key** to `VITE_STRIPE_PUBLIC_KEY`
   - Copy your **Secret key** to `STRIPE_SECRET_KEY`
   
   For webhooks (optional for local testing):
   - Install Stripe CLI: `stripe listen --forward-to localhost:3001/api/webhook`
   - Or use the Stripe Dashboard to create a webhook endpoint

5. **Run the application**
   ```bash
   # Run both frontend and backend concurrently
   npm run dev
   ```
   
   Or run them separately:
   ```bash
   # Terminal 1 - Backend
   npm run dev:server
   
   # Terminal 2 - Frontend
   npm run dev:client
   ```

6. **Open in browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## Project Structure

```
/workspace
├── src/                    # Frontend React code
│   ├── components/         # Reusable UI components
│   ├── context/            # React contexts (Cart, Language)
│   ├── data/               # Product data
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── ConfirmationPage.tsx
│   │   └── PaymentForm.tsx  # Stripe payment form
│   └── App.tsx
├── server/                 # Backend Express server
│   ├── index.ts           # Main server file
│   ├── .env               # Server environment variables
│   └── package.json
├── .env                   # Frontend environment variables
├── .env.example           # Environment template
└── package.json
```

## Payment Flow

1. User adds products to cart
2. User proceeds to checkout
3. User reviews cart items
4. User selects pickup location
5. User enters contact information
6. Stripe Payment Element loads securely
7. User enters payment details
8. Payment is processed via Stripe
9. On success: Order confirmation with unique code
10. Webhook notifies backend of payment status

## Testing Payments

Use Stripe test cards:
- **Success**: 4242 4242 4242 4242 (any future expiry, any CVC)
- **Decline**: 4000 0000 0000 0002
- **Requires authentication**: 4000 0027 6000 3184

See more test cards at: https://stripe.com/docs/testing#cards

## Deployment

### Frontend
Deploy to Vercel, Netlify, or any static hosting:
```bash
npm run build
```

### Backend
Deploy to Heroku, Railway, Render, or any Node.js hosting service.

Make sure to set production environment variables:
- `VITE_API_URL` = your production backend URL
- `STRIPE_SECRET_KEY` = production secret key
- Update CORS origins in server/index.ts

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.