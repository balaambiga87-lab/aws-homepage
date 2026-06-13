"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TechHub {
  id: string;
  name: string;
  role: string;
  cx: number;
  cy: number;
  details: string;
  color: string;
}

export default function CommunityMap() {
  const [hoveredHub, setHoveredHub] = useState<TechHub | null>(null);

  const hubs: TechHub[] = [
    {
      id: "chennai",
      name: "REC Chennai Chapter (Main Hub)",
      role: "Rajalakshmi Engineering College Chapter HQ",
      cx: 260,
      cy: 470,
      details: "Our central builder community base organizing bootcamps, workshops, and hackathons.",
      color: "#FF9900",
    },
    {
      id: "bangalore",
      name: "AWS Bangalore HQ",
      role: "Industry Resource Connections",
      cx: 210,
      cy: 440,
      details: "Direct tech syncs, guest panels, and employee mentor connects.",
      color: "#0073BB",
    },
    {
      id: "mumbai",
      name: "AWS Mumbai AP-SOUTH-1",
      role: "Core Region Infrastructure",
      cx: 140,
      cy: 350,
      details: "Primary cloud computing data center servers hosting student builder applications.",
      color: "#232F3E",
    },
    {
      id: "hyderabad",
      name: "AWS Hyderabad Region",
      role: "Secondary cloud nodes",
      cx: 240,
      cy: 370,
      details: "Redundant cluster hosting and multi-region database setup labs.",
      color: "#0073BB",
    },
    {
      id: "delhi",
      name: "New Delhi Chapter Sync",
      role: "National Builder Day Hub",
      cx: 200,
      cy: 160,
      details: "National student builder summits and college challenge presentations.",
      color: "#FF9900",
    }
  ];

  return (
    <section
      id="community-map"
      style={{
        width: "100%",
        padding: "80px 4%",
        background: "#FFFFFF",
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "56px",
          alignItems: "center",
        }}
      >
        {/* Left Side text content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 800,
              color: "#0073BB",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginBottom: "12px",
            }}
          >
            NATIONAL REACH
          </span>
          <h2
            style={{
              fontSize: "clamp(30px, 3.5vw, 44px)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#232F3E",
              letterSpacing: "-1px",
              marginBottom: "20px",
            }}
          >
            Connected Across Key Indian Cloud Infrastructure
          </h2>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.6,
              color: "#5c6b73",
              marginBottom: "16px",
            }}
          >
            Rajalakshmi Engineering College is strategically linked to prime tech hubs and AWS local regions.
            Our students design topologies that extend across multiple availability zones, ensuring deep, hands-on
            comprehension of scalable global deployments.
          </p>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.6,
              color: "#5c6b73",
              marginBottom: "24px",
            }}
          >
            Hover over any pulsing city marker on the interactive vector layout to inspect the connection role and details.
          </p>

          {/* Active Detail Display */}
          <div style={{ minHeight: "120px" }}>
            <AnimatePresence mode="wait">
              {hoveredHub ? (
                <motion.div
                  key={hoveredHub.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    background: "rgba(35, 47, 62, 0.03)",
                    borderLeft: `4px solid ${hoveredHub.color}`,
                    padding: "16px 20px",
                    borderRadius: "0 16px 16px 0",
                  }}
                >
                  <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#232F3E", marginBottom: "4px" }}>
                    {hoveredHub.name}
                  </h4>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: hoveredHub.color, textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                    {hoveredHub.role}
                  </span>
                  <p style={{ fontSize: "13px", color: "#5c6b73", lineHeight: 1.45 }}>
                    {hoveredHub.details}
                  </p>
                </motion.div>
              ) : (
                <div
                  style={{
                    borderLeft: "4px solid rgba(35, 47, 62, 0.1)",
                    padding: "16px 20px",
                    color: "#5c6b73",
                    fontSize: "14px",
                    fontStyle: "italic",
                  }}
                >
                  Hover over any glowing connection node on the map to explore integrations.
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Side Map Canvas */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "560px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg
            viewBox="0 0 500 600"
            width="100%"
            height="100%"
            style={{
              background: "rgba(255,255,255,0.3)",
              borderRadius: "24px",
              border: "1.5px solid rgba(35, 47, 62, 0.05)",
            }}
          >
            {/* Draw Stylized Connection Lines from Chennai HQ (260, 470) */}
            {hubs.map((hub) => {
              if (hub.id === "chennai") return null;
              const isHovered = hoveredHub?.id === hub.id;
              return (
                <g key={`line-${hub.id}`}>
                  <line
                    x1="260"
                    y1="470"
                    x2={hub.cx}
                    y2={hub.cy}
                    stroke={isHovered ? "#FF9900" : "rgba(35, 47, 62, 0.15)"}
                    strokeWidth={isHovered ? 2.5 : 1}
                    strokeDasharray={isHovered ? "none" : "5,5"}
                    style={{ transition: "stroke 0.3s ease, stroke-width 0.3s ease" }}
                  />
                  {/* Glowing signal traveling along line */}
                  <motion.circle
                    r="4"
                    fill="#FF9900"
                    animate={{
                      cx: [260, hub.cx],
                      cy: [470, hub.cy],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </g>
              );
            })}

            {/* Hub node points */}
            {hubs.map((hub) => {
              const isHovered = hoveredHub?.id === hub.id;
              const isChennai = hub.id === "chennai";

              return (
                <g
                  key={hub.id}
                  onMouseEnter={() => setHoveredHub(hub)}
                  onMouseLeave={() => setHoveredHub(null)}
                  style={{ cursor: "pointer" }}
                  className="interactive-hover"
                >
                  {/* Ripple pulse circle */}
                  <circle
                    cx={hub.cx}
                    cy={hub.cy}
                    r={isChennai ? 24 : 16}
                    fill={hub.color}
                    opacity="0.15"
                    style={{
                      animation: "pulseRing 2s infinite ease-out",
                    }}
                  />
                  {/* Center Dot */}
                  <circle
                    cx={hub.cx}
                    cy={hub.cy}
                    r={isChennai ? 8 : 6}
                    fill={hub.color}
                    stroke="#FFFFFF"
                    strokeWidth={2}
                    style={{
                      transition: "transform 0.2s ease",
                      transformOrigin: `${hub.cx}px ${hub.cy}px`,
                      transform: isHovered ? "scale(1.2)" : "scale(1)",
                    }}
                  />
                  {/* Label Text */}
                  <text
                    x={hub.cx}
                    y={hub.cy - 12}
                    textAnchor="middle"
                    fill="#232F3E"
                    fontSize="9.5"
                    fontWeight="800"
                    style={{
                      opacity: isHovered ? 1 : 0.65,
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    {isChennai ? "REC CHENNAI" : hub.id.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
