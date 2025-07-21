'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import PropertyGrid from '../components/PropertyGrid';

export default function Listings() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  // Filter states
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/sign-up');
    }
  }, [user, router]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('/api/properties');
        const data = await res.json();
        setProperties(data.properties || []);
        setFilteredProperties(data.properties || []);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    const filtered = properties.filter((prop) => {
      const priceInCr = prop.price / 10000000;

      const priceMatch =
        selectedPrice === '' ||
        (selectedPrice === 'below1' && priceInCr < 1) ||
        (selectedPrice === '1to2' && priceInCr >= 1 && priceInCr <= 2) ||
        (selectedPrice === '2to5' && priceInCr > 2 && priceInCr <= 5) ||
        (selectedPrice === 'above5' && priceInCr > 5);

      const statusMatch = selectedStatus === '' || prop.auctionStatus === selectedStatus;
      const locationMatch = selectedLocation === '' || prop.location === selectedLocation;

      return priceMatch && statusMatch && locationMatch;
    });

    setFilteredProperties(filtered);
  }, [selectedPrice, selectedStatus, selectedLocation, properties]);

  const handleReset = () => {
    setSelectedPrice('');
    setSelectedStatus('');
    setSelectedLocation('');
  };

  // Unique locations for filter dropdown
  const uniqueLocations = [...new Set(properties.map((p) => p.location))];

  return (
    <main>
      <div className="text-center py-10 bg-black text-white">
        <h1 className="text-3xl font-bold">Property Listings</h1>
        <p className="text-gray-300 mt-2">Browse available properties for auction.</p>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">All Price Ranges</option>
            <option value="below1">Below ₹1 Cr</option>
            <option value="1to2">₹1 Cr - ₹2 Cr</option>
            <option value="2to5">₹2 Cr - ₹5 Cr</option>
            <option value="above5">Above ₹5 Cr</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">All Auction Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((loc, i) => (
              <option key={i} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>

        {/* Results */}
        {filteredProperties.length === 0 ? (
          <p className="text-center text-gray-500">No properties found.</p>
        ) : (
          <PropertyGrid properties={filteredProperties} />
        )}
      </div>
    </main>
  );
}
