"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface EventCardData {
  id: number;
  title: string;
  date: string;
  type: string;
  description: string;
  status: "UPCOMING" | "COMPLETED" | "LIVE";
  color: string;
}

const EVENTS: EventCardData[] = [
  {
    id: 1,
    title: "AWS Solutions Architect Bootcamp",
    date: "July 15-18, 2026",
    type: "Bootcamp",
    description: "4-day immersive coding camp on AWS VPC topologies, database configurations, and IAM setups.",
    status: "UPCOMING",
    color: "#0073BB",
  },
  {
    id: 2,
    title: "Serverless Buildathon REC 2026",
    date: "June 25, 2026",
    type: "Hackathon",
    description: "National building contest. Solve problem statements using API Gateway, AWS Lambda, and DynamoDB.",
    status: "LIVE",
    color: "#FF9900",
  },
  {
    id: 3,
    title: "Cloud Practitioner Essentials",
    date: "May 10, 2026",
    type: "Workshop",
    description: "Introductory seminar for freshman students exploring storage models and elastic billing models.",
    status: "COMPLETED",
    color: "#232F3E",
  },
  {
    id: 4,
    title: "AWS re:Invent Chapter Sync",
    date: "August 05, 2026",
    type: "Summit",
    description: "Expert keynote panel with AWS cloud developers sharing container orchestration standards.",
    status: "UPCOMING",
    color: "#FF9900",
  },
  {
    id: 5,
    title: "EKS Kubernetes Masterclass",
    date: "April 18, 2026",
    type: "Workshop",
    description: "Deploying containerized microservices in multi-region clusters using AWS EKS clusters.",
    status: "COMPLETED",
    color: "#0073BB",
  }
];

export default function Events() {
  const [isPaused, setIsPaused] = useState(false);

  // Double list to create seamless scrolling loop
  const loopEvents = [...EVENTS, ...EVENTS];

  return (
    <section
      id="events"
      style={{
        width: "100%",
        padding: "80px 4%",
        background: "#FFFFFF",
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 800,
              color: "#FF9900",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginBottom: "12px",
              display: "inline-block",
            }}
          >
            CHAPTER EVENTS
          </span>
          <h2
            style={{
              fontSize: "clamp(30px, 3.5vw, 44px)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#232F3E",
              letterSpacing: "-1px",
              maxWidth: "700px",
              margin: "0 auto 16px auto",
            }}
          >
            Vibrant Bootcamps, Workshops, and Coding Hackathons
          </h2>
          <p style={{ fontSize: "15px", color: "#5c6b73", maxWidth: "600px", margin: "0 auto" }}>
            Hover over any event card to pause the scroll track, explore descriptions, and review schedule details.
          </p>
        </div>

        {/* Carousel Infinite Scroller Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            width: "100%",
            overflow: "hidden",
            display: "flex",
            position: "relative",
            padding: "20px 0",
          }}
        >
          {/* Scroll track */}
          <div
            style={{
              display: "flex",
              gap: "24px",
              width: "max-content",
              animation: "marquee 35s linear infinite",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {loopEvents.map((ev, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                style={{
                  width: "320px",
                  background: "rgba(255, 255, 255, 0.75)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1.5px solid rgba(35, 47, 62, 0.08)",
                  borderRadius: "24px",
                  padding: "28px",
                  boxShadow: "0 6px 20px rgba(35, 47, 62, 0.02)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "default",
                  animation: ev.status === "LIVE" ? "glowBorder 3s infinite" : "none",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                }}
                className="interactive-hover"
              >
                <div>
                  {/* Status & Category Tag */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 800,
                        color: ev.color,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      {ev.type}
                    </span>
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 800,
                        padding: "4px 8px",
                        borderRadius: "10px",
                        background:
                          ev.status === "LIVE"
                            ? "rgba(255, 153, 0, 0.1)"
                            : ev.status === "UPCOMING"
                            ? "rgba(0, 115, 187, 0.1)"
                            : "rgba(35, 47, 62, 0.06)",
                        color:
                          ev.status === "LIVE"
                            ? "#FF9900"
                            : ev.status === "UPCOMING"
                            ? "#0073BB"
                            : "#5c6b73",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {ev.status}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: 800,
                      color: "#232F3E",
                      marginBottom: "8px",
                      lineHeight: 1.3,
                    }}
                  >
                    {ev.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "12.5px",
                      color: "#5c6b73",
                      lineHeight: 1.5,
                      marginBottom: "16px",
                    }}
                  >
                    {ev.description}
                  </p>
                </div>
                {/* Date display */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", borderTop: "1px solid rgba(35, 47, 62, 0.06)", paddingTop: "14px", marginTop: "10px" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ev.color} strokeWidth="2.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#232F3E" }}>{ev.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
