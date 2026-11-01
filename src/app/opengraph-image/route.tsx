import { NAME, OG_IMAGE_KICKER, OG_IMAGE_TAGLINE } from '@/config/constants';
import { createOgImage } from '@/lib/og-image';

export function GET() {
  return createOgImage({
    kicker: OG_IMAGE_KICKER,
    title: NAME,
    tagline: OG_IMAGE_TAGLINE,
  });
}
