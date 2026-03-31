import Link from 'next/link';
import {
  NOT_FOUND_BACK_HOME,
  NOT_FOUND_CODE,
  NOT_FOUND_DESCRIPTION,
  NOT_FOUND_TITLE,
} from '@/config/constants';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6">
      <p className="font-mono text-xs text-primary uppercase tracking-widest mb-4">
        {NOT_FOUND_CODE}
      </p>
      <h1 className="font-primary text-3xl sm:text-4xl font-semibold mb-4 text-center">
        {NOT_FOUND_TITLE}
      </h1>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        {NOT_FOUND_DESCRIPTION}
      </p>
      <Link
        className="font-mono text-xs uppercase tracking-widest text-primary border-b border-primary hover:text-foreground hover:border-foreground transition-colors"
        href="/"
      >
        {NOT_FOUND_BACK_HOME}
      </Link>
    </div>
  );
}
