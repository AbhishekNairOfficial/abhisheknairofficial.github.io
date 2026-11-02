/* eslint-disable max-lines -- signature SVG diagram plus interaction */
/* eslint-disable no-magic-numbers -- SVG geometry for the signature diagram */
'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type {
  FocusEvent,
  KeyboardEvent,
  PointerEvent,
  ReactNode,
  RefObject,
} from 'react';
import {
  SYSTEMS_DIAGRAM_DESCRIPTION,
  SYSTEMS_DIAGRAM_TITLE,
  SYSTEMS_LAYER_BROWSER,
  SYSTEMS_LAYER_CAPTIONS,
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
const EDGE_BROWSER = `M${CENTER_X} ${BROWSER_BOTTOM} V${NETWORK_TOP}`;
const EDGE_DEVICE = `M${CENTER_X} ${NETWORK_BOTTOM} L${DEVICE_X} ${LEAF_TOP}`;
const EDGE_CLOUD = `M${CENTER_X} ${NETWORK_BOTTOM} L${CLOUD_X} ${LEAF_TOP}`;
const PACKET_RADIUS = 3.25;
const JOINT_RADIUS = 2.4;

type LayerId = keyof typeof SYSTEMS_LAYER_CAPTIONS;

function nodeTransform(centerX: number, centerY: number): string {
  const x = centerX - NODE_WIDTH / 2;
  const y = centerY - NODE_HEIGHT / 2;
  return `translate(${x} ${y})`;
}

function isLayerId(value: string | null): value is LayerId {
  return value === 'browser'
    || value === 'device'
    || value === 'network'
    || value === 'cloud';
}

function readLayer(target: EventTarget | null): LayerId | null {
  if (!(target instanceof Element)) {
    return null;
  }
  const attr = target.closest('[data-layer]')?.getAttribute('data-layer') ?? null;
  if (isLayerId(attr)) {
    return attr;
  }
  return null;
}

function captionFor(layer: LayerId | null): string {
  if (!layer) {
    return SYSTEMS_DIAGRAM_DESCRIPTION;
  }
  return SYSTEMS_LAYER_CAPTIONS[layer];
}

interface DiagramNodeProps {
  active: boolean;
  children: ReactNode;
  className: string;
  label: string;
  layer: LayerId;
  transform: string;
}

function DiagramNode({
  active,
  children,
  className,
  label,
  layer,
  transform,
}: DiagramNodeProps) {
  const activeClass = active ? ' is-active' : '';
  return (
    <g
      aria-label={label}
      aria-pressed={active}
      className={`system-node ${className}${activeClass}`}
      data-layer={layer}
      role="button"
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

function Joint({ x, y }: { x: number; y: number }) {
  return (
    <circle
      className="system-joint"
      cx={x}
      cy={y}
      r={JOINT_RADIUS}
    />
  );
}

interface DataPacketProps {
  duration: string;
  endX: number;
  endY: number;
}

function DataPacket({ duration, endX, endY }: DataPacketProps) {
  return (
    <circle
      className="data-packet"
      cx={0}
      cy={0}
      r={PACKET_RADIUS}
    >
      <animateMotion
        dur={duration}
        path={`M0 0 L${endX} ${endY}`}
        repeatCount="indefinite"
        rotate="0"
      />
    </circle>
  );
}

function DataPackets() {
  return (
    <g
      aria-hidden="true"
      className="data-packets"
    >
      <g transform={`translate(${CENTER_X} ${BROWSER_BOTTOM})`}>
        <DataPacket
          duration="3.8s"
          endX={0}
          endY={NETWORK_TOP - BROWSER_BOTTOM}
        />
      </g>
      <g transform={`translate(${CENTER_X} ${NETWORK_BOTTOM})`}>
        <DataPacket
          duration="4.4s"
          endX={DEVICE_X - CENTER_X}
          endY={LEAF_TOP - NETWORK_BOTTOM}
        />
      </g>
      <g transform={`translate(${CENTER_X} ${NETWORK_BOTTOM})`}>
        <DataPacket
          duration="5.2s"
          endX={CLOUD_X - CENTER_X}
          endY={LEAF_TOP - NETWORK_BOTTOM}
        />
      </g>
    </g>
  );
}

function usePacketPause(svgRef: RefObject<SVGSVGElement | null>) {
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) {
      return undefined;
    }
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (document.hidden || motionQuery.matches) {
        svg.pauseAnimations();
        return;
      }
      svg.unpauseAnimations();
    };
    sync();
    document.addEventListener('visibilitychange', sync);
    motionQuery.addEventListener('change', sync);
    return () => {
      document.removeEventListener('visibilitychange', sync);
      motionQuery.removeEventListener('change', sync);
    };
  }, [svgRef]);
}

function useDiagramLayer() {
  const [hoverLayer, setHoverLayer] = useState<LayerId | null>(null);
  const [stickyLayer, setStickyLayer] = useState<LayerId | null>(null);

  const setFromTarget = useCallback((event: FocusEvent | PointerEvent) => {
    const next = readLayer(event.target);
    if (!next) {
      return;
    }
    if ('pointerType' in event && event.pointerType === 'mouse') {
      setHoverLayer(next);
      return;
    }
    setHoverLayer(null);
    setStickyLayer(next);
  }, []);

  const activateSticky = useCallback((event: KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    event.preventDefault();
    const next = readLayer(event.target);
    if (next) {
      setStickyLayer(next);
    }
  }, []);

  const clearHover = useCallback((event: PointerEvent) => {
    if (event.pointerType === 'touch') {
      return;
    }
    setHoverLayer(null);
  }, []);

  const clearIfLeaving = useCallback((event: FocusEvent) => {
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) {
      return;
    }
    setHoverLayer(null);
    setStickyLayer(null);
  }, []);

  return {
    activateSticky,
    clearHover,
    clearIfLeaving,
    layer: hoverLayer ?? stickyLayer,
    setFromTarget,
  };
}

export function SystemsDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);
  const {
    activateSticky,
    clearHover,
    clearIfLeaving,
    layer,
    setFromTarget,
  } = useDiagramLayer();
  usePacketPause(svgRef);
  const caption = captionFor(layer);

  return (
    <figure
      className="mx-auto mb-8 w-full max-w-[400px] overflow-visible sm:mb-10"
      onBlur={clearIfLeaving}
      onFocus={setFromTarget}
      onKeyDown={activateSticky}
      onPointerLeave={clearHover}
      onPointerOver={setFromTarget}
    >
      <svg
        aria-label={SYSTEMS_DIAGRAM_TITLE}
        className="systems-diagram h-auto w-full overflow-visible"
        data-active-layer={layer ?? undefined}
        height={VIEW_HEIGHT}
        preserveAspectRatio="xMidYMid meet"
        ref={svgRef}
        role="group"
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        width={VIEW_WIDTH}
      >
        <path
          className="system-edge edge-browser"
          d={EDGE_BROWSER}
          fill="none"
          stroke="hsl(var(--border))"
          strokeLinecap="round"
          strokeWidth={1.75}
        />
        <path
          className="system-edge edge-device"
          d={EDGE_DEVICE}
          fill="none"
          stroke="hsl(var(--border))"
          strokeLinecap="round"
          strokeWidth={1.75}
        />
        <path
          className="system-edge edge-cloud"
          d={EDGE_CLOUD}
          fill="none"
          stroke="hsl(var(--border))"
          strokeLinecap="round"
          strokeWidth={1.75}
        />
        <Joint
          x={CENTER_X}
          y={BROWSER_BOTTOM}
        />
        <Joint
          x={CENTER_X}
          y={NETWORK_TOP}
        />
        <Joint
          x={CENTER_X}
          y={NETWORK_BOTTOM}
        />
        <DataPackets />

        <DiagramNode
          active={layer === 'browser'}
          className="node-browser"
          label={SYSTEMS_LAYER_BROWSER}
          layer="browser"
          transform={nodeTransform(CENTER_X, BROWSER_Y)}
        >
          <BrowserIcon />
        </DiagramNode>
        <DiagramNode
          active={layer === 'network'}
          className="node-network"
          label={SYSTEMS_LAYER_NETWORK}
          layer="network"
          transform={nodeTransform(CENTER_X, NETWORK_Y)}
        >
          <NetworkIcon />
        </DiagramNode>
        <DiagramNode
          active={layer === 'device'}
          className="node-device"
          label={SYSTEMS_LAYER_DEVICE}
          layer="device"
          transform={nodeTransform(DEVICE_X, LEAF_Y)}
        >
          <DeviceIcon />
        </DiagramNode>
        <DiagramNode
          active={layer === 'cloud'}
          className="node-cloud"
          label={SYSTEMS_LAYER_CLOUD}
          layer="cloud"
          transform={nodeTransform(CLOUD_X, LEAF_Y)}
        >
          <CloudIcon />
        </DiagramNode>
      </svg>
      <figcaption className="mt-5 text-center">
        <span className="block font-mono text-xs uppercase tracking-widest text-primary">
          {SYSTEMS_DIAGRAM_TITLE}
        </span>
        <span
          aria-atomic="true"
          aria-live="polite"
          className="mt-2 block min-h-[3rem] text-pretty text-sm leading-relaxed text-muted-foreground"
        >
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
