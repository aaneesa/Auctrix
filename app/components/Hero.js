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
