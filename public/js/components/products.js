// Product listing functionality
const productsGrid = document.getElementById('products-grid');
const filterButtons = document.querySelectorAll('.product-filters button');

// Product data for Arby's Body Organics
const products = [
    {
        id: 1,
        name: "Organic Face Wash",
        category: "face",
        price: 8500,
        image: "/images/facewash.jpeg",
        description: "Gentle cleansing face wash with natural ingredients for all skin types. Removes dirt and impurities without stripping natural oils."
    },
    {
        id: 2,
        name: "Vitamin C Serum",
        category: "face",
        price: 12000,
        image: "/images/vitcserum.jpeg",
        description: "Brightening Vitamin C serum that fades dark spots, evens skin tone, and gives you a radiant glow."
    },
    {
        id: 3,
        name: "Exfoliating Face & Body Scrub",
        category: "body",
        price: 9500,
        image: "/images/face&bodyscrub.jpeg",
        description: "Natural exfoliating scrub that removes dead skin cells, revealing smooth and glowing skin."
    },
    {
        id: 4,
        name: "Carrot Bar Soap",
        category: "body",
        price: 3500,
        image: "/images/carrotbarsoap.jpeg",
        description: "100% organic carrot soap enriched with vitamin A for bright, even-toned skin. Perfect for daily use."
    },
    {
        id: 5,
        name: "Activated Charcoal Black Soap",
        category: "special",
        price: 4000,
        image: "/images/bar absblack.jpeg",
        description: "Deep cleansing black soap with activated charcoal. Detoxifies skin, fights acne, and controls oil."
    },
    {
        id: 6,
        name: "Asin Face Scrub",
        category: "face",
        price: 7500,
        image: "/images/asinfacescrub.jpeg",
        description: "Gentle facial scrub for sensitive skin. Exfoliates without irritation, leaving skin soft and refreshed."
    },
    {
        id: 7,
        name: "Dark Spot Corrector Cream",
        category: "face",
        price: 13500,
        image: "/images/darkspotcream.jpeg",
        description: "Intensive dark spot treatment that fades hyperpigmentation and evens out skin tone naturally."
    },
    {
        id: 8,
        name: "Balancing Toner",
        category: "face",
        price: 6500,
        image: "/images/toner.jpeg",
        description: "Alcohol-free toner that balances pH, tightens pores, and prepares skin for better product absorption."
    },
    {
        id: 9,
        name: "Acne Fighting Kit",
        category: "special",
        price: 18000,
        image: "/images/acnekit.jpeg",
        description: "Complete acne treatment kit with cleanser, toner, and spot treatment. Your solution for clear skin."
    },
    {
        id: 10,
        name: "Glow Skin Package",
        category: "special",
        price: 22000,
        image: "/images/glowsp.jpeg",
        description: "Ultimate glow bundle with all essentials for radiant skin. Save money with this complete package."
    },
    {
        id: 11,
        name: "Skin Repair Cream",
        category: "face",
        price: 11000,
        image: "/images/skinrepair.jpeg",
        description: "Nourishing repair cream that heals damaged skin, reduces inflammation, and restores natural barrier."
    },
    {
        id: 12,
        name: "Palm Oil Face Treatment",
        category: "face",
        price: 8000,
        image: "/images/palmoilface.jpeg",
        description: "Traditional palm oil-based treatment rich in antioxidants. Anti-aging and deeply moisturizing."
    }
];

// Filter products
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        filterProducts(filter);
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

function filterProducts(category) {
    const filtered = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    displayProducts(filtered);
}

function displayProducts(products) {
    productsGrid.innerHTML = products.map(product => `
        <div class="col-md-4 mb-4">
            <div class="card product-card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="price">₦${product.price.toLocaleString()}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize with all products
displayProducts(products);