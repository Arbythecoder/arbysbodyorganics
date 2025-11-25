/**
 * Contact Form Component
 * Handles contact form submission and validation
 */

class ContactForm {
    constructor() {
        this.init();
    }

    /**
     * Initialize contact form
     */
    init() {
        this.setupEventListeners();
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit(e.target);
            });
        }
    }

    /**
     * Handle form submission
     * @param {HTMLFormElement} form - The contact form
     */
    async handleSubmit(form) {
        // Validate form
        if (!this.validateForm(form)) {
            return;
        }

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

        try {
            // In production, send to API
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');

            // Reset form
            form.reset();

        } catch (error) {
            console.error('Contact form error:', error);
            this.showNotification('Error sending message. Please try again.', 'error');
        } finally {
            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    }

    /**
     * Validate contact form
     * @param {HTMLFormElement} form - The form to validate
     * @returns {boolean} True if valid
     */
    validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            }
        });

        // Validate email format
        const emailField = form.querySelector('input[type="email"]');
        if (emailField && !this.isValidEmail(emailField.value)) {
            emailField.classList.add('is-invalid');
            isValid = false;
        }

        if (!isValid) {
            this.showNotification('Please fill in all required fields correctly', 'error');
        }

        return isValid;
    }

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} True if valid email
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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

// Initialize contact form when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});
