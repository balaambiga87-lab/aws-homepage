"use client";

import { motion } from "framer-motion";

export default function AboutUs() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="about"
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
          gridTemplateColumns: "1fr 1.2fr",
          gap: "56px",
          alignItems: "center",
        }}
      >
        {/* Left Story Column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 800,
              color: "#0073BB",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginBottom: "12px",
            }}
          >
            WHO WE ARE
          </span>
          <h2
            style={{
              fontSize: "clamp(30px, 3.5vw, 44px)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#232F3E",
              letterSpacing: "-1px",
              marginBottom: "20px",
            }}
          >
            Pioneering Cloud Innovation at Rajalakshmi Engineering College
          </h2>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.6,
              color: "#5c6b73",
              marginBottom: "16px",
            }}
          >
            The AWS Student Builders Group (REC Chapter) is an elite collective of cloud enthusiasts,
            architects, and software developers. Guided by senior mentors and industry specialists,
            we empower students to bridge the gap between academic theory and production-grade cloud
            infrastructure.
          </p>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.6,
              color: "#5c6b73",
              marginBottom: "24px",
            }}
          >
            By designing real-world architectures, managing compute clusters, and launching serverless
            applications, our members establish concrete skillsets matching modern tech organization requirements.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            <div>
              <h4 style={{ fontSize: "28px", fontWeight: 800, color: "#FF9900" }}>350+</h4>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#5c6b73" }}>Registered Builders</p>
            </div>
            <div style={{ width: "1px", background: "rgba(35, 47, 62, 0.1)" }} />
            <div>
              <h4 style={{ fontSize: "28px", fontWeight: 800, color: "#0073BB" }}>120+</h4>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#5c6b73" }}>Certifications Earned</p>
            </div>
            <div style={{ width: "1px", background: "rgba(35, 47, 62, 0.1)" }} />
            <div>
              <h4 style={{ fontSize: "28px", fontWeight: 800, color: "#232F3E" }}>50+</h4>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#5c6b73" }}>Hosted Projects</p>
            </div>
          </div>
        </motion.div>

        {/* Right Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridAutoRows: "minmax(140px, auto)",
            gap: "16px",
          }}
        >
          {/* Card 1: College Integration */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0 12px 28px rgba(35, 47, 62, 0.08)" }}
            style={{
              gridColumn: "span 6",
              background: "rgba(255, 255, 255, 0.75)",
              backdropFilter: "blur(20px)",
              border: "1.5px solid rgba(35, 47, 62, 0.08)",
              borderRadius: "20px",
              padding: "24px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "#0073BB" }} />
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#232F3E", marginBottom: "8px" }}>
              REC Academic Integration
            </h3>
            <p style={{ fontSize: "13px", color: "#5c6b73", lineHeight: 1.5 }}>
              Coordinated alongside Rajalakshmi Engineering College curriculum guidelines to host credit-earning
              cloud workshops, practical lab hours, and certification guidance camps.
            </p>
          </motion.div>

          {/* Card 2: Active Builders */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0 12px 28px rgba(35, 47, 62, 0.08)" }}
            style={{
              gridColumn: "span 3",
              background: "rgba(255, 255, 255, 0.75)",
              backdropFilter: "blur(20px)",
              border: "1.5px solid rgba(35, 47, 62, 0.08)",
              borderRadius: "20px",
              padding: "20px",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "#FF9900" }} />
            <span style={{ fontSize: "12px", fontWeight: 800, color: "#FF9900", textTransform: "uppercase" }}>COMMUNITY</span>
            <h3 style={{ fontSize: "24px", fontWeight: 900, color: "#232F3E", margin: "6px 0 2px 0" }}>350+</h3>
            <p style={{ fontSize: "12px", color: "#5c6b73", lineHeight: 1.4 }}>Registered student cloud builders actively contributing.</p>
          </motion.div>

          {/* Card 3: Cloud Projects */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0 12px 28px rgba(35, 47, 62, 0.08)" }}
            style={{
              gridColumn: "span 3",
              background: "rgba(255, 255, 255, 0.75)",
              backdropFilter: "blur(20px)",
              border: "1.5px solid rgba(35, 47, 62, 0.08)",
              borderRadius: "20px",
              padding: "20px",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "#232F3E" }} />
            <span style={{ fontSize: "12px", fontWeight: 800, color: "#232F3E", textTransform: "uppercase" }}>DEPLOYED</span>
            <h3 style={{ fontSize: "24px", fontWeight: 900, color: "#232F3E", margin: "6px 0 2px 0" }}>50+</h3>
            <p style={{ fontSize: "12px", color: "#5c6b73", lineHeight: 1.4 }}>Sandbox apps and serverless stacks running live in our environments.</p>
          </motion.div>

          {/* Card 4: Learning Path */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0 12px 28px rgba(35, 47, 62, 0.08)" }}
            style={{
              gridColumn: "span 6",
              background: "rgba(255, 255, 255, 0.75)",
              backdropFilter: "blur(20px)",
              border: "1.5px solid rgba(35, 47, 62, 0.08)",
              borderRadius: "20px",
              padding: "24px",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "#0073BB" }} />
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#232F3E", marginBottom: "8px" }}>
              Global Certification Target
            </h3>
            <p style={{ fontSize: "13px", color: "#5c6b73", lineHeight: 1.5 }}>
              Our dedicated learning paths structure preparation from AWS Cloud Practitioner and Solutions Architect
              to specialty targets in Security, Databases, and AI/ML pipelines.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
