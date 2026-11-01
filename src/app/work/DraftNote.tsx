import { CASE_STUDY_DRAFT_NOTE } from '@/config/constants';

export function DraftNote() {
  return (
    <p className="text-sm italic text-muted-foreground">
      {CASE_STUDY_DRAFT_NOTE}
    </p>
  );
}
