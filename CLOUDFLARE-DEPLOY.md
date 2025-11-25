# 🚀 Deploy to Cloudflare Pages (100% FREE)

## Why Cloudflare?
- ✅ **FREE** (unlimited bandwidth)
- ✅ **FREE** SSL/HTTPS
- ✅ **FREE** domain (yourbusiness.pages.dev)
- ✅ Super fast CDN
- ✅ Auto-deploys from GitHub

---

## Step 1: Push to GitHub

```bash
# Create repo at github.com → New Repository
# Name: arbys-website
# Make it Public (for free deployment)

# Push your code
git remote add origin https://github.com/YOUR_USERNAME/arbys-website.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend on Render (FREE)

### A. Setup MongoDB Atlas (FREE Database)
1. Go to https://mongodb.com/atlas
2. Sign up → Create FREE cluster
3. Click "Connect" → Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/arbys-skincare
   ```

### B. Deploy Backend on Render
1. Go to https://render.com
2. Sign up with GitHub
3. New → Web Service
4. Connect `arbys-website` repo
5. Settings:
   - **Name**: arbys-skincare-api
   - **Root Directory**: (leave empty)
   - **Build**: `npm install`
   - **Start**: `npm start`
6. Environment Variables:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/arbys-skincare
   JWT_SECRET=<run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
   PORT=3000
   CLIENT_URL=https://arbys-skincare.pages.dev
   ```
7. Deploy → Wait 5 min
8. **Save your backend URL**: `https://arbys-skincare-api.onrender.com`

---

## Step 3: Deploy Frontend on Cloudflare Pages (FREE)

### A. Prepare Frontend Files
```bash
# Create build for Cloudflare
mkdir -p cloudflare-deploy
cp -r public/* cloudflare-deploy/

# Update API endpoints in JS files
# (We'll do this in next step)
```

### B. Deploy to Cloudflare
1. Go to https://pages.cloudflare.com
2. Sign up (FREE account)
3. Create Application → Connect to Git → Select your GitHub repo
4. Build Settings:
   - **Framework**: None
   - **Build command**: (leave empty)
   - **Build output**: `public`
5. Environment Variables:
   ```
   NODE_ENV=production
   API_URL=https://arbys-skincare-api.onrender.com
   ```
6. Deploy!
7. Your site: `https://arbys-skincare.pages.dev` 🎉

---

## Step 4: Get FREE Custom Domain

### Option A: Free Subdomain from Cloudflare
Already included! `arbys-skincare.pages.dev`

### Option B: Register Free Domain
1. Go to https://www.freenom.com (FREE domains)
2. Register: `arbysskincare.tk` or `.ml` or `.ga`
3. In Cloudflare Pages:
   - Settings → Custom Domains
   - Add your domain
4. Update Freenom DNS:
   ```
   Type: CNAME
   Name: @
   Target: arbys-skincare.pages.dev
   ```
5. SSL automatic! ✅

---

## Step 5: Add Paystack Payment Integration

### A. Get Paystack API Keys
1. Go to https://paystack.com
2. Sign up / Login
3. Settings → API Keys & Webhooks
4. Copy:
   - **Public Key**: `pk_live_xxxxx`
   - **Secret Key**: `sk_live_xxxxx`

### B. Add to Render Backend
In Render dashboard, add env vars:
```
PAYSTACK_SECRET_KEY=sk_live_your_key
PAYSTACK_PUBLIC_KEY=pk_live_your_key
```

### C. Update Frontend API URL
We'll create a config file...
```

---

## 📝 Complete Setup Commands

```bash
# 1. Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/arbys-website.git
git push -u origin main

# 2. Generate JWT Secret for Render
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 3. Test backend API
curl https://arbys-skincare-api.onrender.com/api/products

# 4. Test frontend
# Open https://arbys-skincare.pages.dev
```

---

## 🎯 Final URLs

**Frontend**: `https://arbys-skincare.pages.dev`
**Backend API**: `https://arbys-skincare-api.onrender.com`
**WhatsApp Orders**: +234 706 751 0073

---

## ✅ Post-Deployment Checklist

- [ ] Backend API responding
- [ ] Frontend loads
- [ ] Christmas promo visible
- [ ] WhatsApp button works
- [ ] Quiz shows products
- [ ] Add to cart works
- [ ] Checkout opens WhatsApp
- [ ] Payment integration (next)

---

## 🔧 Next: Add Payment Gateway

I'll create the payment integration files next!
