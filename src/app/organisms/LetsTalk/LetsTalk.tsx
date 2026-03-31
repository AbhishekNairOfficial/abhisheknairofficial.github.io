import { Mail, ArrowUpRight } from 'lucide-react';
import { FadeIn } from '@/components/motion';
import { SocialLinks } from '@/components/SocialLinks';
import {
  CONTACT_EMAIL,
  CONTACT_SECTION_NUMBER,
  CONTACT_TEXT,
  CONTACT_TITLE,
} from '@/config/constants';

const LetsTalk = () => (
  <section
    className="py-24 border-t border-primary/10"
    id="contact"
  >
    <div className="max-w-6xl mx-auto px-6">
      <FadeIn>
        <div className="group flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-primary">
            {CONTACT_SECTION_NUMBER}
          </span>
          <h2 className="font-literata text-3xl sm:text-4xl font-semibold">
            {CONTACT_TITLE}
          </h2>
          <div className="h-px flex-1 bg-border transition-colors duration-500 group-hover:bg-primary/40" />
        </div>
      </FadeIn>

      <div className="max-w-2xl">
        <FadeIn delay={0.1}>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10">
            {CONTACT_TEXT}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <a
              className="inline-flex items-center gap-3 font-mono text-sm bg-primary text-primary-foreground px-6 py-3 hover:bg-primary/90 transition-all hover:scale-[1.03] hover:shadow-md active:scale-[0.97] motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              <Mail
                aria-hidden
                className="h-4 w-4"
              />
              {CONTACT_EMAIL}
              <ArrowUpRight
                aria-hidden
                className="h-3 w-3"
              />
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-10">
            <SocialLinks
              className="flex gap-4"
              variant="footer"
            />
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

export default LetsTalk;
