import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';

const Home = () => {
  const { addToCart } = useCart();
  const featuredProducts = products.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-green-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            100% Organic Skincare for Nigerian Skin
          </h1>
          <p className="text-xl mb-8">
            Natural solutions for hyperpigmentation & stretch marks
          </p>
          <Link
            to="/products"
            className="bg-accent text-primary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition inline-block"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <div className="h-64 bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">
                      ₦{product.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition inline-block"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-4">
              Founded by Abigail Afolabi, Arby's Body Organics was born from a
              personal journey with hyperpigmentation and stretch marks.
            </p>
            <p className="text-lg text-gray-700">
              We're passionate about helping Nigerians achieve healthy,
              glowing skin using 100% organic, chemical-free products.
            </p>
            <Link
              to="/about"
              className="inline-block mt-6 text-primary font-semibold hover:text-green-700"
            >
              Read More →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
