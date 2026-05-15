#!/bin/bash

# Quick Deployment Checklist Script
# Run this to verify your project is ready for Vercel deployment

echo "🚀 Vercel Deployment Checklist"
echo "=============================="
echo ""

# Check if package.json exists
if [ -f "package.json" ]; then
    echo "✅ package.json found"
else
    echo "❌ package.json not found"
    exit 1
fi

# Check if next.config.js exists
if [ -f "next.config.js" ] || [ -f "next.config.mjs" ]; then
    echo "✅ Next.js config found"
else
    echo "⚠️  Next.js config not found (using defaults)"
fi

# Check if vercel.json exists
if [ -f "vercel.json" ]; then
    echo "✅ vercel.json found"
else
    echo "⚠️  vercel.json not found (will use defaults)"
fi

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local found"
    echo "   ⚠️  Remember: Environment variables must also be set in Vercel dashboard"
else
    echo "⚠️  .env.local not found"
    echo "   📝 Create one with your environment variables"
fi

# Check if supabase-schema.sql exists
if [ -f "supabase-schema.sql" ]; then
    echo "✅ Supabase schema found"
else
    echo "❌ Supabase schema not found"
fi

# Check if app directory exists
if [ -d "app" ]; then
    echo "✅ App router directory found"
else
    echo "❌ App router directory not found"
    exit 1
fi

# Check for required API routes
if [ -f "app/api/create-checkout-session/route.ts" ]; then
    echo "✅ Stripe checkout API route found"
else
    echo "❌ Stripe checkout API route not found"
fi

if [ -f "app/api/webhook/route.ts" ]; then
    echo "✅ Stripe webhook API route found"
else
    echo "❌ Stripe webhook API route not found"
fi

# Check for TypeScript config
if [ -f "tsconfig.json" ]; then
    echo "✅ TypeScript config found"
else
    echo "⚠️  TypeScript config not found"
fi

# Try to build the project
echo ""
echo "🔨 Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Fix errors before deploying."
    exit 1
fi

echo ""
echo "====================================="
echo "📋 Pre-Deployment Checklist:"
echo "====================================="
echo "□ Push code to Git repository"
echo "□ Create Supabase project and apply schema"
echo "□ Get Stripe API keys"
echo "□ Set up environment variables in Vercel"
echo "□ Configure Stripe webhooks after first deploy"
echo ""
echo "🎉 Ready to deploy to Vercel!"
echo ""
echo "Next steps:"
echo "1. git add . && git commit -m 'Ready for deployment'"
echo "2. git push origin main"
echo "3. Go to vercel.com/new and import your repository"
echo "4. Add environment variables in Vercel dashboard"
echo "5. Deploy!"
echo ""
