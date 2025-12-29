/**
 * Checkout Component
 * Handles multi-step checkout process
 * Collects shipping, payment info and processes orders
 */

class Checkout {
    constructor() {
        this.currentStep = 1;
        this.orderData = {
            shipping: {},
            payment: {},
            items: []
        };
        this.init();
    }

    /**
     * Initialize checkout process
     */
    init() {
        this.loadCartItems();
        this.calculateOrderSummary();
        this.setupEventListeners();
        // Initialize payment method display
        setTimeout(() => this.togglePaymentMethod('bankTransfer'), 100);
    }

    /**
     * Load cart items from localStorage
     */
    loadCartItems() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.orderData.items = cart;

        // If cart is empty, redirect back to shop
        if (cart.length === 0) {
            alert('Your cart is empty!');
            window.location.href = 'all-products.html';
            return;
        }

        this.renderOrderItems();
    }

    /**
     * Render order items in sidebar
     */
    renderOrderItems() {
        const orderItemsContainer = document.getElementById('orderItems');
        if (!orderItemsContainer) return;

        orderItemsContainer.innerHTML = this.orderData.items.map(item => `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex align-items-center">
                    <img src="${item.image || 'https://via.placeholder.com/60'}"
                         class="rounded me-2"
                         style="width: 60px; height: 60px; object-fit: cover;"
                         alt="${item.name}">
                    <div>
                        <p class="mb-0 small fw-bold">${item.name}</p>
                        <small class="text-muted">Qty: ${item.quantity}</small>
                    </div>
                </div>
                <span class="fw-bold">₦${(item.price * item.quantity).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
        `).join('');
    }

    /**
     * Calculate and display order summary
     */
    calculateOrderSummary() {
        const subtotal = this.orderData.items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        const shipping = subtotal > 20000 ? 0 : 2000;
        const tax = subtotal * 0.075;
        const total = subtotal + shipping + tax;

        // Update display
        this.updateSummaryField('summarySubtotal', subtotal);
        this.updateSummaryField('summaryShipping', shipping);
        this.updateSummaryField('summaryTax', tax);
        this.updateSummaryField('summaryTotal', total);

        this.orderData.subtotal = subtotal;
        this.orderData.shipping = shipping;
        this.orderData.tax = tax;
        this.orderData.total = total;
    }

    /**
     * Update a summary field
     * @param {string} id - Element ID
     * @param {number} amount - Amount to display
     */
    updateSummaryField(id, amount) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Place order button
        const placeOrderBtn = document.getElementById('placeOrderBtn');
        if (placeOrderBtn) {
            placeOrderBtn.addEventListener('click', () => this.placeOrder());
        }

        // Payment method toggle
        const bankTransferRadio = document.getElementById('bankTransfer');
        const whatsappPayRadio = document.getElementById('whatsappPay');

        if (bankTransferRadio) {
            bankTransferRadio.addEventListener('change', () => this.togglePaymentMethod('bankTransfer'));
        }

        if (whatsappPayRadio) {
            whatsappPayRadio.addEventListener('change', () => this.togglePaymentMethod('whatsappPay'));
        }

        // Tab navigation
        const tabLinks = document.querySelectorAll('.list-group-item[data-tab]');
        tabLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = e.currentTarget.dataset.tab;
                this.switchTab(tab);
            });
        });
    }

    /**
     * Toggle payment method details display
     * @param {string} method - Payment method selected
     */
    togglePaymentMethod(method) {
        const bankDetails = document.getElementById('bankTransferDetails');
        const whatsappDetails = document.getElementById('whatsappPayDetails');

        if (method === 'bankTransfer') {
            bankDetails?.classList.remove('d-none');
            whatsappDetails?.classList.add('d-none');

            // Update transfer amount
            const transferAmount = document.getElementById('transferAmount');
            if (transferAmount && this.orderData.total) {
                transferAmount.textContent = `₦${this.orderData.total.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            }
        } else if (method === 'whatsappPay') {
            bankDetails?.classList.add('d-none');
            whatsappDetails?.classList.remove('d-none');
        }
    }

    /**
     * Validate current step and move to next
     * @param {number} step - Step number to move to
     */
    nextStep(step) {
        if (step === 2) {
            // Validate shipping form
            if (!this.validateShippingForm()) {
                return;
            }
            this.saveShippingInfo();
        } else if (step === 3) {
            // Validate payment form
            if (!this.validatePaymentForm()) {
                return;
            }
            this.savePaymentInfo();
            this.showReview();
        }

        this.currentStep = step;
        this.showStep(step);
    }

    /**
     * Go to previous step
     * @param {number} step - Step number to move to
     */
    prevStep(step) {
        this.currentStep = step;
        this.showStep(step);
    }

    /**
     * Show specific step
     * @param {number} step - Step number to show
     */
    showStep(step) {
        // Hide all steps
        document.querySelectorAll('.checkout-step').forEach(el => {
            el.classList.add('d-none');
        });

        // Show current step
        const currentStepElement = document.getElementById(`step${step}`);
        if (currentStepElement) {
            currentStepElement.classList.remove('d-none');
        }

        // Update step indicators
        document.querySelectorAll('.step').forEach((el, index) => {
            if (index + 1 <= step) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
    }

    /**
     * Validate shipping form
     * @returns {boolean} True if valid
     */
    validateShippingForm() {
        const form = document.getElementById('shippingForm');
        if (!form) return false;

        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;
        let firstInvalidInput = null;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                if (!firstInvalidInput) {
                    firstInvalidInput = input;
                }
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        });

        if (!isValid) {
            this.showNotification('Please fill in all required fields', 'error');
            // Scroll to first invalid input
            if (firstInvalidInput) {
                firstInvalidInput.focus();
                firstInvalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        return isValid;
    }

    /**
     * Validate payment form
     * @returns {boolean} True if valid
     */
    validatePaymentForm() {
        // Just check that a payment method is selected
        const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');

        if (!selectedMethod) {
            this.showNotification('Please select a payment method', 'error');
            return false;
        }

        return true;
    }

    /**
     * Save shipping information
     */
    saveShippingInfo() {
        const form = document.getElementById('shippingForm');
        if (!form) return;

        const formData = new FormData(form);
        this.orderData.shipping = Object.fromEntries(formData);
    }

    /**
     * Save payment information
     */
    savePaymentInfo() {
        const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
        this.orderData.payment.method = selectedMethod ? selectedMethod.id : 'creditCard';
    }

    /**
     * Show review before placing order
     */
    showReview() {
        const reviewShipping = document.getElementById('reviewShipping');
        const reviewPayment = document.getElementById('reviewPayment');

        if (reviewShipping && this.orderData.shipping) {
            const shipping = this.orderData.shipping;
            reviewShipping.innerHTML = `
                ${shipping.firstName || ''} ${shipping.lastName || ''}<br>
                ${shipping.address || ''}<br>
                ${shipping.city || ''}, ${shipping.state || ''} ${shipping.zip || ''}
            `;
        }

        if (reviewPayment && this.orderData.payment) {
            const methodText = this.orderData.payment.method === 'whatsappPay' ? 'WhatsApp Payment' : 'Bank Transfer';
            reviewPayment.textContent = methodText;
        }
    }

    /**
     * Place order based on selected payment method
     */
    async placeOrder() {
        const termsCheck = document.getElementById('termsCheck');

        if (!termsCheck || !termsCheck.checked) {
            this.showNotification('Please accept the terms and conditions', 'error');
            return;
        }

        // Validate we have shipping info
        if (!this.orderData.shipping || !this.orderData.shipping.firstName) {
            this.showNotification('Please fill in shipping information', 'error');
            return;
        }

        // Show loading state
        const placeOrderBtn = document.getElementById('placeOrderBtn');
        const originalText = placeOrderBtn.innerHTML;
        placeOrderBtn.disabled = true;
        placeOrderBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';

        try {
            const paymentMethod = this.orderData.payment.method;

            if (paymentMethod === 'whatsappPay') {
                await this.processWhatsAppPayment();
            } else {
                await this.processBankTransferPayment();
            }

        } catch (error) {
            console.error('Order error:', error);
            this.showNotification('Error processing order. Please try again.', 'error');

            // Reset button
            placeOrderBtn.disabled = false;
            placeOrderBtn.innerHTML = originalText;
        }
    }

    /**
     * Process WhatsApp payment
     */
    async processWhatsAppPayment() {
        const customerName = `${this.orderData.shipping.firstName} ${this.orderData.shipping.lastName}`;
        const customerPhone = this.orderData.shipping.phone || '';
        const shippingAddress = `${this.orderData.shipping.address}, ${this.orderData.shipping.city}, ${this.orderData.shipping.state} ${this.orderData.shipping.zip}`;

        // Generate order reference
        const orderRef = this.generateOrderRef();
        this.orderData.orderRef = orderRef;
        this.orderData.date = new Date().toISOString();

        // Build order message for WhatsApp
        let orderMessage = `🛍️ *NEW ORDER - WhatsApp Payment*\n\n`;
        orderMessage += `*Order Reference:* ${orderRef}\n`;
        orderMessage += `*Customer:* ${customerName}\n`;
        orderMessage += `*Phone:* ${customerPhone}\n`;
        orderMessage += `*Shipping Address:*\n${shippingAddress}\n\n`;
        orderMessage += `*ITEMS ORDERED:*\n`;

        this.orderData.items.forEach((item, index) => {
            orderMessage += `${index + 1}. ${item.name} x${item.quantity} - ₦${(item.price * item.quantity).toLocaleString()}\n`;
        });

        orderMessage += `\n*Subtotal:* ₦${this.orderData.subtotal.toLocaleString()}\n`;
        orderMessage += `*Shipping:* ₦${this.orderData.shipping.toLocaleString()}\n`;
        orderMessage += `*TOTAL:* ₦${this.orderData.total.toLocaleString()}\n\n`;
        orderMessage += `I'd like to complete payment via WhatsApp. Please send payment instructions. Thank you! 🌿`;

        // Send to WhatsApp
        const whatsappUrl = `https://wa.me/2347067510073?text=${encodeURIComponent(orderMessage)}`;

        // Store order data for confirmation page
        sessionStorage.setItem('lastOrder', JSON.stringify(this.orderData));

        // Clear cart
        localStorage.removeItem('cart');

        // Show success message
        this.showNotification('Redirecting to WhatsApp...', 'success');

        // Open WhatsApp
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            // Redirect to confirmation page
            setTimeout(() => {
                window.location.href = 'order-confirmation.html';
            }, 1500);
        }, 1000);
    }

    /**
     * Process bank transfer payment
     */
    async processBankTransferPayment() {
        const customerName = `${this.orderData.shipping.firstName} ${this.orderData.shipping.lastName}`;
        const customerPhone = this.orderData.shipping.phone || '';
        const shippingAddress = `${this.orderData.shipping.address}, ${this.orderData.shipping.city}, ${this.orderData.shipping.state} ${this.orderData.shipping.zip}`;

        // Generate order reference
        const orderRef = this.generateOrderRef();
        this.orderData.orderRef = orderRef;
        this.orderData.date = new Date().toISOString();

        // Build order confirmation message for WhatsApp (proof of payment)
        let orderMessage = `🛍️ *NEW ORDER - Bank Transfer*\n\n`;
        orderMessage += `*Order Reference:* ${orderRef}\n`;
        orderMessage += `*Customer:* ${customerName}\n`;
        orderMessage += `*Phone:* ${customerPhone}\n`;
        orderMessage += `*Shipping Address:*\n${shippingAddress}\n\n`;
        orderMessage += `*ITEMS ORDERED:*\n`;

        this.orderData.items.forEach((item, index) => {
            orderMessage += `${index + 1}. ${item.name} x${item.quantity} - ₦${(item.price * item.quantity).toLocaleString()}\n`;
        });

        orderMessage += `\n*TOTAL AMOUNT TO TRANSFER:* ₦${this.orderData.total.toLocaleString()}\n\n`;
        orderMessage += `I have made/will make a bank transfer. I will send proof of payment shortly. Thank you! 🌿`;

        // Send to WhatsApp for confirmation
        const whatsappUrl = `https://wa.me/2347067510073?text=${encodeURIComponent(orderMessage)}`;

        // Store order data for confirmation page
        sessionStorage.setItem('lastOrder', JSON.stringify(this.orderData));

        // Clear cart
        localStorage.removeItem('cart');

        // Redirect to confirmation page
        window.location.href = 'order-confirmation.html';
    }

    /**
     * Generate order reference number
     * @returns {string} Order reference
     */
    generateOrderRef() {
        const prefix = 'ABO';
        const timestamp = Date.now().toString().slice(-8);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}-${timestamp}-${random}`;
    }

    /**
     * Show notification to user
     * @param {string} message - Message to show
     * @param {string} type - Type of notification (success, error, info)
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

// Make functions globally accessible for inline onclick handlers
let checkoutInstance;

function nextStep(step) {
    if (checkoutInstance) {
        checkoutInstance.nextStep(step);
    }
}

function prevStep(step) {
    if (checkoutInstance) {
        checkoutInstance.prevStep(step);
    }
}

// Initialize checkout when page loads
document.addEventListener('DOMContentLoaded', () => {
    checkoutInstance = new Checkout();
});
