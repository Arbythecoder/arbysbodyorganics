import { Link } from 'react-router-dom';

const WHATSAPP_NUMBER = '2347067510073';
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@Arbysskincaretips';
const EBOOKS_STORE_URL = 'https://selar.com/m/Abigeal1235';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-display font-bold text-sm">A</div>
            <div>
              <p className="font-display font-bold text-white text-sm leading-none">Arby's</p>
              <p className="text-[9px] text-gray-500 tracking-widest uppercase">Body Organics</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-4">
            100% organic skincare crafted for Nigerian skin. No harmful chemicals, just nature.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-green-400 hover:text-green-300 transition-colors font-medium"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            +234 706 751 0073
          </a>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Shop</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link to="/products" className="hover:text-white transition-colors">Soaps</Link></li>
            <li><Link to="/products" className="hover:text-white transition-colors">Oils & Serums</Link></li>
            <li><Link to="/products" className="hover:text-white transition-colors">Bundles</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/consultation" className="hover:text-white transition-colors">Book Consultation</Link></li>
            <li>
              <a href={EBOOKS_STORE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                E-books
              </a>
            </li>
            <li>
              <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                YouTube Tutorials
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/register" className="hover:text-white transition-colors">Create Account</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <p>© {new Date().getFullYear()} Arby's Body Organics. All rights reserved.</p>
        <p>Made with care in Nigeria 🇳🇬</p>
      </div>
    </div>
  </footer>
);

export default Footer;
