/**
 * Order Confirmation Component
 * Displays order confirmation details and next steps
 */

class OrderConfirmation {
    constructor() {
        this.orderData = null;
        this.init();
    }

    /**
     * Initialize order confirmation
     */
    init() {
        // Get order data from URL parameters or sessionStorage
        this.loadOrderData();

        if (this.orderData) {
            this.displayOrderDetails();
            this.displayPaymentInfo();
            this.displayOrderSummary();

            // Clear stored order data after displaying
            sessionStorage.removeItem('lastOrder');
        } else {
            // No order data found
            this.handleNoOrderData();
        }
    }

    /**
     * Load order data from session storage or URL
     */
    loadOrderData() {
        // Try to get from sessionStorage first
        const storedOrder = sessionStorage.getItem('lastOrder');

        if (storedOrder) {
            try {
                this.orderData = JSON.parse(storedOrder);
            } catch (e) {
                console.error('Error parsing order data:', e);
            }
        }

        // If no stored order, create a basic order reference
        if (!this.orderData) {
            this.orderData = {
                orderRef: this.generateOrderRef(),
                date: new Date().toISOString(),
                payment: { method: 'bankTransfer' },
                items: [],
                total: 0
            };
        }
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
     * Display order details (reference and date)
     */
    displayOrderDetails() {
        // Order Reference
        const orderRefElement = document.getElementById('orderRef');
        if (orderRefElement && this.orderData.orderRef) {
            orderRefElement.textContent = this.orderData.orderRef;
        }

        // Order Date
        const orderDateElement = document.getElementById('orderDate');
        if (orderDateElement && this.orderData.date) {
            const date = new Date(this.orderData.date);
            const formattedDate = date.toLocaleDateString('en-NG', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            orderDateElement.textContent = formattedDate;
        }
    }

    /**
     * Display payment method specific information
     */
    displayPaymentInfo() {
        const paymentInfoCard = document.getElementById('paymentInfoCard');
        if (!paymentInfoCard) return;

        const paymentMethod = this.orderData.payment?.method || 'bankTransfer';

        let content = '';

        if (paymentMethod === 'whatsappPay') {
            content = `
                <div class="card-body p-4 bg-light">
                    <h5 class="fw-bold mb-3">
                        <i class="bi bi-whatsapp text-success me-2"></i>
                        WhatsApp Payment
                    </h5>
                    <div class="alert alert-success">
                        <h6 class="alert-heading">
                            <i class="bi bi-check-circle me-2"></i>
                            Your order details have been sent!
                        </h6>
                        <hr>
                        <p class="mb-2">We've sent your order to our WhatsApp business account. Our team will:</p>
                        <ul class="mb-2">
                            <li>Confirm your order within 30 minutes</li>
                            <li>Send you secure payment instructions</li>
                            <li>Provide instant payment confirmation</li>
                            <li>Keep you updated on your order status</li>
                        </ul>
                        <div class="mt-3 p-3 bg-white rounded">
                            <small>
                                <i class="bi bi-info-circle text-primary me-1"></i>
                                <strong>Haven't received our message?</strong> Please check your WhatsApp or contact us directly.
                            </small>
                        </div>
                    </div>
                    <a href="https://wa.me/2347067510073" target="_blank" class="btn btn-success w-100">
                        <i class="bi bi-whatsapp me-2"></i>
                        Open WhatsApp Conversation
                    </a>
                </div>
            `;
        } else {
            // Bank Transfer
            const total = this.orderData.total || 0;
            content = `
                <div class="card-body p-4 bg-light">
                    <h5 class="fw-bold mb-3">
                        <i class="bi bi-bank2 text-primary me-2"></i>
                        Bank Transfer Payment
                    </h5>
                    <div class="alert alert-info">
                        <h6 class="alert-heading">
                            <i class="bi bi-info-circle me-2"></i>
                            Complete Your Payment
                        </h6>
                        <hr>
                        <p>Please transfer the exact amount to the account below:</p>

                        <div class="p-3 bg-white rounded mb-3">
                            <div class="row g-2">
                                <div class="col-12">
                                    <strong>Bank Name:</strong> Union Bank
                                </div>
                                <div class="col-12">
                                    <strong>Account Name:</strong> ARBYSHOUSEOFBEAUTY
                                </div>
                                <div class="col-12">
                                    <strong>Account Number:</strong>
                                    <span class="badge bg-dark fs-6">0167387221</span>
                                    <button class="btn btn-sm btn-outline-secondary ms-2" onclick="orderConfirmation.copyToClipboard('0167387221')">
                                        <i class="bi bi-clipboard"></i> Copy
                                    </button>
                                </div>
                                <div class="col-12">
                                    <strong>Amount:</strong>
                                    <span class="text-primary fw-bold fs-5">₦${total.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                        </div>

                        <div class="alert alert-warning mb-0">
                            <strong><i class="bi bi-exclamation-triangle me-2"></i>Important:</strong>
                            <p class="mb-2">After making payment, please send your proof of payment via WhatsApp to confirm your order.</p>
                            <a href="https://wa.me/2347067510073?text=${encodeURIComponent('Hi, I just made a bank transfer for Order #' + (this.orderData.orderRef || '') + '. Sending proof of payment now.')}"
                               target="_blank"
                               class="btn btn-success btn-sm">
                                <i class="bi bi-whatsapp me-2"></i>
                                Send Proof of Payment
                            </a>
                        </div>
                    </div>

                    <div class="mt-3">
                        <small class="text-muted">
                            <i class="bi bi-shield-check me-1"></i>
                            Your order will be processed immediately after payment confirmation
                        </small>
                    </div>
                </div>
            `;
        }

        paymentInfoCard.innerHTML = content;
    }

    /**
     * Display order summary
     */
    displayOrderSummary() {
        const summaryContainer = document.getElementById('orderSummaryContent');
        if (!summaryContainer) return;

        const items = this.orderData.items || [];
        const subtotal = this.orderData.subtotal || 0;
        const shipping = this.orderData.shipping || 0;
        const tax = this.orderData.tax || 0;
        const total = this.orderData.total || 0;

        let summaryHtml = '';

        if (items.length > 0) {
            summaryHtml += '<div class="mb-3">';
            items.forEach((item, index) => {
                summaryHtml += `
                    <div class="d-flex justify-content-between align-items-center mb-2 pb-2 ${index < items.length - 1 ? 'border-bottom' : ''}">
                        <div>
                            <strong>${item.name}</strong>
                            <br>
                            <small class="text-muted">Quantity: ${item.quantity} × ₦${item.price.toLocaleString('en-NG')}</small>
                        </div>
                        <div class="text-end">
                            <strong>₦${(item.price * item.quantity).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                        </div>
                    </div>
                `;
            });
            summaryHtml += '</div>';

            summaryHtml += `
                <hr>
                <div class="d-flex justify-content-between mb-2">
                    <span class="text-muted">Subtotal:</span>
                    <span>₦${subtotal.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span class="text-muted">Shipping:</span>
                    <span>${shipping === 0 ? '<span class="text-success">FREE</span>' : '₦' + shipping.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span class="text-muted">Tax (7.5%):</span>
                    <span>₦${tax.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                    <strong class="h5 mb-0">Total:</strong>
                    <strong class="h5 mb-0 text-primary">₦${total.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                </div>
            `;
        } else {
            summaryHtml = `
                <div class="text-center text-muted py-3">
                    <i class="bi bi-inbox" style="font-size: 3rem;"></i>
                    <p class="mt-2">Order details not available</p>
                </div>
            `;
        }

        summaryContainer.innerHTML = summaryHtml;
    }

    /**
     * Handle case when no order data is available
     */
    handleNoOrderData() {
        // Still show the page but with minimal data
        console.log('No order data found, showing basic confirmation');
    }

    /**
     * Copy text to clipboard
     * @param {string} text - Text to copy
     */
    copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Account number copied to clipboard!', 'success');
            }).catch(err => {
                console.error('Failed to copy:', err);
                this.fallbackCopy(text);
            });
        } else {
            this.fallbackCopy(text);
        }
    }

    /**
     * Fallback copy method for older browsers
     * @param {string} text - Text to copy
     */
    fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        try {
            document.execCommand('copy');
            this.showNotification('Account number copied!', 'success');
        } catch (err) {
            console.error('Failed to copy:', err);
            this.showNotification('Please copy manually: ' + text, 'info');
        }

        document.body.removeChild(textarea);
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
        toast.innerHTML = `
            <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info-circle'} me-2"></i>
            ${message}
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Global instance for access from HTML
let orderConfirmation;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    orderConfirmation = new OrderConfirmation();
});
