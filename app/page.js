export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              Welcome to Auctrix
            </h1>
            <p className="mt-4 text-xl text-gray-200">
              Your Property Auction Platform
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
