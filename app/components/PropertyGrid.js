'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function PropertyGrid({ properties = [] }) {
  const formatPrice = (price) => {
    if (!price) return 'Price Not Available';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!properties || properties.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">No properties found matching your criteria.</p>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Link 
              href={`/property-listings/${property.id}`} 
              key={property.id}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                <div className="relative h-64">
                  <Image
                    src={property.gridImage}
                    alt={property.title || 'Property Image'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={property.id <= 3}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    {property.title}
                    {property.auctionStatus && (
                      <span
                        className={
                          `px-2 py-1 rounded-full text-xs font-semibold ` +
                          (property.auctionStatus.toLowerCase() === 'live'
                            ? 'bg-green-100 text-green-800'
                            : property.auctionStatus.toLowerCase() === 'upcoming'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-200 text-gray-700')
                        }
                      >
                        {property.auctionStatus.charAt(0).toUpperCase() + property.auctionStatus.slice(1)}
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-600 mb-4">{property.location}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-slate-900">
                      {formatPrice(property.price)}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600 mb-6">
                    <div>
                      <p className="font-semibold">{property.bedrooms}</p>
                      <p>Beds</p>
                    </div>
                    <div>
                      <p className="font-semibold">{property.bathrooms}</p>
                      <p>Baths</p>
                    </div>
                    <div>
                      <p className="font-semibold">{property.area}</p>
                      <p>Sq.ft</p>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/property-listings/${property.id}`;
                    }}
                    className="w-full bg-slate-900 text-white py-2 px-4 rounded-lg hover:bg-slate-800 transition-colors duration-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
 