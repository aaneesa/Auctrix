import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative h-[600px] w-full">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero-bg.jpeg')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
          Find Your Dream Property Today
        </h1>

        <div className="w-full max-w-3xl bg-white/90 p-6 rounded-2xl shadow-lg">
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Location"
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
            <select className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500">
              <option value="">Price Range</option>
              <option value="0-5000000">₹0 - ₹50 Lakhs</option>
              <option value="5000000-20000000">₹50 Lakhs - ₹2 Crore</option>
              <option value="20000000+">₹2 Crore+</option>
            </select>
            <select className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500">
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="commercial">Land</option>
            </select>
            <button
              type="submit"
              className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-medium"
            >
              Search
            </button>
          </form>
        </div>

        <div className="mt-8">
          <Link
            href="/property-listings"
            className="px-8 py-3 bg-white text-slate-900 rounded-xl hover:bg-gray-100 transition-colors font-medium"
          >
            Browse Listings
          </Link>
        </div>
      </div>
    </div>
  );
} 