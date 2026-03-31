import { FadeIn } from '@/components/motion';
import { CLIENTS_DATA, CLIENTS_SECTION_NUMBER, CLIENTS_TITLE } from '@/config/constants';

export function Clients() {
  const duplicatedClients = [...CLIENTS_DATA, ...CLIENTS_DATA];

  return (
    <section
      className="py-24 border-t border-border"
      id="clients"
    >
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs text-primary">
              {CLIENTS_SECTION_NUMBER}
            </span>
            <h2 className="font-literata text-3xl sm:text-4xl font-semibold">
              {CLIENTS_TITLE}
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="overflow-hidden relative mb-12">
            <div className="flex animate-scroll">
              {duplicatedClients.map((client, index) => (
                <div
                  className="flex-shrink-0 px-8 md:px-12 flex flex-col items-center justify-center gap-3"
                  key={index}
                >
                  <span className="font-primary text-2xl sm:text-3xl text-foreground/60 hover:text-primary transition-colors whitespace-nowrap">
                    {client.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {client.context}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default Clients;
