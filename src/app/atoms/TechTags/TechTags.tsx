import { MONO_TAG } from '@/lib/styles';

interface TechTagsProps {
  tags: readonly string[];
}

export function TechTags({ tags }: TechTagsProps) {
  return (
    <p className="mt-3 flex flex-wrap gap-x-2 gap-y-1">
      {tags.map((tag) => (
        <span
          className={MONO_TAG}
          key={tag}
        >
          {tag}
        </span>
      ))}
    </p>
  );
}
