import { ClientsMarquee } from '@/components/ClientsMarquee';
import { FadeIn } from '@/components/motion';
import { CLIENTS_DATA, CLIENTS_SECTION_NUMBER, CLIENTS_TITLE } from '@/config/constants';

export function Clients() {
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
          <ClientsMarquee items={CLIENTS_DATA} />
        </FadeIn>
      </div>
    </section>
  );
}

export default Clients;
