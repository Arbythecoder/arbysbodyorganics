const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Mock courses data
const courses = [
    {
        id: 1,
        title: 'Natural Skincare Basics',
        description: 'Learn the fundamentals of natural skincare and organic ingredients',
        duration: '4 weeks',
        price: 15000,
        image: '/images/course-basics.jpg',
        lessons: 12
    },
    {
        id: 2,
        title: 'Advanced Face Care Techniques',
        description: 'Master advanced techniques for treating specific skin concerns',
        duration: '6 weeks',
        price: 25000,
        image: '/images/course-advanced.jpg',
        lessons: 18
    },
    {
        id: 3,
        title: 'DIY Organic Products',
        description: 'Create your own organic skincare products at home',
        duration: '3 weeks',
        price: 12000,
        image: '/images/course-diy.jpg',
        lessons: 10
    }
];

// @route   GET /api/courses
// @desc    Get all courses
// @access  Public
router.get('/', async (req, res) => {
    try {
        res.json({
            success: true,
            count: courses.length,
            courses
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/courses/:id
// @desc    Get single course
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const course = courses.find(c => c.id === parseInt(req.params.id));

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json({
            success: true,
            course
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/courses/:id/enroll
// @desc    Enroll in a course
// @access  Private
router.post('/:id/enroll', auth, async (req, res) => {
    try {
        const course = courses.find(c => c.id === parseInt(req.params.id));

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // TODO: Implement enrollment logic with database

        res.json({
            success: true,
            message: 'Successfully enrolled in course',
            course
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
