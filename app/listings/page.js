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
      <PropertyGrid />
    </main>
  );
} 