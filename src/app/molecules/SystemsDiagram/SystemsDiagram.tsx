/* eslint-disable no-magic-numbers -- SVG geometry for the quiet systems illustration */
import type { ReactNode } from 'react';
import {
  SYSTEMS_LAYER_BROWSER,
  SYSTEMS_LAYER_CLOUD,
  SYSTEMS_LAYER_DEVICE,
  SYSTEMS_LAYER_NETWORK,
} from '@/config/constants';

const VIEW_WIDTH = 400;
const VIEW_HEIGHT = 320;
const NODE_WIDTH = 152;
const NODE_HEIGHT = 60;
const NODE_RX = 14;
const LABEL_X = 46;
const LABEL_Y = 32;
const CENTER_X = 200;
const BROWSER_Y = 50;
const NETWORK_Y = 152;
const LEAF_Y = 266;
const DEVICE_X = 96;
const CLOUD_X = 304;
const HALF_NODE_H = NODE_HEIGHT / 2;
const BROWSER_BOTTOM = BROWSER_Y + HALF_NODE_H;
const NETWORK_TOP = NETWORK_Y - HALF_NODE_H;
const NETWORK_BOTTOM = NETWORK_Y + HALF_NODE_H;
const LEAF_TOP = LEAF_Y - HALF_NODE_H;

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

function DiagramNode({
  children,
  className,
  label,
  transform,
}: DiagramNodeProps) {
  return (
    <g
      className={`system-node ${className}`}
      transform={transform}
    >
      <rect
        className="node-shape"
        height={NODE_HEIGHT}
        rx={NODE_RX}
        width={NODE_WIDTH}
        x={0}
        y={0}
      />
      {children}
      <text
        className="node-label"
        dominantBaseline="middle"
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
      transform="translate(16 20)"
    >
      <rect
        height="16"
        rx="2"
        width="18"
        x="0.5"
        y="1"
      />
      <path d="M0.5 5.5 H18.5" />
    </g>
  );
}

function DeviceIcon() {
  return (
    <g
      className="node-icon-line"
      transform="translate(18 18)"
    >
      <rect
        height="20"
        rx="2.5"
        width="13"
        x="0.5"
        y="1"
      />
      <path d="M4.5 17.5 H9.5" />
    </g>
  );
}

function NetworkIcon() {
  return (
    <g
      className="node-icon-line"
      transform="translate(16 19)"
    >
      <circle
        cx="9"
        cy="3.5"
        r="2"
      />
      <circle
        cx="3.5"
        cy="15"
        r="2"
      />
      <circle
        cx="14.5"
        cy="15"
        r="2"
      />
      <path d="M9 5.5 L9 9.5 M9 9.5 L4.8 13.2 M9 9.5 L13.2 13.2" />
    </g>
  );
}

function CloudIcon() {
  return (
    <g
      className="node-icon-line"
      transform="translate(15 20)"
    >
      <path d="M5 16 H15.5 A3.6 3.6 0 0 0 15.7 8.9 4.4 4.4 0 0 0 7.2 7.6 3.4 3.4 0 0 0 5 16 Z" />
    </g>
  );
}

function QuietPacket() {
  const endY = NETWORK_TOP - BROWSER_BOTTOM;
  return (
    <g
      aria-hidden="true"
      className="data-packets"
      transform={`translate(${CENTER_X} ${BROWSER_BOTTOM})`}
    >
      <circle
        className="data-packet"
        cx={0}
        cy={0}
        r={2.25}
      >
        <animateMotion
          dur="6s"
          path={`M0 0 L0 ${endY}`}
          repeatCount="indefinite"
          rotate="0"
        />
      </circle>
    </g>
  );
}

export function SystemsDiagram() {
  return (
    <svg
      aria-hidden="true"
      className="systems-diagram h-auto w-full max-w-[20rem]"
      focusable="false"
      height={VIEW_HEIGHT}
      preserveAspectRatio="xMidYMid meet"
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      width={VIEW_WIDTH}
    >
      <path
        className="system-edge"
        d={`M${CENTER_X} ${BROWSER_BOTTOM} V${NETWORK_TOP}`}
        fill="none"
      />
      <path
        className="system-edge"
        d={`M${CENTER_X} ${NETWORK_BOTTOM} L${DEVICE_X} ${LEAF_TOP}`}
        fill="none"
      />
      <path
        className="system-edge"
        d={`M${CENTER_X} ${NETWORK_BOTTOM} L${CLOUD_X} ${LEAF_TOP}`}
        fill="none"
      />
      <QuietPacket />
      <DiagramNode
        className="node-browser"
        label={SYSTEMS_LAYER_BROWSER}
        transform={nodeTransform(CENTER_X, BROWSER_Y)}
      >
        <BrowserIcon />
      </DiagramNode>
      <DiagramNode
        className="node-network"
        label={SYSTEMS_LAYER_NETWORK}
        transform={nodeTransform(CENTER_X, NETWORK_Y)}
      >
        <NetworkIcon />
      </DiagramNode>
      <DiagramNode
        className="node-device"
        label={SYSTEMS_LAYER_DEVICE}
        transform={nodeTransform(DEVICE_X, LEAF_Y)}
      >
        <DeviceIcon />
      </DiagramNode>
      <DiagramNode
        className="node-cloud"
        label={SYSTEMS_LAYER_CLOUD}
        transform={nodeTransform(CLOUD_X, LEAF_Y)}
      >
        <CloudIcon />
      </DiagramNode>
    </svg>
  );
}
