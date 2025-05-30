'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PropertyGrid() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching properties...');
        
        const response = await fetch('/api/properties', {
          cache: 'no-store',
          signal: controller.signal
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || 'Failed to fetch properties');
        }
        
        const data = await response.json();
        console.log('Received properties:', data);
        
        if (!isMounted) return;
        
        if (!data.properties || !Array.isArray(data.properties)) {
          throw new Error('Invalid data format received');
        }
        
        console.log('Setting properties:', data.properties.length);
        setProperties(data.properties);
      } catch (err) {
        if (!isMounted) return;
        
        console.error('Error in PropertyGrid:', err);
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
          return;
        }
        setError(err.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProperties();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const formatPrice = (price) => {
    if (!price) return 'Price Not Available';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!properties.length) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">No properties found.</p>
        </div>
      </div>
    );
  }

  console.log('Rendering properties:', properties.length);

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
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
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
