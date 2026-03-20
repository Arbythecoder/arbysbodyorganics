import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const WHATSAPP_NUMBER = '2347067510073';

// ── Guided flow steps ───────────────────────────────────────────────────────
const FLOW = [
  {
    id: 'welcome',
    bot: (name) =>
      name
        ? `Hi ${name}! 👋 I'm your skincare assistant.\n\nI can help with basic guidance and skin type discovery. What would you like today?`
        : `Hi there! 👋 I'm your skincare assistant.\n\nI can help with basic guidance and skin type discovery. What would you like today?`,
    options: [
      { label: '🔍 Find out my skin type', next: 'skin_type_q1' },
      { label: '💆 I have a skin concern', next: 'concern' },
      { label: '📦 Product recommendations', next: 'product_rec' },
      { label: '💬 Just have a question', next: 'free_chat' },
    ],
  },
  {
    id: 'concern',
    bot: () => 'What is your main skin concern right now?',
    options: [
      { label: '🔴 Acne / breakouts', value: 'acne', next: 'concern_response' },
      { label: '🟤 Dark spots / hyperpigmentation', value: 'dark_spots', next: 'concern_response' },
      { label: '🌑 Stretch marks', value: 'stretch_marks', next: 'concern_response' },
      { label: '💧 Dry / dehydrated skin', value: 'dry_skin', next: 'concern_response' },
      { label: '✨ Oily / shiny skin', value: 'oily_skin', next: 'concern_response' },
      { label: '🌸 Sensitive / reactive skin', value: 'sensitive', next: 'concern_response' },
      { label: '🎨 Uneven skin tone', value: 'uneven_tone', next: 'concern_response' },
    ],
  },
  {
    id: 'skin_type_q1',
    bot: () =>
      "Great! Let's figure out your skin type with 3 quick questions.\n\nQ1: How does your face feel by midday — without touching up?",
    options: [
      { label: 'Shiny and greasy all over', value: 'oily', next: 'skin_type_q2' },
      { label: 'Tight and dry, especially cheeks', value: 'dry', next: 'skin_type_q2' },
      { label: 'Oily on forehead/nose, dry on cheeks', value: 'combination', next: 'skin_type_q2' },
      { label: 'Comfortable and balanced', value: 'normal', next: 'skin_type_q2' },
      { label: 'Red or irritated at some point', value: 'sensitive', next: 'skin_type_q2' },
    ],
  },
  {
    id: 'skin_type_q2',
    bot: () =>
      'Q2: What happens 30 minutes after washing your face (no products applied)?',
    options: [
      { label: 'Gets oily and shiny quickly', value: 'oily', next: 'skin_type_q3' },
      { label: 'Still feels tight or flaky', value: 'dry', next: 'skin_type_q3' },
      { label: 'Oily on T-zone, fine on cheeks', value: 'combination', next: 'skin_type_q3' },
      { label: 'Feels normal and comfortable', value: 'normal', next: 'skin_type_q3' },
      { label: 'Sometimes red or sensitive', value: 'sensitive', next: 'skin_type_q3' },
    ],
  },
  {
    id: 'skin_type_q3',
    bot: () => 'Q3: How often do you get breakouts or pimples?',
    options: [
      { label: 'Very often — forehead, nose, chin', value: 'oily', next: 'skin_type_result' },
      { label: 'Rarely, but skin sometimes peels', value: 'dry', next: 'skin_type_result' },
      { label: 'Occasionally, mostly T-zone', value: 'combination', next: 'skin_type_result' },
      { label: 'Rarely or almost never', value: 'normal', next: 'skin_type_result' },
      { label: 'React to products or environment', value: 'sensitive', next: 'skin_type_result' },
    ],
  },
  {
    id: 'product_rec',
    bot: () =>
      "Product recommendations depend on your skin type, concerns, and budget — so they're best done personally.\n\nAbby can give you a curated list tailored specifically to you via WhatsApp. 💚",
    options: [
      { label: '📱 Chat Abby on WhatsApp', action: 'whatsapp_product', next: null },
      { label: '⬅️ Go back', next: 'welcome' },
    ],
  },
  {
    id: 'free_chat',
    bot: () => "Of course! Type your skincare question below and I'll do my best to help. 😊",
    options: null,
  },
];

const CONCERN_RESPONSES = {
  acne: {
    text: "For acne-prone skin, some general tips:\n\n✅ Cleanse twice daily with a gentle, non-comedogenic cleanser\n✅ Don't pick at pimples — it causes dark spots\n✅ Use charcoal or salicylic acid products\n✅ Change your pillowcase regularly\n✅ Reduce sugar and dairy if possible\n\n⚠️ This is general guidance, not medical advice. Severe or painful acne should be reviewed by a dermatologist.",
    concern: 'acne',
  },
  dark_spots: {
    text: "For dark spots and hyperpigmentation:\n\n✅ Vitamin C serum daily — one of the most effective brighteners\n✅ SPF every morning — UV makes dark spots worse\n✅ Niacinamide and kojic acid are great ingredients to look for\n✅ Be patient — fading takes 4–8 weeks of consistency\n✅ Avoid harsh scrubbing on affected areas\n\n⚠️ Persistent or spreading discolouration should be checked professionally.",
    concern: 'dark spots',
  },
  stretch_marks: {
    text: "For stretch marks:\n\n✅ Consistent massage with nourishing oil or cream improves texture over time\n✅ Look for shea butter, rosehip oil, and hyaluronic acid\n✅ Newer marks (pink/red) respond better than older ones (silver)\n✅ Hydration inside and out — drink water and moisturise daily\n✅ This is a 3–6 month journey — stay consistent\n\n💚 Abby went through this personally and knows what works for Nigerian skin.",
    concern: 'stretch marks',
  },
  dry_skin: {
    text: "For dry skin:\n\n✅ Apply moisturiser while skin is still slightly damp to lock in hydration\n✅ Use a gentle, creamy cleanser — avoid foaming soaps\n✅ Add hyaluronic acid serum under your moisturiser\n✅ Drink at least 8 glasses of water daily\n✅ Avoid long hot showers — they strip natural oils",
    concern: 'dry skin',
  },
  oily_skin: {
    text: "For oily skin:\n\n✅ Don't over-cleanse — twice daily is enough. Over-washing makes skin produce more oil\n✅ Use a lightweight, oil-free moisturiser — even oily skin needs moisture\n✅ Clay or charcoal masks once a week\n✅ A balancing toner helps tighten pores\n✅ Blotting papers during the day are your friend",
    concern: 'oily skin',
  },
  sensitive: {
    text: "For sensitive skin:\n\n✅ Always patch test before using any new product\n✅ Fragrance-free, hypoallergenic formulas only\n✅ Minimal ingredient lists are better\n✅ Introduce one product at a time so you can identify reactions\n✅ Avoid physical scrubs — use gentle chemical exfoliants instead\n\n⚠️ Persistent redness or rashes should be seen by a dermatologist.",
    concern: 'sensitive skin',
  },
  uneven_tone: {
    text: "For uneven skin tone:\n\n✅ Vitamin C serum daily is key\n✅ SPF every morning protects against further darkening\n✅ Niacinamide evens out discolouration over time\n✅ Gentle exfoliation 2–3x per week removes dull skin cells\n✅ Results show after 4–6 weeks of consistency",
    concern: 'uneven skin tone',
  },
};

const SKIN_TYPE_RESULT = {
  oily: {
    label: 'Oily Skin',
    emoji: '💦',
    text: "Based on your answers, you likely have Oily Skin.\n\nYour skin produces more sebum than it needs, causing shine and occasional breakouts.\n\nWhat helps:\n✅ Gel or foam cleanser\n✅ Lightweight, oil-free moisturiser\n✅ Balancing toner\n✅ Clay or charcoal masks weekly\n\n💡 The goal is to balance oil — not strip it completely.",
  },
  dry: {
    label: 'Dry Skin',
    emoji: '🏜️',
    text: "Based on your answers, you likely have Dry Skin.\n\nYour skin doesn't produce enough oil, leading to tightness and flakiness.\n\nWhat helps:\n✅ Creamy, gentle cleanser\n✅ Hyaluronic acid serum\n✅ Rich moisturiser — never skip it\n✅ Avoid hot water when washing\n\n💡 Moisturise on damp skin to lock in hydration.",
  },
  combination: {
    label: 'Combination Skin',
    emoji: '⚖️',
    text: "Based on your answers, you likely have Combination Skin.\n\nYour T-zone (forehead, nose, chin) is oily while cheeks are normal or dry.\n\nWhat helps:\n✅ Gentle cleanser for the whole face\n✅ Lighter moisturiser on T-zone\n✅ Richer cream on drier areas\n✅ Targeted treatments per zone\n\n💡 You may need different products for different areas.",
  },
  normal: {
    label: 'Normal Skin',
    emoji: '🌟',
    text: "Based on your answers, you likely have Normal Skin.\n\nYour skin is well-balanced — not too oily or too dry.\n\nWhat helps:\n✅ Light to medium moisturiser\n✅ SPF every morning\n✅ Antioxidant serum for protection\n✅ Consistency is your biggest tool\n\n💡 Your goal is to maintain the balance you already have.",
  },
  sensitive: {
    label: 'Sensitive Skin',
    emoji: '🌸',
    text: "Based on your answers, you likely have Sensitive Skin.\n\nYour skin reacts easily to products, weather, or stress.\n\nWhat helps:\n✅ Patch test every new product\n✅ Fragrance-free products only\n✅ Fewer ingredients = better\n✅ Introduce products one at a time\n\n⚠️ Persistent redness or rashes should be seen by a dermatologist.",
  },
};

const KEYWORD_RESPONSES = [
  { keywords: ['acne', 'pimple', 'breakout', 'zit'], response: CONCERN_RESPONSES.acne.text },
  { keywords: ['dark spot', 'hyperpigmentation', 'discolor'], response: CONCERN_RESPONSES.dark_spots.text },
  { keywords: ['stretch mark', 'striae'], response: CONCERN_RESPONSES.stretch_marks.text },
  { keywords: ['dry skin', 'dehydrated', 'flaky', 'tight skin'], response: CONCERN_RESPONSES.dry_skin.text },
  { keywords: ['oily skin', 'greasy', 'excess oil'], response: CONCERN_RESPONSES.oily_skin.text },
  {
    keywords: ['price', 'cost', 'how much'],
    response: 'Our products range from ₦3,500 to ₦22,000.\n\nBudget picks start at ₦3,500. Kits range from ₦18,000–₦22,000.\n\nFREE shipping over ₦20,000! Visit the Products page to browse.',
  },
  {
    keywords: ['delivery', 'shipping', 'how long'],
    response: 'We deliver nationwide!\n\n🚚 Lagos: 1–2 days\n🚚 Major cities: 2–4 days\n🚚 Remote areas: 4–7 days\n\nShipping: ₦2,000 (FREE over ₦20,000)',
  },
];

const getMostCommon = (arr) => {
  const counts = arr.reduce((acc, v) => { acc[v] = (acc[v] || 0) + 1; return acc; }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
};

const Chatbot = () => {
  const { getFirstName } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [skinAnswers, setSkinAnswers] = useState([]);
  const [concern, setConcern] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcome = FLOW.find((f) => f.id === 'welcome');
      setMessages([{ type: 'bot', text: welcome.bot(getFirstName()), options: welcome.options }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBot = (text, options = null) =>
    setMessages((prev) => [...prev, { type: 'bot', text, options }]);

  const addUser = (text) =>
    setMessages((prev) => [...prev, { type: 'user', text }]);

  const handleOption = (option) => {
    addUser(option.label);

    // Open WhatsApp
    if (option.action === 'whatsapp_product' || option.action === 'whatsapp_handoff') {
      const skinType = skinAnswers.length > 0 ? SKIN_TYPE_RESULT[getMostCommon(skinAnswers)]?.label : '';
      const parts = [
        'Hi Abby, I just used the skincare assistant on your website and I would like your help.',
        skinType ? `My likely skin type is ${skinType}.` : '',
        concern ? `My main concern is ${concern}.` : '',
        'Please guide me on the best products and next steps.',
      ].filter(Boolean);
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(parts.join(' '))}`;
      setTimeout(() => {
        window.open(url, '_blank');
        addBot(
          "WhatsApp is opening now! 💬\n\nYour skin context has been pre-filled in the message — just hit Send and Abby will reply as soon as she can. 🌿"
        );
      }, 300);
      return;
    }

    if (option.action === 'open_url') {
      window.open(option.url, '_blank');
      return;
    }

    // Skin type quiz accumulation
    if (option.value && ['skin_type_q2', 'skin_type_q3', 'skin_type_result'].includes(option.next)) {
      const newAnswers = [...skinAnswers, option.value];
      setSkinAnswers(newAnswers);

      if (option.next === 'skin_type_result') {
        const result = getMostCommon(newAnswers);
        const info = SKIN_TYPE_RESULT[result];
        setTimeout(() => {
          addBot(
            `${info.emoji} ${info.text}\n\n⚠️ This is general guidance based on your answers, not a medical diagnosis.\n\nWant personalised product recommendations for your ${info.label}?`,
            [
              { label: '💬 Chat Abby for personal recommendations', action: 'whatsapp_handoff', next: null },
              { label: '⬅️ Back to main menu', next: 'welcome' },
            ]
          );
        }, 400);
        return;
      }
    }

    // Concern handling
    if (option.next === 'concern_response' && option.value) {
      const info = CONCERN_RESPONSES[option.value];
      setConcern(info.concern);
      setTimeout(() => {
        addBot(
          `${info.text}\n\nWant personalised product recommendations from Abby directly?`,
          [
            { label: '💬 Chat Abby on WhatsApp', action: 'whatsapp_handoff', next: null },
            { label: '⬅️ Back to main menu', next: 'welcome' },
          ]
        );
      }, 400);
      return;
    }

    // Navigate to next flow step
    if (option.next) {
      const nextStep = FLOW.find((f) => f.id === option.next);
      if (nextStep) {
        setTimeout(() => addBot(nextStep.bot(getFirstName()), nextStep.options), 400);
      }
    }
  };

  const handleFreeText = () => {
    const msg = inputValue.trim();
    if (!msg) return;
    addUser(msg);
    setInputValue('');

    const lower = msg.toLowerCase();
    let matched = false;
    for (const r of KEYWORD_RESPONSES) {
      if (r.keywords.some((k) => lower.includes(k))) {
        setTimeout(() => {
          addBot(r.response, [
            { label: '💬 Chat Abby for personal help', action: 'whatsapp_handoff', next: null },
            { label: '⬅️ Main menu', next: 'welcome' },
          ]);
        }, 400);
        matched = true;
        break;
      }
    }

    if (!matched) {
      setTimeout(() => {
        addBot(
          "I'm not sure about that one, but Abby can definitely help! 😊\n\nFor questions like yours, chatting her directly on WhatsApp is the best way to get a proper answer.",
          [
            { label: '💬 Chat Abby on WhatsApp', action: 'whatsapp_handoff', next: null },
            { label: '⬅️ Main menu', next: 'welcome' },
          ]
        );
      }, 400);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setSkinAnswers([]);
    setConcern(null);
    const welcome = FLOW.find((f) => f.id === 'welcome');
    setTimeout(() => setMessages([{ type: 'bot', text: welcome.bot(getFirstName()), options: welcome.options }]), 100);
  };

  const lastBotMsg = [...messages].reverse().find((m) => m.type === 'bot');
  const currentOptions = lastBotMsg?.options ?? null;

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-xl hover:bg-green-700 transition z-50 flex items-center gap-2"
          aria-label="Open skincare assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="text-sm font-semibold hidden sm:inline">Skin Help</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[360px] sm:w-96 h-[560px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-white px-4 py-3 flex justify-between items-center flex-shrink-0">
            <div>
              <h3 className="font-bold text-sm">Arby's Skincare Assistant</h3>
              <p className="text-xs text-green-200">General guidance · Not medical advice</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={resetChat} className="text-green-200 hover:text-white text-xs px-2 py-1 border border-green-300/30 rounded hover:border-white/60 transition">
                Restart
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-white/20 hover:bg-red-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center transition-colors text-base leading-none"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.type === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0 mt-1">A</div>
                )}
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${
                  msg.type === 'user'
                    ? 'bg-primary text-white rounded-br-sm'
                    : 'bg-white text-gray-800 shadow-sm rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Options or text input */}
          <div className="p-3 border-t bg-white flex-shrink-0">
            {currentOptions && currentOptions.length > 0 ? (
              <div className="space-y-1.5 max-h-44 overflow-y-auto">
                {currentOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleOption(opt)}
                    className="w-full text-left text-sm px-3 py-2 rounded-lg border border-gray-200 hover:border-primary hover:bg-green-50 transition text-gray-700"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleFreeText()}
                  placeholder="Type your question…"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button onClick={handleFreeText} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium">
                  Send
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
