"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  backTitle: string;
  metrics: { label: string; value: number }[];
}

function FeatureCard({ title, description, icon, color, backTitle, metrics }: FeatureCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (flipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    setRotateY((x - xc) / 8); // Max 15 degree tilt
    setRotateX(-(y - yc) / 8);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setFlipped(!flipped)}
      style={{
        width: "100%",
        height: "280px",
        perspective: "1200px",
        cursor: "pointer",
      }}
    >
      <motion.div
        animate={{
          rotateY: flipped ? 180 : rotateY,
          rotateX: flipped ? 0 : rotateX,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.8,
        }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {/* FRONT SIDE */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1.5px solid rgba(35, 47, 62, 0.08)",
            borderRadius: "20px",
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 6px 20px rgba(35, 47, 62, 0.03)",
            transition: "border-color 0.3s ease",
          }}
          className="interactive-hover"
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "rgba(35, 47, 62, 0.03)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: color,
              border: `1px solid rgba(35, 47, 62, 0.05)`,
            }}
          >
            {icon}
          </div>
          <div style={{ marginTop: "16px" }}>
            <h3
              style={{
                fontSize: "17px",
                fontWeight: 800,
                color: "#232F3E",
                marginBottom: "8px",
              }}
            >
              {title}
            </h3>
            <p style={{ fontSize: "12.5px", color: "#5c6b73", lineHeight: 1.45 }}>
              {description}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "11px",
              fontWeight: 700,
              color: color,
              marginTop: "8px",
            }}
          >
            <span>Tap to explore metrics</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "#232F3E",
            border: `1.5px solid ${color}`,
            borderRadius: "20px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: `0 8px 30px rgba(0, 115, 187, 0.1)`,
            color: "#FFFFFF",
          }}
          className="interactive-hover"
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ color: color }}>{icon}</span>
              <h4 style={{ fontSize: "14px", fontWeight: 800, color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {backTitle}
              </h4>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {metrics.map((m, idx) => (
                <div key={idx}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px", color: "rgba(255,255,255,0.7)" }}>
                    <span>{m.label}</span>
                    <span style={{ color: color, fontWeight: 700 }}>{m.value}%</span>
                  </div>
                  <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: flipped ? `${m.value}%` : 0 }}
                      transition={{ duration: 0.8, delay: 0.15 }}
                      style={{ height: "100%", background: color, borderRadius: "2px" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              fontSize: "10px",
              color: "rgba(255,255,255,0.4)",
              textAlign: "center",
            }}
          >
            Tap to return
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Features() {
  const features = [
    {
      title: "Compute & Orchestration",
      description: "Scale applications globally using EC2 clusters, ECS containers, and auto-scaling setups.",
      color: "#FF9900",
      backTitle: "COMPUTE DOMAIN",
      metrics: [
        { label: "Lab Mastery", value: 92 },
        { label: "Docker Integration", value: 85 },
        { label: "Elastic Auto-Scaling", value: 78 }
      ],
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="4" />
          <path d="M6 12h12M12 6v12" />
        </svg>
      )
    },
    {
      title: "Infinite Object & SQL Vaults",
      description: "Master databases with RDS (PostgreSQL/MySQL), S3 bucket security, and DynamoDB schemas.",
      color: "#0073BB",
      backTitle: "STORAGE & DB",
      metrics: [
        { label: "S3 IAM Policies", value: 95 },
        { label: "RDS Cluster Setup", value: 80 },
        { label: "NoSQL Modeling", value: 70 }
      ],
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      )
    },
    {
      title: "Serverless Microservices",
      description: "Deploy serverless stacks using Lambda, API Gateway, DynamoDB, and Step Functions.",
      color: "#FF9900",
      backTitle: "SERVERLESS",
      metrics: [
        { label: "NodeJS Lambda Exec", value: 88 },
        { label: "REST Gateway Mapping", value: 85 },
        { label: "Step Function Orch", value: 65 }
      ],
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      )
    },
    {
      title: "VPC Networking Mesh",
      description: "Design isolated networking subnets, security groups, route tables, and NAT gateways.",
      color: "#0073BB",
      backTitle: "NETWORKING",
      metrics: [
        { label: "Subnet Topologies", value: 90 },
        { label: "Security Group Rules", value: 92 },
        { label: "VPN & Transit Gateway", value: 60 }
      ],
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5v14M12 5l7 7-7 7" />
        </svg>
      )
    },
    {
      title: "IAM Identity & Governance",
      description: "Secure cloud assets using robust IAM policies, Cognito authentication, and KMS encryption.",
      color: "#232F3E",
      backTitle: "SECURITY & IAM",
      metrics: [
        { label: "Policy Writing", value: 85 },
        { label: "Cognito User Pools", value: 78 },
        { label: "KMS Envelope Enc", value: 72 }
      ],
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    },
    {
      title: "AI & ML SageMaker Stacks",
      description: "Train datasets, host Jupyter hubs, and deploy machine learning inference endpoints.",
      color: "#FF9900",
      backTitle: "AI & MACHINE LEARNING",
      metrics: [
        { label: "SageMaker Notebooks", value: 80 },
        { label: "Model Training Jobs", value: 75 },
        { label: "Endpoint Deployment", value: 68 }
      ],
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
      )
    },
    {
      title: "Continuous DevOps Loops",
      description: "Deploy automatically using AWS CodePipeline, CodeBuild, CodeDeploy, and GitHub actions.",
      color: "#0073BB",
      backTitle: "CI / CD DEVOPS",
      metrics: [
        { label: "Pipeline Orchestration", value: 82 },
        { label: "Buildspec Config", value: 88 },
        { label: "Blue/Green Deploy", value: 65 }
      ],
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      )
    },
    {
      title: "Observability & Auditing",
      description: "Monitor resources, read CloudWatch dashboard alarms, and track configuration logs in CloudTrail.",
      color: "#232F3E",
      backTitle: "OBSERVABILITY",
      metrics: [
        { label: "Dashboard Creation", value: 90 },
        { label: "CloudWatch Alarm Rules", value: 85 },
        { label: "CloudTrail Log Audits", value: 75 }
      ],
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    }
  ];

  return (
    <section
      id="features"
      style={{
        width: "100%",
        padding: "80px 4%",
        background: "#FFFFFF",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header Block */}
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
            WHAT WE PRACTICE
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
            Comprehensive Learning Domains & Hands-on Architecture
          </h2>
          <p style={{ fontSize: "15px", color: "#5c6b73", maxWidth: "600px", margin: "0 auto" }}>
            Tap each track card to explore performance indicators, syllabus coverage, and learning achievements.
          </p>
        </div>

        {/* 8-Card Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              backTitle={feature.backTitle}
              metrics={feature.metrics}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
