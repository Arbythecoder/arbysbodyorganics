import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
  });

  const VAT_RATE = 0.075;
  const SHIPPING_FEE = 2000;
  const FREE_SHIPPING_THRESHOLD = 20000;

  const subtotal = getCartTotal();
  const vat = subtotal * VAT_RATE;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + vat + shipping;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaystackPayment = () => {
    // Initialize Paystack
    const handler = window.PaystackPop.setup({
      key: 'pk_test_your_public_key_here', // Replace with your Paystack public key
      email: formData.email,
      amount: total * 100, // Amount in kobo
      currency: 'NGN',
      ref: 'ARB-' + Math.floor(Math.random() * 1000000000 + 1),
      metadata: {
        custom_fields: [
          {
            display_name: 'Customer Name',
            variable_name: 'customer_name',
            value: `${formData.firstName} ${formData.lastName}`,
          },
          {
            display_name: 'Phone Number',
            variable_name: 'phone',
            value: formData.phone,
          },
        ],
      },
      callback: function (response) {
        // Payment successful
        alert('Payment successful! Reference: ' + response.reference);
        clearCart();
        navigate('/');
      },
      onClose: function () {
        alert('Payment window closed');
      },
    });

    handler.openIframe();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.firstName || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    // Proceed to Paystack
    handlePaystackPayment();
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add items to cart before checkout</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Information Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Pay with Paystack - ₦{total.toLocaleString()}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center">
                <div className="w-16 h-16 bg-gray-200 rounded mr-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT (7.5%)</span>
              <span>₦{vat.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-green-600">FREE</span>
                ) : (
                  `₦${shipping.toLocaleString()}`
                )}
              </span>
            </div>
            <div className="border-t pt-2 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-primary">₦{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Important Note */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-800 mb-2">
          📌 Before You Pay:
        </h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>
            • Replace the Paystack public key in the code with your actual key
          </li>
          <li>
            • Use test mode during development (keys start with pk_test_)
          </li>
          <li>• Switch to live keys when ready for production</li>
          <li>• Paystack charges only 1.5% + ₦100 per transaction</li>
        </ul>
      </div>
    </div>
  );
};

export default Checkout;
