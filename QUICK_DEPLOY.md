# 🚀 Quick Start: Deploy to Vercel

## Option 1: Deploy via Vercel Dashboard (Recommended for First Time)

### Step-by-Step:

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Go to [vercel.com/new](https://vercel.com/new)**

3. **Import your Git repository**
   - Click "Import Git Repository"
   - Select GitHub/GitLab/Bitbucket
   - Find and select your repository
   - Click "Import"

4. **Configure Project**
   - Framework Preset: Next.js (should be auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Click "Deploy"

5. **Add Environment Variables**
   After deployment starts, go to:
   - Project Settings → Environment Variables
   - Add each variable from the table below
   - Redeploy after adding variables

---

## Option 2: Deploy via Vercel CLI

```bash
# Login to Vercel
npx vercel login

# Deploy to preview environment
npx vercel

# Deploy to production
npx vercel --prod
```

---

## Required Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Where to Get It | Example Value |
|----------|----------------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API → Project URL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → anon public key | `eyJhbG...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API Keys | `pk_test_...` |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API Keys | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Developers → Webhooks (after setup) | `whsec_...` |
| `NEXT_PUBLIC_BASE_URL` | Your Vercel deployment URL (update after first deploy) | `https://your-app.vercel.app` |

---

## Post-Deployment Setup

### 1. Set Up Stripe Webhooks

After your first deployment:

1. Get your Vercel URL from the deployment page
2. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
3. Click "Add endpoint"
4. Enter: `https://your-app.vercel.app/api/webhook`
5. Select event: `checkout.session.completed`
6. Copy the "Signing secret" → Add as `STRIPE_WEBHOOK_SECRET` in Vercel
7. Redeploy

### 2. Apply Database Schema

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to SQL Editor
4. Copy contents of `supabase-schema.sql` from your project
5. Paste and run
6. Verify tables: `products`, `carts`, `orders`, `order_items`

### 3. Add Sample Products

In Supabase Dashboard → Table Editor → products:

```sql
INSERT INTO products (name, description, price, image_url, category, inventory_count)
VALUES 
  ('Wireless Headphones', 'High-quality wireless headphones', 199.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', 'Electronics', 50),
  ('Smart Watch', 'Feature-rich smartwatch', 249.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', 'Electronics', 30);
```

---

## Test Your Deployment

1. Visit your Vercel URL
2. Browse products
3. Add to cart
4. Checkout with test card: `4242 4242 4242 4242`
5. Verify order is created in Supabase

---

## Troubleshooting

### Build Fails
```bash
# Test build locally first
npm run build
```

### Environment Variables Not Working
- Check variable names match exactly
- Ensure correct environment scope (Production/Preview)
- Redeploy after changes

### Payment Issues
- Verify webhook is configured
- Check Stripe logs for errors
- Ensure webhook secret is correct

---

## Useful Commands

```bash
# Check deployment status
npx vercel ls

# View deployment logs
npx vercel logs

# Link local project to Vercel deployment
npx vercel link

# Pull environment variables from Vercel
npx vercel env pull
```

---

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)

**Need help?** Check the detailed guide in `DEPLOYMENT.md`
