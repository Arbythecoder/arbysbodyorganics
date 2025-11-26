# 💳 Paystack Payment Integration

## Setup Paystack Account

1. Go to https://paystack.com
2. Sign up with your business details
3. Verify your account (submit documents)
4. Get API Keys:
   - Dashboard → Settings → API Keys
   - Copy **Public Key** and **Secret Key**

## Configure Backend

Add to Render environment variables:
```
PAYSTACK_SECRET_KEY=sk_live_your_key_here
PAYSTACK_PUBLIC_KEY=pk_live_your_key_here
```

## Update Checkout Flow

Your checkout now supports **2 payment options**:

### Option 1: WhatsApp Order (Current)
- Customer fills cart
- Clicks "Place Order"
- WhatsApp opens with order details
- You confirm and arrange payment manually

### Option 2: Pay with Paystack (NEW!)
- Customer fills cart
- Clicks "Pay Now"
- Paystack popup opens
- Customer pays with card
- Order automatically confirmed
- You get WhatsApp notification with paid order

## API Endpoints

**Initialize Payment:**
```bash
POST /api/payment/initialize
{
  "amount": 8500,
  "email": "customer@email.com",
  "orderData": {
    "items": [...],
    "customerName": "John Doe",
    "shippingAddress": "123 Street, Lagos"
  }
}
```

**Verify Payment:**
```bash
GET /api/payment/verify/:reference
```

## Test Payment

**Test Cards (Paystack):**
```
Card: 4084084084084081
CVV: 408
Expiry: Any future date
PIN: 0000
OTP: 123456
```

## Customer Flow

1. Add products to cart
2. Go to checkout
3. Choose payment method:
   - **"Send to WhatsApp"** - Manual payment
   - **"Pay Now"** - Instant payment with card
4. If Pay Now:
   - Paystack popup opens
   - Enter card details
   - Complete payment
   - Order confirmed!
   - WhatsApp notification sent to you

## What You Receive

**Paid Orders via WhatsApp:**
```
💰 NEW PAID ORDER!

Order ID: 67890abc
Customer: John Doe
Amount: ₦8,500
Status: PAID ✅
Reference: ref_xyz123

Items:
1. Christmas Glow Bundle x1

Ship immediately!
```

**vs Manual Orders:**
```
🛍️ NEW ORDER (PAYMENT PENDING)

Customer: Jane Doe
Phone: 08012345678
Amount: ₦6,500

Please confirm payment before shipping.
```

## Benefits

✅ **Instant payments** - No waiting for bank transfers
✅ **Automatic confirmation** - Orders created in database
✅ **Better tracking** - Payment references for all orders
✅ **Customer trust** - Secure payment with Paystack
✅ **Less work** - No manual payment confirmation needed

## Pricing

Paystack fees:
- **1.5% + ₦100** per transaction
- Example: ₦10,000 sale = ₦250 fee
- You receive: ₦9,750

## Going Live

1. Complete Paystack verification
2. Get live API keys
3. Update environment variables
4. Test with real card
5. Start accepting payments! 💰

