// Supabase Database Types
// Generated from schema - update when schema changes

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          name_fr: string;
          category: string;
          price_eur: number;
          image_url: string;
          description: string;
          description_fr: string;
          artisan: string;
          origin_city: string;
          weight_grams: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_fr: string;
          category: string;
          price_eur: number;
          image_url: string;
          description: string;
          description_fr: string;
          artisan: string;
          origin_city: string;
          weight_grams: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_fr?: string;
          category?: string;
          price_eur?: number;
          image_url?: string;
          description?: string;
          description_fr?: string;
          artisan?: string;
          origin_city?: string;
          weight_grams?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      customers: {
        Row: {
          id: string;
          email: string;
          name: string;
          stripe_customer_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          stripe_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          stripe_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_code: string;
          customer_email: string;
          customer_name: string;
          status: string;
          total_amount_eur: number;
          total_weight_grams: number;
          pickup_location: string;
          pickup_location_id: string;
          stripe_payment_intent_id: string | null;
          stripe_charge_id: string | null;
          items: any;
          metadata: any | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_code?: string;
          customer_email: string;
          customer_name: string;
          status?: string;
          total_amount_eur: number;
          total_weight_grams: number;
          pickup_location: string;
          pickup_location_id: string;
          stripe_payment_intent_id?: string | null;
          stripe_charge_id?: string | null;
          items: any;
          metadata?: any | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_code?: string;
          customer_email?: string;
          customer_name?: string;
          status?: string;
          total_amount_eur?: number;
          total_weight_grams?: number;
          pickup_location?: string;
          pickup_location_id?: string;
          stripe_payment_intent_id?: string | null;
          stripe_charge_id?: string | null;
          items?: any;
          metadata?: any | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          product_name_fr: string;
          quantity: number;
          price_eur: number;
          subtotal_eur: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          product_name: string;
          product_name_fr: string;
          quantity: number;
          price_eur: number;
          subtotal_eur: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          product_name?: string;
          product_name_fr?: string;
          quantity?: number;
          price_eur?: number;
          subtotal_eur?: number;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {
      generate_order_code: {
        Args: {};
        Returns: string;
      };
    };
    Enums: {};
  };
}
