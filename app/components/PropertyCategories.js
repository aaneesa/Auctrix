import Link from 'next/link';

export default function PropertyCategories() {
  const categories = [
    {
      title: 'Houses',
      image: '/image/categories/house.jpeg',
      description: 'Find your dream home from our extensive collection of houses.',
      link: '/properties?type=house'
    },
    {
      title: 'Apartments',
      image: '/image/categories/apartment.jpg',
      description: 'Modern apartments in prime locations across the city.',
      link: '/properties?type=apartment'
    },
    {
      title: 'Commercial',
      image: '/image/categories/commercial.jpeg',
      description: 'Prime land plots for your future development projects.',
      link: '/properties?type=land'
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Property Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {categories.map((category) => (
            <Link 
              href={category.link} 
              key={category.title}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                <div className="relative h-48">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 