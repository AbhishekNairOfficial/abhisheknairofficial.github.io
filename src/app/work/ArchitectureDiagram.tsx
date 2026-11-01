import type { ReactNode } from 'react';
import type { CaseStudyDiagramKind } from '@/config/constants';

interface ArchitectureDiagramProps {
  kind: CaseStudyDiagramKind;
  caption: string;
}

function DiagramBox({ children }: { children: ReactNode }) {
  return (
    <div className="border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground text-center min-w-[7rem]">
      {children}
    </div>
  );
}

function DiagramArrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      aria-hidden
      className={`h-4 w-4 text-primary flex-shrink-0 ${down ? 'rotate-90' : ''}`}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function FederationDiagram() {
  return (
    <div className="flex flex-col items-center gap-3">
      <DiagramBox>
        Enterprise product suite
      </DiagramBox>
      <DiagramArrow down />
      <DiagramBox>
        Module Federation
      </DiagramBox>
      <DiagramArrow down />
      <DiagramBox>
        Independent team deployments
      </DiagramBox>
    </div>
  );
}

function WindowsToRnDiagram() {
  return (
    <div className="flex flex-col items-center gap-3">
      <DiagramBox>
        Windows desktop
      </DiagramBox>
      <DiagramArrow down />
      <DiagramBox>
        React Native
      </DiagramBox>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <DiagramBox>
          iOS
        </DiagramBox>
        <DiagramBox>
          Android
        </DiagramBox>
        <DiagramBox>
          Windows
        </DiagramBox>
      </div>
    </div>
  );
}

function ToolConsolidationDiagram() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
      <DiagramBox>
        5 legacy tools
      </DiagramBox>
      <DiagramArrow />
      <DiagramBox>
        Digital Orders Dashboard
      </DiagramBox>
    </div>
  );
}

function diagramByKind(kind: CaseStudyDiagramKind) {
  switch (kind) {
    case 'federation':
      return <FederationDiagram />;
    case 'windows-to-rn':
      return <WindowsToRnDiagram />;
    case 'tool-consolidation':
      return <ToolConsolidationDiagram />;
    default:
      return null;
  }
}

export function ArchitectureDiagram({ kind, caption }: ArchitectureDiagramProps) {
  return (
    <figure className="mt-6 border border-border bg-card p-6">
      <div className="overflow-x-auto">
        {diagramByKind(kind)}
      </div>
      <figcaption className="mt-4 font-mono text-[11px] text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
