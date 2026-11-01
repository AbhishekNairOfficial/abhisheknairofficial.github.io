import { Mail } from 'lucide-react';
import { SocialLinks } from '@/components/SocialLinks';
import {
  CONTACT_EMAIL,
  CONTACT_TEXT,
  CONTACT_TITLE,
  HERO_AVAILABILITY,
  PRIMARY_LINK_CLASSNAME,
} from '@/config/constants';

const LetsTalk = () => (
  <section
    className="scroll-mt-16 py-24 border-t border-border"
    id="contact"
  >
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="font-display text-3xl sm:text-4xl mb-12 md:mb-16">
        {CONTACT_TITLE}
      </h2>
      <div className="max-w-2xl">
        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
          {CONTACT_TEXT}
        </p>
        <p className="text-foreground mb-10">
          {HERO_AVAILABILITY}
        </p>
        <a
          className={PRIMARY_LINK_CLASSNAME}
          href={`mailto:${CONTACT_EMAIL}`}
        >
          <Mail
            aria-hidden
            className="h-4 w-4"
          />
          {CONTACT_EMAIL}
        </a>
        <div className="mt-10">
          <SocialLinks
            className="flex gap-4"
            variant="footer"
          />
        </div>
      </div>
    </div>
  </section>
);

export default LetsTalk;
