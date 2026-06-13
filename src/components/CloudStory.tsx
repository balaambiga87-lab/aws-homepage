"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORIES = [
  {
    id: 1,
    title: "Who We Are",
    description: "A student-led cloud community at Rajalakshmi Engineering College focused on learning, building, and growing with AWS technologies.",
  },
  {
    id: 2,
    title: "What We Do",
    description: "We organize workshops, technical sessions, hackathons, and collaborative projects that help students gain practical cloud experience.",
  },
  {
    id: 3,
    title: "Why Join Us",
    description: "Gain hands-on skills, build your network, explore emerging technologies, and become part of a supportive learning ecosystem.",
  },
  {
    id: 4,
    title: "Our Mission",
    description: "To empower students with industry-relevant cloud knowledge and prepare them for future careers in technology.",
  },
  {
    id: 5,
    title: "Our Community",
    description: "A diverse group of learners, developers, innovators, and aspiring cloud professionals who grow together through collaboration.",
  },
  {
    id: 6,
    title: "Your Journey Starts Here",
    description: "Whether you're a beginner or an experienced builder, AWS SBG REC provides opportunities to learn, create, and lead.",
  }
];

export default function CloudStory() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % STORIES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "500px",
        height: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1200px",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient Glow */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle, rgba(0, 115, 187, 0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      {/* Cloud Silhouette & Stacking Cards */}
      <div style={{ position: "relative", width: "100%", height: "300px", zIndex: 1, transformStyle: "preserve-3d" }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8, y: 40, rotateX: -15, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.8, y: -40, rotateX: 15, filter: "blur(12px)" }}
            transition={{ type: "spring", stiffness: 120, damping: 20, mass: 1 }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transformStyle: "preserve-3d",
            }}
          >
            {/* The Cloud Container */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "relative",
                width: "90%",
                height: "100%",
                background: "rgba(255, 255, 255, 0.55)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderRadius: "36px",
                border: "1.5px solid rgba(255, 255, 255, 0.7)",
                boxShadow: "0 20px 50px rgba(35, 47, 62, 0.08), inset 0 0 20px rgba(255,255,255,0.4)",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                zIndex: 2,
              }}
              className="interactive-hover"
            >
              {/* Decorative Floating Glass Cloud Orbs to form silhouette */}
              <div
                style={{
                  position: "absolute",
                  top: "-30px",
                  left: "40px",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.4)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  boxShadow: "0 10px 30px rgba(35, 47, 62, 0.05)",
                  zIndex: -1,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  right: "30px",
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.35)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  boxShadow: "0 10px 30px rgba(35, 47, 62, 0.05)",
                  zIndex: -1,
                }}
              />

              {/* Icon / Top Accent */}
              <div style={{ marginBottom: "16px", display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(255,153,0,0.1) 0%, rgba(0,115,187,0.1) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#0073BB",
                    fontSize: "20px",
                  }}
                >
                  ☁
                </div>
              </div>

              {/* Story Content */}
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: 900,
                  color: "#232F3E",
                  marginBottom: "12px",
                  letterSpacing: "-0.5px",
                }}
              >
                {STORIES[currentIndex].title}
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: "#4b5563",
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                {STORIES[currentIndex].description}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Navigation Dots */}
      <div
        style={{
          position: "absolute",
          bottom: "-10px",
          display: "flex",
          gap: "8px",
          zIndex: 10,
        }}
      >
        {STORIES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: currentIndex === idx ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: currentIndex === idx ? "#0073BB" : "rgba(35, 47, 62, 0.15)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
            aria-label={`Go to story ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
