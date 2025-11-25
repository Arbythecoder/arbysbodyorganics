const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
    // Basic product information
    name: {
        type: String,
        required: [true, 'A product must have a name'],
        trim: true,
        maxLength: [100, 'Product name cannot be more than 100 characters'],
        // Prevent duplicate product names
        unique: true
    },
    // URL-friendly version of the name
    slug: String,
    description: {
        type: String,
        required: [true, 'A product must have a description'],
        trim: true,
        maxLength: [2000, 'Description cannot be more than 2000 characters']
    },
    price: {
        type: Number,
        required: [true, 'A product must have a price'],
        min: [0, 'Price cannot be negative'],
        // Store price in cents to avoid floating-point math errors
        set: v => Math.round(v * 100),
        get: v => (v / 100).toFixed(2)
    },
    // Keep track of how many we have
    inventory: {
        type: Number,
        required: true,
        min: [0, 'Inventory cannot be negative'],
        validate: {
            validator: Number.isInteger,
            message: 'Inventory must be a whole number'
        }
    },
    category: {
        type: String,
        required: [true, 'A product must have a category'],
        enum: {
            values: ['face', 'body', 'special'],
            message: 'Category must be either: face, body, or special'
        }
    },
    // Image handling
    images: [{
        url: {
            type: String,
            required: true
        },
        alt: String,
        // Keep track of image order for display
        order: Number
    }],
    // Product details
    ingredients: [{
        type: String,
        trim: true
    }],
    benefits: [{
        type: String,
        trim: true
    }],
    howToUse: {
        type: String,
        required: true
    },
    // SEO and marketing
    featured: {
        type: Boolean,
        default: false
    },
    searchTags: [{
        type: String,
        trim: true
    }],
    // Safety and compliance
    warnings: {
        type: String,
        default: 'For external use only. Avoid contact with eyes.'
    },
    // Track product performance
    rating: {
        average: {
            type: Number,
            min: [1, 'Rating must be above 1.0'],
            max: [5, 'Rating must be below 5.0'],
            default: 5.0
        },
        count: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true,
    // Enable price conversion from cents
    toJSON: { getters: true }
});

// Create URL-friendly slug before saving
productSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// Index for faster searches
productSchema.index({ name: 'text', description: 'text', searchTags: 'text' });
productSchema.index({ category: 1, featured: 1 });
productSchema.index({ slug: 1 });

// Method to check if product is in stock
productSchema.methods.isInStock = function() {
    return this.inventory > 0;
};

// Method to safely reduce inventory
productSchema.methods.reduceInventory = async function(quantity) {
    if (this.inventory < quantity) {
        throw new Error('Not enough inventory');
    }
    this.inventory -= quantity;
    return this.save();
};

module.exports = mongoose.model('Product', productSchema);