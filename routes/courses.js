const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// In-memory courses data (can be moved to database later)
const courses = [
    {
        id: 1,
        title: 'Skincare Basics 101',
        description: 'Learn the fundamentals of skincare routines and product selection',
        price: 4999,
        duration: '2 hours',
        modules: 5,
        level: 'Beginner',
        image: '/images/courses/basics.jpg'
    },
    {
        id: 2,
        title: 'Advanced Ingredient Science',
        description: 'Deep dive into active ingredients and how they work on your skin',
        price: 7999,
        duration: '4 hours',
        modules: 8,
        level: 'Intermediate',
        image: '/images/courses/ingredients.jpg'
    },
    {
        id: 3,
        title: 'Professional Esthetician Course',
        description: 'Complete certification course for aspiring skincare professionals',
        price: 24999,
        duration: '20 hours',
        modules: 15,
        level: 'Advanced',
        image: '/images/courses/professional.jpg'
    }
];

// @route   GET /api/courses
// @desc    Get all courses
// @access  Public
router.get('/', (req, res) => {
    res.json({
        success: true,
        count: courses.length,
        courses
    });
});

// @route   GET /api/courses/:id
// @desc    Get course by ID
// @access  Public
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json({
        success: true,
        course
    });
});

// @route   POST /api/courses/enroll/:id
// @desc    Enroll in a course
// @access  Private
router.post('/enroll/:id', auth, async (req, res) => {
    try {
        const course = courses.find(c => c.id === parseInt(req.params.id));
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        res.json({
            success: true,
            message: `Enrolled in ${course.title}`,
            course
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
