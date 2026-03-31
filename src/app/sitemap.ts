import type { MetadataRoute } from 'next';
import { META_SITE_URL } from '@/config/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = META_SITE_URL.replace(/\/$/, '');
  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
