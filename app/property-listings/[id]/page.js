'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function PropertyDetails() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const property = {
    title: "Luxury 3-Bedroom Apartment in Bandra",
    description: "Experience luxury living in this stunning 3-bedroom apartment located in the heart of Bandra. This property features modern architecture, high-end finishes, and panoramic city views. The apartment includes a spacious living room, modern kitchen with premium appliances, three well-appointed bedrooms with en-suite bathrooms, and a private balcony. The building offers 24/7 security, covered parking, a swimming pool, fitness center, and landscaped gardens.",
    price: "₹2,50,00,000",
    status: "Live",
    location: "Bandra West, Mumbai",
    area: "2,200 sq.ft",
    bedrooms: 3,
    bathrooms: 3,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2074",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053",
    ],
    amenities: [
      "Swimming Pool",
      "Fitness Center",
      "24/7 Security",
      "Covered Parking",
      "Landscaped Gardens",
      "Power Backup",
      "Lift",
      "Children's Play Area"
    ]
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[500px] bg-slate-900">
        <div className="relative h-full">
          <Image
            src={property.images[currentImageIndex]}
            alt={property.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          
          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all"
          >
            ←
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all"
          >
            →
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full">
            {currentImageIndex + 1} / {property.images.length}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  property.status === 'Live' ? 'bg-green-100 text-green-800' :
                  property.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {property.status}
                </span>
              </div>

              <div className="flex items-center gap-4 text-gray-600 mb-6">
                <span>{property.location}</span>
                <span>•</span>
                <span>{property.area}</span>
                <span>•</span>
                <span>{property.bedrooms} Beds</span>
                <span>•</span>
                <span>{property.bathrooms} Baths</span>
              </div>

              <div className="prose max-w-none mb-8">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-600">{property.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      <span>•</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-8 sticky top-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Starting Price</h2>
                <p className="text-3xl font-bold text-slate-900">{property.price}</p>
              </div>

              <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold hover:bg-slate-800 transition-colors mb-4">
                Place Bid
              </button>

              <button className="w-full border border-slate-900 text-slate-900 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                Schedule Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 