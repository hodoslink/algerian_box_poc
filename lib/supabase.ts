import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client for browser usage (with anon key, respects RLS)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Server-side client (with service role key, bypasses RLS)
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Helper function to create or get customer
export async function getOrCreateCustomer(email: string, name: string) {
  // Try to find existing customer
  const { data: existing } = await supabaseAdmin
    .from('customers')
    .select('*')
    .eq('email', email)
    .single();

  if (existing) {
    return existing;
  }

  // Create new customer
  const { data: newCustomer, error } = await supabaseAdmin
    .from('customers')
    .insert({ email, name })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create customer: ${error.message}`);
  }

  return newCustomer;
}

// Helper function to create order
export async function createOrder(orderData: {
  customer_email: string;
  customer_name: string;
  total_amount_eur: number;
  total_weight_grams: number;
  pickup_location: string;
  pickup_location_id: string;
  items: any[];
  stripe_payment_intent_id?: string;
}) {
  const { data: order, error } = await supabaseAdmin
    .from('orders')
    .insert({
      ...orderData,
      status: 'pending',
      items: orderData.items,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create order: ${error.message}`);
  }

  return order;
}

// Helper function to update order status
export async function updateOrderStatus(
  paymentIntentId: string,
  status: 'paid' | 'failed' | 'completed',
  chargeId?: string
) {
  const updateData: any = { status };
  if (chargeId) {
    updateData.stripe_charge_id = chargeId;
  }

  const { error } = await supabaseAdmin
    .from('orders')
    .update(updateData)
    .eq('stripe_payment_intent_id', paymentIntentId);

  if (error) {
    throw new Error(`Failed to update order status: ${error.message}`);
  }
}

// Helper function to get order by payment intent ID
export async function getOrderByPaymentIntent(paymentIntentId: string) {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('stripe_payment_intent_id', paymentIntentId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
    throw new Error(`Failed to fetch order: ${error.message}`);
  }

  return data;
}
