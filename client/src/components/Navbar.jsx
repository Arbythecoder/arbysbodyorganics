import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const { getCartCount } = useCart();

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            Arby's Body Organics
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-accent transition">
              Home
            </Link>
            <Link to="/products" className="hover:text-accent transition">
              Products
            </Link>
            <Link to="/about" className="hover:text-accent transition">
              About
            </Link>
            <Link to="/contact" className="hover:text-accent transition">
              Contact
            </Link>
          </div>

          <Link
            to="/cart"
            className="relative bg-accent text-primary px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            Cart
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                {getCartCount()}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
