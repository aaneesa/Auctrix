import Link from 'next/link';

export default function PropertyGrid() {
  const properties = [
    {
      id: 1,
      title: 'Modern Villa in Bandra',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60',
      price: '₹2.5 Cr',
      location: 'Bandra West, Mumbai',
      bedrooms: 4,
      bathrooms: 3,
      area: '2500 sq.ft',
      auctionEnds: '2025-09-15T18:00:00',
    },
    {
      id: 2,
      title: 'Luxury Apartment in Powai',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60',
      price: '₹1.8 Cr',
      location: 'Powai, Mumbai',
      bedrooms: 3,
      bathrooms: 2,
      area: '1800 sq.ft',
      auctionEnds: '2024-04-20T15:00:00',
    },
    {
      id: 3,
      title: 'Commercial Space in BKC',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=60',
      price: '₹4.2 Cr',
      location: 'BKC, Mumbai',
      bedrooms: 0,
      bathrooms: 2,
      area: '3000 sq.ft',
      auctionEnds: '2025-05-18T12:00:00',
    },
  ];

  const formatTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

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