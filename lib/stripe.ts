import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export function formatAmountForStripe(amount: number): number {
  // Stripe expects amount in cents for EUR
  return Math.round(amount * 100);
}

export function formatAmountFromStripe(amount: number): number {
  // Convert from cents back to euros
  return amount / 100;
}
