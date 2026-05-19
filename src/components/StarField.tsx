import React from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

const StarField: React.FC = () => {
  const stars = React.useMemo<Star[]>(() => {
    const seed = (n: number) => ((Math.sin(n) * 43758.5453) % 1 + 1) % 1;
    return Array.from({ length: 260 }, (_, i) => ({
      id: i,
      x: seed(i * 3.7) * 100,
      y: seed(i * 5.3) * 100,
      size: seed(i * 7.1) * 2.2 + 0.4,
      opacity: seed(i * 11.9) * 0.7 + 0.15,
      duration: seed(i * 13.3) * 5 + 2.5,
      delay: seed(i * 17.7) * 8,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">

      {/* ── Nebula blobs ── */}
      <div
        className="nebula-1 absolute"
        style={{
          width: "65%", height: "55%",
          top: "-5%", left: "-15%",
          background: "radial-gradient(ellipse at 40% 40%, rgba(88,28,135,0.18) 0%, rgba(55,10,120,0.08) 40%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="nebula-2 absolute"
        style={{
          width: "55%", height: "65%",
          top: "20%", right: "-10%",
          background: "radial-gradient(ellipse at 60% 50%, rgba(15,52,156,0.15) 0%, rgba(10,30,100,0.07) 45%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="nebula-3 absolute"
        style={{
          width: "50%", height: "45%",
          bottom: "5%", left: "25%",
          background: "radial-gradient(ellipse at 50% 60%, rgba(120,50,10,0.12) 0%, rgba(90,30,5,0.06) 45%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      {/* Fourth nebula — deep teal at center */}
      <div
        className="nebula-1 absolute"
        style={{
          width: "40%", height: "40%",
          top: "40%", left: "30%",
          background: "radial-gradient(ellipse, rgba(5,50,60,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          animationDelay: "10s",
        }}
      />

      {/* ── Stars ── */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{ opacity: [star.opacity * 0.25, star.opacity, star.opacity * 0.25] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ── A few larger bright stars ── */}
      {[
        { x: 12, y: 8 }, { x: 78, y: 5 }, { x: 55, y: 12 },
        { x: 90, y: 25 }, { x: 5, y: 45 }, { x: 95, y: 62 },
        { x: 30, y: 88 }, { x: 70, y: 82 }, { x: 48, y: 95 },
      ].map((pos, i) => (
        <motion.div
          key={`bright-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            width: "3px",
            height: "3px",
            background: "white",
            boxShadow: "0 0 6px 2px rgba(255,255,255,0.6)",
          }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 3 + i * 0.7, delay: i * 1.1, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

export default StarField;
