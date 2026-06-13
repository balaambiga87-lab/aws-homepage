"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Events", href: "#events" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [btnHovered, setBtnHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_ITEMS.map(item => item.href.substring(1));
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            const matched = NAV_ITEMS.find(item => item.href === `#${section}`);
            if (matched) {
              setActiveItem(matched.label);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveItem(label);
    }
  };

  return (
    <>
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        padding: scrolled ? "12px 32px" : "20px 48px",
        transition: "padding 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* Background Glass Panel */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: scrolled
            ? "rgba(255,255,255,.97)"
            : "linear-gradient(160deg, rgba(255,255,255,1) 0%, rgba(220,236,250,.75) 25%, rgba(255,237,200,.65) 55%, rgba(230,244,255,.55) 80%, rgba(255,255,255,1) 100%)",
          borderBottom: "1px solid rgba(35,47,62,.08)",
          boxShadow: scrolled ? "0 2px 20px rgba(35,47,62,.08)" : "none",
          transition: "background 0.4s ease, border-bottom 0.4s ease, box-shadow 0.4s ease",
          zIndex: -1,
        }}
      />

      {/* Orange radial glow behind logo */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "200px",
          background: "radial-gradient(ellipse at left, rgba(255,153,0,.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      {/* Brand Logo */}
      <a
        href="#home"
        onClick={(e) => handleScrollTo(e, "#home", "Home")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          textDecoration: "none",
        }}
      >
        <svg
          width="42"
          height="42"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0px 3px 6px rgba(0, 115, 187, 0.18))" }}
        >
          <rect width="100" height="100" rx="24" fill="#232F3E" />
          <path
            d="M68 62C72.4183 62 76 58.4183 76 54C76 49.5817 72.4183 46 68 46C67.6698 46 67.3468 46.02 67.0304 46.0592C65.5721 38.0336 58.6294 32 50.25 32C41.4429 32 34.1953 38.6471 33.1557 47.1654C28.5393 47.9621 25 51.9818 25 56.8C25 62.4333 29.5667 67 35.2 67H66.8C67.5 67 68 62 68 62Z"
            fill="url(#logoGrad)"
          />
          <path
            d="M32 58L45 42L58 55L72 38"
            stroke="#FF9900"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="logoGrad" x1="25" y1="32" x2="76" y2="67" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0073BB" />
              <stop offset="1" stopColor="#00A1EC" />
            </linearGradient>
          </defs>
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 900,
              color: "#232F3E",
              letterSpacing: "-0.6px",
              lineHeight: 1.1,
            }}
          >
            AWS SBG
          </span>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: "#FF9900",
              letterSpacing: "2px",
            }}
          >
            REC CHAPTER
          </span>
        </div>
      </a>

      {/* Nav List */}
      <nav style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: "6px",
            background: scrolled ? "rgba(35, 47, 62, 0.04)" : "rgba(255, 255, 255, 0.65)",
            padding: "4px 6px",
            borderRadius: "30px",
            border: scrolled ? "1px solid rgba(35, 47, 62, 0.08)" : "1px solid rgba(255, 255, 255, 0.4)",
            transition: "all 0.4s ease",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeItem === item.label;
            return (
              <li key={item.label} style={{ position: "relative" }}>
                <a
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href, item.label)}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    display: "block",
                    padding: "8px 16px",
                    fontSize: "13px",
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? "#FF9900" : "#232F3E",
                    textDecoration: "none",
                    borderRadius: "20px",
                    transition: "color 0.25s ease",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(135deg, rgba(0,115,187,0.06) 0%, rgba(255,153,0,0.03) 100%)",
                        borderRadius: "20px",
                        boxShadow: "0 4px 12px rgba(255,153,0,.2), inset 0 1px 0 rgba(255,255,255,0.8)",
                        border: "1px solid rgba(0,115,187,0.18)",
                        zIndex: -1,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!isActive && hoveredItem === item.label && (
                    <motion.div
                      layoutId="hoverNavBackground"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(135deg, rgba(35,47,62,0.05) 0%, rgba(255,255,255,0.5) 100%)",
                        borderRadius: "20px",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
                        zIndex: -1,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Join Button */}
      <div>
        <a
          href="#cta"
          onClick={(e) => {
            e.preventDefault();
            const target = document.querySelector("#cta");
            if (target) {
              const top = target.getBoundingClientRect().top + window.scrollY - 80;
              window.scrollTo({ top, behavior: "smooth" });
            }
          }}
          style={{
            textDecoration: "none",
          }}
        >
          <motion.button
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.96 }}
            style={{
              padding: "10px 22px",
              fontSize: "13px",
              fontWeight: 700,
              color: btnHovered ? "#232F3E" : "#FFFFFF",
              background: btnHovered
                ? "linear-gradient(135deg,#FF9900,#E68900)"
                : "linear-gradient(135deg,#232F3E,#1A222D)",
              border: "none",
              borderRadius: "30px",
              boxShadow: btnHovered
                ? "0 4px 16px rgba(255,153,0,0.35)"
                : "0 4px 16px rgba(0,115,187,0.25)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              transition: "background 0.3s ease, box-shadow 0.3s ease, color 0.3s ease",
            }}
          >
            Join Portal
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </a>
      </div>
    </motion.header>

      {/* Below-navbar atmospheric glow spill */}
      <div
        style={{
          position: "fixed",
          top: "66px",
          left: 0,
          right: 0,
          height: "80px",
          background: "linear-gradient(to bottom, rgba(220,236,250,.35) 0%, rgba(255,237,200,.25) 40%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 899,
        }}
      />

      {/* Orange glow — left side */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40%",
          height: "140px",
          background: "radial-gradient(ellipse at top left, rgba(255,153,0,.09) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 898,
        }}
      />

      {/* Blue glow — right side */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "40%",
          height: "140px",
          background: "radial-gradient(ellipse at top right, rgba(0,115,187,.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 898,
        }}
      />
    </>
  );
}
