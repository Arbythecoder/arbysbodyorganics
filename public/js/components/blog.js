/**
 * Blog Component
 * Handles blog listing, filtering, and search functionality
 */

class Blog {
    constructor() {
        this.posts = [];
        this.currentCategory = 'all';
        this.init();
    }

    /**
     * Initialize blog
     */
    init() {
        this.setupEventListeners();
        this.loadPosts();
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Category filters
        const categoryButtons = document.querySelectorAll('[data-category]');
        categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.filterByCategory(category);

                // Update active button
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });

        // Search
        const searchInput = document.getElementById('blogSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchPosts(e.target.value);
            });
        }

        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.subscribeNewsletter(e.target);
            });
        }
    }

    /**
     * Load blog posts
     * In production, fetch from API
     */
    async loadPosts() {
        // Sample blog data
        this.posts = [
            {
                id: 1,
                title: 'The Ultimate Guide to Organic Skincare',
                excerpt: 'Discover the transformative power of natural ingredients...',
                category: 'skincare',
                image: '../images/blog-featured.jpg',
                date: '2025-01-15',
                readTime: '8 min'
            },
            {
                id: 2,
                title: '5 Morning Skincare Habits for Glowing Skin',
                excerpt: 'Start your day with these simple yet effective practices...',
                category: 'skincare',
                image: '../images/blog-1.jpg',
                date: '2025-01-12',
                readTime: '5 min'
            },
            {
                id: 3,
                title: 'Hyaluronic Acid: Nature\'s Moisture Magnet',
                excerpt: 'Learn why this powerful natural ingredient is essential...',
                category: 'ingredients',
                image: '../images/blog-2.jpg',
                date: '2025-01-10',
                readTime: '7 min'
            }
        ];
    }

    /**
     * Filter posts by category
     * @param {string} category - Category to filter by
     */
    filterByCategory(category) {
        this.currentCategory = category;

        const allPosts = document.querySelectorAll('#blogPosts > div');

        if (category === 'all') {
            allPosts.forEach(post => post.style.display = 'block');
            return;
        }

        // In production, filter posts array and re-render
        // For demo, just show/hide based on category badge
        allPosts.forEach(post => {
            const badge = post.querySelector('.badge');
            if (badge && badge.textContent.toLowerCase() === category.toLowerCase()) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }

    /**
     * Search posts
     * @param {string} query - Search query
     */
    searchPosts(query) {
        if (!query.trim()) {
            this.filterByCategory(this.currentCategory);
            return;
        }

        const allPosts = document.querySelectorAll('#blogPosts > div');
        const lowerQuery = query.toLowerCase();

        allPosts.forEach(post => {
            const title = post.querySelector('.card-title')?.textContent.toLowerCase() || '';
            const text = post.querySelector('.card-text')?.textContent.toLowerCase() || '';

            if (title.includes(lowerQuery) || text.includes(lowerQuery)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }

    /**
     * Subscribe to newsletter
     * @param {HTMLFormElement} form - Newsletter form
     */
    async subscribeNewsletter(form) {
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value;

        // In production, send to API
        // await fetch('/api/newsletter/subscribe', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email })
        // });

        this.showNotification('Thanks for subscribing!', 'success');
        form.reset();
    }

    /**
     * Show notification
     * @param {string} message - Message to display
     * @param {string} type - Notification type
     */
    showNotification(message, type) {
        const toast = document.createElement('div');
        toast.className = `alert alert-${type === 'success' ? 'success' : 'info'} position-fixed top-0 end-0 m-3`;
        toast.style.zIndex = '9999';
        toast.textContent = message;

        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
}

// Initialize blog when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Blog();
});
