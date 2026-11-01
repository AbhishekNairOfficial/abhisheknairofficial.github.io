'use client';

import {
  ERROR_PAGE_DESCRIPTION,
  ERROR_PAGE_TITLE,
  ERROR_PAGE_TRY_AGAIN,
} from '@/config/constants';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6">
      <h1 className="text-2xl font-primary font-semibold mb-2">
        {ERROR_PAGE_TITLE}
      </h1>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        {ERROR_PAGE_DESCRIPTION}
      </p>
      <button
        className="bg-primary px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
        onClick={reset}
        type="button"
      >
        {ERROR_PAGE_TRY_AGAIN}
      </button>
    </div>
  );
}
