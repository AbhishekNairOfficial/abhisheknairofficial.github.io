import { NextResponse } from 'next/server';
import { CASE_STUDY_OG_KICKER } from '@/config/constants';
import { getProjectBySlug, isSelectedWorkSlug } from '@/lib/case-studies';
import { createOgImage } from '@/lib/og-image';

const HTTP_STATUS_NOT_FOUND = 404;

interface OgRouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, context: OgRouteContext) {
  const { slug } = await context.params;
  const project = getProjectBySlug(slug);

  if (!project || !isSelectedWorkSlug(slug)) {
    return new NextResponse('Not found', { status: HTTP_STATUS_NOT_FOUND });
  }

  const tagline = project.outcomes[0] ?? project.summary;

  return createOgImage({
    kicker: project.client ?? CASE_STUDY_OG_KICKER,
    title: project.title,
    tagline,
  });
}
