import React from 'react'
// Hero section with welcoming background image and intro ; the landing section
function Hero() {
  return (
    <section className="relative h-[500px] w-full text-white">
    <div className="absolute inset-0 bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: "url('/images/hero-bg.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/50" />
    </div>

    <div className="relative z-10 h-full flex flex-col justify-center items-center px-5 text-center">
      <div className="bg-black/50 p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
          Looking for a New Home?
      </h1>
        <p className="text-lg text-gray-300"> 
          Browse handpicked listings, place your bids, and discover unique properties that fit your lifestyle.
        </p>
      </div>
    </div>
  </section>
  );
}

export default Hero
