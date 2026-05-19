import React from "react";
import { motion } from "framer-motion";

interface SymbolDef {
  label: string;
  name: string;
  color: string;
  top: string;
  left: string;
  floatDuration: number;
  floatDelay: number;
  rotateDeg: number;
  size: "sm" | "md" | "lg";
}

const SYMBOLS: SymbolDef[] = [
  { label: "Ps",  name: "Photoshop",      color: "#31A8FF", top: "14%", left: "58%", floatDuration: 5.2, floatDelay: 0.2, rotateDeg: -2, size: "md" },
  { label: "Lr",  name: "Lightroom",      color: "#4FBBFF", top: "30%", left: "76%", floatDuration: 6.5, floatDelay: 1.0, rotateDeg:  3, size: "sm" },
  { label: "Ae",  name: "Motion Graphics",color: "#9B8FFF", top: "62%", left: "60%", floatDuration: 4.8, floatDelay: 0.6, rotateDeg: -3, size: "md" },
  { label: "VFX", name: "Visual Effects", color: "#5AC8FA", top: "18%", left: "84%", floatDuration: 7.0, floatDelay: 0.0, rotateDeg:  2, size: "lg" },
  { label: "CGI", name: "3D & CGI",       color: "#F0C040", top: "52%", left: "82%", floatDuration: 5.6, floatDelay: 1.6, rotateDeg: -1, size: "md" },
  { label: "Pr",  name: "Premiere Pro",   color: "#EA7730", top: "76%", left: "70%", floatDuration: 6.0, floatDelay: 0.8, rotateDeg:  3, size: "sm" },
];

const SIZE_MAP = {
  sm: { panel: "px-3 py-2 min-w-[56px]", label: "text-lg",  badge: "text-[0.48rem]" },
  md: { panel: "px-4 py-3 min-w-[68px]", label: "text-xl",  badge: "text-[0.52rem]" },
  lg: { panel: "px-5 py-3 min-w-[78px]", label: "text-2xl", badge: "text-[0.56rem]" },
};

const FloatingSymbols: React.FC = () => {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden" aria-hidden="true">
      {SYMBOLS.map((sym) => {
        const s = SIZE_MAP[sym.size];
        return (
          <motion.div
            key={sym.label}
            className="absolute hidden md:flex flex-col items-center gap-1"
            style={{ top: sym.top, left: sym.left }}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -16, 0],
              rotate: [-sym.rotateDeg, sym.rotateDeg, -sym.rotateDeg],
            }}
            transition={{
              opacity: { duration: 1.0, delay: sym.floatDelay + 0.8 },
              scale:   { duration: 1.0, delay: sym.floatDelay + 0.8 },
              y:       { duration: sym.floatDuration, delay: sym.floatDelay, repeat: Infinity, ease: "easeInOut" },
              rotate:  { duration: sym.floatDuration * 1.4, delay: sym.floatDelay, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            {/* Holographic panel */}
            <motion.div
              style={{
                border: `1px solid ${sym.color}60`,
                background: `linear-gradient(135deg, ${sym.color}14 0%, ${sym.color}08 100%)`,
                clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                backdropFilter: "blur(12px)",
              }}
              animate={{
                boxShadow: [
                  `0 0 12px ${sym.color}30, inset 0 0 8px ${sym.color}0A`,
                  `0 0 28px ${sym.color}60, inset 0 0 18px ${sym.color}18`,
                  `0 0 12px ${sym.color}30, inset 0 0 8px ${sym.color}0A`,
                ],
              }}
              transition={{ duration: sym.floatDuration * 0.9, repeat: Infinity, ease: "easeInOut", delay: sym.floatDelay }}
              className={`${s.panel} flex flex-col items-center gap-1`}
            >
              <span
                className={`font-heading font-black ${s.label} leading-none`}
                style={{
                  color: sym.color,
                  textShadow: `0 0 14px ${sym.color}DD, 0 0 28px ${sym.color}77`,
                }}
              >
                {sym.label}
              </span>
              <span
                className={`font-sans uppercase tracking-widest leading-none whitespace-nowrap ${s.badge}`}
                style={{ color: `${sym.color}AA` }}
              >
                {sym.name}
              </span>
            </motion.div>

            {/* Connector line */}
            <motion.div
              className="w-px"
              style={{
                background: `linear-gradient(to bottom, ${sym.color}70, transparent)`,
                height: "18px",
              }}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: sym.floatDuration, repeat: Infinity, ease: "easeInOut", delay: sym.floatDelay }}
            />

            {/* End dot */}
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: sym.color, boxShadow: `0 0 6px ${sym.color}` }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.7, 1.3, 0.7] }}
              transition={{ duration: sym.floatDuration * 0.65, repeat: Infinity, ease: "easeInOut", delay: sym.floatDelay }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingSymbols;
