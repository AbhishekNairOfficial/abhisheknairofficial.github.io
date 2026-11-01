import { ImageResponse } from 'next/og';
import {
  OG_IMAGE_BG,
  OG_IMAGE_FONT_FAMILY,
  OG_IMAGE_KICKER_COLOR,
  OG_IMAGE_KICKER_MARGIN_PX,
  OG_IMAGE_KICKER_SIZE_PX,
  OG_IMAGE_KICKER_TRACKING,
  OG_IMAGE_PADDING_PX,
  OG_IMAGE_SIZE,
  OG_IMAGE_TAGLINE_COLOR,
  OG_IMAGE_TAGLINE_LINE_HEIGHT,
  OG_IMAGE_TAGLINE_MAX_WIDTH_PX,
  OG_IMAGE_TAGLINE_SIZE_PX,
  OG_IMAGE_TITLE_COLOR,
  OG_IMAGE_TITLE_FONT_WEIGHT,
  OG_IMAGE_TITLE_LINE_HEIGHT,
  OG_IMAGE_TITLE_MARGIN_PX,
  OG_IMAGE_TITLE_SIZE_PX,
} from '@/config/constants';

interface OgImageContent {
  kicker: string;
  title: string;
  tagline: string;
}

export function createOgImage({ kicker, title, tagline }: OgImageContent): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          background: OG_IMAGE_BG,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: OG_IMAGE_PADDING_PX,
          fontFamily: OG_IMAGE_FONT_FAMILY,
        }}
      >
        <div
          style={{
            color: OG_IMAGE_KICKER_COLOR,
            fontSize: OG_IMAGE_KICKER_SIZE_PX,
            letterSpacing: OG_IMAGE_KICKER_TRACKING,
            textTransform: 'uppercase',
            marginBottom: OG_IMAGE_KICKER_MARGIN_PX,
          }}
        >
          {kicker}
        </div>
        <div
          style={{
            color: OG_IMAGE_TITLE_COLOR,
            fontSize: OG_IMAGE_TITLE_SIZE_PX,
            fontWeight: OG_IMAGE_TITLE_FONT_WEIGHT,
            lineHeight: OG_IMAGE_TITLE_LINE_HEIGHT,
            marginBottom: OG_IMAGE_TITLE_MARGIN_PX,
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: OG_IMAGE_TAGLINE_COLOR,
            fontSize: OG_IMAGE_TAGLINE_SIZE_PX,
            maxWidth: OG_IMAGE_TAGLINE_MAX_WIDTH_PX,
            lineHeight: OG_IMAGE_TAGLINE_LINE_HEIGHT,
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    { ...OG_IMAGE_SIZE },
  );
}
