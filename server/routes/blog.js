const express = require('express');
const router = express.Router();

// Mock blog posts
const posts = [
    {
        id: 1,
        title: 'Natural Remedies for Hyperpigmentation',
        excerpt: 'Discover effective natural solutions for treating dark spots',
        image: '/images/blog-1.jpg',
        date: '2025-01-15',
        category: 'Skincare Tips'
    },
    {
        id: 2,
        title: '5 Benefits of Organic Skincare',
        excerpt: 'Why choosing organic products matters for your skin',
        image: '/images/blog-2.jpg',
        date: '2025-01-10',
        category: 'Natural Beauty'
    }
];

// @route   GET /api/blog
// @desc    Get all blog posts
// @access  Public
router.get('/', async (req, res) => {
    try {
        res.json({
            success: true,
            count: posts.length,
            posts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/blog/:id
// @desc    Get single blog post
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const post = posts.find(p => p.id === parseInt(req.params.id));

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json({
            success: true,
            post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
