"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  id: number;
  label: string;
  value: number;
  suffix: string;
  color: string;
  driftClass: string;
}

function CountUp({ to, duration = 1.5 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = to;
    const totalMs = duration * 1000;
    const step = Math.ceil(end / (totalMs / 30));
    
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [to, duration, isInView]);

  return <span ref={ref}>{count}</span>;
}

export default function StatsSection() {
  const stats: StatItem[] = [
    {
      id: 1,
      label: "TOTAL CLOUD WORK LABS BUILT",
      value: 4500,
      suffix: "+ Hours",
      color: "#FF9900",
      driftClass: "float",
    },
    {
      id: 2,
      label: "AWS WORKSHOPS & HACKATHONS CONDUCTED",
      value: 45,
      suffix: "+ Events",
      color: "#0073BB",
      driftClass: "floatB",
    },
    {
      id: 3,
      label: "AWS CERTIFICATIONS ACHIEVED",
      value: 120,
      suffix: "+ Badges",
      color: "#232F3E",
      driftClass: "floatC",
    },
    {
      id: 4,
      label: "BUILDER PLACEMENT RETENTION SCORE",
      value: 98,
      suffix: "% Score",
      color: "#FF9900",
      driftClass: "float",
    }
  ];

  return (
    <section
      style={{
        width: "100%",
        padding: "80px 4%",
        background: "#FFFFFF",
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "24px",
        }}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, boxShadow: "0 15px 30px rgba(35, 47, 62, 0.08)", borderColor: stat.color }}
            style={{
              background: "rgba(255, 255, 255, 0.65)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              border: "1.5px solid rgba(35, 47, 62, 0.08)",
              borderRadius: "24px",
              padding: "32px 24px",
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(35, 47, 62, 0.02)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "default",
              animation: `${stat.driftClass} ${stat.id % 2 === 0 ? "7s" : "6s"} ease-in-out infinite`,
              animationDelay: `${stat.id * 0.4}s`,
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
            }}
            className="interactive-hover"
          >
            <div
              style={{
                fontSize: "clamp(32px, 3.5vw, 42px)",
                fontWeight: 900,
                color: stat.color === "#232F3E" ? "#232F3E" : stat.color,
                letterSpacing: "-1px",
                marginBottom: "8px",
              }}
            >
              <CountUp to={stat.value} />
              {stat.suffix}
            </div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#5c6b73",
                letterSpacing: "1.2px",
                lineHeight: 1.4,
              }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
