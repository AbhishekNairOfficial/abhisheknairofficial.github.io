/* eslint-disable no-magic-numbers -- SVG geometry for the signature diagram */
import type { ReactNode } from 'react';
import {
  SYSTEMS_DIAGRAM_DESCRIPTION,
  SYSTEMS_DIAGRAM_TITLE,
  SYSTEMS_LAYER_BROWSER,
  SYSTEMS_LAYER_CLOUD,
  SYSTEMS_LAYER_DEVICE,
  SYSTEMS_LAYER_NETWORK,
} from '@/config/constants';

const VIEW_WIDTH = 400;
const VIEW_HEIGHT = 260;
const NODE_WIDTH = 132;
const NODE_HEIGHT = 44;
const NODE_RX = 10;
const LABEL_X = 38;
const LABEL_Y = 24;

function nodeTransform(centerX: number, centerY: number): string {
  const x = centerX - NODE_WIDTH / 2;
  const y = centerY - NODE_HEIGHT / 2;
  return `translate(${x} ${y})`;
}

interface DiagramNodeProps {
  children: ReactNode;
  className: string;
  label: string;
  transform: string;
}

function DiagramNode({ children, className, label, transform }: DiagramNodeProps) {
  return (
    <g
      aria-label={label}
      className={`system-node ${className}`}
      role="img"
      tabIndex={0}
      transform={transform}
    >
      <rect
        className="node-shape"
        fill="hsl(var(--card))"
        height={NODE_HEIGHT}
        rx={NODE_RX}
        stroke="hsl(var(--border))"
        strokeWidth={1.75}
        width={NODE_WIDTH}
        x={0}
        y={0}
      />
      {children}
      <text
        className="node-label"
        dominantBaseline="middle"
        fill="hsl(var(--muted-foreground))"
        x={LABEL_X}
        y={LABEL_Y}
      >
        {label}
      </text>
    </g>
  );
}

function BrowserIcon() {
  return (
    <g
      className="node-icon-line"
      transform="translate(14 14)"
    >
      <rect
        height="12"
        rx="1.5"
        width="15"
        x="0.5"
        y="1"
      />
      <path d="M0.5 4.5 H15.5" />
    </g>
  );
}

function DeviceIcon() {
  return (
    <g
      className="node-icon-line"
      transform="translate(16 12)"
    >
      <rect
        height="16"
        rx="2"
        width="11"
        x="0.5"
        y="1"
      />
      <path d="M4 14.5 H8" />
    </g>
  );
}

function NetworkIcon() {
  return (
    <g
      className="node-icon-line"
      transform="translate(14 14)"
    >
      <circle
        cx="3"
        cy="8"
        r="2"
      />
      <circle
        cx="8"
        cy="3"
        r="2"
      />
      <circle
        cx="13"
        cy="8"
        r="2"
      />
      <path d="M4.6 6.6 L6.4 4.4 M9.6 4.4 L11.4 6.6" />
    </g>
  );
}

function CloudIcon() {
  return (
    <g
      className="node-icon-line"
      transform="translate(13 14)"
    >
      <path d="M4.5 12.5 H13.2 A3.2 3.2 0 0 0 13.4 6.2 4 4 0 0 0 5.8 5.1 3.1 3.1 0 0 0 4.5 12.5 Z" />
    </g>
  );
}

export function SystemsDiagram() {
  return (
    <figure className="mx-auto mb-12 w-full max-w-[400px]">
      <svg
        aria-labelledby="systems-diagram-caption"
        className="systems-diagram h-auto w-full"
        height={VIEW_HEIGHT}
        preserveAspectRatio="xMidYMid meet"
        role="group"
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        width={VIEW_WIDTH}
      >
        <path
          className="system-edge edge-browser"
          d="M200 62 V102"
          fill="none"
          stroke="hsl(var(--border))"
          strokeLinecap="round"
          strokeWidth={1.75}
        />
        <path
          className="system-edge edge-device"
          d="M200 146 L86 194"
          fill="none"
          stroke="hsl(var(--border))"
          strokeLinecap="round"
          strokeWidth={1.75}
        />
        <path
          className="system-edge edge-cloud"
          d="M200 146 L314 194"
          fill="none"
          stroke="hsl(var(--border))"
          strokeLinecap="round"
          strokeWidth={1.75}
        />

        <DiagramNode
          className="node-browser"
          label={SYSTEMS_LAYER_BROWSER}
          transform={nodeTransform(200, 40)}
        >
          <BrowserIcon />
        </DiagramNode>
        <DiagramNode
          className="node-network"
          label={SYSTEMS_LAYER_NETWORK}
          transform={nodeTransform(200, 124)}
        >
          <NetworkIcon />
        </DiagramNode>
        <DiagramNode
          className="node-device"
          label={SYSTEMS_LAYER_DEVICE}
          transform={nodeTransform(86, 216)}
        >
          <DeviceIcon />
        </DiagramNode>
        <DiagramNode
          className="node-cloud"
          label={SYSTEMS_LAYER_CLOUD}
          transform={nodeTransform(314, 216)}
        >
          <CloudIcon />
        </DiagramNode>
      </svg>
      <figcaption
        className="mt-4 text-center text-sm leading-relaxed text-muted-foreground"
        id="systems-diagram-caption"
      >
        <span className="block font-mono text-xs uppercase tracking-widest text-primary">
          {SYSTEMS_DIAGRAM_TITLE}
        </span>
        <span className="mt-2 block">
          {SYSTEMS_DIAGRAM_DESCRIPTION}
        </span>
      </figcaption>
    </figure>
  );
}
