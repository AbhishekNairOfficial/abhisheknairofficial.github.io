import { PageSection } from '@/app/molecules/PageSection';
import { SystemsDiagram } from '@/app/molecules/SystemsDiagram';
import {
  SYSTEMS_DIAGRAM_DESCRIPTION,
  SYSTEMS_DIAGRAM_TITLE,
  SYSTEMS_LAYER_BROWSER,
  SYSTEMS_LAYER_CAPTION_BROWSER,
  SYSTEMS_LAYER_CAPTION_CLOUD,
  SYSTEMS_LAYER_CAPTION_DEVICE,
  SYSTEMS_LAYER_CAPTION_NETWORK,
  SYSTEMS_LAYER_CLOUD,
  SYSTEMS_LAYER_DEVICE,
  SYSTEMS_LAYER_NETWORK,
} from '@/config/constants';

const LAYERS = [
  {
    caption: SYSTEMS_LAYER_CAPTION_BROWSER,
    label: SYSTEMS_LAYER_BROWSER,
  },
  {
    caption: SYSTEMS_LAYER_CAPTION_NETWORK,
    label: SYSTEMS_LAYER_NETWORK,
  },
  {
    caption: SYSTEMS_LAYER_CAPTION_DEVICE,
    label: SYSTEMS_LAYER_DEVICE,
  },
  {
    caption: SYSTEMS_LAYER_CAPTION_CLOUD,
    label: SYSTEMS_LAYER_CLOUD,
  },
] as const;

export function Systems() {
  return (
    <PageSection
      id="systems"
      title={SYSTEMS_DIAGRAM_TITLE}
    >
      <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
        {SYSTEMS_DIAGRAM_DESCRIPTION}
      </p>
      <div className="mt-10 flex flex-col items-start gap-10 md:flex-row md:gap-14">
        <div className="shrink-0">
          <SystemsDiagram />
        </div>
        <ul className="w-full max-w-md space-y-5">
          {LAYERS.map((layer) => {
            return (
              <li key={layer.label}>
                <p className="text-sm font-medium text-foreground">
                  {layer.label}
                </p>
                <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {layer.caption}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </PageSection>
  );
}
