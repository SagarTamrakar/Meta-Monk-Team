import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

import img1 from "@assets/work_1.png";
import img2 from "@assets/work_2.png";
import img3 from "@assets/work_3.png";
import img4 from "@assets/work_4.png";
import img5 from "@assets/work_5.png";
import img6 from "@assets/work_6.png";
import img7 from "@assets/work_7.png";
import img8 from "@assets/work_8.png";

interface Slide {
  img: string;
  category: string;
  title: string;
  desc: string;
  index: string;
}

const SLIDES: Slide[] = [
  { img: img1, category: "VFX Composition",    title: "Neon Metropolis",    desc: "Cinematic VFX for a global brand launch",         index: "01" },
  { img: img2, category: "CGI Production",     title: "Digital Horizon",    desc: "Photorealistic 3D product visualization",          index: "02" },
  { img: img3, category: "Motion Graphics",    title: "Kinetic Identity",   desc: "Full animated brand identity system",              index: "03" },
  { img: img4, category: "Video Editing",      title: "The Last Frame",     desc: "Documentary-style cinematic brand film",           index: "04" },
  { img: img5, category: "Content Production", title: "Viral Engine",       desc: "50M+ combined views social campaign",              index: "05" },
  { img: img6, category: "Art Direction",      title: "Visual Odyssey",     desc: "Concept-to-screen creative direction",             index: "06" },
  { img: img7, category: "Color Grading",      title: "Chromatic Series",   desc: "Precision color pipeline for streaming",           index: "07" },
  { img: img8, category: "Brand Film",         title: "Story of Now",       desc: "Flagship corporate storytelling campaign",         index: "08" },
];

/* Ken Burns parameters — alternate zoom direction each slide */
const KB = [
  { s0: 1.00, s1: 1.09, x0:  "0%",    x1: "-1.5%", y0: "0%",    y1: "1%"    },
  { s0: 1.09, s1: 1.01, x0: "-1%",    x1:  "1.5%", y0: "1%",    y1: "-0.5%" },
  { s0: 1.00, s1: 1.08, x0:  "1%",    x1: "-1%",   y0: "0.5%",  y1: "-0.5%" },
  { s0: 1.07, s1: 1.00, x0: "-0.5%",  x1:  "1%",   y0: "0%",    y1: "0.5%"  },
  { s0: 1.00, s1: 1.08, x0:  "0%",    x1:  "1%",   y0: "-0.5%", y1: "0.5%"  },
  { s0: 1.08, s1: 1.01, x0:  "1%",    x1: "-1%",   y0: "1%",    y1: "0%"    },
  { s0: 1.00, s1: 1.07, x0: "-1%",    x1:  "0%",   y0: "0%",    y1: "-1%"   },
  { s0: 1.07, s1: 1.00, x0:  "0.5%",  x1: "-0.5%", y0: "-0.5%", y1: "0.5%"  },
];

const SLIDE_DURATION = 4500; // ms per slide

export default function CinematicShowreel() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  /* Auto-advance timer */
  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { next(); return 0; }
        return p + (100 / (SLIDE_DURATION / 80));
      });
    }, 80);
    return () => clearInterval(interval);
  }, [playing, next]);

  const slide = SLIDES[current];
  const kb = KB[current];

  return (
    <div className="relative w-full overflow-hidden bg-black select-none" style={{ height: "82vh", minHeight: 480 }}>

      {/* ── Cinematic letterbox bars ── */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-black" style={{ height: "7%" }} />
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-black" style={{ height: "7%" }} />

      {/* ── Image slides ── */}
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          {/* Ken Burns wrapper */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: kb.s0, x: kb.x0, y: kb.y0 }}
            animate={{ scale: kb.s1, x: kb.x1, y: kb.y1 }}
            transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.div>

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          {/* Side vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />

          {/* Film-grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          {/* ── Text overlay ── */}
          <motion.div
            className="absolute left-8 md:left-16 z-20"
            style={{ bottom: "13%" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Category badge */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-primary/80" />
              <span className="text-primary font-heading font-bold tracking-[0.25em] uppercase text-xs">
                {slide.category}
              </span>
            </div>

            {/* Title */}
            <h3
              className="font-heading font-black uppercase text-white mb-1"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", lineHeight: 1.05, textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
            >
              {slide.title}
            </h3>

            {/* Description */}
            <p className="font-sans text-white/60 text-sm md:text-base mt-2" style={{ maxWidth: 420 }}>
              {slide.desc}
            </p>
          </motion.div>

          {/* ── Slide counter (top right) ── */}
          <motion.div
            className="absolute right-8 md:right-16 z-20 flex items-baseline gap-1"
            style={{ top: "11%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="font-heading font-black text-white/90 text-2xl">{slide.index}</span>
            <span className="font-heading text-white/30 text-sm">/ {String(SLIDES.length).padStart(2, "0")}</span>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ── Progress bar (just above bottom letterbox) ── */}
      <div className="absolute left-0 right-0 z-40" style={{ bottom: "7%", height: "2px" }}>
        <div className="w-full h-full bg-white/10" />
        <motion.div
          className="absolute top-0 left-0 h-full bg-primary"
          style={{ width: `${progress}%`, boxShadow: "0 0 8px rgba(255,200,50,0.7)" }}
        />
      </div>

      {/* ── Dot navigation ── */}
      <div className="absolute bottom-[9.5%] left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setProgress(0); }}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              background: i === current ? "#F0C040" : "rgba(255,255,255,0.3)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Left / Right arrows ── */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 flex items-center justify-center border border-white/20 bg-black/40 backdrop-blur-sm hover:border-primary/60 hover:bg-black/60 transition-all"
        style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5 text-white/80" />
      </button>

      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 flex items-center justify-center border border-white/20 bg-black/40 backdrop-blur-sm hover:border-primary/60 hover:bg-black/60 transition-all"
        style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5 text-white/80" />
      </button>

      {/* ── Play / Pause ── */}
      <button
        onClick={() => setPlaying((p) => !p)}
        className="absolute z-40 w-9 h-9 flex items-center justify-center border border-white/20 bg-black/40 backdrop-blur-sm hover:border-primary/60 transition-all"
        style={{ bottom: "9%", right: "4%", clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing
          ? <Pause className="w-4 h-4 text-white/70" />
          : <Play className="w-4 h-4 text-white/70" />
        }
      </button>
    </div>
  );
}
