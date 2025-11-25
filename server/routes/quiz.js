const express = require('express');
const router = express.Router();
const QuizResult = require('../models/quizResult.model');
const auth = require('../middleware/auth');

// @route   POST /api/quiz/submit
// @desc    Submit quiz results
// @access  Public
router.post('/submit', async (req, res) => {
    try {
        const { answers, skinType, concerns, recommendations } = req.body;

        const quizResult = new QuizResult({
            user: req.user?.id,
            answers,
            skinType,
            concerns,
            recommendations
        });

        await quizResult.save();

        res.status(201).json({
            success: true,
            result: quizResult
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/quiz/results
// @desc    Get user's quiz results
// @access  Private
router.get('/results', auth, async (req, res) => {
    try {
        const results = await QuizResult.find({ user: req.user.id })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: results.length,
            results
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
