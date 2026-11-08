import { ProjectSummary } from '../../../src/app/molecules/Projects/ProjectSummary';
import { selectSummary } from '../../../src/features/project-summaries/select.server';
import {
  fixtureVerifier,
  makeCandidate,
  makeProject,
  makeRegistry,
  secondFixtureProject,
} from '../../project-summaries/fixtures';

function card(title: string, project = makeProject()) {
  const candidate = makeCandidate({ ...project, title });
  const registry = makeRegistry();
  registry.current[candidate.bundle.source.project.id] = candidate;
  return {
    title,
    original: candidate.bundle.source.project.summary,
    resolved: selectSummary({
      project: candidate.bundle.source.project,
      currentSourceHash: candidate.bundle.source.sourceHash,
      registry,
      verifyApproval: fixtureVerifier,
    }),
  };
}

export default function HarnessPage() {
  const one = card('Fixture One');
  const two = card('Fixture Two', secondFixtureProject());
  return (
    <main>
      <p className="harness-banner">
        Test fixture — not owner approved
      </p>
      <ProjectSummary
        original={one.original}
        projectId="fixture-one"
        resolved={one.resolved}
        title={one.title}
      />
      <ProjectSummary
        original={two.original}
        projectId="fixture-two"
        resolved={two.resolved}
        title={two.title}
      />
      <ProjectSummary
        original="This fictional pier notebook has no approved audience summaries."
        projectId="fixture-original-only"
        resolved={{ kind: 'original', reason: 'no-approved-release' }}
        title="Fixture Original Only"
      />
    </main>
  );
}
