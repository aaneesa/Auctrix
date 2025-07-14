import Link from 'next/link';

export default function WhyChooseUs() {
  const data = [
    {
      title: 'Premium Listings',
      des: 'Find luxurious properties in sought-after neighborhoods.',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-slate-700">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2 7-7 7 7 2 2v10a1 1 0 01-1 1h-3a1 1 0 01-1-1v-4h-2v4a1 1 0 01-1 1H6a1 1 0 01-1-1V12z" />
        </svg>
      )
    },
    {
      title: 'Trusted Transactions',
      des: 'Your data is protected with strong encryption protocols.',
      icon: (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 text-slate-700 h-6 mb-[1px]">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M12 2.944a11.955 11.955 0 00-8.618 3.04 12.02 12.02 0 00-1.382 3.016c0 5.59 3.824 10.29 9 11.62 5.176-1.33 9-6.03 9-11.62a12.02 12.02 0 00-1.382-3.016A11.955 11.955 0 0012 2.944z" />
          </svg>
        </>
      )
    },
    {
      title: 'Real Support',
      des: 'Talk to real estate professionals whenever you need advice.',
      icon: (
        <svg stroke="currentColor" className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0zM17 20h5v-2a3 3 0 00-5.36-1.86M17 20H7m0 0H2v-2a3 3 0 015.36-1.86M7 20v-2a5.002 5.002 0 019.29 0v2" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-[64px] bg-white">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-[1.875rem] font-bold text-gray-900 mb-2">Why Choose Auctrix?</h2>
          <p className="text-[1rem] text-gray-600 max-w-[580px] mx-auto">
            We make property auctions simpler, safer — and smarter.
          </p>
        </div>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-7">
          {data.map((item, i) => {
            return (
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:shadow-md" key={i}>
                <div className="mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-[6px]">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.des}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <div className="bg-slate-900 p-[30px] rounded-xl shadow-lg hover:scale-[1.02] transition duration-200 inline-block">
            <h3 className="text-2xl text-white font-bold mb-3">Start Your Journey</h3>
            <p className="text-gray-300 text-sm mb-5">Explore real opportunities with Auctrix today.</p>
            <Link
              href="/property-listings"
              className="bg-white text-slate-900 py-[12px] px-6 text-base font-medium rounded-lg hover:bg-gray-200"
            >
              View Listings
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
