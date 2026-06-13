"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BentoCard = {
  eyebrow?: string;
  title: string;
  description: string;
  color: string;
};

type BentoSlide = {
  top: BentoCard;
  middleLeft: BentoCard;
  middleRight: BentoCard;
  bottom: BentoCard;
};

const SLIDES: BentoSlide[] = [
  {
    top: {
      title: "REC Academic Integration",
      description: "Coordinated alongside Rajalakshmi Engineering College curriculum guidelines to host credit-earning cloud workshops, practical lab hours, and certification guidance camps.",
      color: "#0073BB"
    },
    middleLeft: {
      eyebrow: "COMMUNITY",
      title: "350+",
      description: "Registered student cloud builders actively contributing.",
      color: "#FF9900"
    },
    middleRight: {
      eyebrow: "DEPLOYED",
      title: "50+",
      description: "Sandbox apps and serverless stacks running live in our environments.",
      color: "#232F3E"
    },
    bottom: {
      title: "Global Certification Target",
      description: "Our dedicated learning paths structure preparation from AWS Cloud Practitioner and Solutions Architect to specialty targets in Security, Databases, and AI/ML pipelines.",
      color: "#0073BB"
    }
  },
  {
    top: {
      title: "Hands-on Cloud Workshops",
      description: "Weekly interactive sessions covering EC2, S3, Lambda, and more to build real-world cloud expertise.",
      color: "#FF9900"
    },
    middleLeft: {
      eyebrow: "PROJECTS",
      title: "120+",
      description: "Open-source cloud architectures built by our members.",
      color: "#0073BB"
    },
    middleRight: {
      eyebrow: "MENTORS",
      title: "15+",
      description: "Industry professionals guiding our student developers.",
      color: "#232F3E"
    },
    bottom: {
      title: "Annual Cloud Hackathon",
      description: "A 48-hour competitive event where teams design, build, and deploy scalable AWS solutions.",
      color: "#FF9900"
    }
  },
  {
    top: {
      title: "Career Development",
      description: "Mock interviews, resume reviews, and portfolio building to land top-tier cloud engineering roles.",
      color: "#232F3E"
    },
    middleLeft: {
      eyebrow: "HIRED",
      title: "85%",
      description: "Of our active senior members placed in cloud roles.",
      color: "#FF9900"
    },
    middleRight: {
      eyebrow: "HOURS",
      title: "10k+",
      description: "Cumulative hours of AWS sandbox experimentation.",
      color: "#0073BB"
    },
    bottom: {
      title: "Industry Networking",
      description: "Direct connections with AWS partners, tech startups, and enterprise cloud teams.",
      color: "#232F3E"
    }
  }
];

function BentoCardUI({ card, isHalf }: { card: BentoCard; isHalf?: boolean }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: isHalf ? "24px 20px" : "28px 32px",
        boxShadow: "0 8px 24px rgba(35, 47, 62, 0.04)",
        border: "1px solid rgba(35, 47, 62, 0.08)",
        borderTop: `4px solid ${card.color}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      className="bento-hover"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(35, 47, 62, 0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(35, 47, 62, 0.04)";
      }}
    >
      {card.eyebrow && (
        <span
          style={{
            fontSize: "12px",
            fontWeight: 800,
            color: card.color,
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "8px",
          }}
        >
          {card.eyebrow}
        </span>
      )}
      <h3
        style={{
          fontSize: isHalf ? "32px" : "20px",
          fontWeight: 800,
          color: "#232F3E",
          marginBottom: isHalf ? "8px" : "12px",
          lineHeight: 1.1,
          letterSpacing: isHalf ? "-1px" : "-0.5px",
        }}
      >
        {card.title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#5c6b73",
          margin: 0,
          fontWeight: 500,
        }}
      >
        {card.description}
      </p>
    </div>
  );
}

export default function HeroBento() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "580px",
        minHeight: "480px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1200px",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient Glow behind Bento Box */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle, rgba(255, 153, 0, 0.12) 0%, transparent 65%)",
          filter: "blur(50px)",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", width: "100%", zIndex: 1, transformStyle: "preserve-3d" }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, y: -30, filter: "blur(8px)" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            {/* Top Card */}
            <div style={{ gridColumn: "span 2" }}>
              <BentoCardUI card={SLIDES[currentIndex].top} />
            </div>

            {/* Middle Left Card */}
            <div>
              <BentoCardUI card={SLIDES[currentIndex].middleLeft} isHalf />
            </div>

            {/* Middle Right Card */}
            <div>
              <BentoCardUI card={SLIDES[currentIndex].middleRight} isHalf />
            </div>

            {/* Bottom Card */}
            <div style={{ gridColumn: "span 2" }}>
              <BentoCardUI card={SLIDES[currentIndex].bottom} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Navigation Dots */}
      <div
        style={{
          position: "absolute",
          bottom: "-24px",
          display: "flex",
          gap: "8px",
          zIndex: 10,
        }}
      >
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: currentIndex === idx ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: currentIndex === idx ? "#FF9900" : "rgba(35, 47, 62, 0.15)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
