"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface CardData {
  id: string;
  gradient: string;
  label: string;
  sublabel: string;
  description: string;
  gridColumn: string;
  gridRow: string;
}

const CARDS: CardData[] = [
  {
    id: "hackathon",
    gradient: "linear-gradient(135deg,#232F3E,#3a5068)",
    label: "☁ Cloud Jam Hackathon",
    sublabel: "Hackathons",
    description: "Students collaborated on live AWS cloud challenges, deploying serverless architectures and competing for top solutions.",
    gridColumn: "1/5",
    gridRow: "1/2",
  },
  {
    id: "workshop",
    gradient: "linear-gradient(135deg,#0073BB,#005f9e)",
    label: "🤖 Generative AI Workshop",
    sublabel: "Workshops",
    description: "Hands-on session exploring LLMs, prompt engineering, and generative AI applications on AWS Bedrock.",
    gridColumn: "5/9",
    gridRow: "1/2",
  },
  {
    id: "meetup",
    gradient: "linear-gradient(135deg,#FF9900,#E68900)",
    label: "🎤 Community Meetup",
    sublabel: "Events",
    description: "Monthly community gathering with lightning talks, networking, and demos from student builders and industry mentors.",
    gridColumn: "9/13",
    gridRow: "1/3",
  },
  {
    id: "bootcamp",
    gradient: "linear-gradient(135deg,#1A222D,#232F3E)",
    label: "🏆 Certification Bootcamp",
    sublabel: "Bootcamps",
    description: "Intensive study sessions preparing students for AWS Solutions Architect certifications with mock exams.",
    gridColumn: "1/7",
    gridRow: "2/3",
  },
  {
    id: "panel",
    gradient: "linear-gradient(135deg,#005f9e,#0073BB)",
    label: "💡 Gen AI Panel",
    sublabel: "Panels",
    description: "Industry experts discussed the future of generative AI, career paths, and emerging cloud technologies.",
    gridColumn: "7/9",
    gridRow: "2/3",
  },
];

function GalleryCard({
  card,
  index,
  onSelect,
}: {
  card: CardData;
  index: number;
  onSelect: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(card.id)}
      whileHover={{ scale: 1.04 }}
      style={{
        position: "relative",
        gridColumn: card.gridColumn,
        gridRow: card.gridRow,
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        perspective: "800px",
        transformStyle: "preserve-3d",
        boxShadow: hovered
          ? "0 20px 50px rgba(26,34,45,0.2)"
          : "0 4px 16px rgba(26,34,45,0.06)",
        transition: "box-shadow 0.4s ease",
        minHeight: "240px",
      }}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        {/* Gradient background with parallax zoom */}
        <motion.div
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            background: card.gradient,
            borderRadius: "20px",
          }}
        />

        {/* Shine sweep */}
        <motion.div
          initial={false}
          animate={hovered ? { left: "120%" } : { left: "-60%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "60%",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0) 100%)",
            pointerEvents: "none",
            zIndex: 2,
            transform: "skewX(-15deg)",
          }}
        />

        {/* Label overlay - slides up on hover */}
        <motion.div
          animate={
            hovered
              ? { y: 0, opacity: 1 }
              : { y: "100%", opacity: 0 }
          }
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "24px 20px 20px",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
            zIndex: 3,
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 800,
              color: "#FF9900",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              display: "block",
              marginBottom: "4px",
            }}
          >
            {card.sublabel}
          </span>
          <span
            style={{
              fontSize: "17px",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.2,
            }}
          >
            {card.label}
          </span>
        </motion.div>

        {/* Static visible label (before hover) */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            right: "20px",
            zIndex: 1,
            opacity: hovered ? 0 : 1,
            transition: "opacity 0.25s ease",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 800,
              color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
            }}
          >
            {card.sublabel}
          </span>
          <div
            style={{
              fontSize: "19px",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.2,
              marginTop: "4px",
            }}
          >
            {card.label}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const openIndex = lightboxId
    ? CARDS.findIndex((c) => c.id === lightboxId)
    : -1;
  const currentCard = lightboxId ? CARDS[openIndex] : null;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxId) return;
      if (e.key === "Escape") {
        setLightboxId(null);
      } else if (e.key === "ArrowRight") {
        const next = (openIndex + 1) % CARDS.length;
        setLightboxId(CARDS[next].id);
      } else if (e.key === "ArrowLeft") {
        const prev = (openIndex - 1 + CARDS.length) % CARDS.length;
        setLightboxId(CARDS[prev].id);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxId, openIndex]);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      style={{
        width: "100%",
        padding: "80px 0",
        background: "#F8F9FB",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 44px",
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 800,
              color: "#FF9900",
              textTransform: "uppercase",
              letterSpacing: "2px",
              display: "inline-block",
              marginBottom: "12px",
            }}
          >
            COMMUNITY GALLERY
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 3.2vw, 40px)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#232F3E",
              letterSpacing: "-1px",
              marginBottom: "12px",
            }}
          >
            Highlights From Our Builder Journey
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "#4b5563",
              maxWidth: "580px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Snapshots from our hackathons, workshops, meetups, and bootcamps — 
            capturing the energy of students building on AWS.
          </p>
        </motion.div>

        {/* Card Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "16px",
          }}
        >
          {CARDS.map((card, i) => {
            let animProps;
            const delay = [0, 0.1, 0.05, 0.18, 0.25][i];
            if (i === 0) {
              animProps = { x: -30, y: 0 };
            } else if (i === 1) {
              animProps = { x: 0, y: 30 };
            } else if (i === 2) {
              animProps = { x: 30, y: 0 };
            } else if (i === 3) {
              animProps = { x: 0, y: 40 };
            } else {
              animProps = { x: 0, y: 30 };
            }
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, ...animProps }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{
                  type: "spring",
                  stiffness: i >= 3 ? 160 : 180,
                  damping: i >= 3 ? 20 : 22,
                  delay,
                }}
                style={{
                  display: "contents",
                }}
              >
                <GalleryCard card={card} index={i} onSelect={setLightboxId} />
              </motion.div>
            );
          })}
        </div>

        {/* View All Photos Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, type: "spring", stiffness: 180, damping: 22 }}
          style={{ textAlign: "center", marginTop: "40px" }}
        >
          <motion.a
            href="#"
            onClick={(e) => e.preventDefault()}
            whileHover={{ y: -2, backgroundColor: "#232F3E", color: "#FFFFFF" }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 32px",
              fontSize: "14px",
              fontWeight: 700,
              color: "#232F3E",
              border: "2px solid #232F3E",
              borderRadius: "30px",
              textDecoration: "none",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            View All Photos →
          </motion.a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxId && currentCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxId(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
              padding: "40px",
            }}
          >
            {/* Card display */}
            <motion.div
              key={currentCard.id}
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.75, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "680px",
                borderRadius: "24px",
                overflow: "hidden",
                background: currentCard.gradient,
                position: "relative",
                aspectRatio: "16/9",
                boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "40px 32px 32px",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#FF9900",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  {currentCard.sublabel}
                </span>
                <h3
                  style={{
                    fontSize: "26px",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    marginBottom: "8px",
                  }}
                >
                  {currentCard.label}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.6,
                    maxWidth: "520px",
                  }}
                >
                  {currentCard.description}
                </p>
              </div>
            </motion.div>

            {/* Left arrow */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                const prev = (openIndex - 1 + CARDS.length) % CARDS.length;
                setLightboxId(CARDS[prev].id);
              }}
              style={{
                position: "absolute",
                left: "24px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "20px",
                backdropFilter: "blur(8px)",
                zIndex: 10,
              }}
            >
              ←
            </motion.button>

            {/* Right arrow */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                const next = (openIndex + 1) % CARDS.length;
                setLightboxId(CARDS[next].id);
              }}
              style={{
                position: "absolute",
                right: "24px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "20px",
                backdropFilter: "blur(8px)",
                zIndex: 10,
              }}
            >
              →
            </motion.button>

            {/* Close button */}
            <motion.button
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setLightboxId(null)}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: 700,
                backdropFilter: "blur(8px)",
                zIndex: 10,
              }}
            >
              ×
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
