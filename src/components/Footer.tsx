"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        width: "100%",
        background: "#FFFFFF",
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
        borderTop: "1.5px solid rgba(35, 47, 62, 0.05)",
      }}
    >
      {/* Dynamic Wavy SVG Top Divider */}
      <div
        style={{
          width: "100%",
          height: "40px",
          background: "transparent",
          position: "relative",
          overflow: "hidden",
          transform: "scaleY(-1)", // Flip wave upside down to align with section transition
        }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        >
          <path
            d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"
            fill="rgba(35, 47, 62, 0.02)"
          />
          <path
            d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32"
            fill="none"
            stroke="rgba(35, 47, 62, 0.06)"
            strokeWidth="3"
          />
        </svg>
      </div>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "56px 4% 32px 4%",
        }}
      >
        {/* Footer Top Links */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: "40px",
            marginBottom: "56px",
          }}
        >
          {/* Col 1: Brand Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <a
              href="#home"
              onClick={handleScrollToTop}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
              }}
            >
              <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="24" fill="#232F3E" />
                <path
                  d="M68 62C72.4183 62 76 58.4183 76 54C76 49.5817 72.4183 46 68 46L67.0304 46.0592C65.5721 38.0336 58.6294 32 50.25 32C41.4429 32 34.1953 38.6471 33.1557 47.1654C28.5393 47.9621 25 51.9818 25 56.8C25 62.4333 29.5667 67 35.2 67H66.8Z"
                  fill="#0073BB"
                />
                <path d="M32 58L45 42L58 55L72 38" stroke="#FF9900" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#232F3E", letterSpacing: "-0.5px" }}>
                AWS SBG REC
              </span>
            </a>
            <p style={{ fontSize: "13px", color: "#5c6b73", lineHeight: 1.5 }}>
              The official portal for AWS Student Builders Group at Rajalakshmi Engineering College. Empowering students to build next-generation cloud architectures.
            </p>
          </div>

          {/* Col 2: Domains */}
          <div>
            <h4 style={{ fontSize: "13px", fontWeight: 800, color: "#232F3E", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Domains
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
              <li><a href="#features" style={{ color: "#5c6b73", textDecoration: "none" }} className="interactive-hover">Compute & Orchestration</a></li>
              <li><a href="#features" style={{ color: "#5c6b73", textDecoration: "none" }} className="interactive-hover">Serverless Stacks</a></li>
              <li><a href="#features" style={{ color: "#5c6b73", textDecoration: "none" }} className="interactive-hover">Database Management</a></li>
              <li><a href="#features" style={{ color: "#5c6b73", textDecoration: "none" }} className="interactive-hover">AI / ML SageMaker</a></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 style={{ fontSize: "13px", fontWeight: 800, color: "#232F3E", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Resources
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
              <li><a href="https://aws.amazon.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#5c6b73", textDecoration: "none" }} className="interactive-hover">AWS Console</a></li>
              <li><a href="https://aws.amazon.com/certification/" target="_blank" rel="noopener noreferrer" style={{ color: "#5c6b73", textDecoration: "none" }} className="interactive-hover">AWS Certifications</a></li>
              <li><a href="https://aws.amazon.com/getting-started/" target="_blank" rel="noopener noreferrer" style={{ color: "#5c6b73", textDecoration: "none" }} className="interactive-hover">AWS Documentation</a></li>
            </ul>
          </div>

          {/* Col 4: Chapter Details */}
          <div>
            <h4 style={{ fontSize: "13px", fontWeight: 800, color: "#232F3E", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              REC Details
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
              <li><a href="#about" style={{ color: "#5c6b73", textDecoration: "none" }} className="interactive-hover">About Chapter</a></li>
              <li><a href="#journey" style={{ color: "#5c6b73", textDecoration: "none" }} className="interactive-hover">Our Journey</a></li>
              <li><a href="#gallery" style={{ color: "#5c6b73", textDecoration: "none" }} className="interactive-hover">Visual Gallery</a></li>
              <li><a href="#events" style={{ color: "#5c6b73", textDecoration: "none" }} className="interactive-hover">Events Calendar</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Block */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(35, 47, 62, 0.08)",
            paddingTop: "24px",
            fontSize: "12.5px",
            color: "#5c6b73",
          }}
        >
          <span>
            © 2026 AWS Student Builders Group (REC Chapter). All Rights Reserved.
          </span>
          <div style={{ display: "flex", gap: "16px" }}>
            <a href="#" style={{ color: "#5c6b73", textDecoration: "none" }} className="interactive-hover">Privacy Policy</a>
            <span>•</span>
            <a href="#" style={{ color: "#5c6b73", textDecoration: "none" }} className="interactive-hover">Portal Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
