# Vercel Deployment Guide

This guide will help you deploy your Next.js e-commerce MVP to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) if you don't have an account
2. **GitHub/GitLab/Bitbucket Account**: Your code should be pushed to a Git repository
3. **Supabase Project**: Your Supabase project should be set up with the schema applied
4. **Stripe Account**: You need Stripe API keys (test or live)

## Step 1: Push Your Code to Git

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: Production-ready MVP"

# Add your remote repository (replace with your repo URL)
git remote add origin https://github.com/your-username/your-repo-name.git
git push -u origin main
```

## Step 2: Connect to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your Git provider (GitHub, GitLab, or Bitbucket)
4. Find and select your repository
5. Click "Import"

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Step 3: Configure Environment Variables

In the Vercel dashboard, go to your project settings → Environment Variables and add:

### Required Variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (e.g., `https://xxxxx.supabase.co`) | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key | All |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Your Stripe publishable key (starts with `pk_`) | All |
| `STRIPE_SECRET_KEY` | Your Stripe secret key (starts with `sk_`) | Production & Preview |
| `STRIPE_WEBHOOK_SECRET` | Your Stripe webhook secret (starts with `whsec_`) | Production & Preview |
| `NEXT_PUBLIC_BASE_URL` | Your Vercel deployment URL (will be provided after first deploy) | All |

### How to Get These Values:

**Supabase:**
- Go to your Supabase project dashboard
- Navigate to Settings → API
- Copy "Project URL" → `NEXT_PUBLIC_SUPABASE_URL`
- Copy "anon public" key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Stripe:**
- Go to Stripe Dashboard → Developers → API Keys
- Copy "Publishable key" → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Copy "Secret key" → `STRIPE_SECRET_KEY`
- For webhook secret, see Step 4 below

## Step 4: Set Up Stripe Webhooks

1. After your first deployment, get your Vercel production URL
2. Go to Stripe Dashboard → Developers → Webhooks
3. Click "Add endpoint"
4. Enter your webhook URL: `https://your-project-name.vercel.app/api/webhook`
5. Select events to listen to:
   - `checkout.session.completed`
6. Click "Add endpoint"
7. Copy the "Signing secret" → This is your `STRIPE_WEBHOOK_SECRET`

## Step 5: Update BASE_URL

After your first deployment:

1. Get your production URL from Vercel (e.g., `https://your-project-name.vercel.app`)
2. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
3. Update `NEXT_PUBLIC_BASE_URL` with your actual Vercel URL
4. Redeploy: Go to Deployments → Click on the latest deployment → Click "Redeploy"

## Step 6: Apply Database Schema

Make sure your Supabase database has the correct schema:

1. Go to Supabase Dashboard → SQL Editor
2. Copy the contents of `supabase-schema.sql` from your project
3. Paste and run the SQL script
4. Verify tables are created: `products`, `carts`, `orders`, `order_items`

## Step 7: Seed Initial Products (Optional)

You can seed some initial products via Supabase:

1. Go to Supabase Dashboard → Table Editor
2. Click on the `products` table
3. Click "Insert" → "Import data from CSV" or manually add products
4. Or use the SQL Editor to insert sample products

Example SQL for seeding:
```sql
INSERT INTO products (name, description, price, image_url, category, inventory_count)
VALUES 
  ('Wireless Headphones', 'High-quality wireless headphones with noise cancellation', 199.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=60', 'Electronics', 50),
  ('Smart Watch', 'Feature-rich smartwatch with health monitoring', 249.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=60', 'Electronics', 30);
```

## Step 8: Test Your Deployment

1. Visit your Vercel deployment URL
2. Browse products
3. Add items to cart
4. Proceed to checkout
5. Use Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Any future expiry date and any CVC

## Step 9: Configure Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow the DNS configuration instructions
4. Update `NEXT_PUBLIC_BASE_URL` with your custom domain
5. Redeploy

## Step 10: Enable Production Mode

When ready for production:

1. Update Stripe keys from test to live keys
2. Update `NEXT_PUBLIC_BASE_URL` to your production domain
3. Update webhook endpoint in Stripe to production URL
4. Redeploy with `vercel --prod` or through the dashboard

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally to test

### Environment Variables Not Working
- Ensure variable names match exactly
- Check environment scope (Production/Preview/Development)
- Redeploy after adding/updating variables

### Stripe Payment Fails
- Verify webhook is configured correctly
- Check Stripe dashboard for error logs
- Ensure webhook secret is correct

### Supabase Connection Issues
- Verify RLS policies are set correctly
- Check if tables exist in Supabase
- Ensure API keys are correct

## Monitoring

- **Vercel Analytics**: Enable in project settings
- **Stripe Dashboard**: Monitor payments and webhooks
- **Supabase Logs**: Check database queries and errors

## Next Steps

- Set up proper user authentication with Supabase Auth
- Add email notifications for orders
- Implement order tracking
- Add admin dashboard for product management
- Set up CI/CD pipelines

---

For support, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
