/**
 * User Dashboard Component
 * Manages user account, orders, courses, and settings
 */

class UserDashboard {
    constructor() {
        this.currentTab = 'overview';
        this.userData = null;
        this.init();
    }

    /**
     * Initialize dashboard
     */
    async init() {
        // Check if user is logged in
        if (!this.checkAuth()) {
            window.location.href = 'login.html';
            return;
        }

        await this.loadUserData();
        this.setupEventListeners();
        this.loadDashboardData();
    }

    /**
     * Check if user is authenticated
     * In production, validate JWT token
     */
    checkAuth() {
        const token = localStorage.getItem('authToken');
        // In production: validate token with backend
        return !!token;
    }

    /**
     * Load user data from localStorage or API
     */
    async loadUserData() {
        // In production, fetch from API
        // const response = await fetch('/api/users/profile', {
        //     headers: { 'Authorization': `Bearer ${token}` }
        // });
        // this.userData = await response.json();

        // For demo, use localStorage
        this.userData = JSON.parse(localStorage.getItem('userData')) || {
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com',
            phone: '+1 (555) 123-4567'
        };

        this.renderUserInfo();
    }

    /**
     * Render user information in sidebar
     */
    renderUserInfo() {
        const userNameElement = document.getElementById('userName');
        const userEmailElement = document.getElementById('userEmail');

        if (userNameElement && this.userData) {
            userNameElement.textContent = `${this.userData.firstName} ${this.userData.lastName}`;
        }

        if (userEmailElement && this.userData) {
            userEmailElement.textContent = this.userData.email;
        }

        // Populate settings form
        this.populateSettingsForm();
    }

    /**
     * Setup event listeners for navigation and forms
     */
    setupEventListeners() {
        // Tab navigation
        const tabLinks = document.querySelectorAll('.list-group-item[data-tab]');
        tabLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = e.currentTarget.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }

        // Profile form
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateProfile();
            });
        }

        // Password form
        const passwordForm = document.getElementById('passwordForm');
        if (passwordForm) {
            passwordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updatePassword();
            });
        }
    }

    /**
     * Switch between dashboard tabs
     * @param {string} tab - Tab name to switch to
     */
    switchTab(tab) {
        // Update active tab in sidebar
        document.querySelectorAll('.list-group-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`)?.classList.add('active');

        // Hide all tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Show selected tab content
        const tabContent = document.getElementById(tab);
        if (tabContent) {
            tabContent.classList.add('active');
        }

        this.currentTab = tab;

        // Load tab-specific data
        this.loadTabData(tab);
    }

    /**
     * Load data for specific tab
     * @param {string} tab - Tab name
     */
    async loadTabData(tab) {
        switch (tab) {
            case 'orders':
                await this.loadOrders();
                break;
            case 'courses':
                await this.loadCourses();
                break;
            case 'quiz-results':
                await this.loadQuizResults();
                break;
            case 'wishlist':
                await this.loadWishlist();
                break;
        }
    }

    /**
     * Load dashboard overview data
     */
    async loadDashboardData() {
        // In production, fetch from API
        const stats = {
            totalOrders: 12,
            totalCourses: 3,
            wishlistCount: 5
        };

        document.getElementById('totalOrders').textContent = stats.totalOrders;
        document.getElementById('totalCourses').textContent = stats.totalCourses;
        document.getElementById('wishlistCount').textContent = stats.wishlistCount;

        await this.loadRecentOrders();
    }

    /**
     * Load recent orders for overview
     */
    async loadRecentOrders() {
        const recentOrdersContainer = document.getElementById('recentOrders');
        if (!recentOrdersContainer) return;

        // Sample data (in production, fetch from API)
        const orders = [
            { id: '#12345', date: '2025-01-15', total: 89.99, status: 'Delivered' },
            { id: '#12344', date: '2025-01-10', total: 129.99, status: 'In Transit' }
        ];

        if (orders.length === 0) {
            recentOrdersContainer.innerHTML = '<p class="text-muted text-center py-4">No recent orders</p>';
            return;
        }

        recentOrdersContainer.innerHTML = `
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orders.map(order => `
                            <tr>
                                <td>${order.id}</td>
                                <td>${order.date}</td>
                                <td>$${order.total}</td>
                                <td><span class="badge bg-success">${order.status}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    /**
     * Load user orders
     */
    async loadOrders() {
        const ordersContainer = document.getElementById('ordersList');
        if (!ordersContainer) return;

        ordersContainer.innerHTML = '<div class="text-center py-5"><div class="spinner-border"></div></div>';

        // In production, fetch from API
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 500));

        ordersContainer.innerHTML = `
            <div class="card shadow-sm mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="fw-bold mb-1">Order #12345</h5>
                            <p class="text-muted small mb-0">Placed on January 15, 2025</p>
                        </div>
                        <span class="badge bg-success">Delivered</span>
                    </div>
                    <hr>
                    <p class="mb-1">2 items • Total: $89.99</p>
                    <button class="btn btn-outline-primary btn-sm mt-2">View Details</button>
                </div>
            </div>
        `;
    }

    /**
     * Load user courses
     */
    async loadCourses() {
        const coursesContainer = document.getElementById('coursesList');
        if (!coursesContainer) return;

        coursesContainer.innerHTML = '<div class="text-center py-5"><div class="spinner-border"></div></div>';

        await new Promise(resolve => setTimeout(resolve, 500));

        coursesContainer.innerHTML = `
            <div class="col-md-6">
                <div class="card shadow-sm h-100">
                    <div class="card-body">
                        <h5 class="fw-bold">Organic Skincare Basics</h5>
                        <div class="progress mb-2">
                            <div class="progress-bar" style="width: 65%"></div>
                        </div>
                        <p class="small text-muted mb-3">65% Complete</p>
                        <button class="btn btn-primary btn-sm">Continue Learning</button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Load quiz results
     */
    async loadQuizResults() {
        const quizResultsContainer = document.getElementById('quizResultsList');
        if (!quizResultsContainer) return;

        quizResultsContainer.innerHTML = '<div class="text-center py-5"><div class="spinner-border"></div></div>';

        await new Promise(resolve => setTimeout(resolve, 500));

        const results = JSON.parse(localStorage.getItem('quizResults')) || [];

        if (results.length === 0) {
            quizResultsContainer.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-clipboard-data display-1 text-muted"></i>
                    <h4 class="mt-3">No Quiz Results Yet</h4>
                    <p class="text-muted">Take our AI Skin Quiz to get personalized recommendations!</p>
                    <a href="quiz.html" class="btn btn-primary mt-3">Take Quiz</a>
                </div>
            `;
            return;
        }

        quizResultsContainer.innerHTML = results.map((result, index) => `
            <div class="card shadow-sm mb-3">
                <div class="card-body">
                    <h5 class="fw-bold">Quiz Result #${index + 1}</h5>
                    <p class="text-muted small">${new Date(result.date).toLocaleDateString()}</p>
                    <p class="mb-0">Skin Type: <strong>${result.skinType}</strong></p>
                    <button class="btn btn-outline-primary btn-sm mt-2">View Details</button>
                </div>
            </div>
        `).join('');
    }

    /**
     * Load wishlist items
     */
    async loadWishlist() {
        const wishlistContainer = document.getElementById('wishlistItems');
        if (!wishlistContainer) return;

        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

        if (wishlist.length === 0) {
            wishlistContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="bi bi-heart display-1 text-muted"></i>
                    <h4 class="mt-3">Your Wishlist is Empty</h4>
                    <a href="all-products.html" class="btn btn-primary mt-3">Browse Products</a>
                </div>
            `;
            return;
        }

        wishlistContainer.innerHTML = wishlist.map(item => `
            <div class="col-md-6">
                <div class="card shadow-sm h-100">
                    <div class="card-body">
                        <h5 class="fw-bold">${item.name}</h5>
                        <p class="text-primary fw-bold">$${item.price}</p>
                        <button class="btn btn-primary btn-sm me-2">Add to Cart</button>
                        <button class="btn btn-outline-danger btn-sm">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Populate settings form with user data
     */
    populateSettingsForm() {
        if (!this.userData) return;

        document.getElementById('firstName').value = this.userData.firstName || '';
        document.getElementById('lastName').value = this.userData.lastName || '';
        document.getElementById('email').value = this.userData.email || '';
        document.getElementById('phone').value = this.userData.phone || '';
    }

    /**
     * Update user profile
     */
    async updateProfile() {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const phone = document.getElementById('phone').value;

        // In production, send to API
        // await fetch('/api/users/profile', {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ firstName, lastName, phone })
        // });

        this.userData.firstName = firstName;
        this.userData.lastName = lastName;
        this.userData.phone = phone;

        localStorage.setItem('userData', JSON.stringify(this.userData));

        this.renderUserInfo();
        this.showNotification('Profile updated successfully!', 'success');
    }

    /**
     * Update user password
     */
    async updatePassword() {
        // In production, validate and send to API
        this.showNotification('Password updated successfully!', 'success');
        document.getElementById('passwordForm').reset();
    }

    /**
     * Logout user
     */
    logout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            window.location.href = 'login.html';
        }
    }

    /**
     * Show notification
     * @param {string} message - Message to display
     * @param {string} type - Notification type (success, error, info)
     */
    showNotification(message, type) {
        const toast = document.createElement('div');
        toast.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} position-fixed top-0 end-0 m-3`;
        toast.style.zIndex = '9999';
        toast.textContent = message;

        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
    new UserDashboard();
});
