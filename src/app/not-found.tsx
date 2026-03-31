import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6">
      <p className="font-mono text-xs text-primary uppercase tracking-widest mb-4">
        404
      </p>
      <h1 className="font-primary text-3xl sm:text-4xl font-semibold mb-4 text-center">
        Page not found
      </h1>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        className="font-mono text-xs uppercase tracking-widest text-primary border-b border-primary hover:text-foreground hover:border-foreground transition-colors"
        href="/"
      >
        Back to home
      </Link>
    </div>
  );
}
