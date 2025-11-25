# 🌿 Arby's Body Organics - E-commerce Website

Premium organic skincare e-commerce platform with AI skin quiz, WhatsApp ordering, and Christmas promotions.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

Visit: **http://localhost:3000**

## ✨ Features

### 🎄 Christmas Promo
- Live countdown timer
- Special bundle deals (Save 20%)
- Featured products: Skin Repair Oil, Face & Body Scrub, Christmas Bundle

### 💬 WhatsApp Integration
- **Floating chat button** on all pages (bottom right)
- **Order notifications** - Orders sent directly to WhatsApp
- Phone: **+234 706 751 0073**

### 🤖 AI Skin Quiz
- Personalized product recommendations
- Recommends YOUR actual products
- Shows prices and images
- Direct add-to-cart from results

### 🛒 Shopping Features
- Add to cart with localStorage
- Checkout with shipping details
- Order sent to WhatsApp (no payment gateway needed)
- You confirm orders manually and arrange payment

### 🎨 Design
- Brand colors: Gold (#D4AF37) & Green (#2D5F3F)
- Mobile responsive
- Bootstrap 5 + Custom CSS
- Smooth animations

## 📁 Project Structure

```
arbys-website/
├── public/              # Frontend files
│   ├── index.html      # Homepage with Christmas promo
│   ├── pages/          # Other pages
│   ├── css/            # Stylesheets
│   ├── js/             # JavaScript
│   └── images/         # Product images
├── routes/             # API routes
│   ├── auth.js        # Authentication
│   ├── products.js    # Products CRUD
│   ├── orders.js      # Orders
│   ├── quiz.js        # Skin quiz
│   ├── courses.js     # Academy courses
│   └── blog.js        # Blog posts
├── models/             # Database models
│   ├── user.model.js
│   ├── product.model.js
│   ├── order.model.js
│   └── quizResult.model.js
├── middleware/         # Express middleware
├── config/            # Configuration
├── server.js          # Main server
├── package.json       # Dependencies
└── .env              # Environment variables
```

## 🔧 Configuration

Edit `.env`:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/arbys-skincare
JWT_SECRET=your_secret_here
JWT_EXPIRE=30d
```

## 📦 How Orders Work

1. Customer browses products
2. Adds items to cart
3. Goes to checkout
4. Fills shipping details
5. Clicks "Place Order"
6. **WhatsApp opens** with formatted order message
7. **You receive order** on WhatsApp (+234 706 751 0073)
8. You confirm order and arrange payment
9. Ship after payment received

### Order Message Format:
```
🛍️ NEW ORDER FROM WEBSITE

Customer: John Doe
Phone: 08012345678
Shipping Address: 123 Street, Lagos, Nigeria

ITEMS ORDERED:
1. Skin Repair Oil x1 - ₦4,500
2. Face & Body Scrub x2 - ₦7,000

Subtotal: ₦11,500
Shipping: ₦2,000
TOTAL: ₦13,500

Please confirm this order and send payment details. Thank you! 🌿
```

## 🎯 API Endpoints

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Quiz
- `GET /api/quiz/questions` - Get quiz questions (with images)
- `POST /api/quiz/submit` - Submit answers, get recommendations

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user` - Get user profile (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)

### Courses & Blog
- `GET /api/courses` - List courses
- `GET /api/blog` - List blog posts

## 🚢 Deployment

### Option 1: Render (Recommended)

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect your GitHub repo
5. Set environment variables:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_production_secret
   PORT=3000
   ```
6. Deploy!

### Option 2: Vercel

```bash
npm install -g vercel
vercel --prod
```

### Option 3: Heroku

```bash
heroku create arbys-skincare
git push heroku main
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
```

## 🗃️ Database Setup

### Local MongoDB
```bash
# Install MongoDB locally or use Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

### MongoDB Atlas (Production)
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create free cluster
3. Get connection string
4. Update `.env` with connection string

## 📱 Testing

### Test Locally
```bash
npm run dev
```

### Test Features
1. **Homepage** - Check Christmas promo section
2. **WhatsApp Button** - Bottom right, click to test
3. **Quiz** - Take quiz, see product recommendations
4. **Add to Cart** - Add products, check cart icon updates
5. **Checkout** - Complete order, WhatsApp should open
6. **Order Message** - Verify you receive formatted message

## 🎨 Customization

### Change WhatsApp Number
Edit in multiple files:
- `public/index.html` (line 572)
- `public/js/components/checkout.js` (line 325)

### Update Product Images
Place images in `public/images/` and reference as:
```html
<img src="/images/product-name.jpeg" alt="Product">
```

### Modify Brand Colors
Edit `public/css/styles.css`:
```css
:root {
    --primary-color: #2D5F3F;    /* Green */
    --accent-gold: #D4AF37;       /* Gold */
}
```

## 📝 Notes

- Cart uses browser localStorage (no database needed)
- Orders go to WhatsApp (no payment gateway)
- MongoDB optional for dev (required for production)
- Images must be in `/public/images/` folder
- Mobile responsive design
- Secure with Helmet, rate limiting, XSS protection

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill and restart
npm run dev
```

### MongoDB Connection Error
```bash
# Check if MongoDB is running
# Or update MONGODB_URI in .env
```

### CSP Errors (Bootstrap not loading)
Already configured in `server.js` - should work out of the box

## 📞 Support

**WhatsApp:** +234 706 751 0073  
**Email:** Contact through WhatsApp

---

Made with 🌿 by Arby's Body Organics
