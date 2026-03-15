import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const WHATSAPP_NUMBER = '2347067510073';

const CONSULTATION_TYPES = [
  {
    id: 'skin-analysis',
    label: 'Basic Skin Analysis',
    description: 'Find out your exact skin type and what it needs',
    price: 2000,
    duration: '20 mins via WhatsApp',
    emoji: '🔬',
  },
  {
    id: 'product-recommendation',
    label: 'Personal Product Recommendation',
    description: 'Get a curated product list tailored to your skin goals',
    price: 3500,
    duration: '30 mins via WhatsApp',
    emoji: '📦',
  },
  {
    id: 'full-routine',
    label: 'Full Skincare Routine',
    description: 'Morning + night routine designed for your skin type and budget',
    price: 5000,
    duration: '45 mins via WhatsApp',
    emoji: '🌙',
  },
  {
    id: 'acne-treatment',
    label: 'Acne Treatment Plan',
    description: 'Targeted plan for acne-prone skin — products + lifestyle guidance',
    price: 5000,
    duration: '45 mins via WhatsApp',
    emoji: '🧴',
  },
  {
    id: 'hyperpigmentation',
    label: 'Hyperpigmentation Plan',
    description: 'Structured plan to fade dark spots and even out skin tone',
    price: 5000,
    duration: '45 mins via WhatsApp',
    emoji: '✨',
  },
  {
    id: 'stretch-marks',
    label: 'Stretch Marks Recovery',
    description: 'Targeted recovery plan from someone who has been through it',
    price: 5000,
    duration: '45 mins via WhatsApp',
    emoji: '💚',
  },
];

// Quick skin type discovery quiz
const SKIN_QUIZ = [
  {
    id: 'q1',
    question: 'How does your skin usually feel by midday?',
    options: [
      { label: 'Shiny and oily all over', value: 'oily' },
      { label: 'Tight and dry, especially cheeks', value: 'dry' },
      { label: 'Oily on forehead/nose, dry on cheeks', value: 'combination' },
      { label: 'Comfortable and balanced', value: 'normal' },
      { label: 'Red, itchy or irritated', value: 'sensitive' },
    ],
  },
  {
    id: 'q2',
    question: 'What does your skin look like 30 minutes after washing?',
    options: [
      { label: 'Already oily and shiny', value: 'oily' },
      { label: 'Still feels tight and dry', value: 'dry' },
      { label: 'Normal but T-zone gets oily', value: 'combination' },
      { label: 'Looks normal and comfortable', value: 'normal' },
      { label: 'Sometimes red or reactive', value: 'sensitive' },
    ],
  },
  {
    id: 'q3',
    question: 'How often do you get breakouts?',
    options: [
      { label: 'Very often, especially on forehead and nose', value: 'oily' },
      { label: 'Rarely, but skin peels sometimes', value: 'dry' },
      { label: 'Sometimes on the T-zone only', value: 'combination' },
      { label: 'Rarely or almost never', value: 'normal' },
      { label: 'Get reactions to many products', value: 'sensitive' },
    ],
  },
];

const SKIN_TYPE_INFO = {
  oily: {
    label: 'Oily Skin',
    emoji: '💦',
    description:
      'Your skin produces excess sebum, making it look shiny. You benefit from lightweight, non-comedogenic products and gentle cleansers that balance oil without stripping.',
    tips: ['Cleanse twice daily', 'Use a balancing toner', 'Light gel moisturiser', 'Clay masks weekly'],
  },
  dry: {
    label: 'Dry Skin',
    emoji: '🏜️',
    description:
      'Your skin produces less oil than it needs, leading to tightness and flakiness. You benefit from rich moisturisers, hydrating serums, and gentle, creamy cleansers.',
    tips: ['Never skip moisturiser', 'Use hydrating serums', 'Avoid harsh soaps', 'Drink lots of water'],
  },
  combination: {
    label: 'Combination Skin',
    emoji: '⚖️',
    description:
      'Your T-zone (forehead, nose, chin) tends to be oily while your cheeks are normal or dry. You need products that balance both areas.',
    tips: ['Gentle cleanser for the whole face', 'Lighter moisturiser on T-zone', 'Richer cream on cheeks', 'Targeted treatments per zone'],
  },
  normal: {
    label: 'Normal Skin',
    emoji: '🌟',
    description:
      'Your skin is well-balanced — not too oily or too dry. You have a simple job: maintain this balance with gentle, consistent care.',
    tips: ['Consistent routine is key', 'SPF every morning', 'Light to medium moisturiser', 'Antioxidant serums for protection'],
  },
  sensitive: {
    label: 'Sensitive Skin',
    emoji: '🌸',
    description:
      'Your skin reacts easily to products, weather changes, or stress. You need fragrance-free, minimal-ingredient products and patch tests before using anything new.',
    tips: ['Patch test everything new', 'Fragrance-free products only', 'Minimal ingredient lists', 'Avoid harsh exfoliants'],
  },
};

const Consultation = () => {
  const [selected, setSelected] = useState(null);
  const [quizStep, setQuizStep] = useState(null); // null = not started, 0-2 = questions, 'result' = done
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [skinType, setSkinType] = useState(null);
  const { user, getFirstName } = useAuth();
  const navigate = useNavigate();

  const startQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setSkinType(null);
  };

  const answerQuestion = (value) => {
    const newAnswers = [...quizAnswers, value];
    setQuizAnswers(newAnswers);

    if (quizStep < SKIN_QUIZ.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Calculate most common answer
      const counts = newAnswers.reduce((acc, v) => {
        acc[v] = (acc[v] || 0) + 1;
        return acc;
      }, {});
      const result = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      setSkinType(result);
      setQuizStep('result');
    }
  };

  const getWhatsappLink = (consultType) => {
    const firstName = getFirstName();
    const concern = selected ? CONSULTATION_TYPES.find((c) => c.id === selected)?.label : 'skincare guidance';
    const skinInfo = skinType ? ` My likely skin type is ${SKIN_TYPE_INFO[skinType]?.label}.` : '';
    const msg = `Hi Abby, I just visited your website and I would like a ${concern} consultation.${skinInfo} Please guide me on next steps.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const handleBooking = () => {
    if (!selected) return;
    navigate('/consultation/payment', {
      state: {
        consultationType: selected,
        consultationInfo: CONSULTATION_TYPES.find((c) => c.id === selected),
        skinType,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          {user && (
            <p className="text-accent text-sm font-medium mb-2">
              Welcome, {getFirstName()} 🌿
            </p>
          )}
          <h1 className="text-4xl font-bold mb-4">Personal Skincare Consultation</h1>
          <p className="text-green-100 max-w-xl mx-auto text-lg">
            Get personalised guidance from Abby — someone who has navigated hyperpigmentation,
            stretch marks, and Nigerian skin challenges firsthand.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-5xl">

        {/* Step 1: Skin Type Quiz */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Step 1: Discover Your Skin Type
          </h2>
          <p className="text-gray-500 mb-6">
            Not sure what your skin type is? Take this quick 3-question check — no medical knowledge required.
          </p>

          {quizStep === null && (
            <button
              onClick={startQuiz}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Start Skin Type Check →
            </button>
          )}

          {typeof quizStep === 'number' && quizStep !== null && quizStep < SKIN_QUIZ.length && (
            <div>
              <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">
                Question {quizStep + 1} of {SKIN_QUIZ.length}
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {SKIN_QUIZ[quizStep].question}
              </h3>
              <div className="space-y-2">
                {SKIN_QUIZ[quizStep].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => answerQuestion(opt.value)}
                    className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-green-50 transition text-sm text-gray-700"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {quizStep === 'result' && skinType && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                Your likely skin type
              </p>
              <h3 className="text-2xl font-bold text-primary mb-3">
                {SKIN_TYPE_INFO[skinType].emoji} {SKIN_TYPE_INFO[skinType].label}
              </h3>
              <p className="text-gray-600 mb-4">{SKIN_TYPE_INFO[skinType].description}</p>
              <p className="text-xs text-gray-400 italic mb-4">
                Note: This is a general guide based on your answers. For a personalised assessment, book a consultation below.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {SKIN_TYPE_INFO[skinType].tips.map((tip) => (
                  <span key={tip} className="bg-white border border-green-200 text-green-700 text-xs px-3 py-1 rounded-full">
                    {tip}
                  </span>
                ))}
              </div>
              <button
                onClick={startQuiz}
                className="text-primary text-sm underline"
              >
                Retake quiz
              </button>
            </div>
          )}
        </div>

        {/* Step 2: Choose consultation type */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Step 2: Choose Your Consultation
          </h2>
          <p className="text-gray-500 mb-6">
            Select the type that best matches what you need. All consultations are done via WhatsApp after payment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONSULTATION_TYPES.map((type) => (
              <div
                key={type.id}
                onClick={() => setSelected(type.id)}
                className={`cursor-pointer border-2 rounded-xl p-5 transition-all duration-150 ${
                  selected === type.id
                    ? 'border-primary bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{type.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{type.label}</h3>
                    <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-primary font-bold">₦{type.price.toLocaleString()}</span>
                      <span className="text-xs text-gray-400">{type.duration}</span>
                    </div>
                  </div>
                  {selected === type.id && (
                    <span className="text-primary text-xl">✓</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 3: Next steps */}
        {selected && (
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Step 3: What happens next?</h2>

            <div className="flex flex-col md:flex-row gap-4 mt-6">
              {/* Option A: Pay and book */}
              <div className="flex-1 border-2 border-primary rounded-xl p-6">
                <h3 className="font-bold text-gray-800 mb-2">Option A — Book &amp; Pay</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Make payment, submit your receipt, and Abby will reach out within 2–4 hours
                  to schedule your WhatsApp session.
                </p>
                <p className="font-bold text-primary text-lg mb-4">
                  ₦{CONSULTATION_TYPES.find((c) => c.id === selected)?.price.toLocaleString()}
                </p>
                <button
                  onClick={handleBooking}
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Proceed to Payment →
                </button>
              </div>

              {/* Option B: Quick inquiry */}
              <div className="flex-1 border-2 border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-800 mb-2">Option B — Quick WhatsApp Inquiry</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Not ready to pay yet? Send Abby a quick message to ask questions first.
                  She'll reply when available.
                </p>
                <p className="text-xs text-gray-400 mb-4">Free — casual inquiry only</p>
                <a
                  href={getWhatsappLink(selected)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Process overview */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Choose', desc: 'Pick your consultation type above' },
              { step: '2', title: 'Pay', desc: 'Transfer the consultation fee to our account' },
              { step: '3', title: 'Submit', desc: 'Upload your receipt or send your reference number' },
              { step: '4', title: 'Connect', desc: 'Abby contacts you on WhatsApp within 2–4 hours' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-800">{s.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
