import { ImageResponse } from 'next/og';
import { NAME, OG_IMAGE_ALT, OG_IMAGE_KICKER, OG_IMAGE_TAGLINE } from '@/config/constants';

export const alt = OG_IMAGE_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 72,
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            color: '#f59e0b',
            fontSize: 22,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          {OG_IMAGE_KICKER}
        </div>
        <div
          style={{
            color: '#fafaf9',
            fontSize: 68,
            fontWeight: 400,
            lineHeight: 1.05,
            marginBottom: 20,
          }}
        >
          {NAME}
        </div>
        <div
          style={{
            color: 'rgba(250, 250, 249, 0.65)',
            fontSize: 30,
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          {OG_IMAGE_TAGLINE}
        </div>
      </div>
    ),
    { ...size },
  );
}
