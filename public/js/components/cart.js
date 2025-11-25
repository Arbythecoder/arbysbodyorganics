/**
 * Shopping Cart Component
 * Handles all cart operations including add, remove, update quantity, and calculations
 * Uses localStorage to persist cart data across sessions
 */

class ShoppingCart {
    constructor() {
        // Get cart from localStorage or initialize empty cart
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    /**
     * Initialize cart when page loads
     * Sets up event listeners and renders cart
     */
    init() {
        this.renderCart();
        this.updateCartCount();
        this.calculateTotals();
        this.setupEventListeners();
    }

    /**
     * Add event listeners for cart actions
     */
    setupEventListeners() {
        // Clear cart button
        const clearBtn = document.getElementById('clearCart');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearCart());
        }

        // Proceed to checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.proceedToCheckout());
        }

        // Apply discount code
        const applyDiscountBtn = document.getElementById('applyDiscount');
        if (applyDiscountBtn) {
            applyDiscountBtn.addEventListener('click', () => this.applyDiscount());
        }
    }

    /**
     * Add product to cart
     * If product already exists, increase quantity
     * @param {Object} product - Product object with id, name, price, image
     */
    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);

        if (existingItem) {
            // Product already in cart, increase quantity
            existingItem.quantity += 1;
        } else {
            // New product, add to cart
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
        this.renderCart();
        this.showNotification('Product added to cart!', 'success');
    }

    /**
     * Remove product from cart
     * @param {string} productId - ID of product to remove
     */
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.renderCart();
        this.showNotification('Product removed from cart', 'info');
    }

    /**
     * Update quantity of a product in cart
     * @param {string} productId - ID of product
     * @param {number} quantity - New quantity
     */
    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);

        if (item) {
            if (quantity <= 0) {
                // If quantity is 0 or negative, remove item
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.renderCart();
            }
        }
    }

    /**
     * Clear all items from cart
     */
    clearCart() {
        if (confirm('Are you sure you want to clear your cart?')) {
            this.cart = [];
            this.saveCart();
            this.renderCart();
            this.showNotification('Cart cleared', 'info');
        }
    }

    /**
     * Save cart to localStorage
     * This allows cart to persist when user closes browser
     */
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCount();
        this.calculateTotals();
    }

    /**
     * Update the cart item count badge in navigation
     */
    updateCartCount() {
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElement.textContent = totalItems;
        }
    }

    /**
     * Calculate cart totals (subtotal, tax, shipping, total)
     */
    calculateTotals() {
        // Calculate subtotal
        const subtotal = this.cart.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        // Calculate shipping (free for orders over ₦20,000)
        const shipping = subtotal > 20000 ? 0 : 2000;

        // Calculate VAT (7.5% - Nigerian VAT rate)
        const tax = subtotal * 0.075;

        // Calculate total
        const total = subtotal + shipping + tax;

        // Update display
        this.updateTotalDisplay('subtotal', subtotal);
        this.updateTotalDisplay('shipping', shipping);
        this.updateTotalDisplay('tax', tax);
        this.updateTotalDisplay('total', total);
    }

    /**
     * Update a total display element
     * @param {string} id - Element ID
     * @param {number} amount - Amount to display
     */
    updateTotalDisplay(id, amount) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
    }

    /**
     * Render all cart items on the page
     */
    renderCart() {
        const cartItemsContainer = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');

        if (!cartItemsContainer) return;

        // Show empty cart message if cart is empty
        if (this.cart.length === 0) {
            if (emptyCart) emptyCart.classList.remove('d-none');
            cartItemsContainer.innerHTML = '';
            return;
        }

        // Hide empty cart message
        if (emptyCart) emptyCart.classList.add('d-none');

        // Render each cart item
        cartItemsContainer.innerHTML = this.cart.map(item => `
            <div class="card mb-3 shadow-sm">
                <div class="row g-0 align-items-center">
                    <div class="col-md-2">
                        <img src="${item.image || 'https://via.placeholder.com/150'}"
                             class="img-fluid rounded-start p-3"
                             alt="${item.name}">
                    </div>
                    <div class="col-md-4">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">${item.name}</h5>
                            <p class="text-muted small mb-0">${item.category || 'Organic Skincare'}</p>
                        </div>
                    </div>
                    <div class="col-md-2 text-center">
                        <p class="mb-0 fw-bold text-primary">₦${item.price.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div class="col-md-2 text-center">
                        <div class="input-group input-group-sm">
                            <button class="btn btn-outline-secondary" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">
                                <i class="bi bi-dash"></i>
                            </button>
                            <input type="number" class="form-control text-center" value="${item.quantity}"
                                   onchange="cart.updateQuantity('${item.id}', parseInt(this.value))" min="1">
                            <button class="btn btn-outline-secondary" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">
                                <i class="bi bi-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-2 text-center">
                        <p class="mb-0 fw-bold">₦${(item.price * item.quantity).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <button class="btn btn-link text-danger btn-sm" onclick="cart.removeFromCart('${item.id}')">
                            <i class="bi bi-trash"></i> Remove
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Apply discount code
     * In production, this would validate with backend
     */
    applyDiscount() {
        const discountCodeInput = document.getElementById('discountCode');
        const discountMessage = document.getElementById('discountMessage');

        if (!discountCodeInput || !discountMessage) return;

        const code = discountCodeInput.value.trim().toUpperCase();

        // Example discount codes (in production, validate with backend)
        const validCodes = {
            'SAVE10': 10,
            'ORGANIC20': 20,
            'WELCOME15': 15
        };

        if (validCodes[code]) {
            discountMessage.textContent = `✓ ${validCodes[code]}% discount applied!`;
            discountMessage.classList.remove('d-none');
            this.showNotification('Discount code applied!', 'success');
        } else {
            discountMessage.textContent = '✗ Invalid discount code';
            discountMessage.classList.remove('text-success');
            discountMessage.classList.add('text-danger');
            discountMessage.classList.remove('d-none');
        }
    }

    /**
     * Proceed to checkout
     * Validates cart and redirects to checkout page
     */
    proceedToCheckout() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty!', 'error');
            return;
        }

        // Save cart to localStorage (already done, but ensure it's saved)
        this.saveCart();

        // Redirect to checkout page
        window.location.href = 'checkout.html';
    }

    /**
     * Show notification to user
     * @param {string} message - Message to show
     * @param {string} type - Type of notification (success, error, info)
     */
    showNotification(message, type) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} position-fixed top-0 end-0 m-3`;
        toast.style.zIndex = '9999';
        toast.textContent = message;

        document.body.appendChild(toast);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Initialize cart when page loads
const cart = new ShoppingCart();
