# 🚀 PUSH TO GITHUB NOW!

## Quick Deploy (5 minutes)

### 1. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: **arbys-website**
3. Make it **Public** (required for free GitHub Pages)
4. Click "Create repository"

### 2. Push Your Code
```bash
# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/arbys-website.git

# Push to GitHub
git push -u origin main
```

**Replace YOUR_USERNAME with your actual GitHub username!**

### 3. Enable GitHub Pages
1. Go to repo Settings → Pages
2. Source: **main branch**
3. Folder: **/ (root)**
4. Save
5. Wait 2 minutes

**Your site**: `https://YOUR_USERNAME.github.io/arbys-website/`

---

## 4. Deploy Backend on Railway

### Option A: Railway (Recommended - FREE)
1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Select **arbys-website**
5. Add environment variables (see below)
6. Deploy!

### Option B: Render (Alternative - FREE)
1. Go to https://render.com
2. New → Web Service
3. Connect **arbys-website**
4. Add environment variables
5. Deploy!

### Environment Variables (Copy-Paste)
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/arbys-skincare
JWT_SECRET=<run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
PORT=3000
PAYSTACK_SECRET_KEY=sk_test_your_key
PAYSTACK_PUBLIC_KEY=pk_test_your_key
CLIENT_URL=https://YOUR_USERNAME.github.io/arbys-website
```

---

## 5. Setup MongoDB Atlas (FREE Database)
1. https://mongodb.com/atlas
2. Sign up → Create FREE cluster
3. Database Access → Add user (save password!)
4. Network Access → Add IP: **0.0.0.0/0** (allow all)
5. Connect → Get connection string
6. Replace in Railway/Render env vars

---

## 6. Update Frontend API URL

After Railway gives you a URL, update:

**public/js/config.js**:
```javascript
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'
    : 'https://YOUR-APP-NAME.up.railway.app/api';
```

Then:
```bash
git add public/js/config.js
git commit -m "Update API URL"
git push
```

---

## ✅ FINAL CHECKLIST

After deployment:

- [ ] GitHub Pages shows your site
- [ ] Backend API responding (test: /api/products)
- [ ] MongoDB connected (check Railway logs)
- [ ] Christmas promo displays
- [ ] WhatsApp button works
- [ ] Add to cart functions
- [ ] Checkout sends WhatsApp message
- [ ] Quiz shows your products

---

## 🎯 YOUR LIVE URLS

**Frontend (GitHub Pages)**:
`https://YOUR_USERNAME.github.io/arbys-website/`

**Backend (Railway)**:
`https://arbys-skincare-api-production.up.railway.app`

**Orders sent to WhatsApp**: +234 706 751 0073

---

## 📝 WHAT YOU GET (100% FREE)

✅ Professional e-commerce website
✅ Christmas promotions with countdown
✅ AI skin quiz
✅ WhatsApp ordering
✅ Paystack payment integration
✅ Mobile responsive
✅ Auto HTTPS/SSL
✅ Unlimited traffic (GitHub Pages)
✅ Global CDN
✅ Auto-deploys on git push

**Total Cost: $0/month** 🎉

---

## 🔄 HOW TO UPDATE

```bash
# Make changes
git add .
git commit -m "Update products"
git push

# GitHub Pages updates in 2 minutes
# Railway updates in 5 minutes
```

---

## 🆘 NEED HELP?

**Common Issues:**

1. **GitHub Pages not working**
   - Check Settings → Pages is enabled
   - Wait 2-3 minutes
   - Try hard refresh (Ctrl+Shift+R)

2. **Backend not responding**
   - Check Railway/Render logs
   - Verify MongoDB connection string
   - Check environment variables

3. **WhatsApp not opening**
   - Number format: `2347067510073` (no +)
   - Test: https://wa.me/2347067510073?text=Test

---

## 📚 DOCUMENTATION

- **[FREE-DEPLOYMENT.md](FREE-DEPLOYMENT.md)** - Complete deployment guide
- **[PAYMENT-SETUP.md](PAYMENT-SETUP.md)** - Paystack integration
- **[README.md](README.md)** - Full documentation
- **[SITE-FEATURES.md](SITE-FEATURES.md)** - All features

---

# LET'S GO! 🚀

**Run these commands now:**

```bash
# 1. Push to GitHub (replace YOUR_USERNAME!)
git remote add origin https://github.com/YOUR_USERNAME/arbys-website.git
git push -u origin main

# 2. Enable GitHub Pages (in browser)
# 3. Deploy backend on Railway (in browser)
# 4. Test your site!
```

**You're about to be LIVE! 🎉**
