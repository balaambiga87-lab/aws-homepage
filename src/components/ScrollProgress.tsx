"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "linear-gradient(90deg, #0073BB 0%, #FF9900 50%, #232F3E 100%)",
        transformOrigin: "0%",
        scaleX: scrollYProgress,
        zIndex: 100001,
      }}
    />
  );
}
