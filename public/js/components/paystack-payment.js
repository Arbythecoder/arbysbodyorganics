/**
 * ===================================================================
 * PAYSTACK PAYMENT INTEGRATION - LEARNING VERSION
 * ===================================================================
 *
 * WHAT IS PAYSTACK?
 * Paystack is a Nigerian payment gateway that lets you accept payments
 * online. It's like having a POS machine on your website!
 *
 * PRICING: 100% FREE TO START!
 * - No setup fee
 * - No monthly fee
 * - You only pay 1.5% + ₦100 when you GET PAID
 * - Example: Customer pays ₦10,000
 *   - Paystack fee: ₦250
 *   - You receive: ₦9,750
 *
 * HOW TO SET UP:
 * 1. Go to paystack.com and sign up
 * 2. Verify your business
 * 3. Get your Public Key from Settings > API Keys & Webhooks
 * 4. Replace 'YOUR_PUBLIC_KEY_HERE' below with your real key
 * 5. Test with Test Mode first (use test cards)
 * 6. Switch to Live Mode when ready
 *
 * LEARNING POINTS:
 * - Paystack handles all card processing (you don't see card numbers)
 * - Money goes directly to your bank account
 * - Works with all Nigerian banks
 * - Accepts Mastercard, Visa, Verve
 * ===================================================================
 */

class PaystackPayment {
    constructor() {
        /**
         * YOUR PAYSTACK PUBLIC KEY
         * LEARNING: Get this from your Paystack dashboard
         * - Test Key starts with 'pk_test_'
         * - Live Key starts with 'pk_live_'
         */
        this.publicKey = 'pk_test_YOUR_PUBLIC_KEY_HERE'; // Replace with your key!

        /**
         * Your business email
         * LEARNING: This should be your email on Paystack account
         */
        this.businessEmail = 'abigail@arbysbodyorganics.com'; // Your email

        // Initialize Paystack
        this.init();
    }

    /**
     * Initialize Paystack
     * LEARNING: Loads the Paystack library onto your page
     */
    init() {
        // Check if Paystack script is already loaded
        if (!document.getElementById('paystack-script')) {
            // Create script tag to load Paystack
            const script = document.createElement('script');
            script.id = 'paystack-script';
            script.src = 'https://js.paystack.co/v1/inline.js';
            document.head.appendChild(script);

            console.log('✅ Paystack loaded successfully!');
        }
    }

    /**
     * Process Payment
     * LEARNING: This opens the Paystack payment popup
     *
     * @param {Object} orderData - Order information
     * @param {number} orderData.amount - Total amount in Naira
     * @param {string} orderData.email - Customer's email
     * @param {string} orderData.name - Customer's name
     * @param {Array} orderData.items - Cart items
     */
    processPayment(orderData) {
        /**
         * LEARNING: PaystackPop.setup creates the payment popup
         * This is provided by the Paystack script we loaded above
         */
        const handler = PaystackPop.setup({
            /**
             * Your Paystack Public Key
             * LEARNING: This identifies your business
             */
            key: this.publicKey,

            /**
             * Customer's email address
             * LEARNING: Paystack sends receipt to this email
             */
            email: orderData.email,

            /**
             * Amount in kobo (Naira x 100)
             * LEARNING: Paystack uses kobo, not naira!
             * ₦10,000 = 1,000,000 kobo
             */
            amount: orderData.amount * 100,

            /**
             * Currency
             * LEARNING: NGN = Nigerian Naira
             */
            currency: 'NGN',

            /**
             * Generate unique reference
             * LEARNING: This tracks each transaction
             * Format: ABO-timestamp-random
             */
            ref: this.generateReference(),

            /**
             * Customer's name
             * LEARNING: Appears on payment screen
             */
            firstname: orderData.name.split(' ')[0],
            lastname: orderData.name.split(' ')[1] || '',

            /**
             * Custom metadata
             * LEARNING: Extra info saved with payment
             * You can see this in Paystack dashboard
             */
            metadata: {
                custom_fields: [
                    {
                        display_name: 'Cart Items',
                        variable_name: 'cart_items',
                        value: JSON.stringify(orderData.items)
                    },
                    {
                        display_name: 'Order Date',
                        variable_name: 'order_date',
                        value: new Date().toISOString()
                    }
                ]
            },

            /**
             * CALLBACK: When payment succeeds
             * LEARNING: This function runs when customer pays successfully
             */
            onSuccess: (response) => {
                console.log('✅ Payment Successful!', response);

                // Show success message
                this.showSuccessMessage(response);

                // Clear shopping cart
                localStorage.removeItem('cart');

                // Save order to database (you'll add this later)
                this.saveOrder(orderData, response);

                // Redirect to success page
                setTimeout(() => {
                    window.location.href = '/pages/order-success.html?ref=' + response.reference;
                }, 2000);
            },

            /**
             * CALLBACK: When payment fails or is cancelled
             * LEARNING: This runs if customer closes popup or payment fails
             */
            onCancel: () => {
                console.log('❌ Payment Cancelled');

                // Show cancellation message
                alert('Payment was cancelled. Your cart is still saved!');
            }
        });

        /**
         * Open the payment popup
         * LEARNING: This actually shows the payment form to customer
         */
        handler.openIframe();
    }

    /**
     * Generate unique transaction reference
     * LEARNING: Creates a unique ID for each transaction
     * Format: ABO-1234567890-ABC
     */
    generateReference() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 5).toUpperCase();
        return `ABO-${timestamp}-${random}`;
    }

    /**
     * Show success message
     * LEARNING: Displays a nice success popup
     */
    showSuccessMessage(response) {
        const message = `
            <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">✅ Payment Successful!</h4>
                <p>Your order has been confirmed!</p>
                <hr>
                <p class="mb-0">Reference: ${response.reference}</p>
                <p class="mb-0">We'll send you an email confirmation shortly.</p>
            </div>
        `;

        // Show in modal or alert
        alert('Payment Successful! ✅\n\nReference: ' + response.reference + '\n\nCheck your email for confirmation.');
    }

    /**
     * Save order to database
     * LEARNING: This will save order details for you to see
     *
     * For now, it just saves to localStorage
     * Later, you'll connect it to your backend
     */
    saveOrder(orderData, paymentResponse) {
        const order = {
            reference: paymentResponse.reference,
            amount: orderData.amount,
            customer: {
                email: orderData.email,
                name: orderData.name,
                phone: orderData.phone || 'Not provided'
            },
            items: orderData.items,
            payment: {
                status: 'paid',
                method: 'paystack',
                transaction_id: paymentResponse.transaction,
                paid_at: new Date().toISOString()
            },
            shipping: orderData.shipping,
            status: 'pending', // pending → processing → shipped → delivered
            created_at: new Date().toISOString()
        };

        // Save to localStorage (temporary)
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        console.log('📦 Order saved:', order);

        // TODO: Later, send this to your backend API
        // Example:
        // fetch('/api/orders', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(order)
        // });
    }

    /**
     * Verify Payment (Optional but recommended)
     * LEARNING: Double-checks that payment actually went through
     *
     * This prevents fraud where someone might fake a payment response
     * You'll need to call your backend for this
     */
    async verifyPayment(reference) {
        // TODO: Call your backend to verify with Paystack
        // Your backend will use your Secret Key to check
        //
        // Example:
        // const response = await fetch(`/api/verify-payment/${reference}`);
        // const data = await response.json();
        // return data.status === 'success';

        console.log('⚠️ Payment verification not yet implemented');
        return true;
    }
}

/**
 * ===================================================================
 * HOW TO USE THIS IN YOUR CHECKOUT PAGE
 * ===================================================================
 */

// Initialize Paystack when page loads
let paystackPayment;

document.addEventListener('DOMContentLoaded', () => {
    paystackPayment = new PaystackPayment();
    console.log('💳 Paystack Payment Ready!');
});

/**
 * EXAMPLE: How to trigger payment from checkout button
 * LEARNING: Add this to your checkout page's "Place Order" button
 */
function handleCheckoutPayment() {
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Calculate total
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 20000 ? 0 : 2000;
    const vat = subtotal * 0.075;
    const total = subtotal + shipping + vat;

    // Get customer details from form
    const customerName = document.getElementById('customerName')?.value || 'Customer';
    const customerEmail = document.getElementById('customerEmail')?.value || '';
    const customerPhone = document.getElementById('customerPhone')?.value || '';
    const shippingAddress = document.getElementById('shippingAddress')?.value || '';

    // Validate email
    if (!customerEmail || !customerEmail.includes('@')) {
        alert('Please enter a valid email address!');
        return;
    }

    // Prepare order data
    const orderData = {
        amount: total,
        email: customerEmail,
        name: customerName,
        phone: customerPhone,
        items: cart,
        shipping: {
            address: shippingAddress,
            cost: shipping
        }
    };

    // Process payment with Paystack
    paystackPayment.processPayment(orderData);
}

/**
 * ===================================================================
 * TESTING YOUR PAYSTACK INTEGRATION
 * ===================================================================
 *
 * 1. Use Test Mode first (pk_test_...)
 * 2. Use Paystack test cards:
 *    - Card: 5060666666666666666 (Verve)
 *    - CVV: 123
 *    - Expiry: 01/99
 *    - PIN: 1234
 *    - OTP: 123456
 *
 * 3. Check your Paystack Dashboard > Transactions
 * 4. You should see test payments there
 * 5. When ready, switch to Live Mode (pk_live_...)
 *
 * ===================================================================
 * NEXT STEPS AFTER THIS WORKS:
 * ===================================================================
 *
 * 1. Get orders via email or WhatsApp
 * 2. Build a simple admin dashboard to see orders
 * 3. Set up Paystack webhooks to auto-update order status
 * 4. Add shipping tracking
 * 5. Send order confirmation emails
 *
 * ===================================================================
 */

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PaystackPayment;
}
