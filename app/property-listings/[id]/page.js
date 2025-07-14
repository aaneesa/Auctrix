'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function CountdownTimer({ endTime }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(endTime) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = null;
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  if (!timeLeft) {
    return <span className="text-red-600 font-semibold">Auction Ended</span>;
  }

  return (
    <span className="font-mono text-lg">
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </span>
  );
}

export default function PropertyDetails({ params }) {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidSubmitted, setBidSubmitted] = useState(false);
  const [userBid, setUserBid] = useState('');
  const [showBidHistory, setShowBidHistory] = useState(false);

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
    setUserBid(bidAmount);
    setBidSubmitted(true);
    setShowBidModal(false);
    setBidAmount('');
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
            <div className="relative w-full">
        <Carousel
          showArrows={true}
          showStatus={false}
          showThumbs={true}
          infiniteLoop={true}
          autoPlay={false}
          stopOnHover={true}
          swipeable={true}
          dynamicHeight={false}
          className="rounded-lg overflow-hidden"
        >
          {/* Main Grid Image */}
          <div className="h-[87vh] relative">
            <Image
              src={property.gridImage}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end pb-12 px-4 sm:px-6 lg:px-8">
              <div className="text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{property.title}</h1>
                <p className="text-xl">{property.location}</p>
              </div>
            </div>
          </div>

          {/* Bedroom Image */}
          <div className="h-[87vh] relative">
            <Image
              src={property.detailsImage.bedroom}
              alt={`Bedroom of ${property.title}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <span className="text-white text-2xl font-semibold bg-black bg-opacity-50 px-4 py-2 rounded-lg">
                Bedroom
              </span>
            </div>
          </div>

          {/* Living Room Image */}
          <div className="h-[87vh] relative">
            <Image
              src={property.detailsImage.living}
              alt={`Living room of ${property.title}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <span className="text-white text-2xl font-semibold bg-black bg-opacity-50 px-4 py-2 rounded-lg">
                Living Room
              </span>
            </div>
          </div>

          {/* Kitchen Image */}
          <div className="h-[87vh] relative">
            <Image
              src={property.detailsImage.kitchen}
              alt={`Kitchen of ${property.title}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <span className="text-white text-2xl font-semibold bg-black bg-opacity-50 px-4 py-2 rounded-lg">
                Kitchen
              </span>
            </div>
          </div>
        </Carousel>
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
                  {property.auctionStatus?.toLowerCase() === 'live' && property.auctionEnds && (
                    <div className="mt-4">
                      <div className="text-gray-700 font-semibold mb-1">Auction ends in</div>
                      <CountdownTimer endTime={property.auctionEnds} />
                    </div>
                  )}
                  {property.auctionStatus?.toLowerCase() === 'upcoming' && property.auctionStart && (
                    <div className="mt-4">
                      <div className="text-gray-700 font-semibold mb-1">Auction starts in</div>
                      <CountdownTimer endTime={property.auctionStart} />
                    </div>
                  )}
                </div>
                {property.auctionStatus?.toLowerCase() === 'ended' ? (
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-600">Auction Ended</div>
                  </div>
                ) : (
                  <div className="text-right">
                    {bidSubmitted ? (
                      <div className="space-y-3">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="text-sm text-green-600 mb-1">Your Bid</div>
                          <div className="text-xl font-bold text-green-700">
                            {formatPrice(userBid)}
                          </div>
                        </div>
                        <button
                          onClick={() => setShowBidHistory(true)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Bid History
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowBidModal(true)}
                        className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                      >
                        Place Bid
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <div className="text-gray-600">
                {Array.isArray(property.description) ? (
                  property.description.map((item, index) => (
                    <div key={index} className="flex items-start space-x-2 mb-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm whitespace-pre-line">{property.description}</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
              <h2 className="text-xl font-semibold mb-3">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities?.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {property.nearestSchools && (
              <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                <h2 className="text-xl font-semibold mb-3">Nearest Schools</h2>
                <div className="space-y-3">
                  {Array.isArray(property.nearestSchools) ? (
                    property.nearestSchools.map((school, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{school}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{property.nearestSchools}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Owner Info and Contact */}
          <div className="lg:col-span-1">
            {property.location && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Map Location</h2>
                <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                  ></iframe>
                </div>
                <div className="text-gray-700 text-sm">{property.location}</div>
              </div>
            )}
            {property.auctionStatus?.toLowerCase() === 'ended' && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-center">Auction Results</h2>
                <div className="space-y-3">
                  {property.auctionResult.winnerName && (
                    <div className="flex justify-between">
                      <span className="font-semibold">Winner:</span>
                      <span className="text-gray-700">{property.auctionResult.winnerName}</span>
                    </div>
                  )}
                  {property.auctionResult.soldPrice && (
                    <div className="flex justify-between">
                      <span className="font-semibold">Sold Price:</span>
                      <span className="text-green-600 font-semibold">{formatPrice(property.auctionResult.soldPrice)}</span>
                    </div>
                  )}
                  {property.auctionResult.soldDate && (
                    <div className="flex justify-between">
                      <span className="font-semibold">Sold Date:</span>
                      <span className="text-gray-700">{new Date(property.auctionResult.soldDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {property.auctionStatus?.toLowerCase() !== 'ended' && property.owner && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Owner Information</h2>
                <div className="mb-4">
                  <h3 className="font-semibold">{property.owner.name}</h3>
                  <p className="text-gray-600">Property Owner</p>
                </div>
                {property.owner.Rating && (
                  <div className="mb-2">
                    <span className="font-semibold">Rating: </span>
                    <span className="text-yellow-600">{property.owner.Rating}</span>
                  </div>
                )}
              </div>
            )}
            {property.auctionStatus?.toLowerCase() !== 'ended' && (
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
                <div className="space-y-3">
                  {property.owner?.contact && (
                    <div className="flex items-center space-x-3 text-sm">
                      <span className="font-semibold">Contact:</span>
                      <span>{property.owner.contact}</span>
                    </div>
                  )}
                  {property.owner?.email && (
                    <div className="flex items-center space-x-3 text-sm">
                      <span className="font-semibold">Email:</span>
                      <span>{property.owner.email}</span>
                    </div>
                  )}
                  {property.owner?.officeLocation && (
                    <div className="flex items-center space-x-3 text-sm">
                      <span className="font-semibold">Office Location:</span>
                      <span>{property.owner.officeLocation}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
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
                  Original Price: {formatPrice(property.price)}
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

      {/* Bid History Modal */}
      {showBidHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Bid History</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold">Rahul Sharma</div>
                  <div className="text-sm text-gray-600">₹2,45,00,000</div>
                </div>
                <div className="text-sm text-gray-500">2 hours ago</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold">Priya Patel</div>
                  <div className="text-sm text-gray-600">₹2,40,00,000</div>
                </div>
                <div className="text-sm text-gray-500">4 hours ago</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold">Amit Kumar</div>
                  <div className="text-sm text-gray-600">₹2,35,00,000</div>
                </div>
                <div className="text-sm text-gray-500">6 hours ago</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold">Neha Singh</div>
                  <div className="text-sm text-gray-600">₹2,30,00,000</div>
                </div>
                <div className="text-sm text-gray-500">1 day ago</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold">Vikram Malhotra</div>
                  <div className="text-sm text-gray-600">₹2,25,00,000</div>
                </div>
                <div className="text-sm text-gray-500">2 days ago</div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowBidHistory(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
