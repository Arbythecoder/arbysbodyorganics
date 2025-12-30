import { ebooks } from '../data/products';

export default function Ebooks() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Skincare E-Books</h1>
          <p className="text-xl text-gray-600">Expert knowledge in easy-to-read digital guides</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ebooks.map(ebook => (
            <div key={ebook.id} className="card overflow-hidden flex flex-col">
              <img
                src={ebook.image}
                alt={ebook.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{ebook.title}</h3>
                <p className="text-gray-600 mb-6 flex-1">{ebook.description}</p>

                <div className="flex gap-4 mb-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {ebook.pages} pages
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    {ebook.format}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-green-600">
                      ₦{ebook.price.toLocaleString()}
                    </span>
                    {ebook.oldPrice && (
                      <span className="ml-2 text-sm text-gray-400 line-through">
                        ₦{ebook.oldPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <a
                  href="https://selar.com/m/Abigeal1235"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center"
                >
                  Buy on Selar
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 rounded-full p-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Digital Download</h3>
              <p className="text-gray-600">
                All e-books are delivered instantly via email after purchase. PDF format compatible with all devices.
                Questions? Contact us on WhatsApp: <strong>+234 706 751 0073</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
