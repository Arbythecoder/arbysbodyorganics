import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Shop' },
  { to: '/consultation', label: 'Consultation' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const { getCartCount } = useCart();
  const { user, logout, getFirstName } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-forest text-white text-center py-2 text-[11px] tracking-[0.18em] uppercase font-medium px-4">
        Free WhatsApp Consultation for New Customers &nbsp;·&nbsp; 100% Organic &amp; Nigerian-Made
      </div>

      {/* Main nav */}
      <nav className={`sticky top-0 z-40 bg-white transition-all duration-300 ${scrolled ? 'shadow-sm border-b border-gray-200' : 'border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 rounded-full bg-forest flex items-center justify-center">
                <span className="font-display font-bold text-white text-sm italic">A</span>
              </div>
              <div className="leading-none">
                <p className="font-display font-bold text-forest text-[0.95rem] tracking-wide leading-none">ARBY'S</p>
                <p className="text-[8px] text-gray-400 tracking-[0.25em] uppercase mt-0.5">Body Organics</p>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`text-[11px] tracking-[0.14em] uppercase font-medium transition-colors duration-150 pb-0.5 ${
                    location.pathname === to
                      ? 'text-forest border-b border-forest'
                      : 'text-gray-500 hover:text-forest'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <Link to="/cart" className="relative p-1.5 text-gray-600 hover:text-forest transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                </svg>
                {getCartCount() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-forest text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">
                    {getCartCount()}
                  </span>
                )}
              </Link>

              {/* Auth */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(prev => !prev)}
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-forest transition-colors"
                  >
                    <span className="w-7 h-7 rounded-full bg-forest text-white flex items-center justify-center font-bold text-xs">
                      {getFirstName().charAt(0).toUpperCase()}
                    </span>
                    <span className="hidden md:block text-xs tracking-wide">{getFirstName()}</span>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl border border-gray-100 py-1 z-50">
                      <div className="px-4 py-3 border-b border-gray-50">
                        <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-xs tracking-wide uppercase text-red-500 hover:bg-red-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-3">
                  <Link to="/login" className="text-[11px] tracking-[0.14em] uppercase font-medium text-gray-500 hover:text-forest transition-colors">
                    Sign In
                  </Link>
                  <Link
                    to="/consultation"
                    className="bg-forest text-white text-[11px] tracking-[0.1em] uppercase font-semibold px-5 py-2.5 hover:bg-primary transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              )}

              {/* Hamburger */}
              <button
                className="md:hidden p-1.5 text-gray-600 hover:text-forest"
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-5 py-5">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`block py-3 text-[11px] tracking-[0.18em] uppercase font-medium border-b border-gray-50 last:border-0 ${
                  location.pathname === to ? 'text-forest' : 'text-gray-500'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              {user ? (
                <>
                  <p className="text-xs text-gray-400">{user.email}</p>
                  <button
                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                    className="text-[11px] tracking-widest uppercase text-red-500 font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block py-2 text-[11px] tracking-widest uppercase font-medium text-gray-600" onClick={() => setMenuOpen(false)}>Sign In</Link>
                  <Link
                    to="/consultation"
                    className="block bg-forest text-white text-center py-3 text-[11px] tracking-[0.18em] uppercase font-semibold mt-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    Book Consultation
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
