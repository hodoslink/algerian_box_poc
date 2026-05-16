# 🚀 Vercel Deployment Guide - Algerian Box MVP

## Prerequisites
- GitHub account
- Vercel account (free tier is fine)
- Supabase account
- Stripe account

---

## Step 1: Push Code to GitHub

### Option A: Using GitHub Desktop (Easiest)
1. Download GitHub Desktop: https://desktop.github.com/
2. Open GitHub Desktop
3. Click "Add Local Repository" → "Choose..."
4. Select your `/workspace` folder
5. Click "Publish repository"
6. Name it something like `algerian-box-mvp`
7. Keep it **Public** or **Private** (your choice)
8. Click "Publish Repository"

### Option B: Using Command Line
```bash
# Go to your project folder
cd /workspace

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - MVP ready for deployment"

# Create a new repo on GitHub.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended)
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository (`algerian-box-mvp`)
4. Click "Import"
5. **Configure Project:**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

6. **Add Environment Variables** (click "Environment Variables"):
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key-here
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_test_xxx
   STRIPE_SECRET_KEY = sk_test_xxx
   STRIPE_WEBHOOK_SECRET = whsec_xxx (add this after setting up webhook)
   NEXT_PUBLIC_BASE_URL = https://your-app.vercel.app
   ```

7. Click "Deploy"
8. Wait 2-3 minutes for deployment to complete
9. Click "Visit" to see your live site!

### Method 2: Vercel CLI (Alternative)
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (preview)
vercel

# Deploy to production
vercel --prod
```

---

## Step 3: Set Up Supabase Database

1. Go to https://supabase.com
2. Create a new project
3. Go to SQL Editor
4. Copy and paste the contents of `supabase-schema.sql`
5. Click "Run"
6. Go to Settings → API
7. Copy these values for your environment variables:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Add Sample Products (Optional)
In Supabase SQL Editor:
```sql
INSERT INTO products (name, description, price, image_url, category, inventory_count) VALUES
('Wireless Headphones', 'High-quality wireless headphones with noise cancellation', 199.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=60', 'Electronics', 50),
('Smart Watch', 'Feature-rich smartwatch with health monitoring', 249.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=60', 'Electronics', 30),
('Coffee Maker', 'Programmable coffee maker with thermal carafe', 89.99, 'https://images.unsplash.com/photo-1498124571463-af0d2b657877?w=500&q=60', 'Home Appliances', 20);
```

---

## Step 4: Set Up Stripe

1. Go to https://dashboard.stripe.com
2. Toggle "Test Mode" ON (for testing)
3. Go to Developers → API keys
4. Copy these values:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`

### Set Up Webhook
1. In Stripe Dashboard, go to Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://YOUR-APP.vercel.app/api/webhook`
4. Events to send: Select `checkout.session.completed`
5. Click "Add endpoint"
6. Copy the "Signing secret" → `STRIPE_WEBHOOK_SECRET`

7. **Important**: Go back to Vercel and add `STRIPE_WEBHOOK_SECRET` to environment variables
8. Redeploy in Vercel (Settings → Deployments → Redeploy)

---

## Step 5: Test Your Deployment

1. Visit your Vercel app URL
2. Browse products
3. Add items to cart
4. Go to checkout
5. Use Stripe test card: **4242 4242 4242 4242**
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits
6. Complete purchase
7. Verify order confirmation page appears

---

## Troubleshooting

### Build Fails
- Check Vercel deployment logs
- Ensure all files are committed to git
- Verify `package.json` has correct dependencies

### Environment Variables Not Working
- Make sure variable names are EXACT (case-sensitive)
- Redeploy after adding environment variables
- Check that `NEXT_PUBLIC_` prefix is used for client-side vars

### Stripe Payment Fails
- Verify you're using test keys in test mode
- Check webhook is properly configured
- Look at Stripe logs in Developers → Logs

### Database Errors
- Verify Supabase schema was applied correctly
- Check RLS (Row Level Security) policies
- Ensure table names match exactly

---

## Post-Deployment Checklist

✅ Site loads without errors  
✅ Products display correctly  
✅ Cart functionality works  
✅ Checkout redirects to Stripe  
✅ Payment completes successfully  
✅ Confirmation page appears  
✅ Orders are saved in Supabase  
✅ Webhook processes payments  

---

## Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Supabase Dashboard: https://app.supabase.com
- Stripe Dashboard: https://dashboard.stripe.com
- Next.js Docs: https://nextjs.org/docs

---

## Need Help?

If you encounter issues:
1. Check the deployment logs in Vercel
2. Review browser console for errors
3. Verify all environment variables are set
4. Test locally first: `npm install && npm run dev`

Good luck with your deployment! 🎉
