"use client";

import { motion } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  badge: string;
  color: string;
  driftClass: string;
  duration: string;
  delay: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Aditya Vardhan",
    role: "Final Year, Cloud Intern",
    quote: "AWS SBG workshops gave me the solid networking and compute training needed to clear my AWS Solutions Architect certification and secure a direct cloud engineering offer.",
    badge: "AV",
    color: "#FF9900",
    driftClass: "float",
    duration: "7s",
    delay: "0s",
  },
  {
    id: 2,
    name: "Meghana Krishna",
    role: "Alumni, Cloud Engineer",
    quote: "Deploying serverless backend APIs during the AWS Hackathon REC got me my first cloud developer interview. The practical sandbox access is a massive career booster.",
    badge: "MK",
    color: "#0073BB",
    driftClass: "floatB",
    duration: "6s",
    delay: "1.2s",
  },
  {
    id: 3,
    name: "Rohit Sundar",
    role: "Pre-Final Year, DevOps Lead",
    quote: "The 1-on-1 expert mentoring sessions helped me structure secure IAM governance roles and write automated deployment pipelines for our campus cloud applications.",
    badge: "RS",
    color: "#232F3E",
    driftClass: "floatC",
    duration: "8s",
    delay: "0.5s",
  }
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
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
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
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
            MEMBER STORIES
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
            What Our Student Builders Achieve
          </h2>
          <p style={{ fontSize: "15px", color: "#5c6b73", maxWidth: "600px", margin: "0 auto" }}>
            Real reviews and placement experiences from active members of our student group chapter.
          </p>
        </div>

        {/* Drifting bubble layout */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            justifyContent: "center",
            position: "relative",
            minHeight: "340px",
            padding: "20px 0",
          }}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.03, boxShadow: "0 15px 35px rgba(35, 47, 62, 0.08)", borderColor: t.color }}
              style={{
                maxWidth: "370px",
                width: "100%",
                background: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                border: "1.5px solid rgba(35, 47, 62, 0.08)",
                borderRadius: "24px",
                padding: "32px",
                boxShadow: "0 8px 30px rgba(35, 47, 62, 0.02)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                animation: `${t.driftClass} ${t.duration} ease-in-out infinite`,
                animationDelay: t.delay,
                cursor: "pointer",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              }}
              className="interactive-hover"
            >
              {/* Quotes representation */}
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    top: "-25px",
                    left: "-10px",
                    fontSize: "64px",
                    fontWeight: 900,
                    color: "rgba(255, 153, 0, 0.15)",
                    fontFamily: "serif",
                    lineHeight: 1,
                  }}
                >
                  “
                </span>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.6,
                    color: "#5c6b73",
                    position: "relative",
                    zIndex: 1,
                    marginBottom: "24px",
                  }}
                >
                  {t.quote}
                </p>
              </div>

              {/* User Identity Info */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {/* Round Badge Avatar */}
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${t.color} 0%, #232F3E 100%)`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    boxShadow: "0 4px 12px rgba(35, 47, 62, 0.1)",
                  }}
                >
                  {t.badge}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#232F3E" }}>
                    {t.name}
                  </span>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#5c6b73" }}>
                    {t.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
