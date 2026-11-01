import { CLIENTS_DATA, CLIENTS_TITLE } from '@/config/constants';

export function Clients() {
  return (
    <section
      className="scroll-mt-16 py-24 border-t border-border"
      id="clients"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl mb-12 md:mb-16">
          {CLIENTS_TITLE}
        </h2>
        <ul className="flex flex-wrap gap-x-10 gap-y-4">
          {CLIENTS_DATA.map((client) => (
            <li
              className="text-sm sm:text-base"
              key={client.name}
            >
              <span className="text-foreground">
                {client.name}
              </span>
              <span className="text-muted-foreground">
                {` · ${client.context}`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Clients;
