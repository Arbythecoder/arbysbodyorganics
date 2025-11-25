/**
 * ===================================================================
 * SIMPLE AI SKIN CHATBOT - LEARNING VERSION
 * ===================================================================
 *
 * This chatbot helps customers get skincare advice without needing
 * a real AI service. It uses simple pattern matching and pre-written
 * responses. This is 100% FREE - no API costs!
 *
 * HOW IT WORKS:
 * 1. User types a question (e.g., "How to treat acne?")
 * 2. We search for keywords in their question (e.g., "acne")
 * 3. We return a pre-written answer about acne
 * 4. If we don't understand, we suggest contacting you
 *
 * LEARNING POINTS:
 * - This runs entirely in the browser (frontend only)
 * - No backend needed for now
 * - You can add more responses easily
 * - Later, you can upgrade to real AI when you have budget
 * ===================================================================
 */

class SkinCareChatbot {
    constructor() {
        // Store conversation history
        this.conversationHistory = [];

        // Pre-written responses database
        // Each response has keywords and an answer
        this.responses = this.initializeResponses();

        // Initialize the chatbot when page loads
        this.init();
    }

    /**
     * Set up all the pre-written responses
     * LEARNING: This is where you add your skincare knowledge!
     */
    initializeResponses() {
        return [
            // ACNE RESPONSES
            {
                keywords: ['acne', 'pimple', 'breakout', 'spots', 'zit'],
                response: `Hello! 😊 For acne treatment, I recommend:

1. **Activated Charcoal Black Soap (₦4,000)** - Deep cleansing to fight acne
2. **Acne Fighting Kit (₦18,000)** - Complete solution with cleanser, toner, and spot treatment

💡 **Quick Tips:**
- Cleanse twice daily
- Don't pick at pimples
- Stay hydrated
- Avoid oily makeup

Would you like to see these products?`,
                products: ['Activated Charcoal Black Soap', 'Acne Fighting Kit']
            },

            // DARK SPOTS / HYPERPIGMENTATION
            {
                keywords: ['dark spot', 'hyperpigmentation', 'discoloration', 'uneven skin', 'spots', 'marks'],
                response: `I understand! Dark spots and hyperpigmentation are my specialty! 💫

**Founder Abigail's Recommendation:**
1. **Vitamin C Serum (₦12,000)** - Fades dark spots and brightens
2. **Dark Spot Corrector Cream (₦13,500)** - Targets stubborn marks
3. **Carrot Bar Soap (₦3,500)** - Vitamin A for even tone

⚠️ **Important:** Avoid harsh chemicals! Use sunscreen daily.

These products helped me heal from my own hyperpigmentation journey. Want to order?`,
                products: ['Vitamin C Serum', 'Dark Spot Corrector Cream', 'Carrot Bar Soap']
            },

            // STRETCH MARKS
            {
                keywords: ['stretch mark', 'stretch', 'marks', 'striae'],
                response: `Stretch marks are close to my heart! I struggled with them too. 💚

**My Personal Recommendation:**
1. **Skin Repair Cream (₦11,000)** - Heals and restores skin barrier
2. **Palm Oil Face Treatment (₦8,000)** - Rich in antioxidants, deeply moisturizing

🌿 **Natural Healing:**
- Massage daily in circular motions
- Stay patient - natural healing takes time
- Drink lots of water
- Use consistently for 3-6 months

Ready to start your healing journey?`,
                products: ['Skin Repair Cream', 'Palm Oil Face Treatment']
            },

            // DRY SKIN
            {
                keywords: ['dry skin', 'dehydrated', 'flaky', 'tight', 'moisture'],
                response: `Dry skin needs hydration and nourishment! 💧

**Perfect Combo:**
1. **Organic Face Wash (₦8,500)** - Won't strip natural oils
2. **Vitamin C Serum (₦12,000)** - Hydrates and brightens
3. **Skin Repair Cream (₦11,000)** - Locks in moisture

💦 **Hydration Tips:**
- Drink 8 glasses of water daily
- Use lukewarm water (not hot)
- Apply products on damp skin
- Moisturize twice daily

Should I help you order these?`,
                products: ['Organic Face Wash', 'Vitamin C Serum', 'Skin Repair Cream']
            },

            // OILY SKIN
            {
                keywords: ['oily skin', 'greasy', 'shine', 'excess oil'],
                response: `Oily skin needs balance, not harsh stripping! ⚖️

**My Solution:**
1. **Activated Charcoal Black Soap (₦4,000)** - Controls oil naturally
2. **Balancing Toner (₦6,500)** - Tightens pores, balances pH
3. **Asin Face Scrub (₦7,500)** - Gentle exfoliation

✨ **Balance Tips:**
- Don't over-cleanse (2x daily is enough)
- Use oil-free moisturizer
- Blot, don't wash during the day
- Avoid harsh alcohol-based products

Want to try this routine?`,
                products: ['Activated Charcoal Black Soap', 'Balancing Toner', 'Asin Face Scrub']
            },

            // GENERAL SKINCARE ROUTINE
            {
                keywords: ['routine', 'start', 'begin', 'regimen', 'steps'],
                response: `Great question! Let's build your basic routine! 📋

**Morning Routine:**
1. Cleanse - Face Wash
2. Tone - Balancing Toner
3. Treat - Vitamin C Serum
4. Moisturize - Skin Repair Cream

**Night Routine:**
1. Cleanse - Face Wash
2. Tone - Balancing Toner
3. Treat - Dark Spot Corrector (if needed)
4. Moisturize - Skin Repair Cream

🎁 **Glow Skin Package (₦22,000)** - Complete bundle with savings!

Would you like personalized recommendations? Take our **AI Skin Quiz**!`,
                products: ['Glow Skin Package']
            },

            // SENSITIVE SKIN
            {
                keywords: ['sensitive', 'irritated', 'reactive', 'allergic', 'burning'],
                response: `Sensitive skin needs extra gentle care! 🌸

**Gentle Options:**
1. **Asin Face Scrub (₦7,500)** - Super gentle exfoliation
2. **Organic Face Wash (₦8,500)** - No harsh chemicals
3. **Skin Repair Cream (₦11,000)** - Soothes irritation

⚠️ **Sensitive Skin Rules:**
- Patch test everything first!
- Introduce one product at a time
- Avoid fragrances and alcohol
- Use lukewarm water only

100% natural and organic - safe for you!`,
                products: ['Asin Face Scrub', 'Organic Face Wash', 'Skin Repair Cream']
            },

            // PRICING QUESTIONS
            {
                keywords: ['price', 'cost', 'how much', 'expensive', 'cheap', 'budget'],
                response: `Our products range from ₦3,500 to ₦22,000! 💰

**Budget-Friendly:**
- Carrot Bar Soap - ₦3,500
- Activated Charcoal Soap - ₦4,000

**Mid-Range:**
- Face Wash - ₦8,500
- Toner - ₦6,500
- Scrubs - ₦7,500-₦9,500

**Premium Care:**
- Serums - ₦12,000
- Treatment Creams - ₦11,000-₦13,500

**Best Value:**
- Glow Package - ₦22,000 (save money!)
- Acne Kit - ₦18,000 (complete solution)

🚚 **Free shipping over ₦20,000!**

What's your budget range?`,
                products: []
            },

            // SHIPPING QUESTIONS
            {
                keywords: ['shipping', 'delivery', 'ship', 'deliver', 'location'],
                response: `We deliver across Nigeria! 🇳🇬

**Shipping Details:**
- Lagos: 1-2 business days
- Major Cities: 2-3 business days
- Other Areas: 3-5 business days

💸 **Shipping Cost:**
- FREE on orders over ₦20,000
- ₦2,000 on orders below ₦20,000

📦 We use reliable courier services and track all deliveries!

Ready to place your order?`,
                products: []
            },

            // GREETING
            {
                keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
                response: `Hello! Welcome to Arby's Body Organics! 👋

I'm your skincare assistant. I can help you with:
- Product recommendations
- Skincare advice for acne, dark spots, stretch marks
- Building a routine
- Pricing and shipping info

What would you like to know today? 😊`,
                products: []
            }
        ];
    }

    /**
     * Initialize the chatbot interface
     * LEARNING: This sets up the chat widget on your page
     */
    init() {
        // Create chat widget HTML
        this.createChatWidget();

        // Set up event listeners (when user clicks buttons)
        this.setupEventListeners();

        // Show welcome message
        this.showWelcomeMessage();
    }

    /**
     * Create the chat widget HTML
     * LEARNING: This builds the visual chat box
     */
    createChatWidget() {
        const chatHTML = `
            <!-- Chat Widget -->
            <div id="chatbot-widget" class="chatbot-widget">
                <!-- Chat Button (minimized) -->
                <button id="chat-toggle-btn" class="chat-toggle-btn">
                    <i class="bi bi-chat-dots-fill"></i>
                    <span class="chat-badge">1</span>
                </button>

                <!-- Chat Window (expanded) -->
                <div id="chat-window" class="chat-window" style="display: none;">
                    <!-- Chat Header -->
                    <div class="chat-header">
                        <div class="d-flex align-items-center">
                            <img src="/images/mod-absbrown.jpeg" alt="Arby" class="chat-avatar me-2">
                            <div>
                                <h6 class="mb-0">Arby's Skin Assistant</h6>
                                <small class="text-white-50">Online now</small>
                            </div>
                        </div>
                        <button id="chat-close-btn" class="btn-close btn-close-white"></button>
                    </div>

                    <!-- Chat Messages -->
                    <div id="chat-messages" class="chat-messages">
                        <!-- Messages appear here -->
                    </div>

                    <!-- Chat Input -->
                    <div class="chat-input">
                        <input
                            type="text"
                            id="chat-input-field"
                            class="form-control"
                            placeholder="Ask me anything about skincare..."
                            autocomplete="off"
                        >
                        <button id="chat-send-btn" class="btn btn-primary">
                            <i class="bi bi-send-fill"></i>
                        </button>
                    </div>

                    <!-- Quick Suggestions -->
                    <div class="quick-suggestions">
                        <button class="suggestion-btn" data-query="How to treat acne?">Treat Acne</button>
                        <button class="suggestion-btn" data-query="Products for dark spots">Dark Spots</button>
                        <button class="suggestion-btn" data-query="Skincare routine">My Routine</button>
                    </div>
                </div>
            </div>
        `;

        // Add to page
        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    /**
     * Set up event listeners
     * LEARNING: This makes buttons actually work when clicked
     */
    setupEventListeners() {
        // Toggle chat open/close
        document.getElementById('chat-toggle-btn').addEventListener('click', () => {
            this.toggleChat();
        });

        document.getElementById('chat-close-btn').addEventListener('click', () => {
            this.toggleChat();
        });

        // Send message when Enter key pressed
        document.getElementById('chat-input-field').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleUserMessage();
            }
        });

        // Send message when button clicked
        document.getElementById('chat-send-btn').addEventListener('click', () => {
            this.handleUserMessage();
        });

        // Quick suggestion buttons
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const query = e.target.getAttribute('data-query');
                document.getElementById('chat-input-field').value = query;
                this.handleUserMessage();
            });
        });
    }

    /**
     * Toggle chat window open/closed
     * LEARNING: Shows or hides the chat window
     */
    toggleChat() {
        const chatWindow = document.getElementById('chat-window');
        const chatBadge = document.querySelector('.chat-badge');

        if (chatWindow.style.display === 'none') {
            chatWindow.style.display = 'flex';
            chatBadge.style.display = 'none';
        } else {
            chatWindow.style.display = 'none';
        }
    }

    /**
     * Show welcome message when chat opens
     * LEARNING: Greets the user automatically
     */
    showWelcomeMessage() {
        setTimeout(() => {
            this.addMessage(
                'bot',
                `Hello! I'm Arby's Skin Assistant! 💚\n\nI can help you find the perfect products for:\n- Acne & Breakouts\n- Dark Spots & Hyperpigmentation\n- Stretch Marks\n- Dry or Oily Skin\n\nWhat can I help you with today?`
            );
        }, 1000);
    }

    /**
     * Handle when user sends a message
     * LEARNING: This processes what the user typed
     */
    handleUserMessage() {
        const inputField = document.getElementById('chat-input-field');
        const userMessage = inputField.value.trim();

        // Don't send empty messages
        if (!userMessage) return;

        // Show user's message
        this.addMessage('user', userMessage);

        // Clear input field
        inputField.value = '';

        // Show "typing..." indicator
        this.showTypingIndicator();

        // Wait 1.5 seconds (looks more human)
        setTimeout(() => {
            this.hideTypingIndicator();

            // Get bot response
            const botResponse = this.generateResponse(userMessage);
            this.addMessage('bot', botResponse);
        }, 1500);
    }

    /**
     * Generate bot response based on user message
     * LEARNING: This is the "brain" - matches keywords to responses
     */
    generateResponse(userMessage) {
        // Convert to lowercase for easier matching
        const message = userMessage.toLowerCase();

        // Try to find matching response
        for (const responseData of this.responses) {
            // Check if any keyword matches
            const hasMatch = responseData.keywords.some(keyword =>
                message.includes(keyword)
            );

            if (hasMatch) {
                return responseData.response;
            }
        }

        // If no match found, return default response
        return this.getDefaultResponse();
    }

    /**
     * Default response when bot doesn't understand
     * LEARNING: Fallback when no keywords match
     */
    getDefaultResponse() {
        return `I'm not sure I understand that question, but I'd love to help! 🤔

Try asking me about:
- Acne treatment
- Dark spots and hyperpigmentation
- Stretch marks
- Skincare routines
- Product prices
- Shipping information

Or take our **AI Skin Quiz** for personalized recommendations!

You can also **WhatsApp Abigail directly** at [Your Number] for detailed advice! 📱`;
    }

    /**
     * Add message to chat
     * LEARNING: Displays message in the chat window
     */
    addMessage(sender, text) {
        const messagesContainer = document.getElementById('chat-messages');

        const messageHTML = `
            <div class="chat-message ${sender}-message">
                ${sender === 'bot' ? '<img src="/images/mod-absbrown.jpeg" alt="Bot" class="message-avatar">' : ''}
                <div class="message-bubble">
                    ${text.replace(/\n/g, '<br>')}
                </div>
            </div>
        `;

        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);

        // Auto-scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    /**
     * Show typing indicator
     * LEARNING: Shows "..." when bot is "thinking"
     */
    showTypingIndicator() {
        const messagesContainer = document.getElementById('chat-messages');

        const typingHTML = `
            <div class="chat-message bot-message typing-indicator" id="typing-indicator">
                <img src="/images/mod-absbrown.jpeg" alt="Bot" class="message-avatar">
                <div class="message-bubble">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;

        messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    /**
     * Hide typing indicator
     * LEARNING: Removes the "..." animation
     */
    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
}

// ===================================================================
// INITIALIZE CHATBOT WHEN PAGE LOADS
// LEARNING: This starts everything automatically
// ===================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Create new chatbot instance
    const chatbot = new SkinCareChatbot();

    console.log('✅ Chatbot loaded successfully!');
});
