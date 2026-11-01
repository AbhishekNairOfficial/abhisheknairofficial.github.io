import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  CASE_STUDY_OG_KICKER,
  NAME,
  OG_IMAGE_SIZE,
} from '@/config/constants';
import {
  getAdjacentProjects,
  getCaseStudySections,
  getProjectBySlug,
  getSelectedProjects,
  isSelectedWorkSlug,
  workPath,
} from '@/lib/case-studies';
import { absoluteUrl } from '@/lib/site';
import { CaseStudyTemplate } from '@/app/work/CaseStudyTemplate';

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getSelectedProjects().map((project) => {
    return { slug: project.slug };
  });
}

export const dynamicParams = false;

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || !isSelectedWorkSlug(slug)) {
    return {};
  }

  const url = absoluteUrl(workPath(slug));
  const ogImage = absoluteUrl(`${workPath(slug)}/opengraph-image`);
  const title = `${project.title} | ${NAME}`;
  const description = project.summary;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: NAME,
      type: 'article',
      images: [
        {
          url: ogImage,
          width: OG_IMAGE_SIZE.width,
          height: OG_IMAGE_SIZE.height,
          alt: `${project.title} — ${CASE_STUDY_OG_KICKER}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const sections = getCaseStudySections(slug);

  if (!project || !sections || !isSelectedWorkSlug(slug)) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <main id="main">
      <CaseStudyTemplate
        next={next}
        prev={prev}
        project={project}
        sections={sections}
      />
    </main>
  );
}
