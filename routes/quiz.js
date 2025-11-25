const express = require('express');
const router = express.Router();
const QuizResult = require('../models/quizResult.model');
const auth = require('../middleware/auth');

// Skin quiz questions
const quizQuestions = [
    {
        id: 1,
        question: 'How does your skin feel after cleansing?',
        image: '/images/facewash.jpeg',
        options: [
            { value: 'tight', label: 'Tight and dry', image: '/images/skinrepair.jpeg' },
            { value: 'normal', label: 'Comfortable and balanced', image: '/images/glowsp.jpeg' },
            { value: 'oily', label: 'Still oily in some areas', image: '/images/face&bodyscrub.jpeg' },
            { value: 'combo', label: 'Dry in some areas, oily in others', image: '/images/toner.jpeg' }
        ]
    },
    {
        id: 2,
        question: 'How often do you experience breakouts?',
        image: '/images/acnekit.jpeg',
        options: [
            { value: 'never', label: 'Rarely or never' },
            { value: 'sometimes', label: 'Occasionally' },
            { value: 'often', label: 'Frequently' },
            { value: 'always', label: 'Almost always' }
        ]
    },
    {
        id: 3,
        question: 'What is your main skin concern?',
        image: '/images/models2abs.jpeg',
        options: [
            { value: 'aging', label: 'Fine lines and wrinkles', image: '/images/vitcserum.jpeg' },
            { value: 'acne', label: 'Acne and blemishes', image: '/images/acnekit.jpeg' },
            { value: 'dryness', label: 'Dryness and flakiness', image: '/images/skinrepair.jpeg' },
            { value: 'pigmentation', label: 'Dark spots and uneven tone', image: '/images/darkspotcream.jpeg' },
            { value: 'sensitivity', label: 'Redness and sensitivity', image: '/images/palmoilface.jpeg' }
        ]
    },
    {
        id: 4,
        question: 'How would you describe your pores?',
        image: '/images/modelabs.jpeg',
        options: [
            { value: 'small', label: 'Small and barely visible' },
            { value: 'normal', label: 'Normal sized' },
            { value: 'large', label: 'Large and visible' },
            { value: 'mixed', label: 'Larger in T-zone, smaller on cheeks' }
        ]
    }
];

// @route   GET /api/quiz/questions
// @desc    Get quiz questions
// @access  Public
router.get('/questions', (req, res) => {
    res.json({
        success: true,
        questions: quizQuestions
    });
});

// @route   POST /api/quiz/submit
// @desc    Submit quiz answers and get recommendations
// @access  Public
router.post('/submit', async (req, res) => {
    try {
        const { answers, email } = req.body;
        
        // Analyze answers and determine skin type
        const skinType = analyzeSkinType(answers);
        const recommendations = getRecommendations(skinType);
        
        // Save result if user provided email
        if (email) {
            const quizResult = new QuizResult({
                email,
                answers,
                skinType,
                recommendations
            });
            await quizResult.save();
        }
        
        res.json({
            success: true,
            skinType,
            recommendations
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Helper function to analyze skin type
function analyzeSkinType(answers) {
    // Simple analysis based on answers
    const oilyCount = answers.filter(a => a.includes('oily') || a.includes('large')).length;
    const dryCount = answers.filter(a => a.includes('tight') || a.includes('dry') || a.includes('small')).length;
    
    if (oilyCount > dryCount) return 'oily';
    if (dryCount > oilyCount) return 'dry';
    if (answers.some(a => a.includes('combo') || a.includes('mixed'))) return 'combination';
    return 'normal';
}

// Helper function to get product recommendations
function getRecommendations(skinType) {
    const recommendations = {
        oily: [
            { name: 'Face & Body Scrub', price: 3500, image: '/images/scrub.jpeg', reason: 'Exfoliates and controls excess oil' },
            { name: 'Acne Care Kit', price: 7500, image: '/images/acnekit.jpeg', reason: 'Complete solution for acne-prone skin' },
            { name: 'Vitamin C Serum', price: 5000, image: '/images/vitcserum.jpeg', reason: 'Brightens and reduces pores' }
        ],
        dry: [
            { name: 'Skin Repair Oil', price: 4500, image: '/images/skinrepair.jpeg', reason: 'Deep hydration and repair for dry skin' },
            { name: 'Carrot Bar Soap', price: 1500, image: '/images/carrotbarsoap.jpeg', reason: 'Gentle cleansing with natural oils' },
            { name: 'Glow Serum Plus', price: 5500, image: '/images/glowsp.jpeg', reason: 'Intense moisture and radiance' }
        ],
        combination: [
            { name: 'Christmas Glow Bundle', price: 6500, image: '/images/skinrepair.jpeg', reason: 'Perfect balance of exfoliation and hydration' },
            { name: 'Dark Spot Corrector Cream', price: 4000, image: '/images/darkspotcream.jpeg', reason: 'Evens skin tone' },
            { name: 'Face & Body Scrub', price: 3500, image: '/images/scrub.jpeg', reason: 'Balances combination skin' }
        ],
        normal: [
            { name: 'Vitamin C Serum', price: 5000, image: '/images/vitcserum.jpeg', reason: 'Maintains healthy glow' },
            { name: 'Glow Serum Plus', price: 5500, image: '/images/glowsp.jpeg', reason: 'Enhances natural radiance' },
            { name: 'Christmas Glow Bundle', price: 6500, image: '/images/skinrepair.jpeg', reason: 'Complete skincare routine' }
        ]
    };

    return recommendations[skinType] || recommendations.normal;
}

module.exports = router;
