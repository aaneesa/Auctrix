import PropertyGrid from '../components/PropertyGrid';

export default function Listings() {
  return (
    <main>
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Property Listings</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Browse through our exclusive collection of properties up for auction.
          </p>
        </div>
      </div>

      <div className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by location..."
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900">
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="commercial">Commercial</option>
            </select>
            <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900">
              <option value="">Price Range</option>
              <option value="0-1">Under ₹1 Cr</option>
              <option value="1-2">₹1 Cr - ₹2 Cr</option>
              <option value="2-5">₹2 Cr - ₹5 Cr</option>
              <option value="5+">Above ₹5 Cr</option>
            </select>
            <button className="bg-slate-900 text-white rounded-lg px-6 py-2 hover:bg-slate-800 transition-colors">
              Search
            </button>
          </div>
          <div className="flex justify-end">
            <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900">
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="ending-soon">Ending Soon</option>
            </select>
          </div>
        </div>
      </div>

      <PropertyGrid />
    </main>
  );
} 