import {
  CONTACT_EMAIL,
  RESUME_BUTTON_LABEL,
  RESUME_URL,
  SOCIAL_LINKS,
  socialProfileLinkAriaLabel,
} from '@/config/constants';
import { TEXT_LINK } from '@/lib/styles';

export function ConnectLinks() {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-2">
      {SOCIAL_LINKS.map((link) => (
        <li key={link.label}>
          <a
            aria-label={socialProfileLinkAriaLabel(link.label)}
            className={`font-mono text-xs ${TEXT_LINK}`}
            href={link.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {link.label}
          </a>
        </li>
      ))}
      <li>
        <a
          className={`font-mono text-xs ${TEXT_LINK}`}
          download
          href={RESUME_URL}
        >
          {RESUME_BUTTON_LABEL}
        </a>
      </li>
      <li>
        <a
          className={`font-mono text-xs ${TEXT_LINK}`}
          href={`mailto:${CONTACT_EMAIL}`}
        >
          {CONTACT_EMAIL}
        </a>
      </li>
    </ul>
  );
}
