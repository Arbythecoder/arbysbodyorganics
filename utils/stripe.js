const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/order.model');
const User = require('../models/user.model');
const { ErrorResponse } = require('../middleware/errorHandler');

exports.createPaymentIntent = async (req, res, next) => {
    try {
        const { amount, currency = 'usd', orderId } = req.body;

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency,
            metadata: { orderId }
        });

        res.json({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        next(new ErrorResponse('Payment processing error', 500));
    }
};

exports.handleWebhook = async (req, res, next) => {
    const sig = req.headers['stripe-signature'];

    try {
        const event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        // Handle successful payment
        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;
            const orderId = paymentIntent.metadata.orderId;

            // Update order status
            await Order.findByIdAndUpdate(orderId, {
                status: 'paid',
                paymentId: paymentIntent.id
            });

            // Send confirmation email
            // TODO: Implement email notification
        }

        res.json({ received: true });
    } catch (error) {
        next(new ErrorResponse('Webhook error', 400));
    }
};