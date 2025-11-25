import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } =
    useCart();

  const VAT_RATE = 0.075; // 7.5% Nigerian VAT
  const SHIPPING_FEE = 2000;
  const FREE_SHIPPING_THRESHOLD = 20000;

  const subtotal = getCartTotal();
  const vat = subtotal * VAT_RATE;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + vat + shipping;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">
          Start shopping to add items to your cart!
        </p>
        <Link
          to="/products"
          className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition inline-block"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-6 flex items-center"
            >
              <div className="w-24 h-24 bg-gray-200 rounded-lg mr-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <p className="text-primary font-bold text-lg mt-2">
                  ₦{item.price.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({getCartCount()} items)</span>
                <span className="font-semibold">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">VAT (7.5%)</span>
                <span className="font-semibold">₦{vat.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `₦${shipping.toLocaleString()}`
                  )}
                </span>
              </div>
              {subtotal < FREE_SHIPPING_THRESHOLD && (
                <p className="text-xs text-gray-500">
                  Add ₦{(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()}{' '}
                  more for free shipping
                </p>
              )}
              <div className="border-t pt-3 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">₦{total.toLocaleString()}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-primary text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/products"
              className="block w-full text-center text-primary mt-4 hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
