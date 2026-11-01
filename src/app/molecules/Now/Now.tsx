import { PageSection } from '@/app/molecules/PageSection';
import { NowPlaying } from '@/components/NowPlaying';
import { NOW_FOCUS, NOW_TITLE } from '@/config/constants';

export function Now() {
  return (
    <PageSection
      id="now"
      title={NOW_TITLE}
    >
      <p className="mb-6 leading-relaxed text-foreground">
        {NOW_FOCUS}
      </p>
      <NowPlaying />
    </PageSection>
  );
}
