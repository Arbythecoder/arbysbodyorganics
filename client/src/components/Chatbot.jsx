import { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi! I'm your skincare assistant! 😊 Ask me about acne, dark spots, stretch marks, or skincare routines!",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const responses = [
    {
      keywords: ['acne', 'pimple', 'breakout', 'spots', 'zit'],
      response: `Hello! 😊 For acne treatment, I recommend:

1. **Activated Charcoal Black Soap (₦4,000)** - Deep cleansing to fight acne
2. **Acne Fighting Kit (₦18,000)** - Complete solution

💡 **Quick Tips:**
- Cleanse twice daily
- Don't pick at pimples
- Stay hydrated
- Avoid oily makeup

Visit our Products page to order!`,
    },
    {
      keywords: ['dark spot', 'hyperpigmentation', 'discoloration', 'uneven skin', 'marks'],
      response: `I understand! Dark spots are my specialty! 💫

**Founder Abigail's Recommendation:**
1. **Vitamin C Serum (₦12,000)** - Fades dark spots
2. **Dark Spot Corrector Cream (₦13,500)** - Targets stubborn marks
3. **Carrot Bar Soap (₦3,500)** - Evens skin tone

⚠️ **Important:** Avoid harsh chemicals! Use sunscreen daily.

These products helped me heal from hyperpigmentation!`,
    },
    {
      keywords: ['stretch mark', 'stretch', 'striae'],
      response: `Stretch marks are close to my heart! I struggled with them too. 💚

**My Personal Recommendation:**
1. **Skin Repair Cream (₦11,000)** - Heals and restores
2. **Palm Oil Face Treatment (₦8,000)** - Deeply moisturizing

🌿 **Natural Healing:**
- Massage daily in circular motions
- Stay patient - healing takes time
- Drink lots of water
- Use consistently for 3-6 months`,
    },
    {
      keywords: ['dry skin', 'dehydrated', 'flaky', 'tight', 'moisture'],
      response: `Dry skin needs hydration! 💧

**Perfect Combo:**
1. **Organic Face Wash (₦8,500)** - Won't strip natural oils
2. **Vitamin C Serum (₦12,000)** - Hydrates and brightens
3. **Skin Repair Cream (₦11,000)** - Locks in moisture

💦 **Tips:** Drink 8 glasses of water daily, use lukewarm water, moisturize twice daily`,
    },
    {
      keywords: ['oily skin', 'greasy', 'shine', 'excess oil'],
      response: `Oily skin needs balance! ⚖️

**My Solution:**
1. **Activated Charcoal Black Soap (₦4,000)** - Controls oil
2. **Balancing Toner (₦6,500)** - Tightens pores
3. **Asin Face Scrub (₦7,500)** - Gentle exfoliation

✨ Don't over-cleanse - 2x daily is enough!`,
    },
    {
      keywords: ['routine', 'start', 'begin', 'regimen', 'steps'],
      response: `Let's build your routine! 📋

**Morning:**
1. Cleanse - Face Wash
2. Tone - Balancing Toner
3. Treat - Vitamin C Serum
4. Moisturize - Repair Cream

**Night:**
Same routine + add targeted treatments

Start simple and be consistent!`,
    },
    {
      keywords: ['price', 'cost', 'how much', 'expensive', 'cheap'],
      response: `Our products range from ₦3,500 to ₦22,000! 💰

**Budget-Friendly:**
- Carrot Bar Soap: ₦3,500
- Charcoal Black Soap: ₦4,000

**Best Value:**
- Acne Fighting Kit: ₦18,000
- Glow Skin Package: ₦22,000

FREE shipping over ₦20,000! Visit Products page.`,
    },
    {
      keywords: ['organic', 'natural', 'chemical', 'ingredients'],
      response: `100% Organic & Chemical-Free! 🌿

**What's Inside:**
- Natural plant extracts
- Pure essential oils
- No parabens
- No sulfates
- No harsh chemicals

Safe for Nigerian skin, made with love in Nigeria!`,
    },
    {
      keywords: ['delivery', 'shipping', 'how long', 'location'],
      response: `We deliver nationwide! 🚚

**Delivery Time:**
- Lagos: 1-2 days
- Major cities: 2-4 days
- Remote areas: 4-7 days

**Shipping:**
- ₦2,000 (FREE over ₦20,000)

We're based in Lagos but ship everywhere in Nigeria!`,
    },
    {
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
      response: `Hello! Welcome to Arby's Body Organics! 👋

I'm here to help you find the perfect skincare solution!

Ask me about:
- Acne treatment
- Dark spots
- Stretch marks
- Dry/oily skin
- Skincare routines
- Prices & delivery

What can I help you with today?`,
    },
  ];

  const generateResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    for (const responseData of responses) {
      const hasMatch = responseData.keywords.some((keyword) =>
        message.includes(keyword)
      );

      if (hasMatch) {
        return responseData.response;
      }
    }

    return `I'm not sure about that, but I'd love to help! 🤔

Try asking me about:
- Acne or breakouts
- Dark spots or hyperpigmentation
- Stretch marks
- Dry or oily skin
- Skincare routines
- Prices and delivery

Or contact us directly:
📧 info@arbysbodyorganics.com
📱 WhatsApp: +234 123 456 7890`;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { type: 'user', text: inputValue };
    setMessages((prev) => [...prev, userMessage]);

    // Generate bot response
    const botResponse = generateResponse(inputValue);
    const botMessage = { type: 'bot', text: botResponse };

    setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition z-50"
          aria-label="Open chatbot"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-primary text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-bold">Skincare Assistant</h3>
              <p className="text-xs">Ask me anything! 😊</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line ${
                    message.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-800 shadow'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about skincare..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleSend}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
