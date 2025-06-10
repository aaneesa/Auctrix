'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PropertyDetails({ params }) {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [showBidModal, setShowBidModal] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://listingsprop.free.beeceptor.com/listingsprop', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch properties: ${response.status}`);
        }

        const allProperties = await response.json();

        if (!Array.isArray(allProperties)) {
          throw new Error('Invalid response format');
        }

        const matched = allProperties.find(
          (item) => String(item.id) === String(params.id)
        );

        if (!matched) {
          throw new Error('Property not found');
        }

        setProperty(matched);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Unable to load property details');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.id]);

  const formatPrice = (price) => {
    if (!price) return 'Price Not Available';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    // You can implement bid submission logic here if needed
    setShowBidModal(false);
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <Link 
            href="/property-listings"
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
          >
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  // Property Not Found
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Property Not Found</h2>
          <Link 
            href="/property-listings"
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
          >
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  // Main Page
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={property.heroImage}
          alt={property.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{property.title}</h1>
              <p className="text-xl">{property.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    {formatPrice(property.price)}
                  </h2>
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                    {property.auctionStatus}
                  </span>
                </div>
                <button
                  onClick={() => setShowBidModal(true)}
                  className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Place Bid
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className="text-gray-600 whitespace-pre-line">{property.description}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities?.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Owner Info and Contact */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Owner Information</h2>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 relative rounded-full overflow-hidden">
                  <Image
                    src={property.ownerImage}
                    alt={property.ownerName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{property.ownerName}</h3>
                  <p className="text-gray-600">Property Owner</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{property.ownerDescription}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span>{property.contactPhone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>{property.contactEmail}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>{property.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bid Modal */}
      {showBidModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Place Your Bid</h2>
            <form onSubmit={handleBidSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Bid Amount (₹)</label>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  placeholder="Enter your bid amount"
                  required
                  min={property.minimumBid}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Minimum bid: {formatPrice(property.minimumBid)}
                </p>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowBidModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
                >
                  Submit Bid
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
