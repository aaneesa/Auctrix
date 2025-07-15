'use client';

import { useState, useEffect } from 'react';
import PropertyGrid from '../components/PropertyGrid';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';

export default function Listings() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/sign-up');
  }, [user, router]);

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    propertyType: '',
    priceRange: '',
    auctionStatus: ''
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('/api/properties', { cache: 'no-store' });
        const result = await res.json();

        if (!Array.isArray(result?.properties)) {
          throw new Error('Bad response');
        }

        setProperties(result.properties);
      } catch (e) {
        setError(e.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const applyFilters = () => {
    let filtered = [...properties];

    if (filters.search) {
      const text = filters.search.toLowerCase();
      filtered = filtered.filter(p => p.title?.toLowerCase().includes(text) || p.location?.toLowerCase().includes(text));
    }

    if (filters.propertyType) {
      filtered = filtered.filter(p => p.type?.toLowerCase() === filters.propertyType.toLowerCase());
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(p => {
        const price = p.price;
        return price && price >= min * 1e7 && (!max || price <= max * 1e7);
      });
    }

    if (filters.auctionStatus) {
      filtered = filtered.filter(p => p.auctionStatus?.toLowerCase() === filters.auctionStatus.toLowerCase());
    }

    return filtered;
  };

  const filteredProperties = applyFilters();

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600">{error}</p>
        <button onClick={() => location.reload()} className="mt-4 px-4 py-2 bg-black text-white rounded">
          Retry
        </button>
      </div>
    );
  }

  return (
    <main>
      <div className="bg-black text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Property Listings</h1>
        <p className="text-gray-400 pt-6">Explore our collections of properties.</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <input name="search" value={filters.search} onChange={e => setFilters(f => ({ ...f, search: e.target.value }))} placeholder="Search..." className="border p-2 rounded" />
          <select name="propertyType" value={filters.propertyType} onChange={e => setFilters(f => ({ ...f, propertyType: e.target.value }))} className="border p-2 rounded">
            <option value="">Type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
          </select>
          <select name="priceRange" value={filters.priceRange} onChange={e => setFilters(f => ({ ...f, priceRange: e.target.value }))} className="border p-2 rounded">
            <option value="">Price</option>
            <option value="0-1">Under ₹1 Cr</option>
            <option value="1-2">₹1–2 Cr</option>
            <option value="2-5">₹2–5 Cr</option>
            <option value="5-10">₹5–10 Cr</option>
            <option value="10-">Above ₹10 Cr</option>
          </select>
          <select name="auctionStatus" value={filters.auctionStatus} onChange={e => setFilters(f => ({ ...f, auctionStatus: e.target.value }))} className="border p-2 rounded">
            <option value="">Status</option>
            <option value="live">Live</option>
            <option value="upcoming">Upcoming</option>
            <option value="ended">Ended</option>
          </select>
          <button onClick={() => setFilters({ search: '', propertyType: '', priceRange: '', auctionStatus: '' })} className="border p-2 rounded">
            Reset
          </button>
        </div>

        <div className="text-sm text-gray-500 mb-4">{filteredProperties.length} results</div>

        <PropertyGrid properties={filteredProperties} />
      </div>
    </main>
  );
}
