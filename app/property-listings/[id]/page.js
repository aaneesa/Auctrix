export default function PropertyDetails({ params }) {
  const properties = {
    1: {
      id: 1,
      title: 'Modern Villa in Bandra',
      type: 'Villa',
      price: '₹2.5 Cr',
      status: 'Live',
      description: 'Experience luxury living in this beautifully designed villa located in the heart of Bandra West. This property offers stunning views, modern amenities, and a prime location close to schools, hospitals, and shopping centers.',
      location: 'Bandra West, Mumbai',
      area: '2500 sq.ft',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60',
      timeRemaining: '2d 14h 30m',
      features: [
        '4 Bedrooms with attached bathrooms',
        'Modern modular kitchen',
        'Garden and terrace',
        '24/7 security',
        'Reserved parking for 2 cars',
        'Power backup',
        'Swimming pool',
        'Fitness center'
      ]
    },
    2: {
      id: 2,
      title: 'Luxury Apartment in Powai',
      type: 'Apartment',
      price: '₹1.8 Cr',
      status: 'Live',
      description: 'Stunning views and modern amenities in this premium apartment complex.',
      location: 'Powai, Mumbai',
      area: '1800 sq.ft',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60',
      timeRemaining: '1d 8h 45m',
      features: [
        '3 Bedrooms with attached bathrooms',
        'Open kitchen concept',
        'Balcony with city views',
        '24/7 security',
        'Covered parking',
        'Power backup',
        'Swimming pool',
        'Clubhouse'
      ]
    },
    3: {
      id: 3,
      title: 'Commercial Space in BKC',
      type: 'Commercial',
      price: '₹4.2 Cr',
      status: 'Live',
      description: 'Prime commercial space in the heart of Mumbai\'s business district.',
      location: 'BKC, Mumbai',
      area: '3200 sq.ft',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=60',
      timeRemaining: '3d 6h 15m',
      features: [
        'Open floor plan',
        'Modern amenities',
        'High-speed elevators',
        '24/7 security',
        'Dedicated parking',
        'Power backup',
        'Conference rooms',
        'Reception area'
      ]
    }
  };

  const property = properties[params.id];

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600">The property you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Property Image */}
      <div className="h-[500px] bg-slate-900">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* Property Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">{property.title}</h1>
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-600">
                  {property.status}
                </span>
              </div>
              
              <p className="text-2xl font-bold text-red-600 mb-6">{property.price}</p>
              
              <div className="flex items-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center">
                  <span className="mr-2">📍</span>
                  {property.location}
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📏</span>
                  {property.area}
                </div>
              </div>

              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-600 mb-6">{property.description}</p>

                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {property.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Auction Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Starting Price</p>
                  <p className="text-xl font-bold">{property.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time Remaining</p>
                  <p className="text-xl font-bold text-red-600">{property.timeRemaining}</p>
                </div>
                <button className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition-colors">
                  Place Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 