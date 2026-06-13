"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticCursor() {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const handleHoverStart = () => setHovered(true);
    const handleHoverEnd = () => setHovered(false);

    // Watch for interactions dynamically
    const updateInteractivity = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, input, select, textarea, [role='button'], .interactive-hover"
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });

      return () => {
        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", handleHoverStart);
          el.removeEventListener("mouseleave", handleHoverEnd);
        });
      };
    };

    const cleanup = updateInteractivity();

    // Re-check for new dynamic elements when body structure changes
    const observer = new MutationObserver(() => {
      cleanup();
      updateInteractivity();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cleanup();
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: hovered ? 52 : 38,
          height: hovered ? 52 : 38,
          borderRadius: "50%",
          border: hovered ? "1.5px solid #FF9900" : "1.5px solid #232F3E",
          backgroundColor: hovered ? "rgba(255, 153, 0, 0.08)" : "transparent",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          x: cursorXSpring,
          y: cursorYSpring,
          zIndex: 99999,
          mixBlendMode: "difference",
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background-color 0.2s ease",
        }}
      />
      {/* Inner Dot */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: hovered ? 8 : 10,
          height: hovered ? 8 : 10,
          borderRadius: "50%",
          backgroundColor: hovered ? "#FF9900" : "#232F3E",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          x: cursorX,
          y: cursorY,
          zIndex: 100000,
          transition: "width 0.2s ease, height 0.2s ease, background-color 0.2s ease",
        }}
      />
    </>
  );
}
