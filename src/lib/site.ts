import { META_SITE_URL } from '@/config/constants';

export function siteBaseUrl(): string {
  return META_SITE_URL.replace(/\/$/, '');
}

export function absoluteUrl(path = '/'): string {
  const base = siteBaseUrl();
  if (path === '/') {
    return `${base}/`;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
