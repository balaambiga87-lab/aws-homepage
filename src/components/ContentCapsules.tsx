"use client";

import { motion } from "framer-motion";

interface CapsuleData {
  id: number;
  label: string;
  color: string;
  animation: string;
  duration: string;
  delay: string;
  icon: React.ReactNode;
}

export default function ContentCapsules() {
  const capsules: CapsuleData[] = [
    {
      id: 1,
      label: "Global AWS Certification Prep",
      color: "#FF9900",
      animation: "float",
      duration: "6s",
      delay: "0s",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    },
    {
      id: 2,
      label: "Hands-on AWS Sandboxes",
      color: "#0073BB",
      animation: "floatB",
      duration: "5s",
      delay: "1s",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l-7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
      )
    },
    {
      id: 3,
      label: "1-on-1 Expert Mentorship",
      color: "#232F3E",
      animation: "floatC",
      duration: "7s",
      delay: "0.5s",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      id: 4,
      label: "National Hackathons & Buildathons",
      color: "#FF9900",
      animation: "float",
      duration: "5.5s",
      delay: "1.5s",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )
    },
    {
      id: 5,
      label: "Real-world Cloud Architecture",
      color: "#0073BB",
      animation: "floatC",
      duration: "6.5s",
      delay: "0.2s",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      )
    },
    {
      id: 6,
      label: "Exclusive Industry Referrals",
      color: "#232F3E",
      animation: "floatB",
      duration: "8s",
      delay: "0.8s",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      )
    }
  ];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        marginTop: "32px",
        maxWidth: "600px",
      }}
    >
      {capsules.map((capsule, index) => (
        <motion.div
          key={capsule.id}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{
            scale: 1.04,
            boxShadow: `0 8px 24px rgba(35, 47, 62, 0.08)`,
            borderColor: capsule.color,
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 20px",
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1.5px solid rgba(35, 47, 62, 0.08)",
            borderRadius: "30px",
            fontSize: "13px",
            fontWeight: 600,
            color: "#232F3E",
            boxShadow: "0 4px 12px rgba(35, 47, 62, 0.02)",
            animation: `${capsule.animation} ${capsule.duration} ease-in-out infinite`,
            animationDelay: capsule.delay,
            cursor: "default",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease",
          }}
        >
          <span style={{ color: capsule.color, display: "flex" }}>
            {capsule.icon}
          </span>
          <span>{capsule.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
