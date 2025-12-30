import { Link } from 'react-router-dom';

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-12">
          <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>

          <p className="text-xl text-gray-600 mb-8">
            Thank you for your order! We've sent your order details via WhatsApp.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-lg mb-2">Next Steps:</h3>
            <ol className="text-left space-y-2 text-gray-700">
              <li>1. Transfer payment to our bank account</li>
              <li>2. Send proof of payment via WhatsApp: <strong>+234 706 751 0073</strong></li>
              <li>3. We'll confirm and ship your order!</li>
            </ol>
          </div>

          <div className="flex justify-center gap-4">
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
            <Link to="/products" className="btn-secondary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
