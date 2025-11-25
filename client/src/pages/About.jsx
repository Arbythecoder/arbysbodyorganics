const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Arby's Body Organics was founded by <strong>Abigail Afolabi</strong>,
            who personally experienced the frustration of hyperpigmentation and
            stretch marks after pregnancy. Unable to find truly natural,
            chemical-free solutions in Nigeria, she began creating her own
            organic skincare products.
          </p>
          <p className="text-gray-700 mb-4">
            What started as a personal journey has grown into a mission to help
            thousands of Nigerians achieve healthy, glowing skin through 100%
            organic, chemical-free products made with love and care.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
          <p className="text-gray-700">
            To provide Nigerians with safe, effective, and affordable organic
            skincare solutions that address common skin concerns like
            hyperpigmentation, stretch marks, acne, and dark spots - without
            harmful chemicals.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Why Choose Us?</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-gray-700">
                <strong>100% Organic:</strong> No harsh chemicals, parabens, or
                sulfates
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-gray-700">
                <strong>Made in Nigeria:</strong> Formulated for Nigerian skin
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-gray-700">
                <strong>Proven Results:</strong> Real transformations from real
                customers
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-gray-700">
                <strong>Affordable:</strong> Quality skincare at prices that make
                sense
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-gray-700">
                <strong>Personal Touch:</strong> Founded by someone who
                understands your struggles
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-primary text-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-6">
            Follow us on social media for skincare tips, natural remedies, and
            exclusive offers!
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://instagram.com/arbysbodyorganics"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com/@arbysskincaretips"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
