'use client';

import { useState, useEffect } from 'react';
import PropertyGrid from '../components/PropertyGrid';
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

export default function Listings() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  if (!user) {
    router.push('/sign-up');
  }
  
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    propertyType: '',
    priceRange: '',
    auctionStatus: ''
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/properties', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store'
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Failed to fetch properties: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !Array.isArray(data.properties)) {
          throw new Error('Invalid data format received from API');
        }

        setProperties(data.properties);
        setFilteredProperties(data.properties);
      } catch (err) {
        setError(err.message || 'Failed to fetch properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    let filtered = [...properties];

    // Apply all filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(property => 
        property.title?.toLowerCase().includes(searchLower) ||
        property.location?.toLowerCase().includes(searchLower)
      );
    }

    if (filters.propertyType) {
      filtered = filtered.filter(property => 
        property.type?.toLowerCase() === filters.propertyType.toLowerCase()
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(property => {
        const price = property.price;
        if (!price) return false;
        if (max) {
          return price >= min * 10000000 && price <= max * 10000000;
        }
        return price >= min * 10000000;
      });
    }

    if (filters.auctionStatus) {
      filtered = filtered.filter(property => 
        property.auctionStatus?.toLowerCase() === filters.auctionStatus.toLowerCase()
      );
    }

    setFilteredProperties(filtered);
  }, [filters, properties]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFilters({
      search: '',
      propertyType: '',
      priceRange: '',
      auctionStatus: ''
    });
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={handleRetry}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main>
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Property Listings</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Browse through our exclusive collection of properties up for auction.
          </p>
        </div>
      </div>

      <div className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by location..."
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            <select 
              name="propertyType"
              value={filters.propertyType}
              onChange={handleFilterChange}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
            </select>
            <select 
              name="priceRange"
              value={filters.priceRange}
              onChange={handleFilterChange}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="">Price Range</option>
              <option value="0-1">Under ₹1 Cr</option>
              <option value="1-2">₹1 Cr - ₹2 Cr</option>
              <option value="2-5">₹2 Cr - ₹5 Cr</option>
              <option value="5-10">₹5 Cr - ₹10 Cr</option>
              <option value="10-">Above ₹10 Cr</option>
            </select>
            <select 
              name="auctionStatus"
              value={filters.auctionStatus}
              onChange={handleFilterChange}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="">Auction Status</option>
              <option value="live">Live</option>
              <option value="upcoming">Upcoming</option>
              <option value="ended">Ended</option>
            </select>
            <button 
              onClick={handleReset}
              className="bg-gray-200 text-gray-800 rounded-lg px-6 py-2 hover:bg-gray-300 transition-colors"
            >
              Reset
            </button>
          </div>
          <div className="text-sm text-gray-600">
            {filteredProperties.length} properties found
          </div>
        </div>
      </div>

      <PropertyGrid properties={filteredProperties} />
    </main>
  );
} 