export type Category = 'chocolate' | 'cosmetics' | 'pottery' | 'olive-oil' | 'dates' | 'spices';

export interface Product {
  id: string;
  name: string;
  nameFr: string;
  category: Category;
  price_eur: number;
  image_url: string;
  description: string;
  descriptionFr: string;
  artisan: string;
  origin_city: string;
  weight_grams: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  product_id: string;
  name: string;
  name_fr: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface CheckoutSession {
  items: OrderItem[];
  totalAmount: number;
  totalWeight: number;
  customerName: string;
  customerEmail: string;
  pickupLocationId: string;
  pickupLocation: string;
}

export interface Order {
  id: string;
  order_code: string;
  customer_email: string;
  customer_name: string;
  status: 'pending' | 'paid' | 'failed' | 'completed';
  total_amount_eur: number;
  total_weight_grams: number;
  pickup_location: string;
  pickup_location_id: string;
  stripe_payment_intent_id?: string;
  stripe_charge_id?: string;
  items: OrderItem[];
  created_at: string;
}

export interface PaymentIntentRequest {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  customerEmail?: string;
  customerName?: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
