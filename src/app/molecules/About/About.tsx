import { Download } from 'lucide-react';
import { FadeIn } from '@/components/motion';
import {
  ABOUT_SECTION_NUMBER,
  ABOUT_TITLE,
  ABOUT_TEXT,
  ABOUT_TEXT_2,
  QUICK_FACTS,
  RESUME_URL,
} from '@/config/constants';

export function About() {
  return (
    <section
      className="py-24 border-t border-border"
      id="about"
    >
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs text-primary">
              {ABOUT_SECTION_NUMBER}
            </span>
            <h2 className="font-literata text-3xl sm:text-4xl font-semibold">
              {ABOUT_TITLE}
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16">
          <FadeIn delay={0.1}>
            <div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {ABOUT_TEXT}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {ABOUT_TEXT_2}
              </p>
              <a
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest bg-primary text-primary-foreground px-5 py-3 hover:bg-primary/90 transition-colors"
                download
                href={RESUME_URL}
              >
                <Download className="h-3 w-3" />
                Download Resume
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-6">
              {QUICK_FACTS.map((fact) => (
                <div
                  className="flex items-start gap-4 group"
                  key={fact.number}
                >
                  <span className="font-mono text-xs text-primary mt-1">
                    {fact.number}
                  </span>
                  <div className="flex-1 border-b border-border pb-4 group-last:border-0">
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">
                      {fact.label}
                    </p>
                    <p className="text-foreground">
                      {fact.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
