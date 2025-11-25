const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const auth = require('../middleware/auth');

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const {
            products,
            totalAmount,
            shippingAddress,
            paymentMethod,
            paymentDetails
        } = req.body;

        const order = new Order({
            user: req.user.id,
            products,
            totalAmount,
            shippingAddress,
            paymentMethod,
            paymentDetails
        });

        await order.save();

        res.status(201).json({
            success: true,
            order
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate('products.product')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('products.product')
            .populate('user', 'firstName lastName email');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Make sure user owns this order
        if (order.user._id.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json({
            success: true,
            order
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status (Admin only)
// @access  Private/Admin
router.put('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;

        if (status === 'delivered') {
            order.deliveredAt = Date.now();
        }

        await order.save();

        res.json({
            success: true,
            order
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
