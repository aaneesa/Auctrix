'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PropertyGrid() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('https://9753b703-d6ef-480c-8852-fbb4240099e7.mock.pstmn.io/properties');
        const data = await res.json();
        setProperties(data); 
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const formatTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;

    if (diff <= 0) return 'Auction Ended';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  if (loading) {
    return <div className="text-center py-10 text-xl">Loading properties...</div>;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="relative h-64">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {formatTimeRemaining(property.auctionEnds)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <p className="text-2xl font-bold text-red-600 mb-2">{property.price}</p>
                <p className="text-gray-600 mb-4">{property.location}</p>
                <div className="flex items-center gap-4 mb-4 text-gray-600">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center">
                      <span className="mr-1">🛏️</span>
                      {property.bedrooms} Beds
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className="mr-1">🚿</span>
                    {property.bathrooms} Baths
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1">📏</span>
                    {property.area}
                  </div>
                </div>
                <Link
                  href={`/property-listings/${property.id}`}
                  className="block w-full text-center bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
