import Image from 'next/image';

export default function PropertyCategories() {
  const categories = [
    {
      title: 'Homes',
      image: '/images/categories/house.jpeg',
      description: 'Browse cozy houses perfect for families, couples, or solo living.'
    },
    {
      title: 'Apartments',
      image: '/images/categories/apartment.jpg',
      description: 'Compact and modern apartments in urban and suburban areas.'
    },
    {
      title: 'Villas',
      image: '/images/categories/commercial.jpeg',
      description: 'Spacious villas ideal for getaways or long-term retreats.'
    },
  ];

  return (
    <section className="py-14 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
          What's here for you
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-md">
          {categories.map((item) => (
          <div 
              key={item.title}
              className="bg-white rounded-md shadow hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative h-44 w-full rounded-md">
                <Image
                  src={item.image}
                  alt={`${item.title} category`}
                  fill
                  className="object-cover"
                />
              </div>
            <div className="p-5">
                <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                <p className="text-sm text-gray-700">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
