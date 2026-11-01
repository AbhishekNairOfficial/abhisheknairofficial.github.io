import { PageSection } from '@/app/molecules/PageSection';
import { CLIENTS_DATA, CLIENTS_TITLE } from '@/config/constants';

export function Clients() {
  return (
    <PageSection
      id="clients"
      title={CLIENTS_TITLE}
    >
      <ul className="space-y-3">
        {CLIENTS_DATA.map((client) => {
          return (
            <li
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border/70 py-2 last:border-b-0"
              key={client.name}
            >
              <span className="text-foreground">
                {client.name}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {client.context}
              </span>
            </li>
          );
        })}
      </ul>
    </PageSection>
  );
}

export default Clients;
