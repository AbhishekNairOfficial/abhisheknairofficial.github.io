import { Star } from 'lucide-react';
import Image from 'next/image';

const clients = [
  {
    name: 'T-Mobile',
    logo: '/images/T-mobile_logo.png'
  },
  {
    name: 'Comcast',
    logo: '/images/Comcast-Logo.png'
  },
  {
    name: 'Albertsons',
    logo: '/images/albertsons-logo.png'
  },
  {
    name: 'ADP',
    logo: '/images/adp-logo.png'
  },
  {
    name: 'TOMRA',
    logo: '/images/tomra-logo.png'
  }
];

export function Clients() {
  // Duplicate the clients array for infinite scroll effect
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="mb-12 border-b-2 border-black pb-12">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-5xl">Notable Clients</h2>
        <div className="h-1 flex-1 bg-black"></div>
      </div>

      <div className="overflow-hidden relative mb-6">
        <div className="flex animate-scroll">
          {duplicatedClients.map((client, index) => (
            <div key={index} className="flex-shrink-0 px-8 flex items-center justify-center" style={{ width: '250px', height: '120px' }}>
              <Image
                src={client.logo}
                alt={client.name}
                width={200}
                height={100}
                className="max-h-24 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-300 border-2 border-black p-6">
        <div className="flex items-center gap-3">
          <Star className="h-6 w-6 fill-black" />
          <p className="text-lg">
            <span className="font-serif">Client Satisfaction:</span> Maintained client satisfaction 
            rate with 100% project delivery on schedule
          </p>
        </div>
      </div>
    </section>
  );
}

export default Clients;