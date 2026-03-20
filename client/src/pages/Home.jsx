import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const WHATSAPP_NUMBER = '2347067510073';
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@Arbysskincaretips';
const EBOOKS_STORE_URL = 'https://selar.com/m/Abigeal1235';

const StarIcon = ({ filled }) => (
  <svg className={`w-3.5 h-3.5 ${filled ? 'text-accent fill-accent' : 'text-gray-300 fill-gray-300'}`} viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const STATS = [
  { value: '500+', label: 'Happy Clients' },
  { value: '100%', label: 'Organic Ingredients' },
  { value: '12+', label: 'Products' },
  { value: '5★', label: 'Average Rating' },
];

const CONCERNS = [
  { title: 'Hyperpigmentation', desc: 'Even out dark spots & uneven tone', icon: '☀', hover: 'hover:bg-forest hover:border-forest' },
  { title: 'Acne & Breakouts', desc: 'Clear blemishes with natural botanicals', icon: '✦', hover: 'hover:bg-purple hover:border-purple' },
  { title: 'Stretch Marks', desc: 'Fade and restore skin elasticity', icon: '◈', hover: 'hover:bg-secondary hover:border-secondary' },
  { title: 'Dry & Dull Skin', desc: 'Deep hydration with shea & aloe', icon: '◎', hover: 'hover:bg-forest hover:border-forest' },
];

const TESTIMONIALS = [
  {
    name: 'Chidinma O.',
    location: 'Lagos',
    text: "After 3 weeks of using the glow soap, my dark spots are visibly lighter. I get compliments every day. Genuinely the best investment I've made for my skin.",
    initials: 'CO',
    avatarBg: 'bg-forest',
  },
  {
    name: 'Fatima A.',
    location: 'Abuja',
    text: "Abby's consultation changed everything for me. She identified my skin type correctly and recommended products that actually work. My acne is 90% gone.",
    initials: 'FA',
    avatarBg: 'bg-purple',
  },
  {
    name: 'Blessing E.',
    location: 'Port Harcourt',
    text: 'I was skeptical about organic products but the stretch mark oil has made a real difference. The texture of my skin has completely changed in 6 weeks.',
    initials: 'BE',
    avatarBg: 'bg-secondary',
  },
];

const MARQUEE_ITEMS = [
  'ORGANIC', 'NIGERIAN-MADE', 'NO HARMFUL CHEMICALS', 'DERMATOLOGIST APPROVED',
  '500+ HAPPY CLIENTS', 'AFRICAN BOTANICALS', 'ORGANIC', 'NIGERIAN-MADE',
  'NO HARMFUL CHEMICALS', 'DERMATOLOGIST APPROVED', '500+ HAPPY CLIENTS', 'AFRICAN BOTANICALS',
];

const Home = () => {
  const { addToCart } = useCart();
  const { user, getFirstName } = useAuth();
  const featuredProducts = products.slice(0, 3);
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Abby%2C%20I%20visited%20your%20website%20and%20would%20like%20to%20make%20an%20enquiry.`;

  return (
    <div className="bg-cream">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-cream min-h-[88vh] flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid md:grid-cols-5 gap-12 items-center">

            {/* Left — 3 cols: headline + CTA */}
            <div className="md:col-span-3">
              {user && (
                <p className="text-xs tracking-[0.22em] uppercase text-primary mb-5 font-medium">
                  Welcome back, {getFirstName()}
                </p>
              )}
              <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400 font-medium mb-6">
                Est. Nigeria &nbsp;·&nbsp; 100% Organic
              </p>
              <h1 className="font-display font-bold text-forest leading-[0.92] mb-6"
                style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
                Healthy,<br />
                Glowing Skin<br />
                <span className="italic font-normal text-primary">Starts Here.</span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-lg">
                Natural solutions for hyperpigmentation, acne &amp; stretch marks —
                crafted with African botanicals, made with love in Nigeria.
              </p>
              <div className="flex flex-wrap gap-3 mb-12">
                <Link
                  to="/products"
                  className="bg-forest text-white text-[11px] tracking-[0.18em] uppercase font-semibold px-8 py-4 hover:bg-primary transition-colors"
                >
                  Shop Products
                </Link>
                <Link
                  to="/consultation"
                  className="bg-purple text-white text-[11px] tracking-[0.18em] uppercase font-semibold px-8 py-4 hover:bg-purple/80 transition-colors"
                >
                  Free Skin Quiz
                </Link>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap gap-6 text-[11px] text-gray-400 tracking-wide uppercase">
                {['No Harmful Chemicals', 'Dermatologist Approved', 'Nigerian-Made'].map(t => (
                  <span key={t} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-accent inline-block" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — 2 cols: botanical seal */}
            <div className="md:col-span-2 flex items-center justify-center">
              <div className="relative" style={{ width: 320, height: 320 }}>
                {/* Outer decorative rings */}
                <div className="absolute inset-0 rounded-full border border-forest/10" />
                <div className="absolute inset-5 rounded-full border border-forest/15" />
                {/* Core seal */}
                <div className="absolute inset-10 rounded-full bg-forest flex flex-col items-center justify-center text-center shadow-2xl">
                  <span className="font-display italic text-white font-bold leading-none" style={{ fontSize: '3rem' }}>A</span>
                  <span className="text-[7px] tracking-[0.35em] uppercase text-white/50 mt-2">Body Organics</span>
                  <div className="w-10 h-px bg-white/20 my-2" />
                  <span className="text-[7px] tracking-[0.2em] uppercase text-accent">Nigeria</span>
                </div>

                {/* Ingredient tags — clock positions */}
                {[
                  { label: 'Shea Butter',       style: { top: '4%',  left: '50%', transform: 'translateX(-50%)' } },
                  { label: 'Aloe Vera',          style: { top: '18%', right: '-8px' } },
                  { label: 'Turmeric',           style: { bottom: '18%', right: '-8px' } },
                  { label: 'African Black Soap', style: { bottom: '4%', left: '50%', transform: 'translateX(-50%)' } },
                  { label: 'Neem Oil',           style: { bottom: '18%', left: '-8px' } },
                  { label: 'Rosehip',            style: { top: '18%', left: '-8px' } },
                ].map(({ label, style }) => (
                  <span
                    key={label}
                    style={style}
                    className="absolute bg-white text-[10px] font-semibold text-forest px-3 py-1.5 shadow-sm border border-gray-100 whitespace-nowrap"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ────────────────────────────────────────────────── */}
      <div className="bg-forest py-4 overflow-hidden border-y border-forest">
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-5">
              <span className="text-[11px] tracking-[0.28em] uppercase text-white font-medium whitespace-nowrap">
                {item}
              </span>
              <span className="text-accent font-bold">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {STATS.map(({ value, label }) => (
              <div key={label} className="py-12 text-center px-6">
                <p className="font-display font-bold text-forest leading-none mb-2"
                  style={{ fontSize: '2.5rem' }}>{value}</p>
                <p className="text-[10px] tracking-[0.22em] uppercase text-gray-400 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOP BY CONCERN ──────────────────────────────────────────────── */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 font-medium mb-3">Targeted Skincare</p>
            <h2 className="font-display font-bold text-forest text-4xl md:text-5xl">What Does Your<br /><em>Skin Need?</em></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CONCERNS.map(({ title, desc, icon, hover }) => (
              <Link
                key={title}
                to="/products"
                className={`group bg-white border border-gray-200 p-7 ${hover} transition-all duration-300`}
              >
                <span className="block text-2xl text-gray-300 group-hover:text-accent mb-5 transition-colors font-display">{icon}</span>
                <h3 className="font-display font-bold text-forest group-hover:text-white text-base mb-2 transition-colors leading-tight">{title}</h3>
                <p className="text-[11px] text-gray-400 group-hover:text-white/60 leading-relaxed transition-colors">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 font-medium mb-3">Our Products</p>
              <h2 className="font-display font-bold text-forest text-4xl md:text-5xl">Community<br /><em>Favourites</em></h2>
            </div>
            <Link
              to="/products"
              className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-medium text-forest border-b border-forest pb-0.5 hover:opacity-60 transition-opacity"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group border border-gray-200 hover:border-forest transition-all duration-300 overflow-hidden bg-white"
              >
                <div className="aspect-[4/3] bg-cream overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-0.5 mb-3">
                    {[1,2,3,4,5].map(i => <StarIcon key={i} filled />)}
                    <span className="text-[10px] text-gray-400 ml-2 tracking-wide">(24)</span>
                  </div>
                  <h3 className="font-display font-bold text-forest text-lg mb-1 leading-tight">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-5 line-clamp-2 leading-relaxed">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-forest text-xl">₦{product.price.toLocaleString()}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-forest text-white text-[10px] tracking-[0.15em] uppercase font-semibold px-5 py-2.5 hover:bg-primary transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link
              to="/products"
              className="inline-block bg-secondary text-white text-[11px] tracking-[0.18em] uppercase font-semibold px-10 py-4 hover:bg-secondary/80 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONSULTATION CTA ─────────────────────────────────────────────── */}
      <section className="bg-forest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-0 items-stretch">
            {/* Left — copy */}
            <div className="py-20 md:py-28 md:pr-16 border-b md:border-b-0 md:border-r border-white/10">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-medium mb-6">Personal Skincare Consultation</p>
              <h2 className="font-display font-bold text-white leading-[0.95] mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                Not sure what<br />your skin needs?
              </h2>
              <p className="text-white/50 mb-10 leading-relaxed max-w-sm">
                Book a 1-on-1 with Abby. Get your skin type diagnosed, a personalised
                routine, and product recommendations that actually work for Nigerian skin.
              </p>
              <Link
                to="/consultation"
                className="inline-block bg-accent text-forest text-[11px] tracking-[0.18em] uppercase font-bold px-8 py-4 hover:brightness-110 transition"
              >
                Book My Consultation
              </Link>
            </div>

            {/* Right — services */}
            <div className="py-20 md:py-28 md:pl-16">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-medium mb-8">What's Included</p>
              {[
                { label: 'Skin Type Analysis', price: 'From ₦2,000' },
                { label: 'Custom Product Guide', price: 'From ₦3,500' },
                { label: 'Full Routine Build', price: 'From ₦5,000' },
                { label: 'WhatsApp Q&A Session', price: 'From ₦1,500' },
              ].map(({ label, price }) => (
                <div key={label} className="flex items-center justify-between py-5 border-b border-white/10 last:border-0">
                  <span className="text-white font-medium text-sm">{label}</span>
                  <span className="text-accent text-sm font-semibold">{price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 font-medium mb-3">Real Results</p>
              <h2 className="font-display font-bold text-forest text-4xl md:text-5xl">What Clients<br /><em>Are Saying</em></h2>
            </div>
            <p className="text-xs tracking-widest uppercase text-gray-400 md:mb-1">Verified customers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, location, text, initials, avatarBg }) => (
              <div key={name} className="bg-white border border-gray-200 p-8 relative">
                <span className="absolute top-4 right-6 font-display text-8xl text-gray-100 leading-none select-none">"</span>
                <div className="flex gap-0.5 mb-5">
                  {[1,2,3,4,5].map(i => <StarIcon key={i} filled />)}
                </div>
                <p className="text-gray-600 leading-relaxed text-sm mb-7 relative z-10">"{text}"</p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-5">
                  <div className={`w-9 h-9 ${avatarBg} text-white font-bold flex items-center justify-center text-xs`}>
                    {initials}
                  </div>
                  <div>
                    <p className="font-semibold text-forest text-sm">{name}</p>
                    <p className="text-[10px] tracking-widest uppercase text-gray-400">{location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAININGS ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-purple font-semibold mb-3">Trainings &amp; Resources</p>
            <h2 className="font-display font-bold text-forest text-4xl md:text-5xl">Learn, Grow &amp;<br /><em>Glow With Us</em></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">

            {/* E-books — purple card */}
            <div className="bg-purple p-10 md:p-12 flex flex-col justify-between min-h-[360px]">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-medium mb-6">Digital Guides · Selar Store</p>
                <h3 className="font-display font-bold text-white text-3xl md:text-4xl leading-tight mb-4">
                  Skincare<br /><em>E-books &amp; Guides</em>
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-sm">
                  Learn to read labels, build routines that work, and understand Nigerian skin —
                  written by Abby from personal experience.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-10">
                  {['Skin Type Guide', 'Routine Builder', 'Label Decoder', 'Hyperpigmentation Fix'].map(title => (
                    <div key={title} className="border border-white/20 bg-white/10 px-4 py-3">
                      <p className="text-[10px] tracking-wide uppercase text-white/80 font-medium">{title}</p>
                    </div>
                  ))}
                </div>
              </div>
              <a
                href={EBOOKS_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent text-forest text-[11px] tracking-[0.18em] uppercase font-bold px-7 py-4 self-start hover:brightness-110 transition"
              >
                Browse E-books on Selar →
              </a>
            </div>

            {/* YouTube — forest card */}
            <div className="bg-forest p-10 md:p-12 flex flex-col justify-between min-h-[360px]">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-medium mb-6">Free Tutorials · YouTube</p>
                <h3 className="font-display font-bold text-white text-3xl md:text-4xl leading-tight mb-4">
                  Watch Free<br /><em>Skin Tutorials</em>
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm">
                  Abby breaks down skincare myths, demos products, and walks you through
                  routines step by step — completely free.
                </p>
                <div className="space-y-3 mb-10">
                  {[
                    'How to Know Your Skin Type',
                    'Fade Dark Spots in 30 Days',
                    'Morning Routine for Oily Skin',
                  ].map(title => (
                    <div key={title} className="flex items-center gap-4 border border-white/10 bg-white/5 px-5 py-4">
                      <div className="w-6 h-6 bg-red-600 flex items-center justify-center shrink-0">
                        <svg className="w-2.5 h-2.5 text-white fill-current ml-0.5" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-xs font-semibold text-white/80 tracking-wide">{title}</p>
                    </div>
                  ))}
                </div>
              </div>
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent text-forest text-[11px] tracking-[0.18em] uppercase font-bold px-7 py-4 self-start hover:brightness-110 transition"
              >
                Watch on YouTube →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-medium mb-6">Direct Line</p>
          <h2 className="font-display font-bold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Quick question?<br /><em>Just message Abby.</em>
          </h2>
          <p className="text-white/50 mb-10 max-w-md mx-auto text-sm leading-relaxed">
            Not sure which product is right for you? Send a message and get a genuine,
            personalised answer — no bots, just Abby.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-accent text-forest text-[11px] tracking-[0.18em] uppercase font-bold px-9 py-4 hover:brightness-110 transition"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* ── ABOUT SNIPPET ────────────────────────────────────────────────── */}
      <section className="py-24 bg-forest">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium mb-8">Our Story</p>
          <h2 className="font-display font-bold text-white text-4xl md:text-5xl leading-tight mb-8">
            Born from a<br /><em>Personal Journey</em>
          </h2>
          <p className="text-white/50 leading-relaxed mb-4 text-lg">
            Arby's Body Organics was founded by <strong className="text-white/80">Abigail Afolabi</strong> after her own
            battle with hyperpigmentation and stretch marks. Frustrated with products that
            didn't work for Nigerian skin, she went back to nature.
          </p>
          <p className="text-white/30 leading-relaxed mb-10 text-base">
            Today, every product is made with hand-selected African botanicals, zero harmful
            chemicals, and one goal: giving you the healthy, glowing skin you deserve.
          </p>
          <Link
            to="/about"
            className="inline-block bg-mauve text-forest text-[11px] tracking-[0.22em] uppercase font-semibold px-8 py-4 hover:bg-accent transition-colors"
          >
            Read the Full Story
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
