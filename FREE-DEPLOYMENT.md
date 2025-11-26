# 🎉 100% FREE DEPLOYMENT GUIDE

## Architecture
- **Frontend**: GitHub Pages (FREE forever)
- **Backend**: Railway.app (FREE $5/month credit)
- **Database**: MongoDB Atlas (FREE 512MB)
- **Domain**: Free subdomain included
- **SSL**: Automatic HTTPS

---

## STEP 1: Deploy Backend on Railway (FREE)

### A. Setup MongoDB Atlas
1. https://mongodb.com/atlas
2. Create FREE cluster
3. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/arbys-skincare`

### B. Deploy on Railway
1. Go to https://railway.app
2. Sign up with GitHub (no credit card!)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `arbys-website`
5. Add environment variables:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/arbys-skincare
   JWT_SECRET=<generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
   PORT=3000
   PAYSTACK_SECRET_KEY=sk_test_your_key
   PAYSTACK_PUBLIC_KEY=pk_test_your_key
   CLIENT_URL=https://YOUR_USERNAME.github.io/arbys-website
   ```
6. Deploy! Get your URL: `https://arbys-skincare-api-production.up.railway.app`

### Railway FREE Tier
- $5 credit/month (enough for small apps)
- Auto-sleeps after 30min inactivity
- Wakes up in 1-2 seconds

---

## STEP 2: Deploy Frontend on GitHub Pages (FREE)

### A. Prepare Frontend
```bash
cd /c/Users/Arbythecoder/Desktop/arbys-website

# Create config for API
cat > public/js/config.js << 'JSEOF'
const API_URL = 'https://arbys-skincare-api-production.up.railway.app';
JSEOF
```

### B. Update API Calls
Add to all HTML pages before other scripts:
```html
<script src="/js/config.js"></script>
```

### C. Push to GitHub
```bash
# If not done yet
git remote add origin https://github.com/YOUR_USERNAME/arbys-website.git
git branch -M main
git push -u origin main
```

### D. Enable GitHub Pages
1. Go to your repo on GitHub
2. Settings → Pages
3. Source: **Deploy from branch**
4. Branch: **main** → folder: **/ (root)**
5. Click Save
6. Wait 2-3 minutes
7. Your site: `https://YOUR_USERNAME.github.io/arbys-website/`

---

## STEP 3: Update API URLs in Frontend

Update these files to use Railway backend:

**public/js/app.js** - Add at top:
```javascript
const API_BASE = 'https://arbys-skincare-api-production.up.railway.app/api';
```

**public/js/components/checkout.js** - Update API calls:
```javascript
// Change from: '/api/orders'
// To:
fetch(`${API_BASE}/orders`, {...})
```

Do same for:
- `public/js/components/auth.js`
- `public/js/components/products.js`
- `public/js/components/quiz.js`

---

## ALTERNATIVE FREE HOSTS

### Option 2: Vercel (Backend + Frontend)
```bash
npm install -g vercel
vercel --prod
```
- FREE unlimited deployments
- Serverless functions for backend
- Auto SSL

### Option 3: Render (Backend)
- https://render.com
- FREE tier (slower cold starts)
- Easy setup

### Option 4: Fly.io (Backend)
```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Deploy
fly launch
fly deploy
```
- FREE 3 VMs
- Global CDN

### Option 5: Cyclic (Backend)
- https://cyclic.sh
- FREE unlimited
- No sleep time
- Great for Node.js

---

## COST COMPARISON

| Service | Frontend | Backend | Database | Total |
|---------|----------|---------|----------|-------|
| **GitHub Pages + Railway** | FREE | FREE ($5 credit) | FREE | $0/mo |
| **Vercel** | FREE | FREE | Need DB | $0/mo |
| **Netlify + Cyclic** | FREE | FREE | FREE | $0/mo |
| **Render** | FREE | FREE | FREE | $0/mo |

**Recommended**: GitHub Pages + Railway = Best free option!

---

## STEP 4: Test Everything

### Backend Test
```bash
curl https://arbys-skincare-api-production.up.railway.app/api/products
```

### Frontend Test
1. Open `https://YOUR_USERNAME.github.io/arbys-website/`
2. Check Christmas promo loads
3. Add product to cart
4. Test WhatsApp button
5. Complete checkout
6. Verify order sent to WhatsApp

---

## STEP 5: Custom Domain (Optional)

### Free Domain Options
1. **Freenom** (.tk, .ml, .ga, .cf, .gq) - FREE
2. **Afraid.org** - FREE subdomains
3. **No-IP** - FREE dynamic DNS

### Connect to GitHub Pages
1. Create CNAME file:
   ```bash
   echo "arbysskincare.tk" > public/CNAME
   git add public/CNAME
   git commit -m "Add custom domain"
   git push
   ```
2. Update DNS (in Freenom/domain provider):
   ```
   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   ```

---

## COMPLETE SETUP SCRIPT

```bash
# 1. Generate JWT Secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 2. Create API config
cat > public/js/config.js << 'JSEOF'
const API_URL = 'https://arbys-skincare-api-production.up.railway.app';
JSEOF

# 3. Commit changes
git add .
git commit -m "Configure for GitHub Pages deployment"

# 4. Push to GitHub
git push origin main

# 5. Enable GitHub Pages (do in browser)
# 6. Deploy backend on Railway (do in browser)
# 7. Test your site!
```

---

## YOUR LIVE URLS

After deployment:

**Frontend**: `https://YOUR_USERNAME.github.io/arbys-website/`
**Backend API**: `https://arbys-skincare-api-production.up.railway.app`
**WhatsApp**: +234 706 751 0073

---

## MONITORING

### Railway Dashboard
- View logs
- Check usage ($5 credit)
- Auto-restart on crash

### GitHub Pages
- Auto-deploys on push
- Takes 1-2 minutes
- No limits!

---

## UPDATES

To update your site:
```bash
# Make changes
git add .
git commit -m "Update products"
git push

# Frontend updates in 2 min
# Backend updates in 5 min
```

---

## TROUBLESHOOTING

### Backend not responding
```bash
# Check Railway logs
# Wake up: curl https://your-backend.railway.app/api/products
```

### Frontend not updating
- Clear browser cache
- Check GitHub Pages is enabled
- Wait 2-3 minutes

### CORS errors
Add to backend `server.js`:
```javascript
app.use(cors({
    origin: ['https://YOUR_USERNAME.github.io']
}));
```

---

## 💰 COST BREAKDOWN

**Monthly Costs:**
- Frontend (GitHub Pages): $0
- Backend (Railway): $0 (within free credit)
- Database (MongoDB Atlas): $0
- Domain (.tk from Freenom): $0
- SSL: $0 (automatic)
- **Total: $0/month** 🎉

**Optional Paid Upgrades:**
- Custom .com domain: ~$12/year
- Railway paid (no sleep): $5/month
- MongoDB more storage: $9/month

**You can run completely free for testing, then upgrade when profitable!**

---

## 🚀 READY TO DEPLOY?

Follow the steps above in order. Should take 30 minutes total.

**Questions? Check:**
- Railway docs: https://docs.railway.app
- GitHub Pages: https://pages.github.com
- MongoDB Atlas: https://docs.atlas.mongodb.com

