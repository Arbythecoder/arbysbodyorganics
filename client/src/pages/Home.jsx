import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const WHATSAPP_NUMBER = '2347067510073';
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@Arbysskincaretips';
const EBOOKS_STORE_URL = 'https://selar.com/m/Abigeal1235';

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const LeafIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.2 5.4-5 8-9 9 0 5 3.8 8 9 9 5.2-1 9-4 9-9-4-1-7.8-3.6-9-9z" />
  </svg>
);
const StarIcon = ({ filled }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-accent fill-accent' : 'text-gray-300 fill-gray-300'}`} viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const STATS = [
  { value: '500+', label: 'Happy Clients' },
  { value: '100%', label: 'Organic Ingredients' },
  { value: '12+', label: 'Skincare Products' },
  { value: '5★', label: 'Average Rating' },
];

const CONCERNS = [
  {
    title: 'Hyperpigmentation',
    desc: 'Even out dark spots & uneven skin tone',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: (
      <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    title: 'Acne & Breakouts',
    desc: 'Clear blemishes with natural botanicals',
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: (
      <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: 'Stretch Marks',
    desc: 'Fade and restore skin elasticity',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    icon: (
      <svg className="w-7 h-7 text-rose-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: 'Dry & Dull Skin',
    desc: 'Deep hydration with shea & aloe',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: (
      <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

const TESTIMONIALS = [
  {
    name: 'Chidinma O.',
    location: 'Lagos',
    text: 'After 3 weeks of using the glow soap, my dark spots are visibly lighter. I get compliments every day. This is genuinely the best investment I have made for my skin.',
    initials: 'CO',
  },
  {
    name: 'Fatima A.',
    location: 'Abuja',
    text: 'Abby\'s consultation changed everything for me. She identified my skin type correctly and recommended products that actually work. My acne is 90% gone.',
    initials: 'FA',
  },
  {
    name: 'Blessing E.',
    location: 'Port Harcourt',
    text: 'I was skeptical about organic products but the stretch mark oil has made a real difference. The texture of my skin has completely changed in 6 weeks.',
    initials: 'BE',
  },
];

const Home = () => {
  const { addToCart } = useCart();
  const { user, getFirstName } = useAuth();
  const featuredProducts = products.slice(0, 3);

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Abby%2C%20I%20visited%20your%20website%20and%20would%20like%20to%20make%20an%20enquiry.`;

  return (
    <div className="bg-white">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left: copy */}
            <div>
              {user && (
                <p className="text-primary font-medium text-sm mb-4">
                  Welcome back, {getFirstName()} 👋
                </p>
              )}
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <LeafIcon className="w-3.5 h-3.5" />
                100% Organic · Made in Nigeria
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-5">
                Healthy Glowing<br />
                <span className="text-primary">Skin Starts Here</span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
                Natural solutions for hyperpigmentation, acne &amp; stretch marks —
                crafted with African botanicals and made with love in Nigeria.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  to="/products"
                  className="bg-primary text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-green-700 transition-colors text-center"
                >
                  Shop Products
                </Link>
                <Link
                  to="/consultation"
                  className="border border-primary text-primary px-7 py-3.5 rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors text-center"
                >
                  Free Skin Quiz
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                {['No Harmful Chemicals', 'Dermatologist Approved', 'Nigerian-Made'].map(t => (
                  <span key={t} className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: decorative brand element */}
            <div className="relative flex items-center justify-center">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary/8 flex items-center justify-center relative">
                <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-primary/12 flex items-center justify-center">
                  <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-primary flex flex-col items-center justify-center text-white text-center p-4">
                    <LeafIcon className="w-8 h-8 mb-2 opacity-80" />
                    <p className="font-display font-bold text-lg leading-tight">Arby's</p>
                    <p className="text-[10px] tracking-widest uppercase opacity-70 mt-0.5">Body Organics</p>
                  </div>
                </div>

                {/* Floating ingredient tags */}
                <span className="absolute top-4 right-2 bg-white shadow-md rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700">Shea Butter</span>
                <span className="absolute bottom-10 right-0 bg-white shadow-md rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700">Aloe Vera</span>
                <span className="absolute top-1/2 -left-2 bg-white shadow-md rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700">Turmeric</span>
                <span className="absolute bottom-4 left-8 bg-white shadow-md rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700">Black Soap</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="font-display font-bold text-3xl text-primary">{value}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SHOP BY CONCERN ───────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-2">Targeted Skincare</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">Shop By Concern</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CONCERNS.map(({ title, desc, bg, border, icon }) => (
              <Link
                key={title}
                to="/products"
                className={`${bg} border ${border} rounded-2xl p-6 hover:shadow-md transition-shadow group`}
              >
                <div className="mb-4">{icon}</div>
                <h3 className="font-semibold text-gray-800 mb-1 text-sm">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────────────────────── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-2">Our Products</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">Community Favourites</h2>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all">
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-green-50 to-amber-50 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-0.5 mb-2">
                    {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= 5} />)}
                    <span className="text-xs text-gray-400 ml-1">(24)</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">₦{product.price.toLocaleString()}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link to="/products" className="border border-primary text-primary px-8 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONSULTATION CTA ──────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-10 md:p-14">
                <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wide uppercase">
                  Personal Skincare Consultation
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  Not sure what your skin needs?
                </h2>
                <p className="text-green-100 mb-8 leading-relaxed">
                  Book a 1-on-1 with Abby. Get your skin type diagnosed, a personalised
                  routine, and product recommendations that actually work for Nigerian skin.
                </p>
                <Link
                  to="/consultation"
                  className="inline-block bg-accent text-primary font-bold px-7 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors"
                >
                  Book My Consultation →
                </Link>
              </div>
              <div className="hidden md:grid grid-cols-2 gap-4 p-10">
                {[
                  { emoji: '🔬', title: 'Skin Analysis', price: 'From ₦2,000' },
                  { emoji: '📦', title: 'Product Guide', price: 'From ₦3,500' },
                  { emoji: '🌙', title: 'Full Routine', price: 'From ₦5,000' },
                  { emoji: '💬', title: 'WhatsApp Q&A', price: 'From ₦1,500' },
                ].map(item => (
                  <div key={item.title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                    <p className="text-2xl mb-2">{item.emoji}</p>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    <p className="text-green-200 text-xs mt-1">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-2">Real Results</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">What Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, location, text, initials }) => (
              <div key={name} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-0.5 mb-4">
                  {[1,2,3,4,5].map(i => <StarIcon key={i} filled />)}
                </div>
                <p className="text-gray-600 leading-relaxed text-sm mb-6">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                    {initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{name}</p>
                    <p className="text-xs text-gray-400">{location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── E-BOOKS & YOUTUBE ─────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">

            {/* E-books */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-10 border border-purple-100">
              <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 tracking-wide uppercase">
                Digital Guides
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-3">Skincare E-books</h3>
              <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                Learn to read labels, build routines that work, and understand Nigerian skin —
                written by Abby from personal experience.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {['Skin Type Guide', 'Routine Builder', 'Label Decoder', 'Hyperpigmentation Fix'].map(title => (
                  <div key={title} className="bg-white rounded-xl p-4 text-center border border-purple-100 shadow-sm">
                    <p className="text-xs font-semibold text-gray-700">{title}</p>
                  </div>
                ))}
              </div>
              <a
                href={EBOOKS_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors text-sm"
              >
                Browse E-books →
              </a>
            </div>

            {/* YouTube */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 md:p-10 border border-red-100">
              <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 tracking-wide uppercase">
                Free Tutorials
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-3">Watch on YouTube</h3>
              <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                Abby breaks down skincare myths, demos products, and walks you through
                routines step by step — completely free.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  'How to Know Your Skin Type',
                  'Fade Dark Spots in 30 Days',
                  'Morning Routine for Oily Skin',
                ].map(title => (
                  <div key={title} className="flex items-center gap-3 bg-white rounded-xl p-3.5 border border-red-100 shadow-sm">
                    <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-white fill-current ml-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-xs font-semibold text-gray-700">{title}</p>
                  </div>
                ))}
              </div>
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors text-sm"
              >
                Watch on YouTube →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA ──────────────────────────────────────────────── */}
      <section className="py-16 bg-[#075E54]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-6">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <h2 className="font-display text-3xl font-bold text-white mb-3">Quick question? Just message Abby</h2>
          <p className="text-green-200 mb-8 max-w-md mx-auto">
            Not sure which product is right for you? Send a message and get a genuine, personalised answer.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#1ebe5d] transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* ── ABOUT SNIPPET ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-2">Our Story</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Born from a personal journey
          </h2>
          <p className="text-gray-500 leading-relaxed mb-3 text-lg">
            Arby's Body Organics was founded by <strong className="text-gray-800">Abigail Afolabi</strong> after her own
            battle with hyperpigmentation and stretch marks. Frustrated with products that
            didn't work for Nigerian skin, she went back to nature.
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            Today, every product is made with hand-selected African botanicals, zero harmful
            chemicals, and one goal: giving you the healthy, glowing skin you deserve.
          </p>
          <Link to="/about" className="inline-flex items-center gap-1.5 text-primary font-semibold hover:gap-3 transition-all">
            Read the full story
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
