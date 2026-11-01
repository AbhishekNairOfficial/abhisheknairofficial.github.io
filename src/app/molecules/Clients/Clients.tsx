import { SectionHeading } from '@/app/atoms/SectionHeading';
import {
  CLIENTS_DATA,
  CLIENTS_TITLE,
  formatInlineList,
} from '@/config/constants';

export function Clients() {
  const names = CLIENTS_DATA.map((client) => client.name);

  return (
    <section
      className="scroll-mt-20 pb-20 lg:pb-24"
      id="clients"
    >
      <SectionHeading>
        {CLIENTS_TITLE}
      </SectionHeading>
      <p className="max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
        {formatInlineList(names)}
      </p>
    </section>
  );
}

export default Clients;
