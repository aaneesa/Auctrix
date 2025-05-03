'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-slate-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white">
              Auctrix
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form className="flex gap-3">
              <input
                type="text"
                placeholder="Location"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm"
              />
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm">
                <option value="">Price Range</option>
                <option value="0-100000">$0 - $100,000</option>
                <option value="100000-500000">$100,000 - $500,000</option>
                <option value="500000+">$500,000+</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm">
                <option value="">Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="land">Land</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm"
              >
                Search
              </button>
            </form>
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-gray-100 hover:text-white transition-colors text-sm">
              Home
            </Link>
            <Link href="/property-listings" className="text-gray-100 hover:text-white transition-colors text-sm">
              Listings
            </Link>
            <Link href="/auctions" className="text-gray-100 hover:text-white transition-colors text-sm">
              Auctions
            </Link>
            <Link href="/contact" className="text-gray-100 hover:text-white transition-colors text-sm">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 