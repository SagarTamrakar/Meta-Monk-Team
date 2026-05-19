import React from "react";

export function LogoMark({ size = 48, className = "" }: { size?: number; className?: string }) {
  const id = React.useId().replace(/:/g, "");
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Meta Monk Visuals"
    >
      <defs>
        <linearGradient id={`gold-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
        <linearGradient id={`silver-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#9CA3AF" />
        </linearGradient>
        <filter id={`glow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`glow-soft-${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer neon ring */}
      <circle cx="400" cy="400" r="300"
        stroke={`url(#gold-${id})`}
        strokeWidth="8"
        fill="none"
        filter={`url(#glow-${id})`} />

      {/* Inner ring */}
      <circle cx="400" cy="400" r="260"
        stroke="#1E3A8A"
        strokeWidth="3"
        fill="none"
        opacity="0.8" />

      {/* MM monogram */}
      <text
        x="400" y="360"
        textAnchor="middle"
        fontFamily="Orbitron, Arial, sans-serif"
        fontSize="180"
        fontWeight="900"
        fill={`url(#gold-${id})`}
        filter={`url(#glow-${id})`}
      >
        MM
      </text>

      {/* VISUALS label */}
      <text
        x="400" y="490"
        textAnchor="middle"
        fontFamily="Orbitron, Arial, sans-serif"
        fontSize="52"
        fontWeight="700"
        fill={`url(#gold-${id})`}
        filter={`url(#glow-soft-${id})`}
        letterSpacing="14"
      >
        VISUALS
      </text>
    </svg>
  );
}

export function LogoFull({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <LogoMark size={size} className={className} />
  );
}
