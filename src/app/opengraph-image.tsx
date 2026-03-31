import { ImageResponse } from 'next/og';

export const alt = 'Abhishek Panthalingal — Lead Engineer & Architect';
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
          Portfolio
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
          Abhishek Panthalingal
        </div>
        <div
          style={{
            color: 'rgba(250, 250, 249, 0.65)',
            fontSize: 30,
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          Lead Engineer & Architect — frontend systems at scale
        </div>
      </div>
    ),
    { ...size },
  );
}
