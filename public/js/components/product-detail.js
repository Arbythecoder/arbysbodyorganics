// Import utility functions
import { api, formatCurrency, storage } from '../utils/helpers.js';

class ProductDetail {
    constructor() {
        this.productId = new URLSearchParams(window.location.search).get('id');
        this.product = null;
        this.quantity = 1;
        
        this.setupEventListeners();
        this.loadProductDetails();
    }

    setupEventListeners() {
        // Quantity controls
        document.getElementById('decreaseQuantity')?.addEventListener('click', () => this.updateQuantity(-1));
        document.getElementById('increaseQuantity')?.addEventListener('click', () => this.updateQuantity(1));
        document.getElementById('quantity')?.addEventListener('change', (e) => this.setQuantity(e.target.value));

        // Add to cart button
        document.getElementById('addToCart')?.addEventListener('click', () => this.addToCart());

        // Image gallery
        document.querySelectorAll('.thumbnail-image').forEach(thumb => {
            thumb.addEventListener('click', () => this.changeMainImage(thumb.src));
        });
    }

    async loadProductDetails() {
        try {
            // Show loading state
            this.toggleLoading(true);

            // Fetch product details
            // This will be replaced with actual API call
            this.product = {
                id: 1,
                name: "Organic Face Wash",
                price: 24.99,
                originalPrice: 29.99,
                description: "A gentle, natural face wash that cleanses without stripping your skin's natural oils.",
                images: [
                    "/images/facewash.jpeg",
                    "/images/facewash-2.jpeg",
                    "/images/facewash-3.jpeg"
                ],
                ingredients: [
                    "Aloe Vera",
                    "Green Tea Extract",
                    "Chamomile",
                    "Vitamin E"
                ],
                howToUse: "Apply to damp face, massage gently, and rinse thoroughly with warm water.",
                inStock: true
            };

            this.updateUI();
        } catch (error) {
            console.error('Error loading product details:', error);
            this.showError('Failed to load product details. Please try again later.');
        } finally {
            this.toggleLoading(false);
        }
    }

    updateUI() {
        if (!this.product) return;

        // Update page title and meta description
        document.title = `${this.product.name} | Arby's Body Organics`;
        document.querySelector('meta[name="description"]').content = this.product.description;

        // Update breadcrumb
        document.querySelector('.product-name').textContent = this.product.name;

        // Update product details
        document.querySelector('.product-title').textContent = this.product.name;
        document.querySelector('.current-price').textContent = formatCurrency(this.product.price);
        if (this.product.originalPrice) {
            document.querySelector('.original-price').textContent = formatCurrency(this.product.originalPrice);
        }
        document.querySelector('.product-description').textContent = this.product.description;

        // Update main image
        const mainImage = document.getElementById('mainImage');
        mainImage.src = this.product.images[0];
        mainImage.alt = this.product.name;

        // Update thumbnails
        const thumbnailContainer = document.querySelector('.thumbnail-images');
        thumbnailContainer.innerHTML = this.product.images.map(image => `
            <img src="${image}" alt="${this.product.name}" 
                class="thumbnail-image ${image === this.product.images[0] ? 'active' : ''}"
                onclick="changeMainImage('${image}')">
        `).join('');

        // Update tabs content
        document.getElementById('ingredients').innerHTML = `
            <h4 class="mb-4">Natural Ingredients</h4>
            <ul class="ingredients-list">
                ${this.product.ingredients.map(ingredient => `
                    <li>${ingredient}</li>
                `).join('')}
            </ul>
        `;

        document.getElementById('howToUse').innerHTML = `
            <h4 class="mb-4">Instructions</h4>
            <p>${this.product.howToUse}</p>
        `;

        // Update stock status
        this.updateStockStatus();
    }

    updateStockStatus() {
        const stockStatus = document.querySelector('.stock-status');
        if (this.product.inStock) {
            stockStatus.innerHTML = `
                <i class="fas fa-check-circle text-success"></i>
                <span>In Stock</span>
            `;
        } else {
            stockStatus.innerHTML = `
                <i class="fas fa-times-circle text-danger"></i>
                <span>Out of Stock</span>
            `;
            document.getElementById('addToCart').disabled = true;
        }
    }

    updateQuantity(change) {
        const input = document.getElementById('quantity');
        const newValue = parseInt(input.value) + change;
        this.setQuantity(newValue);
    }

    setQuantity(value) {
        const input = document.getElementById('quantity');
        value = parseInt(value);
        if (value < 1) value = 1;
        if (value > 99) value = 99;
        input.value = value;
        this.quantity = value;
    }

    addToCart() {
        if (!this.product) return;

        const cartItem = {
            id: this.product.id,
            name: this.product.name,
            price: this.product.price,
            image: this.product.images[0],
            quantity: this.quantity
        };

        // Dispatch event for cart update
        const event = new CustomEvent('addToCart', { detail: cartItem });
        window.dispatchEvent(event);

        // Show success message
        this.showNotification('Product added to cart successfully!');
    }

    changeMainImage(src) {
        const mainImage = document.getElementById('mainImage');
        const thumbnails = document.querySelectorAll('.thumbnail-image');

        mainImage.src = src;
        thumbnails.forEach(thumb => {
            thumb.classList.toggle('active', thumb.src === src);
        });
    }

    toggleLoading(show) {
        // Implementation for loading state
    }

    showError(message) {
        // Implementation for error messages
    }

    showNotification(message) {
        // Implementation for success messages
    }
}

// Initialize product detail page
document.addEventListener('DOMContentLoaded', () => {
    new ProductDetail();
});