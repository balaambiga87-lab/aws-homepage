"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import HeroBento from "./HeroBento";

const WORDS = ["Cloud Computing", "AI/ML", "DevOps", "Serverless", "Containers", "Security"];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse follow (parallax effect)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // Typewriter effect
  useEffect(() => {
    const word = WORDS[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;
    
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % WORDS.length);
    }
    
    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIdx]);

  // Track mouse move for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 20);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 12);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Magnetic Button Logic
  const buildMagneticButton = () => {
    const bX = useMotionValue(0);
    const bY = useMotionValue(0);
    const sX = useSpring(bX, { stiffness: 200, damping: 20 });
    const sY = useSpring(bY, { stiffness: 200, damping: 20 });
    
    const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      bX.set((e.clientX - rect.left - rect.width / 2) * 0.35);
      bY.set((e.clientY - rect.top - rect.height / 2) * 0.35);
    };
    const handleLeave = () => {
      bX.set(0);
      bY.set(0);
    };
    return { x: sX, y: sY, handleMove, handleLeave };
  };

  const btnPrimary = buildMagneticButton();
  const btnSecondary = buildMagneticButton();

  return (
    <section
      id="home"
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        position: "relative",
        overflow: "hidden",
        padding: "80px 0",
      }}
    >
      {/* Floating blurred glass particles & soft gradient mesh blobs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "15%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 115, 187, 0.05) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(40px)",
          animation: "blob 25s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 153, 0, 0.05) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(50px)",
          animation: "blob 30s ease-in-out infinite",
          animationDelay: "5s",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "45%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(30, 45, 61, 0.02)",
          filter: "blur(30px)",
          animation: "float 12s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* Main Container */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          width: "100%",
          maxWidth: "1200px",
          padding: isMobile ? "0 24px" : "0 44px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
          gap: isMobile ? "64px" : "48px",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Left Side: Staggered Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
        >
          {/* Eyebrow badge */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: "spring" } }
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(35, 47, 62, 0.04)",
              border: "1px solid rgba(35, 47, 62, 0.08)",
              borderRadius: "100px",
              padding: "6px 16px",
              marginBottom: "24px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Shimmer sweep */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "30%",
                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)",
                animation: "scanLine 4s ease-in-out infinite",
              }}
            />
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#FF9900",
                animation: "pulseDot 2s infinite",
              }}
            />
            <span style={{ fontSize: "11px", fontWeight: 800, color: "#232F3E", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              AWS Student Builders Group
            </span>
          </motion.div>

          {/* Large Headline */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150 } }
            }}
            style={{
              fontSize: "clamp(2.8rem, 6vw, 4.4rem)",
              fontWeight: 900,
              color: "#232F3E",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: "16px",
            }}
          >
            BUILD.
            <br />
            LEARN.
            <br />
            DEPLOY.
            <br />
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #232F3E, #0073BB, #FF9900, #232F3E)",
                backgroundSize: "300% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradShift 6s ease infinite",
              }}
            >
              ON AWS.
            </span>
          </motion.h1>

          {/* Typewriter list */}
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: "spring" } }
            }}
            style={{
              fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
              fontWeight: 700,
              color: "#4b5563",
              marginBottom: "28px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              minHeight: "40px",
            }}
          >
            <span>Future of</span>
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #FF9900, #0073BB, #FF9900)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradShift 4s ease infinite",
                fontWeight: 800,
              }}
            >
              {`→ ${displayed}`}
            </span>
            <span style={{ color: "#FF9900", animation: "blink 0.8s step-end infinite" }}>|</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: "spring" } }
            }}
            style={{
              fontSize: "15px",
              color: "#4b5563",
              lineHeight: 1.8,
              marginBottom: "36px",
              maxWidth: "460px",
            }}
          >
            A community designed for students to master cloud computing. From serverless backends to containerized architectures, build hands-on with AWS experts.
          </motion.p>

          {/* Buttons with Magnetic & Glow effects */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: "spring" } }
            }}
            style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
          >
            {/* Primary Button */}
            <motion.button
              style={{ x: btnPrimary.x, y: btnPrimary.y, border: "none", background: "transparent", padding: 0 }}
              onMouseMove={btnPrimary.handleMove}
              onMouseLeave={btnPrimary.handleLeave}
              whileTap={{ scale: 0.96 }}
            >
              <div
                style={{
                  padding: "14px 34px",
                  borderRadius: "100px",
                  background: "#FF9900",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: 800,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  boxShadow: "0 6px 20px rgba(255, 153, 0, 0.35)",
                  transition: "background 0.2s ease, box-shadow 0.2s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                Join Community
              </div>
            </motion.button>

            {/* Secondary Button */}
            <motion.button
              style={{ x: btnSecondary.x, y: btnSecondary.y, border: "none", background: "transparent", padding: 0 }}
              onMouseMove={btnSecondary.handleMove}
              onMouseLeave={btnSecondary.handleLeave}
              whileTap={{ scale: 0.96 }}
            >
              <a
                href="#features"
                style={{
                  display: "block",
                  padding: "13px 32px",
                  borderRadius: "100px",
                  border: "1.5px solid rgba(35, 47, 62, 0.15)",
                  background: "rgba(255, 255, 255, 0.55)",
                  backdropFilter: "blur(10px)",
                  color: "#232F3E",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#232F3E";
                  e.currentTarget.style.background = "rgba(35, 47, 62, 0.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(35, 47, 62, 0.15)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.55)";
                }}
              >
                Explore Programs
              </a>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Side: Animated Cloud Story */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: isMobile ? "20px" : "0",
          }}
        >
          <HeroBento />
        </motion.div>
      </motion.div>
    </section>
  );
}
