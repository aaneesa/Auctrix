'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/properties/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch property details');
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setProperty(data);
      } catch (err) {
        console.error('Error fetching property details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.detailImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.detailImages.length - 1 : prev - 1
    );
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

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Property Not Found</h2>
          <p className="text-gray-600">The property you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Property Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Image Gallery */}
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <Image
            src={property.detailImages[currentImageIndex]}
            alt={property.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              onClick={prevImage}
              className="bg-white/80 p-2 rounded-full hover:bg-white"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="bg-white/80 p-2 rounded-full hover:bg-white"
            >
              →
            </button>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {property.detailImages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Property Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {property.title}
            </h1>
            <p className="text-gray-600">{property.location}</p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-slate-900">
              ₹{property.price.toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Bedrooms</p>
              <p className="text-xl font-semibold">{property.bedrooms}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Bathrooms</p>
              <p className="text-xl font-semibold">{property.bathrooms}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Area</p>
              <p className="text-xl font-semibold">{property.area} sqft</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{property.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Nearest Schools</h2>
            <div className="space-y-2">
              {property.nearestSchools.map((school, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{school.name}</span>
                  <span className="text-sm text-gray-500">{school.distance_km} km</span>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition-colors">
            View Auction Details
          </button>
        </div>
      </div>
    </div>
  );
} 
