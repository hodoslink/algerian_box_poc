import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { updateOrderStatus, getOrderByPaymentIntent } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = (await headers()).get('stripe-signature') as string;

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET not configured');
    return NextResponse.json(
      { success: false, error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { success: false, error: `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('PaymentIntent was successful!', paymentIntent.id);
      
      try {
        // Update order status in Supabase
        await updateOrderStatus(
          paymentIntent.id,
          'paid',
          paymentIntent.latest_charge as string || undefined
        );
        console.log(`Order updated to paid for payment intent: ${paymentIntent.id}`);
      } catch (error) {
        console.error('Failed to update order status:', error);
      }
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.log('Payment failed:', failedPayment.id);
      
      try {
        // Update order status to failed
        await updateOrderStatus(failedPayment.id, 'failed');
        console.log(`Order updated to failed for payment intent: ${failedPayment.id}`);
      } catch (error) {
        console.error('Failed to update order status:', error);
      }
      
      // Optionally send notification email here
      break;

    case 'charge.succeeded':
      const charge = event.data.object as Stripe.Charge;
      console.log('Charge succeeded:', charge.id);
      
      if (charge.payment_intent) {
        try {
          // Mark order as completed once charge is confirmed
          await updateOrderStatus(
            typeof charge.payment_intent === 'string' 
              ? charge.payment_intent 
              : charge.payment_intent.id,
            'completed',
            charge.id
          );
        } catch (error) {
          console.error('Failed to mark order as completed:', error);
        }
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
