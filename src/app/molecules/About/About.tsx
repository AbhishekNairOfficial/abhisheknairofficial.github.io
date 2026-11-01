import { SectionHeading } from '@/app/atoms/SectionHeading';
import { ABOUT_TEXT, ABOUT_TEXT_2, ABOUT_TITLE } from '@/config/constants';

export function About() {
  return (
    <section
      className="scroll-mt-20 pb-20 lg:pb-24"
      id="about"
    >
      <SectionHeading>
        {ABOUT_TITLE}
      </SectionHeading>
      <div className="max-w-xl space-y-4 text-[0.95rem] leading-relaxed text-muted-foreground">
        <p>
          {ABOUT_TEXT}
        </p>
        <p>
          {ABOUT_TEXT_2}
        </p>
      </div>
    </section>
  );
}
