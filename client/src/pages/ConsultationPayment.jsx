import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const WHATSAPP_NUMBER = '2347067510073';

// ─── Update these with your actual bank details ──────────────────────────────
const BANK_DETAILS = {
  bankName: 'Union Bank',
  accountName: 'Arbys House of Beauty',
  accountNumber: '0167387221',
};
// ─────────────────────────────────────────────────────────────────────────────

const ConsultationPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { consultationInfo, skinType } = location.state || {};

  const [form, setForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    transactionReference: '',
    additionalNote: '',
  });
  const [receipt, setReceipt] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // If someone lands here without selecting a consultation, redirect back
  if (!consultationInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No consultation selected.</p>
          <Link to="/consultation" className="bg-primary text-white px-6 py-2 rounded-lg">
            Choose a Consultation
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.transactionReference && !receipt) {
      return setError('Please enter your transaction reference or upload your receipt.');
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('fullName', form.fullName);
      data.append('email', form.email);
      data.append('phone', form.phone);
      data.append('consultationType', consultationInfo.id);
      data.append('amount', consultationInfo.price);
      data.append('transactionReference', form.transactionReference);
      data.append('additionalNote', form.additionalNote);
      if (skinType) data.append('skinType', skinType);
      if (receipt) data.append('receipt', receipt);

      await axios.post('/api/consultations/book', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappFollowUp = () => {
    const msg = `Hi Abby! I just submitted my payment for the ${consultationInfo.label} consultation (₦${consultationInfo.price.toLocaleString()}).${form.transactionReference ? ` Transaction reference: ${form.transactionReference}.` : ''} Please confirm and let me know next steps.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Booking Received!</h2>
          <p className="text-gray-600 mb-2">
            Thank you, <strong>{form.fullName.split(' ')[0]}</strong>!
          </p>
          <p className="text-gray-500 mb-6 text-sm">
            Your payment submission has been received. Abby will verify your payment and reach out via
            WhatsApp within <strong>2–4 hours</strong> to schedule your consultation.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm font-semibold text-gray-700 mb-1">What happens next:</p>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>Abby verifies your payment</li>
              <li>She contacts you on WhatsApp</li>
              <li>You have your consultation session</li>
            </ol>
          </div>

          <button
            onClick={whatsappFollowUp}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2 mb-3"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Send WhatsApp Follow-up
          </button>

          <Link to="/" className="block text-sm text-gray-500 hover:text-primary">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-green-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
          <p className="text-green-100">Pay and submit your receipt to confirm your consultation</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 max-w-2xl">

        {/* Consultation summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Your Selected Consultation</h2>
          <div className="flex items-start gap-4">
            <div className="text-3xl">{consultationInfo.emoji}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{consultationInfo.label}</h3>
              <p className="text-sm text-gray-500 mt-1">{consultationInfo.description}</p>
              <p className="text-sm text-gray-400 mt-1">{consultationInfo.duration}</p>
              {skinType && (
                <p className="text-xs text-green-600 mt-2">
                  Skin type from your quiz: <strong>{skinType}</strong>
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">₦{consultationInfo.price.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Payment instructions */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Step 1 — Make Payment
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Transfer exactly <strong>₦{consultationInfo.price.toLocaleString()}</strong> to the account below.
          </p>

          <div className="bg-gray-50 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Bank</span>
              <span className="font-semibold text-gray-800">{BANK_DETAILS.bankName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Account Name</span>
              <span className="font-semibold text-gray-800">{BANK_DETAILS.accountName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Account Number</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary text-lg">{BANK_DETAILS.accountNumber}</span>
                <button
                  onClick={copyAccountNumber}
                  className="text-xs bg-primary text-white px-2 py-1 rounded hover:bg-green-700 transition"
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Amount</span>
              <span className="font-bold text-primary">₦{consultationInfo.price.toLocaleString()}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-3">
            Use your name as the payment narration/description so we can identify your transfer.
          </p>
        </div>

        {/* Submission form */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Step 2 — Submit Payment Proof
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            After paying, fill in your details and provide your transaction reference or upload your receipt screenshot.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your full name"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone / WhatsApp</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="08012345678"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transaction Reference / Bank Reference
              </label>
              <input
                type="text"
                name="transactionReference"
                value={form.transactionReference}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g. FBN2024091234 or leave blank if uploading receipt"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Receipt Screenshot <span className="text-gray-400">(optional if you entered reference above)</span>
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setReceipt(e.target.files[0])}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary file:text-white file:text-xs file:cursor-pointer"
              />
              <p className="text-xs text-gray-400 mt-1">JPG, PNG or PDF · Max 5MB</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional note <span className="text-gray-400">(optional)</span>
              </label>
              <textarea
                name="additionalNote"
                value={form.additionalNote}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Any specific concerns or information for Abby…"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting…' : 'Submit Booking →'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Questions?{' '}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Chat Abby on WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
};

export default ConsultationPayment;
