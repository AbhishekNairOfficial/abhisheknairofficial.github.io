'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <h1 className="text-2xl font-primary mb-2">Something went wrong</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <button
        className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </div>
  );
}
