import Image from 'next/image';

export default function PropertyCategories() {
  const categories = [
    {
      title: 'Houses',
      image: '/images/categories/house.jpeg',
      description: 'Find your dream home from our extensive collection of houses.'
    },
    {
      title: 'Apartments',
      image: '/images/categories/apartment.jpg',
      description: 'Modern apartments in prime locations across the city.'
    },
    {
      title: 'Commercial',
      image: '/images/categories/commercial.jpeg',
      description: 'Prime land plots for your future development projects.'
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Property Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {categories.map((category) => (
            <div 
              key={category.title}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                <div className="relative h-48 w-full">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                    priority={true}  
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
