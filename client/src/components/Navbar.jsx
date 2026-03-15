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

const CartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
  </svg>
);

const ChevronDown = () => (
  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const Navbar = () => {
  const { getCartCount } = useCart();
  const { user, logout, getFirstName } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
      <div className="bg-primary text-white text-center py-2 text-xs font-medium tracking-wide px-4">
        Free WhatsApp consultation for new customers &nbsp;·&nbsp; 100% Organic &amp; Nigerian-Made 🌿
      </div>

      {/* Main nav */}
      <nav className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-none border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-display font-bold text-base leading-none">
                A
              </div>
              <div className="leading-none">
                <p className="font-display font-bold text-gray-900 text-[1.05rem]">Arby's</p>
                <p className="text-[9px] text-gray-400 tracking-[0.18em] uppercase font-sans">Body Organics</p>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`text-sm font-medium transition-colors duration-150 ${
                    location.pathname === to
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {label}
                  {location.pathname === to && (
                    <span className="block h-0.5 bg-primary rounded-full mt-0.5" />
                  )}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Cart */}
              <Link to="/cart" className="relative p-2 text-gray-500 hover:text-primary transition-colors">
                <CartIcon />
                {getCartCount() > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">
                    {getCartCount()}
                  </span>
                )}
              </Link>

              {/* Auth */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(prev => !prev)}
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-primary transition-colors pl-1"
                  >
                    <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
                      {getFirstName().charAt(0).toUpperCase()}
                    </span>
                    <span className="hidden md:block">{getFirstName()}</span>
                    <ChevronDown />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                      <div className="px-4 py-3 border-b border-gray-50">
                        <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2 ml-2">
                  <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                    Sign in
                  </Link>
                  <Link
                    to="/consultation"
                    className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Book Consultation
                  </Link>
                </div>
              )}

              {/* Hamburger */}
              <button
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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
          <div className="md:hidden bg-white border-t border-gray-100 px-5 py-4 space-y-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`block py-2.5 text-sm font-medium ${location.pathname === to ? 'text-primary' : 'text-gray-700'}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              {user ? (
                <>
                  <p className="text-xs text-gray-400">{user.email}</p>
                  <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-sm text-red-500 font-medium">
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block py-2 text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>Sign in</Link>
                  <Link to="/register" className="block py-2 text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>Register</Link>
                  <Link
                    to="/consultation"
                    className="block bg-primary text-white text-center py-2.5 rounded-lg text-sm font-semibold mt-2"
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
