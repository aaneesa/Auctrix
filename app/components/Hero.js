import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative h-[500px] w-full">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero-bg.jpeg')",
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-center">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            Find Your Dream Property Today
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Experience the thrill of luxury property auctions. Find exclusive homes, 
            make competitive bids, and secure your perfect property.
          </p>
        </div>
      </div>
    </div>
  );
}
