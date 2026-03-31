'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6">
      <h1 className="text-2xl font-primary font-semibold mb-2">
        Something went wrong
      </h1>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <button
        className="px-5 py-2.5 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </div>
  );
}
