import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe, formatAmountForStripe } from '@/lib/stripe';
import { createOrder, getOrCreateCustomer } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, totalAmount, customerName, customerEmail, pickupLocationId, pickupLocation } = body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid cart items' },
        { status: 400 }
      );
    }

    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid total amount' },
        { status: 400 }
      );
    }

    if (!customerEmail || !customerName) {
      return NextResponse.json(
        { success: false, error: 'Customer information is required' },
        { status: 400 }
      );
    }

    // Create or get customer in Supabase
    const customer = await getOrCreateCustomer(customerEmail, customerName);

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(totalAmount),
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
      metadata: {
        customer_id: customer.id,
        customer_email: customerEmail,
        pickup_location_id: pickupLocationId,
      },
    });

    // Calculate total weight
    const totalWeight = items.reduce((sum: number, item: any) => {
      return sum + (item.weight_grams || 0) * item.quantity;
    }, 0);

    // Create order in Supabase
    const order = await createOrder({
      customer_email: customerEmail,
      customer_name: customerName,
      total_amount_eur: totalAmount,
      total_weight_grams: totalWeight,
      pickup_location: pickupLocation,
      pickup_location_id: pickupLocationId,
      items: items.map((item: any) => ({
        product_id: item.id,
        name: item.name,
        name_fr: item.nameFr || item.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity,
      })),
      stripe_payment_intent_id: paymentIntent.id,
    });

    return NextResponse.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        orderId: order.id,
        orderCode: order.order_code,
      },
    });
  } catch (error) {
    console.error('Checkout error:', error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { success: false, error: `Stripe error: ${error.message}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
