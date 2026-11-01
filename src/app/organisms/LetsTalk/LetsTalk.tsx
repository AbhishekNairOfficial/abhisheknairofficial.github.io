import { Mail } from 'lucide-react';
import { PageSection } from '@/app/molecules/PageSection';
import { SocialLinks } from '@/components/SocialLinks';
import {
  AVAILABILITY_LINE,
  CONTACT_EMAIL,
  CONTACT_TEXT,
  CONTACT_TITLE,
} from '@/config/constants';

const mailClassName =
  'inline-flex items-center gap-3 bg-primary px-6 py-3 font-mono text-sm text-primary-foreground transition-colors hover:bg-primary/90';

const LetsTalk = () => {
  return (
    <PageSection
      id="contact"
      title={CONTACT_TITLE}
    >
      <p className="mb-4 text-lg leading-relaxed text-foreground">
        {AVAILABILITY_LINE}
      </p>
      <p className="mb-10 leading-relaxed text-muted-foreground">
        {CONTACT_TEXT}
      </p>
      <a
        className={mailClassName}
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
    </PageSection>
  );
};

export default LetsTalk;
