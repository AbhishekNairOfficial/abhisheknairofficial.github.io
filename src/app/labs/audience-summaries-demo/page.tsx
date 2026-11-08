import type { Metadata } from 'next';
import { ProjectSummary } from '@/app/molecules/Projects/ProjectSummary';
import { getDemoCards } from './demo-fixtures';

export const metadata: Metadata = {
  title: 'Synthetic demo, not real content',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AudienceSummariesDemoPage() {
  const cards = getDemoCards();
  return (
    <main
      className="mx-auto max-w-3xl px-4 py-12"
      id="main"
    >
      <p
        className="rounded-md border border-border bg-muted px-4 py-3 font-semibold text-foreground"
        role="note"
      >
        Synthetic demo, not real content
      </p>
      <h1 className="mt-6 font-primary text-2xl font-semibold text-foreground">
        Audience summaries demo
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Test fixture — not owner approved. These cards use fictional harbor-ledger placeholders, not real projects or employers.
      </p>
      <ul className="mt-8">
        {cards.map((card) => {
          return (
            <li
              className="border-t border-border py-6 first:border-t-0 first:pt-0"
              key={card.projectId}
            >
              <h2 className="font-primary text-xl font-semibold text-foreground">
                {card.title}
              </h2>
              <ProjectSummary
                original={card.original}
                projectId={card.projectId}
                resolved={card.resolved}
                title={card.title}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
}
