import { ImageResponse } from 'next/og';
import {
  NAME,
  OG_IMAGE_KICKER,
  OG_IMAGE_SIZE,
  OG_IMAGE_TAGLINE,
  SYSTEMS_LAYER_BROWSER,
  SYSTEMS_LAYER_CLOUD,
  SYSTEMS_LAYER_DEVICE,
  SYSTEMS_LAYER_NETWORK,
} from '@/config/constants';

const OG_BG = '#141110';
const OG_FG = '#F3EFEA';
const OG_MUTED = 'rgba(243, 239, 234, 0.72)';
const OG_ACCENT = '#4ECFC3';
const OG_LINE = 'rgba(243, 239, 234, 0.28)';
const OG_NODE_BG = '#1C1917';
const OG_NODE_BORDER = 'rgba(243, 239, 234, 0.32)';

function OgNode({ label }: { label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `2px solid ${OG_NODE_BORDER}`,
        background: OG_NODE_BG,
        borderRadius: 14,
        color: OG_FG,
        fontSize: 16,
        letterSpacing: 0.4,
        padding: '8px 18px',
      }}
    >
      {label}
    </div>
  );
}

function OgDiagram() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 260,
      }}
    >
      <OgNode label={SYSTEMS_LAYER_BROWSER} />
      <div
        style={{
          display: 'flex',
          width: 2,
          height: 22,
          background: OG_LINE,
        }}
      />
      <OgNode label={SYSTEMS_LAYER_NETWORK} />
      <div
        style={{
          display: 'flex',
          width: 118,
          height: 28,
          borderBottom: `2px solid ${OG_LINE}`,
          borderLeft: `2px solid ${OG_LINE}`,
          borderRight: `2px solid ${OG_LINE}`,
        }}
      />
      <div
        style={{
          display: 'flex',
          width: 230,
          justifyContent: 'space-between',
        }}
      >
        <OgNode label={SYSTEMS_LAYER_DEVICE} />
        <OgNode label={SYSTEMS_LAYER_CLOUD} />
      </div>
    </div>
  );
}

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: OG_BG,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '64px 72px',
          fontFamily: 'Georgia, ui-serif, serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 740,
          }}
        >
          <div
            style={{
              display: 'flex',
              color: OG_ACCENT,
              fontSize: 15,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 24,
              maxWidth: 680,
              flexWrap: 'wrap',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            }}
          >
            {OG_IMAGE_KICKER}
          </div>
          <div
            style={{
              display: 'flex',
              color: OG_FG,
              fontSize: 58,
              lineHeight: 1.08,
              marginBottom: 22,
            }}
          >
            {NAME}
          </div>
          <div
            style={{
              display: 'flex',
              color: OG_MUTED,
              fontSize: 24,
              lineHeight: 1.4,
              maxWidth: 680,
            }}
          >
            {OG_IMAGE_TAGLINE}
          </div>
        </div>
        <OgDiagram />
      </div>
    ),
    { ...OG_IMAGE_SIZE },
  );
}
