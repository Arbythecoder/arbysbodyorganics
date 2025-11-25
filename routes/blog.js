const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Sample blog posts (can be moved to database)
const blogPosts = [
    {
        id: 1,
        title: 'The Ultimate Guide to Building a Skincare Routine',
        slug: 'ultimate-skincare-routine-guide',
        excerpt: 'Learn how to build a personalized skincare routine that works for your unique skin type.',
        content: 'A good skincare routine is the foundation of healthy, glowing skin...',
        author: 'Arby',
        category: 'Skincare Tips',
        image: '/images/blog/routine.jpg',
        createdAt: new Date('2024-01-15'),
        readTime: '5 min'
    },
    {
        id: 2,
        title: 'Understanding Active Ingredients: Retinol vs Vitamin C',
        slug: 'retinol-vs-vitamin-c',
        excerpt: 'Discover the differences between these two powerhouse ingredients and how to use them.',
        content: 'When it comes to anti-aging and brightening, retinol and vitamin C are the gold standards...',
        author: 'Arby',
        category: 'Ingredients',
        image: '/images/blog/ingredients.jpg',
        createdAt: new Date('2024-01-20'),
        readTime: '7 min'
    },
    {
        id: 3,
        title: 'How to Treat Hyperpigmentation Naturally',
        slug: 'treat-hyperpigmentation-naturally',
        excerpt: 'Natural remedies and products that can help fade dark spots and even out your skin tone.',
        content: 'Hyperpigmentation is a common skin concern that affects people of all skin types...',
        author: 'Arby',
        category: 'Skin Concerns',
        image: '/images/blog/hyperpigmentation.jpg',
        createdAt: new Date('2024-02-01'),
        readTime: '6 min'
    }
];

// @route   GET /api/blog
// @desc    Get all blog posts
// @access  Public
router.get('/', (req, res) => {
    const { category, limit = 10 } = req.query;
    
    let posts = [...blogPosts];
    
    if (category) {
        posts = posts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    
    posts = posts.slice(0, parseInt(limit));
    
    res.json({
        success: true,
        count: posts.length,
        posts
    });
});

// @route   GET /api/blog/:slug
// @desc    Get blog post by slug
// @access  Public
router.get('/:slug', (req, res) => {
    const post = blogPosts.find(p => p.slug === req.params.slug);
    
    if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
    }
    
    res.json({
        success: true,
        post
    });
});

// @route   GET /api/blog/categories
// @desc    Get all blog categories
// @access  Public
router.get('/meta/categories', (req, res) => {
    const categories = [...new Set(blogPosts.map(p => p.category))];
    
    res.json({
        success: true,
        categories
    });
});

module.exports = router;
