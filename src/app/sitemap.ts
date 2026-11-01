import type { MetadataRoute } from 'next';
import { SITEMAP_HOME_PRIORITY, SITEMAP_WORK_PRIORITY } from '@/config/constants';
import { getSelectedProjects, workPath } from '@/lib/case-studies';
import { absoluteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap[number] = {
    url: absoluteUrl('/'),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: SITEMAP_HOME_PRIORITY,
  };

  const work: MetadataRoute.Sitemap = getSelectedProjects().map((project) => {
    return {
      url: absoluteUrl(workPath(project.slug)),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: SITEMAP_WORK_PRIORITY,
    };
  });

  return [home, ...work];
}
