import type { MetadataRoute } from 'next';
import { META_SITE_URL } from '@/config/constants';

export default function robots(): MetadataRoute.Robots {
  const base = META_SITE_URL.replace(/\/$/, '');
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
