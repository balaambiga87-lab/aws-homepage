"use client";

import { useState } from "react";

const MARQUEE_TAGS = [
  "AWS CERTIFIED",
  "SERVERLESS",
  "SOLUTIONS ARCHITECT",
  "CLOUD PRACTITIONER",
  "MACHINE LEARNING",
  "DEVOPS PRO",
  "DYNAMODB",
  "KUBERNETES ON EKS",
  "RAJALAKSHMI ENGINEERING COLLEGE",
  "BUILD ON AWS",
  "IAM SECURITY",
  "CLOUDFRONT CDN",
  "LAMBDA FUNCTIONS"
];

export default function MarqueeStrip() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate list to support seamless infinite looping
  const combinedTags = [...MARQUEE_TAGS, ...MARQUEE_TAGS];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        width: "100%",
        height: "56px",
        background: "#232F3E",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        position: "relative",
        zIndex: 5,
        borderTop: "1px solid rgba(255, 153, 0, 0.2)",
        borderBottom: "1px solid rgba(255, 153, 0, 0.2)",
        boxShadow: "0 4px 20px rgba(35, 47, 62, 0.15)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "max-content",
          animation: "marquee 22s linear infinite",
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {combinedTags.map((tag, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              padding: "0 24px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "1.5px",
                whiteSpace: "nowrap",
                transition: "color 0.2s ease",
              }}
              className="interactive-hover"
            >
              {tag}
            </span>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#FF9900",
                boxShadow: "0 0 10px #FF9900",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
