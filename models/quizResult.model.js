const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
    // Who took the quiz
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
        // Not required - allows anonymous quiz takers
    },
    // Their answers
    answers: {
        skinType: {
            type: String,
            enum: ['oily', 'dry', 'combination', 'normal', 'sensitive'],
            required: true
        },
        concerns: [{
            type: String,
            enum: ['acne', 'aging', 'darkSpots', 'dryness', 'sensitivity']
        }],
        currentRoutine: {
            type: String,
            enum: ['none', 'basic', 'intermediate', 'advanced']
        },
        goals: [{
            type: String
        }]
    },
    // What we recommended
    recommendations: {
        products: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Product'
        }],
        routine: {
            morning: [{
                step: String,
                product: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Product'
                }
            }],
            evening: [{
                step: String,
                product: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Product'
                }
            }]
        },
        courses: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Course'
        }]
    },
    // Track if they bought anything
    converted: {
        type: Boolean,
        default: false
    },
    // If they made a purchase, link to the order
    resultingOrder: {
        type: mongoose.Schema.ObjectId,
        ref: 'Order'
    }
}, {
    timestamps: true
});

// When querying results, include product and course details
quizResultSchema.pre(/^find/, function(next) {
    this.populate('recommendations.products', 'name price images')
        .populate('recommendations.routine.morning.product', 'name price images')
        .populate('recommendations.routine.evening.product', 'name price images')
        .populate('recommendations.courses', 'name description');
    next();
});

// Index for analytics
quizResultSchema.index({ 'answers.skinType': 1, 'answers.concerns': 1 });
quizResultSchema.index({ converted: 1, createdAt: -1 });
quizResultSchema.index({ user: 1 }, { sparse: true });

module.exports = mongoose.model('QuizResult', quizResultSchema);