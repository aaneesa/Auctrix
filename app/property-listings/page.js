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

  // unauthenticated users should log in first
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
      } catch (err) {
        console.error('Failed to fetch properties:', err);
      }
    };

    fetchProperties();
  }, []);

  return (
    <main>
      <div className="text-center py-10 bg-black text-white">
        <h1 className="text-3xl font-bold">Property Listings</h1>
        <p className="text-gray-300 mt-2">Browse available properties for auction.</p>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {properties.length === 0 ? (
          <p className="text-center text-gray-500">No properties found.</p>
        ) : (
          <PropertyGrid properties={properties} />
        )}
      </div>
    </main>
  );
}
