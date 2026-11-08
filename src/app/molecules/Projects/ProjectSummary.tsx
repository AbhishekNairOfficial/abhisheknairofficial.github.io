'use client';

import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import {
  AUDIENCES,
  isSummaryView,
  type Audience,
  type ResolvedSummary,
  type SummaryView,
} from '@/features/project-summaries/types';

export interface ProjectSummaryProps {
  projectId: string;
  title: string;
  original: string;
  resolved: ResolvedSummary;
}

const VIEW_OPTIONS: { view: SummaryView; label: string }[] = [
  { view: 'original', label: 'Original' },
  { view: 'recruiter', label: 'Recruiter' },
  { view: 'client', label: 'Client' },
  { view: 'technical', label: 'Technical' },
];

const PACIFIC_TIME_ZONE = 'America/Los_Angeles';

export function ProjectSummary(props: ProjectSummaryProps) {
  if (props.resolved.kind === 'original') {
    return (
      <OriginalParagraph text={props.original} />
    );
  }
  return (
    <ApprovedSummary
      original={props.original}
      projectId={props.projectId}
      resolved={props.resolved}
      title={props.title}
    />
  );
}

function ApprovedSummary(props: {
  projectId: string;
  title: string;
  original: string;
  resolved: Extract<ResolvedSummary, { kind: 'approved' }>;
}) {
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<SummaryView>('original');
  useEffect(() => {
    setReady(true);
  }, []);
  const onViewChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (isSummaryView(value)) {
      setView(value);
    }
  }, []);
  if (!ready) {
    return (
      <FallbackSummary
        original={props.original}
        resolved={props.resolved}
        title={props.title}
      />
    );
  }
  return (
    <EnhancedSummary
      onViewChange={onViewChange}
      original={props.original}
      projectId={props.projectId}
      resolved={props.resolved}
      title={props.title}
      view={view}
    />
  );
}

function OriginalParagraph({ text }: { text: string }) {
  return (
    <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
      {text}
    </p>
  );
}

function FallbackSummary(props: {
  title: string;
  original: string;
  resolved: Extract<ResolvedSummary, { kind: 'approved' }>;
}) {
  return (
    <div className="project-summary-fallback">
      <OriginalParagraph text={props.original} />
      <p className="mt-2 text-sm text-muted-foreground">
        Original project text.
      </p>
      {AUDIENCES.map((audience) => {
        return (
          <details key={audience}>
            <summary>
              {viewLabel(audience)}
            </summary>
            <AudienceBody
              audience={audience}
              resolved={props.resolved}
            />
          </details>
        );
      })}
    </div>
  );
}

function EnhancedSummary(props: {
  projectId: string;
  title: string;
  original: string;
  resolved: Extract<ResolvedSummary, { kind: 'approved' }>;
  view: SummaryView;
  // eslint-disable-next-line no-unused-vars -- callback type parameter
  onViewChange: (change: ChangeEvent<HTMLInputElement>) => void;
}) {
  const panelId = `project-summary-panel-${props.projectId}`;
  const groupName = `summary-view-${props.projectId}`;
  return (
    <div className="project-summary-enhanced">
      <p className="mt-2 text-sm text-muted-foreground">
        These are alternate summaries of the same approved project facts, not new evidence.
      </p>
      <fieldset className="project-summary-controls">
        <legend>
          {`Summary view for ${props.title}`}
        </legend>
        {VIEW_OPTIONS.map((option) => {
          const optionId = `${groupName}-${option.view}`;
          return (
            <label
              className="project-summary-option"
              htmlFor={optionId}
              key={option.view}
            >
              <input
                checked={props.view === option.view}
                id={optionId}
                name={groupName}
                onChange={props.onViewChange}
                type="radio"
                value={option.view}
              />
              {option.label}
            </label>
          );
        })}
      </fieldset>
      <div
        className="project-summary-panel"
        id={panelId}
      >
        <VisibleSummary
          original={props.original}
          resolved={props.resolved}
          view={props.view}
        />
      </div>
    </div>
  );
}

function VisibleSummary(props: {
  original: string;
  resolved: Extract<ResolvedSummary, { kind: 'approved' }>;
  view: SummaryView;
}) {
  if (props.view === 'original') {
    return (
      <>
        <OriginalParagraph text={props.original} />
        <p className="mt-2 text-sm text-muted-foreground">
          Original project text.
        </p>
      </>
    );
  }
  return (
    <AudienceBody
      audience={props.view}
      resolved={props.resolved}
    />
  );
}

function AudienceBody(props: {
  audience: Audience;
  resolved: Extract<ResolvedSummary, { kind: 'approved' }>;
}) {
  const view = props.resolved.views[props.audience];
  return (
    <div>
      <OriginalParagraph text={view.text} />
      <p className="mt-2 text-sm text-muted-foreground">
        {attribution(view.assisted, props.resolved.reviewedBy)}
      </p>
      <p className="mt-1 font-mono text-xs text-muted-foreground">
        {formatPacificDate(props.resolved.approvedAt)}
      </p>
    </div>
  );
}

function viewLabel(audience: Audience): string {
  if (audience === 'recruiter') {
    return 'Recruiter';
  }
  if (audience === 'client') {
    return 'Client';
  }
  return 'Technical';
}

function attribution(assisted: boolean, reviewedBy: string): string {
  if (assisted) {
    return `AI-assisted summary · reviewed by ${reviewedBy}`;
  }
  return `Summary · reviewed by ${reviewedBy}`;
}

function formatPacificDate(iso: string): string {
  const formatted = new Intl.DateTimeFormat('en-US', {
    timeZone: PACIFIC_TIME_ZONE,
    dateStyle: 'medium',
  }).format(new Date(iso));
  return `${formatted} Pacific Time`;
}
