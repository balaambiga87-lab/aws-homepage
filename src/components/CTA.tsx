"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CTA() {
  const [btnCoords, setBtnCoords] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ name: "", email: "", rollNo: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleButtonMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Magnetic pull strength: 35% of offset
    setBtnCoords({ x: x * 0.35, y: y * 0.35 });
  };

  const handleButtonLeave = () => {
    setBtnCoords({ x: 0, y: 0 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setIsSubmitted(true);
    }
  };

  return (
    <section
      id="cta"
      style={{
        width: "100%",
        padding: "80px 4%",
        background: "#FFFFFF",
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      {/* Dynamic Background Mesh Gradient */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "20%",
          width: "50%",
          height: "80%",
          background: "radial-gradient(circle at 10% 20%, rgba(0, 115, 187, 0.05) 0%, rgba(255, 255, 255, 0) 50%), radial-gradient(circle at 90% 80%, rgba(255, 153, 0, 0.05) 0%, rgba(255, 255, 255, 0) 50%)",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      {/* Main Glass Panel */}
      <div
        style={{
          position: "relative",
          maxWidth: "960px",
          margin: "0 auto",
          background: "rgba(255, 255, 255, 0.65)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          border: "1.5px solid rgba(35, 47, 62, 0.08)",
          borderRadius: "32px",
          padding: "56px 40px",
          boxShadow: "0 15px 40px rgba(35, 47, 62, 0.03)",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        {/* Live Slot Vacancy Indicator */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(0, 180, 120, 0.08)",
            border: "1px solid rgba(0, 180, 120, 0.15)",
            padding: "6px 14px",
            borderRadius: "20px",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              background: "#00B478",
              borderRadius: "50%",
              boxShadow: "0 0 10px #00B478",
              animation: "blink 1.8s infinite",
            }}
          />
          <span style={{ fontSize: "11px", fontWeight: 800, color: "#00B478", letterSpacing: "0.5px", textTransform: "uppercase" }}>
            Portal Open — Active Registration Slots Available
          </span>
        </div>

        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 900,
            lineHeight: 1.15,
            color: "#232F3E",
            letterSpacing: "-1.5px",
            marginBottom: "16px",
            maxWidth: "700px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Ready to Build the Future of Cloud Infrastructure?
        </h2>
        <p
          style={{
            fontSize: "15.5px",
            color: "#5c6b73",
            lineHeight: 1.6,
            maxWidth: "580px",
            margin: "0 auto 32px auto",
          }}
        >
          Secure your student builder portal access, register for upcoming bootcamps, and get guided
          certification tracks. Start deploy-testing your code today.
        </p>

        {/* Form Container */}
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: "rgba(0, 115, 187, 0.05)",
                border: "1px solid rgba(0, 115, 187, 0.15)",
                padding: "24px",
                borderRadius: "20px",
                color: "#232F3E",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0073BB", marginBottom: "8px" }}>
                Registration Submitted Successfully!
              </h3>
              <p style={{ fontSize: "13.5px", color: "#5c6b73", lineHeight: 1.5 }}>
                Check your inbox at <strong>{formData.email}</strong> for instructions on logging into your AWS Student Builders sandboxes.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    padding: "14px 20px",
                    borderRadius: "14px",
                    border: "1.5px solid rgba(35, 47, 62, 0.08)",
                    fontSize: "13.5px",
                    fontWeight: 600,
                    outline: "none",
                    background: "#FFFFFF",
                    color: "#232F3E",
                  }}
                  className="interactive-hover"
                />
                <input
                  type="text"
                  placeholder="College Roll Number"
                  required
                  value={formData.rollNo}
                  onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                  style={{
                    padding: "14px 20px",
                    borderRadius: "14px",
                    border: "1.5px solid rgba(35, 47, 62, 0.08)",
                    fontSize: "13.5px",
                    fontWeight: 600,
                    outline: "none",
                    background: "#FFFFFF",
                    color: "#232F3E",
                  }}
                  className="interactive-hover"
                />
              </div>
              <input
                type="email"
                placeholder="College Email Address"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  padding: "14px 20px",
                  borderRadius: "14px",
                  border: "1.5px solid rgba(35, 47, 62, 0.08)",
                  fontSize: "13.5px",
                  fontWeight: 600,
                  outline: "none",
                  background: "#FFFFFF",
                  color: "#232F3E",
                  width: "100%",
                }}
                className="interactive-hover"
              />

              {/* Magnetic Button */}
              <motion.button
                type="submit"
                onMouseMove={handleButtonMove}
                onMouseLeave={handleButtonLeave}
                animate={{ x: btnCoords.x, y: btnCoords.y }}
                transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.2 }}
                style={{
                  padding: "15px 32px",
                  fontSize: "14px",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  background: "linear-gradient(135deg, #FF9900 0%, #FFB84D 100%)",
                  border: "none",
                  borderRadius: "30px",
                  boxShadow: "0 6px 20px rgba(255, 153, 0, 0.3)",
                  cursor: "pointer",
                  marginTop: "8px",
                  width: "fit-content",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                className="interactive-hover"
              >
                Join Chapter Portal
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
