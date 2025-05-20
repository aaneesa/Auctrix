export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Auctrix</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Revolutionizing the way properties are bought and sold through innovative auction technology.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 text-gray-600">
              <p>
                Auctrix was founded with a simple mission: to transform the real estate market by making property transactions more transparent, efficient, and accessible to everyone.
              </p>
              <p>
                Our platform combines cutting-edge technology with traditional real estate expertise to create a seamless auction experience that benefits both buyers and sellers.
              </p>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                Since our inception, we've helped thousands of clients find their dream properties and achieve optimal selling prices through our innovative auction system.
              </p>
              <p>
                We're committed to maintaining the highest standards of integrity and professionalism in every transaction.
              </p>
            </div>
          </div>
        </section>
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Mission & Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Transparency</h3>
              <p className="text-gray-600">
                We believe in complete transparency in all property transactions, ensuring all parties have access to the same information.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-600">
                Continuously developing new technologies and methods to improve the property auction experience.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Customer Focus</h3>
              <p className="text-gray-600">
                Putting our clients' needs first and providing exceptional service throughout their property journey.
              </p>
            </div>
          </div>
        </section>
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <img 
                src="/images/team/ceo.webp" 
                alt="Anwesha Adhikari - CEO" 
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Anwesha Adhikari</h3>
              <p className="text-gray-600 mb-2">CEO & Founder</p>
              <p className="text-gray-500 text-sm">
                With over 20 years in real estate and technology, John leads Auctrix with vision and expertise.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <img 
                src="/images/team/opearations.jpg" 
                alt="Ditya Sharma - Head of Operations" 
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Ditya Sharma</h3>
              <p className="text-gray-600 mb-2">Head of Operations</p>
              <p className="text-gray-500 text-sm">
                Sarah ensures smooth operations and exceptional customer service across all departments.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <img 
                src="/images/team/tech.webp" 
                alt="Ayush Mittal - Technology Director" 
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Ayush Mittal</h3>
              <p className="text-gray-600 mb-2">Technology Director</p>
              <p className="text-gray-500 text-sm">
                Michael leads our technology team in developing innovative solutions for the property market.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-slate-900 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're looking to buy, sell, or simply learn more about property auctions, we're here to help.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/contact"
              className="px-8 py-3 bg-white text-slate-900 rounded-xl hover:bg-gray-100 transition-colors font-medium"
            >
              Contact Us
            </a>
            <a
              href="/"
              className="px-8 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors font-medium"
            >
              Get Started
            </a>
          </div>
        </section>
      </div>
    </div>
  );
} 