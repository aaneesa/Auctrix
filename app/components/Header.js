'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-slate-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white">
              Auctrix
            </Link>
          </div>
          <nav className="flex items-center space-x-8">
            <Link href="/" className="text-gray-100 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/property-listings" className="text-gray-100 hover:text-white transition-colors">
              Listings
            </Link>
            <Link href="/contact" className="text-gray-100 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 