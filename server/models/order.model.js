const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // Who placed the order
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    // What they ordered
    items: [{
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity must be at least 1']
        },
        // Store the price at time of purchase
        priceAtTime: {
            type: Number,
            required: true
        }
    }],
    // Where to send it
    shippingAddress: {
        street: {
            type: String,
            required: [true, 'Street address is required'],
            trim: true,
            maxLength: [100, 'Street address too long']
        },
        city: {
            type: String,
            required: [true, 'City is required'],
            trim: true
        },
        state: {
            type: String,
            required: [true, 'State is required'],
            trim: true
        },
        zipCode: {
            type: String,
            required: [true, 'ZIP code is required'],
            // Validate US ZIP code format
            validate: {
                validator: function(v) {
                    return /^\d{5}(-\d{4})?$/.test(v);
                },
                message: 'Invalid ZIP code format'
            }
        },
        country: {
            type: String,
            default: 'United States'
        }
    },
    // Payment details
    payment: {
        method: {
            type: String,
            required: true,
            enum: ['credit_card', 'paypal']
        },
        // Last 4 digits only for cards
        lastFour: String,
        // Store Stripe or PayPal transaction ID
        transactionId: String
    },
    // Order totals
    subtotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    shipping: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    // Order status tracking
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    trackingNumber: String,
    // Important dates
    shippedAt: Date,
    deliveredAt: Date,
    // If order was cancelled
    cancelledAt: Date,
    cancelReason: String
}, {
    timestamps: true
});

// Calculate totals before saving
orderSchema.pre('save', function(next) {
    // Calculate subtotal from items
    this.subtotal = this.items.reduce((sum, item) => {
        return sum + (item.priceAtTime * item.quantity);
    }, 0);

    // Calculate tax (example: 8.5%)
    this.tax = Math.round(this.subtotal * 0.085);

    // Calculate shipping (example: flat $5)
    this.shipping = 500; // $5.00 in cents

    // Calculate total
    this.total = this.subtotal + this.tax + this.shipping;

    next();
});

// When getting order details, include user and product info
orderSchema.pre(/^find/, function(next) {
    this.populate('user', 'name email')
        .populate('items.product', 'name images');
    next();
});

// Index for faster lookups
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1 });

module.exports = mongoose.model('Order', orderSchema);