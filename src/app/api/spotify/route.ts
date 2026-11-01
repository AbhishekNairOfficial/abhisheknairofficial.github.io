import { NextResponse } from 'next/server';
import { getFooterSpotifyData } from '@/utils/footer-spotify';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const HTTP_STATUS_OK = 200;

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
  Pragma: 'no-cache',
  Expires: '0',
};

export async function GET(): Promise<NextResponse> {
  const payload = await getFooterSpotifyData();
  return NextResponse.json(payload, {
    status: HTTP_STATUS_OK,
    headers: NO_STORE_HEADERS,
  });
}
