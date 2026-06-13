"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  memo,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NodeData {
  id: string;
  name: string;
  short: string;
  details: string;
  color: string;
  ring: "inner" | "middle" | "outer";
  /** starting angle in degrees */
  startAngle: number;
  icon: React.ReactNode;
}

// ─── Tooltip (rendered outside the orbit so it is never clipped) ─────────────
const Tooltip = memo(
  ({
    node,
    x,
    y,
    nodeSize,
    tooltipW,
    tooltipH,
    containerSize,
    above,
  }: {
    node: NodeData;
    x: any; // MotionValue<number>
    y: any;
    nodeSize: number;
    tooltipW: number;
    tooltipH: number;
    containerSize: number;
    above: boolean;
  }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute",
        width: `${tooltipW}px`,
        pointerEvents: "none",
        zIndex: 200,
        left: x,
        top: y,
        translateX: "-50%",
        translateY: above
          ? `calc(-100% - ${nodeSize / 2 + 10}px)`
          : `${nodeSize / 2 + 10}px`,
      }}
    >
      <div
        style={{
          padding: "10px 14px",
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1.5px solid rgba(35,47,62,0.09)",
          borderRadius: "13px",
          boxShadow:
            "0 12px 36px rgba(35,47,62,0.10), 0 2px 8px rgba(0,115,187,0.06)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#232F3E",
            marginBottom: "4px",
            whiteSpace: "nowrap",
          }}
        >
          {node.name}
        </div>
        <div
          style={{
            fontSize: "10px",
            color: "#5c6b73",
            lineHeight: 1.4,
          }}
        >
          {node.details}
        </div>
      </div>
    </motion.div>
  )
);
Tooltip.displayName = "Tooltip";

// ─── Individual orbit node (icon only) ───────────────────────────────────────
const OrbitNode = memo(
  ({
    node,
    x,
    y,
    nodeSize,
    isHovered,
    onEnter,
    onLeave,
  }: {
    node: NodeData;
    x: any;
    y: any;
    nodeSize: number;
    isHovered: boolean;
    onEnter: () => void;
    onLeave: () => void;
  }) => (
    <motion.div
      style={{
        position: "absolute",
        left: x,
        top: y,
        translateX: "-50%",
        translateY: "-50%",
        zIndex: isHovered ? 150 : 30,
        // critical: GPU-accelerated, no layout recalc
        willChange: "transform",
      }}
    >
      {/* Invisible 72 px hover pad prevents flicker when mouse drifts */}
      <div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{
          width: 72,
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <motion.div
          animate={{ scale: isHovered ? 1.18 : 1 }}
          transition={{ type: "spring", stiffness: 340, damping: 22 }}
          style={{
            width: nodeSize,
            height: nodeSize,
            borderRadius: 14,
            background: "#FFFFFF",
            border: isHovered
              ? `2px solid ${node.color}`
              : "1.5px solid rgba(35,47,62,0.12)",
            boxShadow: isHovered
              ? `0 8px 24px ${node.color}33`
              : "0 4px 14px rgba(35,47,62,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isHovered ? node.color : "#232F3E",
            transition: "border 0.25s, box-shadow 0.25s, color 0.25s",
          }}
        >
          {node.icon}
        </motion.div>
      </div>
    </motion.div>
  )
);
OrbitNode.displayName = "OrbitNode";

// ─── Helpers ──────────────────────────────────────────────────────────────────
/** Degrees → radians */
const d2r = (d: number) => (d * Math.PI) / 180;

/**
 * Given a ring radius and a square container of `size`px, return the
 * largest radius that keeps a `pad`px bounding box fully inside.
 */
function clampRadius(desired: number, containerSize: number, pad: number) {
  const max = containerSize / 2 - pad;
  return Math.min(desired, Math.max(0, max));
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CloudOrbit() {
  // ── State ──
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  // We need to track tooltip "above / below" per node without causing re-renders
  // every frame, so we only setState when the value actually flips.
  const [tooltipAbove, setTooltipAbove] = useState<boolean[]>(
    new Array(10).fill(false)
  );
  const tooltipAboveRef = useRef<boolean[]>(new Array(10).fill(false));

  // Ref mirror of hovered id so the animation frame reads it without stale closures
  const hoveredIdRef = useRef<string | null>(null);

  // Tracked angle accumulators (degrees) — updated each frame
  const anglesRef = useRef<number[]>([45, 135, 225, 315, 60, 180, 300, 0, 120, 240]);

  // ── Resize ──
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setScreenSize(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Derived geometry ──
  const { containerSize, centerR, nodeSize, radii, tooltipW } = useMemo(() => {
    const isMobile = screenSize === "mobile";
    const isTablet = screenSize === "tablet";

    const containerSize = isMobile ? 320 : isTablet ? 430 : 620;
    const centerR = isMobile ? 42 : isTablet ? 48 : 60;
    const nodeSize = isMobile ? 36 : isTablet ? 40 : 46;
    const tooltipW = isMobile ? 130 : 182;

    // Half-width of the largest element placed on each ring
    // (tooltip is wider than the node icon)
    const tooltipHalfW = tooltipW / 2 + 6; // small extra margin
    const nodeHalfW = nodeSize / 2 + 6;

    // Node bounding box including tooltip (worst case: tooltip above/below node)
    const tooltipH = 70; // approximate rendered height of tooltip card
    const nodeWithTooltipHalfH = nodeSize / 2 + 10 + tooltipH + 6;

    // Safe radius: node must not clip container edges (horizontal OR vertical)
    const safeR = (desired: number) => {
      const rByX = clampRadius(desired, containerSize, tooltipHalfW);
      const rByY = clampRadius(desired, containerSize, nodeWithTooltipHalfH);
      // Also must not collide with center hub
      const rMin = centerR + nodeHalfW + 12;
      return Math.max(rMin, Math.min(rByX, rByY));
    };

    const radii = {
      inner: safeR(isMobile ? 80 : isTablet ? 92 : 126),
      middle: safeR(isMobile ? 118 : isTablet ? 150 : 210),
      outer: safeR(isMobile ? 150 : isTablet ? 195 : 285),
    };

    return { containerSize, centerR, nodeSize, radii, tooltipW };
  }, [screenSize]);

  const cx = containerSize / 2;
  const cy = containerSize / 2;

  // ── Node definitions (static — memoised with empty dep array) ──
  const nodes: NodeData[] = useMemo(
    () => [
      // Outer ring — 4 nodes, 90° apart
      {
        id: "learning",
        name: "Hands-On Learning",
        short: "Learning",
        details: "Real AWS services. Real cloud experience.",
        color: "#0073BB",
        ring: "outer",
        startAngle: 45,
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#0073BB" />
            <path d="M6 10v6c0 2 3 3 6 3s6-1 6-3v-6" stroke="#FF9900" />
            <path d="M22 7v10" stroke="#232F3E" />
          </svg>
        ),
      },
      {
        id: "projects",
        name: "Build Projects",
        short: "Projects",
        details: "Create applications that solve real problems.",
        color: "#FF9900",
        ring: "outer",
        startAngle: 135,
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5" stroke="#FF9900" />
            <path d="M12 2C7.5 2 4.5 5.5 4.5 10.5c0 1.5.5 3 1.5 4l8-8c-1-1-2.5-1.5-4-1.5z" stroke="#0073BB" />
            <path d="M22 2s-3.5 1-6.5 4l-4 4 8 8 4-6.5c3-3 6.5-6.5 6.5-6.5z" stroke="#0073BB" />
            <circle cx="16" cy="8" r="1.5" stroke="#FF9900" />
          </svg>
        ),
      },
      {
        id: "certifications",
        name: "Certifications",
        short: "Certs",
        details: "Prepare for AWS certifications with peers.",
        color: "#FF9900",
        ring: "outer",
        startAngle: 225,
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="6" stroke="#0073BB" />
            <path d="M8.5 13.5L6 22l6-3 6 3-2.5-8.5" stroke="#FF9900" />
          </svg>
        ),
      },
      {
        id: "community",
        name: "Community",
        short: "Community",
        details: "Connect with builders, mentors, and innovators.",
        color: "#232F3E",
        ring: "outer",
        startAngle: 315,
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#0073BB" />
            <circle cx="9" cy="7" r="4" stroke="#FF9900" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#232F3E" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#232F3E" />
          </svg>
        ),
      },
      // Middle ring — 3 nodes, 120° apart
      {
        id: "networking",
        name: "Networking",
        short: "Network",
        details: "Connect with peers, builders, and cloud professionals.",
        color: "#0073BB",
        ring: "middle",
        startAngle: 60,
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" stroke="#0073BB" />
            <circle cx="5" cy="5" r="2.5" stroke="#FF9900" />
            <circle cx="19" cy="5" r="2.5" stroke="#FF9900" />
            <circle cx="5" cy="19" r="2.5" stroke="#232F3E" />
            <circle cx="19" cy="19" r="2.5" stroke="#232F3E" />
            <line x1="7.3" y1="7.3" x2="9.8" y2="9.8" stroke="#232F3E" />
            <line x1="16.7" y1="7.3" x2="14.2" y2="9.8" stroke="#232F3E" />
            <line x1="7.3" y1="16.7" x2="9.8" y2="14.2" stroke="#232F3E" />
            <line x1="16.7" y1="16.7" x2="14.2" y2="14.2" stroke="#232F3E" />
          </svg>
        ),
      },
      {
        id: "mentorship",
        name: "Mentorship",
        short: "Mentors",
        details: "Learn from experienced mentors and industry experts.",
        color: "#FF9900",
        ring: "middle",
        startAngle: 180,
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#0073BB" />
            <circle cx="8" cy="7" r="4" stroke="#232F3E" />
            <path d="M16 11l2 2 4-4" stroke="#FF9900" />
          </svg>
        ),
      },
      {
        id: "exposure",
        name: "Industry Exposure",
        short: "Exposure",
        details: "Gain insights into real-world cloud technologies and careers.",
        color: "#232F3E",
        ring: "middle",
        startAngle: 300,
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" stroke="#0073BB" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="#FF9900" />
          </svg>
        ),
      },
      // Inner ring — 3 nodes, 120° apart
      {
        id: "events",
        name: "Events & Workshops",
        short: "Events",
        details: "Learn directly from industry experts.",
        color: "#0073BB",
        ring: "inner",
        startAngle: 0,
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" stroke="#0073BB" />
            <path d="M19 10v1a7 7 0 0 1-14 0v-1" stroke="#FF9900" />
            <line x1="12" y1="19" x2="12" y2="22" stroke="#232F3E" />
          </svg>
        ),
      },
      {
        id: "hackathons",
        name: "Hackathons",
        short: "Hackathons",
        details: "Compete, innovate, and showcase your skills.",
        color: "#FF9900",
        ring: "inner",
        startAngle: 120,
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .5 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" stroke="#FF9900" />
            <line x1="9" y1="18" x2="15" y2="18" stroke="#0073BB" />
            <line x1="10" y1="22" x2="14" y2="22" stroke="#0073BB" />
          </svg>
        ),
      },
      {
        id: "speakers",
        name: "Speaker Sessions",
        short: "Speakers",
        details: "Interact with industry leaders and AWS professionals.",
        color: "#FF9900",
        ring: "inner",
        startAngle: 240,
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="12" rx="2" stroke="#0073BB" />
            <path d="M12 15v4" stroke="#FF9900" />
            <path d="M9 21h6" stroke="#FF9900" />
            <path d="M7 10l3-3 3 3 4-4" stroke="#232F3E" />
          </svg>
        ),
      },
    ],
    [] // static — never changes
  );

  // ── MotionValues for each node (10 total) ──
  // We declare them individually so the number of hooks is constant.
  const mv = [
    [useMotionValue(cx), useMotionValue(cy)],
    [useMotionValue(cx), useMotionValue(cy)],
    [useMotionValue(cx), useMotionValue(cy)],
    [useMotionValue(cx), useMotionValue(cy)],
    [useMotionValue(cx), useMotionValue(cy)],
    [useMotionValue(cx), useMotionValue(cy)],
    [useMotionValue(cx), useMotionValue(cy)],
    [useMotionValue(cx), useMotionValue(cy)],
    [useMotionValue(cx), useMotionValue(cy)],
    [useMotionValue(cx), useMotionValue(cy)],
  ];

  // ── Rotation speeds (deg/ms) ──
  // Outer: slow CW, Middle: moderate CCW, Inner: fast CW
  const SPEEDS: Record<NodeData["ring"], number> = useMemo(
    () => ({ outer: 0.006, middle: -0.0085, inner: 0.011 }),
    []
  );

  // ── Animation loop ──
  useAnimationFrame((_t, delta) => {
    const dt = Math.min(delta, 80); // cap to avoid jumps after tab switch
    const hovered = hoveredIdRef.current;

    const nextAbove = [...tooltipAboveRef.current];
    let aboveChanged = false;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const isH = node.id === hovered;

      // Advance angle (pause only the hovered node's own ring? — no, pause all when any hovered
      // to keep visual ring alignment). We advance everything unless something is hovered.
      if (!hovered) {
        anglesRef.current[i] =
          (anglesRef.current[i] + SPEEDS[node.ring] * dt + 360) % 360;
      }

      const R = radii[node.ring];
      const rad = d2r(anglesRef.current[i]);
      const nx = cx + R * Math.cos(rad);
      const ny = cy + R * Math.sin(rad);

      mv[i][0].set(nx);
      mv[i][1].set(ny);

      // Tooltip direction: show above when node is in bottom half of container
      // (so tooltip doesn't go below the container), and vice versa.
      const inBottomHalf = Math.sin(rad) > 0; // y increases downward
      // If node is in top half → tooltip goes above iff we have room. 
      // Simplest safe rule: tooltip always on the "center side" (between node and center).
      // Node above center → tooltip below node (toward center). Node below → tooltip above.
      const shouldBeAbove = inBottomHalf; // tooltip points toward the center hub
      if (nextAbove[i] !== shouldBeAbove) {
        nextAbove[i] = shouldBeAbove;
        aboveChanged = true;
      }
    }

    if (aboveChanged) {
      tooltipAboveRef.current = nextAbove;
      setTooltipAbove([...nextAbove]);
    }
  });

  // ── Hover handlers ──
  const handleEnter = useCallback(
    (node: NodeData) => {
      setHoveredId(node.id);
      hoveredIdRef.current = node.id;
    },
    []
  );
  const handleLeave = useCallback(() => {
    setHoveredId(null);
    hoveredIdRef.current = null;
  }, []);

  // ── Render ──
  return (
    <div
      style={{
        position: "relative",
        width: containerSize,
        height: containerSize,
        flexShrink: 0,
        display: "block",
      }}
    >
      {/* ── Orbit rings (pure CSS rotation — visual only) ── */}
      {(["inner", "middle", "outer"] as const).map((ring) => {
        const r = radii[ring];
        const dur = ring === "inner" ? "28s" : ring === "middle" ? "40s" : "55s";
        return (
          <React.Fragment key={ring}>
            {/* Ring gradient overlay */}
            <div
              style={{
                position: "absolute",
                width: r * 2 + 4,
                height: r * 2 + 4,
                left: cx - r - 2,
                top: cy - r - 2,
                borderRadius: "50%",
                background: `conic-gradient(from 0deg, transparent, rgba(255,153,0,0.08), transparent, rgba(0,115,187,0.08), transparent)`,
                pointerEvents: "none",
                animation: `spinSlow ${dur} linear infinite`,
                animationPlayState: hoveredId ? "paused" : "running",
                zIndex: 1,
                mask: "radial-gradient(circle, transparent 50%, black 51%)",
                WebkitMask: "radial-gradient(circle, transparent 50%, black 51%)",
              }}
            />
            {/* Main ring */}
            <div
              style={{
                position: "absolute",
                width: r * 2,
                height: r * 2,
                left: cx - r,
                top: cy - r,
                borderRadius: "50%",
                border: "2px dashed rgba(35,47,62,0.38)",
                boxShadow: "0 0 20px rgba(35,47,62,0.03) inset",
                pointerEvents: "none",
                animation: `spinSlow ${dur} linear infinite`,
                animationPlayState: hoveredId ? "paused" : "running",
                zIndex: 1,
              }}
            />
            {/* Moving light dot */}
            <div
              style={{
                position: "absolute",
                width: 5,
                height: 5,
                left: cx + r - 3,
                top: cy - 3,
                borderRadius: "50%",
                background: "#FF9900",
                boxShadow: "0 0 8px #FF9900, 0 0 16px rgba(255,153,0,0.3)",
                pointerEvents: "none",
                animation: `spinSlow ${dur} linear infinite`,
                animationPlayState: hoveredId ? "paused" : "running",
                zIndex: 2,
              }}
            />
          </React.Fragment>
        );
      })}

      {/* ── Center glow ── */}
      <div
        style={{
          position: "absolute",
          width: centerR * 2 + 40,
          height: centerR * 2 + 40,
          left: cx - centerR - 20,
          top: cy - centerR - 20,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,153,0,0.10) 0%, rgba(0,115,187,0.04) 40%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* ── Center hub ── */}
      <div
        style={{
          position: "absolute",
          width: centerR * 2,
          height: centerR * 2,
          left: cx - centerR,
          top: cy - centerR,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#232F3E 0%,#0073BB 100%)",
          boxShadow:
            "0 0 32px rgba(0,115,187,0.32), 0 0 60px rgba(255,153,0,0.08), inset 0 2px 4px rgba(255,255,255,0.25)",
          border: "2px solid rgba(255,255,255,0.18)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          zIndex: 10,
          padding: 6,
        }}
      >
        <AnimatePresence mode="wait">
          {hoveredId ? (
            (() => {
              const h = nodes.find((n) => n.id === hoveredId)!;
              return (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <span style={{ color: h.color, display: "flex" }}>{h.icon}</span>
                  <span
                    style={{
                      fontSize: screenSize === "mobile" ? 8 : 10,
                      fontWeight: 800,
                      marginTop: 2,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {h.short}
                  </span>
                </motion.div>
              );
            })()
          ) : (
            <motion.div
              key="hub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <span
                style={{
                  fontSize: screenSize === "mobile" ? 8 : 11,
                  fontWeight: 900,
                  letterSpacing: "0.5px",
                  whiteSpace: "nowrap",
                }}
              >
                AWS SBG REC
              </span>
              <span
                style={{
                  fontSize: screenSize === "mobile" ? 6 : 7,
                  fontWeight: 700,
                  color: "#FF9900",
                  marginTop: 3,
                  letterSpacing: "0.5px",
                  whiteSpace: "nowrap",
                }}
              >
                Build • Learn • Connect
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── SVG connector lines ── */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          overflow: "visible",
          zIndex: 2,
        }}
      >
        {nodes.map((node, i) => {
          const isH = node.id === hoveredId;
          return (
            <motion.line
              key={node.id}
              x1={cx}
              y1={cy}
              x2={mv[i][0]}
              y2={mv[i][1]}
              stroke={isH ? "rgba(255,153,0,0.45)" : "rgba(35,47,62,0.07)"}
              strokeWidth={isH ? 2.5 : 1.5}
              strokeDasharray={isH ? "none" : "4 6"}
              style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
            />
          );
        })}
      </svg>

      {/* ── Orbit nodes ── */}
      {nodes.map((node, i) => (
        <OrbitNode
          key={node.id}
          node={node}
          x={mv[i][0]}
          y={mv[i][1]}
          nodeSize={nodeSize}
          isHovered={node.id === hoveredId}
          onEnter={() => handleEnter(node)}
          onLeave={handleLeave}
        />
      ))}

      {/* ── Tooltips (rendered last so they are always on top) ── */}
      {nodes.map((node, i) =>
        node.id === hoveredId ? (
          <AnimatePresence key={node.id}>
            <Tooltip
              node={node}
              x={mv[i][0]}
              y={mv[i][1]}
              nodeSize={nodeSize}
              tooltipW={tooltipW}
              tooltipH={72}
              containerSize={containerSize}
              above={tooltipAbove[i]}
            />
          </AnimatePresence>
        ) : null
      )}
    </div>
  );
}
