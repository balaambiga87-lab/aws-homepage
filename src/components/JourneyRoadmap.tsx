"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Milestone {
  id: number;
  label: string;
  title: string;
  description: string;
  color: string;
  left: string;
  top: string;
}

export default function JourneyRoadmap() {
  const [activeStep, setActiveStep] = useState(0);

  const milestones: Milestone[] = [
    {
      id: 0,
      label: "FOUNDATION",
      title: "Enroll & Profile Setup",
      description: "Join the AWS SBG REC portal, set up your builder sandbox environments, and configure account access credentials.",
      color: "#FF9900",
      left: "10%",
      top: "50%",
    },
    {
      id: 1,
      label: "BOOTCAMPS",
      title: "Core Cloud Training",
      description: "Participate in structured labs covering Cloud Practitioner Essentials, IAM policies, VPC networking, and compute.",
      color: "#0073BB",
      left: "26%",
      top: "25%",
    },
    {
      id: 2,
      label: "CERTIFICATIONS",
      title: "AWS Certification Exams",
      description: "Access practice exam databases, study alongside senior guides, and clear global certifications (AWS Architect, Developer).",
      color: "#232F3E",
      left: "42%",
      top: "75%",
    },
    {
      id: 3,
      label: "SANDBOX PROJECTS",
      title: "Live Deployments",
      description: "Design and build serverless apps, relational databases, and static websites hosted live on AWS resources.",
      color: "#FF9900",
      left: "58%",
      top: "25%",
    },
    {
      id: 4,
      label: "BUILDATHONS",
      title: "Hackathons & Challenges",
      description: "Form builder teams and engineer solutions during inter-college buildathons and national AWS hackathons.",
      color: "#0073BB",
      left: "74%",
      top: "75%",
    },
    {
      id: 5,
      label: "PLACEMENT GATE",
      title: "Cloud Career Launch",
      description: "Connect with tech recruiters, receive referral slots, and step into high-paying Cloud & DevOps engineer roles.",
      color: "#232F3E",
      left: "90%",
      top: "50%",
    }
  ];

  return (
    <section
      id="journey"
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
        {/* Header Block */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 800,
              color: "#0073BB",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginBottom: "12px",
              display: "inline-block",
            }}
          >
            THE ROADMAP
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
            Your Progressive Journey Into Cloud Engineering
          </h2>
          <p style={{ fontSize: "15px", color: "#5c6b73", maxWidth: "600px", margin: "0 auto" }}>
            Tap each milestone node along our custom vector path to explore requirements and training details.
          </p>
        </div>

        {/* Horizontal SVG Roadmap Container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "200px",
            marginBottom: "40px",
          }}
        >
          {/* Path Drawing SVG */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              overflow: "visible",
            }}
          >
            {/* Background Line Track */}
            <path
              d="M 100 100 Q 180 50 260 50 T 420 150 T 580 50 T 740 150 T 900 100"
              fill="none"
              stroke="rgba(35, 47, 62, 0.06)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Glowing active line track */}
            <motion.path
              d="M 100 100 Q 180 50 260 50 T 420 150 T 580 50 T 740 150 T 900 100"
              fill="none"
              stroke="url(#roadGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0073BB" />
                <stop offset="50%" stopColor="#FF9900" />
                <stop offset="100%" stopColor="#232F3E" />
              </linearGradient>
            </defs>
          </svg>

          {/* Interactive Milestone Nodes */}
          {milestones.map((node) => {
            const isActive = activeStep === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setActiveStep(node.id)}
                style={{
                  position: "absolute",
                  left: node.left,
                  top: node.top,
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  className="interactive-hover"
                >
                  {/* Pulse Ring when Active */}
                  {isActive && (
                    <motion.div
                      layoutId="pulseRing"
                      style={{
                        position: "absolute",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        border: `2px solid ${node.color}`,
                        animation: "pulseRing 1.5s infinite ease-out",
                      }}
                    />
                  )}
                  {/* Milestone Node Dot */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: isActive ? node.color : "#FFFFFF",
                      border: `3.5px solid ${isActive ? "#FFFFFF" : "rgba(35, 47, 62, 0.2)"}`,
                      boxShadow: isActive ? `0 0 15px ${node.color}` : "0 2px 8px rgba(35,47,62,0.05)",
                      transition: "all 0.3s ease",
                    }}
                  />
                  {/* Step Label */}
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      color: isActive ? node.color : "#5c6b73",
                      marginTop: "12px",
                      letterSpacing: "0.5px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {node.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestone Detail Card Panel */}
        <div style={{ minHeight: "180px", display: "flex", justifyContent: "center" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{
                maxWidth: "680px",
                width: "100%",
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(20px)",
                border: `1.5px solid ${milestones[activeStep].color}`,
                borderRadius: "24px",
                padding: "32px",
                boxShadow: "0 10px 30px rgba(35, 47, 62, 0.04)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: milestones[activeStep].color,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  marginBottom: "8px",
                }}
              >
                MILESTONE {activeStep + 1} OF 6
              </span>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#232F3E", marginBottom: "12px" }}>
                {milestones[activeStep].title}
              </h3>
              <p style={{ fontSize: "14.5px", color: "#5c6b73", lineHeight: 1.55 }}>
                {milestones[activeStep].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
