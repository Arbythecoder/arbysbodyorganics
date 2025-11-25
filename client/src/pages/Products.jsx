import { useState } from 'react';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';

const Products = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>

      {/* Category Filter */}
      <div className="flex justify-center mb-8 space-x-4">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            selectedCategory === 'all'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Products
        </button>
        <button
          onClick={() => setSelectedCategory('face')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            selectedCategory === 'face'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Face Care
        </button>
        <button
          onClick={() => setSelectedCategory('body')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            selectedCategory === 'body'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Body Care
        </button>
        <button
          onClick={() => setSelectedCategory('special')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            selectedCategory === 'special'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Special Kits
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
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
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                {product.category.toUpperCase()}
              </span>
              <h3 className="text-xl font-semibold mt-2 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {product.description}
              </p>

              {/* Benefits */}
              <ul className="text-xs text-gray-500 mb-4">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx}>• {benefit}</li>
                ))}
              </ul>

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
    </div>
  );
};

export default Products;
