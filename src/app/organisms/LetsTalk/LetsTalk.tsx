import { SectionHeading } from '@/app/atoms/SectionHeading';
import {
  AVAILABILITY_LINE,
  CONTACT_EMAIL,
  CONTACT_TEXT,
  CONTACT_TITLE,
} from '@/config/constants';
import { FOCUS_RING } from '@/lib/styles';

const LetsTalk = () => (
  <section
    className="scroll-mt-20 pb-8 lg:pb-12"
    id="contact"
  >
    <SectionHeading>
      {CONTACT_TITLE}
    </SectionHeading>
    <div className="max-w-xl">
      <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
        {CONTACT_TEXT}
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        {AVAILABILITY_LINE}
      </p>
      <a
        className={`mt-8 inline-block font-mono text-sm text-primary hover:text-foreground ${FOCUS_RING}`}
        href={`mailto:${CONTACT_EMAIL}`}
      >
        {CONTACT_EMAIL}
      </a>
    </div>
  </section>
);

export default LetsTalk;
