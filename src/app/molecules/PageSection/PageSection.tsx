import type { ReactNode } from 'react';

interface PageSectionProps {
  children: ReactNode;
  id: string;
  title: string;
}

export function PageSection({ children, id, title }: PageSectionProps) {
  return (
    <section
      className="scroll-mt-20 border-t border-border py-16 md:py-24"
      id={id}
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <h2 className="mb-10 font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
