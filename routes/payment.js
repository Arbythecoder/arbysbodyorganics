const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');
const Order = require('../models/order.model');
const auth = require('../middleware/auth');

// @route   POST /api/payment/initialize
// @desc    Initialize Paystack payment
// @access  Private
router.post('/initialize', auth, async (req, res) => {
    try {
        const { amount, email, orderData } = req.body;

        // Initialize payment with Paystack
        const response = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            {
                email,
                amount: amount * 100, // Convert to kobo
                currency: 'NGN',
                callback_url: `${process.env.CLIENT_URL}/payment/verify`,
                metadata: {
                    order_items: JSON.stringify(orderData.items),
                    customer_name: orderData.customerName,
                    shipping_address: orderData.shippingAddress
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json({
            success: true,
            data: response.data.data
        });
    } catch (error) {
        console.error('Payment error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: 'Payment initialization failed'
        });
    }
});

// @route   GET /api/payment/verify/:reference
// @desc    Verify payment and create order
// @access  Public
router.get('/verify/:reference', async (req, res) => {
    try {
        const { reference } = req.params;

        const response = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                }
            }
        );

        const { data } = response.data;

        if (data.status === 'success') {
            const order = new Order({
                customerEmail: data.customer.email,
                customerName: data.metadata.customer_name,
                items: JSON.parse(data.metadata.order_items),
                shippingAddress: data.metadata.shipping_address,
                totalAmount: data.amount / 100,
                paymentStatus: 'paid',
                paymentReference: reference,
                status: 'processing'
            });

            await order.save();

            res.json({
                success: true,
                message: 'Payment successful',
                order
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Payment failed'
            });
        }
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Verification failed'
        });
    }
});

module.exports = router;
