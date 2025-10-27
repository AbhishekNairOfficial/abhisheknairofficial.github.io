import { Star } from 'lucide-react';
import Image from 'next/image';
import { CLIENTS_DATA, CLIENTS_SATISFACTION_TEXT, CLIENTS_SATISFACTION_TITLE, CLIENTS_TITLE } from '@/config/constants';

export function Clients() {
  // Duplicate the clients array for infinite scroll effect
  const duplicatedClients = [...CLIENTS_DATA, ...CLIENTS_DATA];

  return (
    <section
      className="mb-12 border-b-2 border-black pb-12"
      id="clients"
    >
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl">
          {CLIENTS_TITLE}
        </h2>
        <div className="h-1 flex-1 bg-black" />
      </div>

      <div className="overflow-hidden relative mb-6">
        <div className="flex animate-scroll">
          {duplicatedClients.map((client, index) => (
            <div
              className="flex-shrink-0 px-4 sm:px-6 md:px-8 flex items-center justify-center w-48 sm:w-56 md:w-64 h-20 sm:h-24 md:h-28"
              key={index}
            >
              <Image
                alt={client.name}
                className="max-h-16 sm:max-h-20 md:max-h-24 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                height={100}
                src={client.logo}
                width={200}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-300 border-2 border-black p-6">
        <div className="flex items-center gap-3">
          <Star className="h-6 w-6 fill-black" />
          <p className="text-lg">
            <span className="font-serif">
              {CLIENTS_SATISFACTION_TITLE}
            </span>
            {' '}
            {CLIENTS_SATISFACTION_TEXT}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Clients;