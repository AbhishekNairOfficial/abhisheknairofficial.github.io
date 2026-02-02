import { SocialLinks } from '@/components/SocialLinks';
import { Mail, MapPin } from 'lucide-react';
import {
  FOOTER_CONNECT_DESC,
  FOOTER_CONNECT_TITLE,
  FOOTER_COPYRIGHT_TEXT,
  FOOTER_EMAIL,
  FOOTER_GET_IN_TOUCH_DESC,
  FOOTER_GET_IN_TOUCH_TITLE,
  FOOTER_LOCATION,
  FOOTER_QUICK_LINKS,
  FOOTER_QUICK_LINKS_TITLE,
} from '@/config/constants';

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-3xl mb-4">
              {FOOTER_GET_IN_TOUCH_TITLE}
            </h3>
            <p className="text-gray-300 mb-4">
              {FOOTER_GET_IN_TOUCH_DESC}
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-400" />
                <a
                  className="text-sm hover:text-emerald-400 transition-colors"
                  href={`mailto:${FOOTER_EMAIL}`}
                >
                  {FOOTER_EMAIL}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span className="text-sm">
                  {FOOTER_LOCATION}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-3xl mb-4">
              {FOOTER_QUICK_LINKS_TITLE}
            </h3>
            <ul className="space-y-2">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    className="text-sm hover:text-yellow-300 transition-colors"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-3xl mb-4">
              {FOOTER_CONNECT_TITLE}
            </h3>
            <p className="text-gray-300 mb-4 text-sm">
              {FOOTER_CONNECT_DESC}
            </p>
            <SocialLinks
              className="flex gap-4"
              variant="footer"
            />
          </div>
        </div>
      </div>

      <div className="bg-emerald-500 py-2">
        <p className="text-center text-black text-sm">
          ©
          {' '}
          {new Date().getFullYear()}
          {' '}
          {FOOTER_COPYRIGHT_TEXT}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
