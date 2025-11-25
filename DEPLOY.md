# 🚀 Deployment Guide

## Pre-Deployment Checklist

### ✅ Local Testing
- [ ] `npm install` runs successfully
- [ ] `npm run dev` starts server on port 3000
- [ ] Homepage loads at http://localhost:3000
- [ ] Christmas promo section displays
- [ ] WhatsApp button appears (bottom right)
- [ ] Add products to cart works
- [ ] Checkout sends order to WhatsApp
- [ ] Quiz recommends products with images
- [ ] All images load from `/public/images/`

### ✅ Code Preparation
- [ ] `.env` file NOT committed to Git (in `.gitignore`)
- [ ] MongoDB connection string ready
- [ ] WhatsApp number correct (+2347067510073)
- [ ] All product images in `public/images/`
- [ ] `package.json` has all dependencies

### ✅ Git Repository
```bash
# Initialize Git (if not done)
git init
git add .
git commit -m "Initial commit - Arby's Skincare Site"

# Push to GitHub
git remote add origin https://github.com/yourusername/arbys-website.git
git branch -M main
git push -u origin main
```

---

## Deployment Option 1: Render (Free)

### Step 1: Setup MongoDB Atlas
1. Go to https://www.mongodb.com/atlas
2. Sign up / Log in
3. Create FREE cluster
4. Click "Connect" → "Connect your application"
5. Copy connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/arbys-skincare
   ```
6. Save this - you'll need it!

### Step 2: Deploy to Render
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repo
5. Fill in:
   - **Name**: arbys-skincare
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 3: Environment Variables
In Render dashboard, add:
```
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/arbys-skincare
JWT_SECRET=your_strong_random_secret_here_32_characters_min
JWT_EXPIRE=30d
CLIENT_URL=https://arbys-skincare.onrender.com
```

**Generate secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Deploy
- Click "Create Web Service"
- Wait 5-10 minutes for build
- Your site: `https://arbys-skincare.onrender.com`

---

## Deployment Option 2: Vercel (Fast)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Configure
Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    },
    {
      "src": "public/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server.js"
    },
    {
      "src": "/(.*)",
      "dest": "public/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Step 3: Deploy
```bash
vercel --prod
```

### Step 4: Add Environment Variables
```bash
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add CLIENT_URL
```

---

## Deployment Option 3: Railway (Easy)

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Login and Deploy
```bash
railway login
railway init
railway up
```

### Step 3: Add Environment Variables
```bash
railway variables set MONGODB_URI="your_mongodb_uri"
railway variables set JWT_SECRET="your_secret"
railway variables set NODE_ENV=production
```

### Step 4: Open
```bash
railway open
```

---

## Post-Deployment Checks

### ✅ Test Production Site
- [ ] Homepage loads
- [ ] Christmas promo visible
- [ ] WhatsApp button works
- [ ] Images load correctly
- [ ] Quiz works and shows products
- [ ] Add to cart functions
- [ ] Checkout opens WhatsApp
- [ ] Order message formatted correctly
- [ ] Mobile responsive
- [ ] All pages load (products, about, blog, etc.)

### ✅ Test Order Flow
1. Add Christmas Bundle to cart
2. Go to checkout
3. Fill shipping details:
   - Name: Test Customer
   - Phone: 08012345678
   - Address: Test Address
4. Click "Place Order"
5. **Check:** WhatsApp opens with order
6. **Check:** You receive message on +2347067510073

### ✅ Security Check
- [ ] `.env` file NOT in Git
- [ ] HTTPS enabled (automatic on Render/Vercel)
- [ ] CSP headers working
- [ ] Rate limiting active
- [ ] No console errors in browser

---

## Custom Domain Setup

### Render
1. Go to Settings → Custom Domains
2. Add your domain: `arbysskincare.com`
3. Update DNS:
   ```
   Type: CNAME
   Name: www
   Value: arbys-skincare.onrender.com
   ```

### Vercel
1. Go to Settings → Domains
2. Add domain
3. Follow DNS instructions

---

## Environment Variables Reference

### Required
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/arbys-skincare
JWT_SECRET=your_32_character_minimum_secret_key
PORT=3000
```

### Optional
```env
JWT_EXPIRE=30d
CLIENT_URL=https://yourdomain.com
COOKIE_SECRET=your_cookie_secret
```

---

## Monitoring

### Render Dashboard
- View logs: Render Dashboard → Logs tab
- Check health: Should show "Live"
- Monitor usage: Free tier limits

### Check Server Status
```bash
curl https://your-site.onrender.com/api/products
```

Should return JSON with products.

---

## Updating Site

### After Code Changes
```bash
# Commit changes
git add .
git commit -m "Update description"
git push origin main

# Render/Vercel auto-deploys from GitHub
# Wait 2-5 minutes for deployment
```

---

## Troubleshooting

### Build Fails
```bash
# Check Node version (must be >= 18)
node --version

# Ensure all dependencies in package.json
npm install
```

### Site Won't Load
1. Check logs in deployment platform
2. Verify MongoDB connection string
3. Check environment variables set correctly
4. Ensure PORT is 3000 or from env

### WhatsApp Not Opening
1. Check phone number format: `2347067510073` (no + or spaces)
2. Test URL manually:
   ```
   https://wa.me/2347067510073?text=Test
   ```

### Images Not Loading
1. Verify images in `public/images/`
2. Check file names match code (case-sensitive)
3. Test image URL:
   ```
   https://your-site.com/images/skinrepair.jpeg
   ```

### Database Errors
1. Whitelist IP in MongoDB Atlas (use 0.0.0.0/0 for all)
2. Check connection string is correct
3. Verify database user has read/write permissions

---

## Quick Deploy Commands

### Render
```bash
git push origin main  # Auto-deploys
```

### Vercel
```bash
vercel --prod
```

### Railway
```bash
railway up
```

---

## Support

**Issues?** Check logs first:
- Render: Dashboard → Logs
- Vercel: Dashboard → Deployments → View Function Logs
- Railway: Dashboard → Project → Logs

**Still stuck?** Test locally first:
```bash
npm run dev
# If works locally, issue is deployment config
```

---

## Production URLs

After deployment, your site will be at:
- **Render**: `https://arbys-skincare.onrender.com`
- **Vercel**: `https://arbys-website.vercel.app`
- **Railway**: `https://arbys-website.up.railway.app`

Update this in:
- `.env` → `CLIENT_URL`
- Share with customers!

---

🎉 **Deployment Complete!**

Your site is now live and ready to receive orders via WhatsApp!
