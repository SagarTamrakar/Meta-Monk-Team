import React from "react";
import heroImage from "@assets/META_LOGO.png";

export function LogoMark({ size = 100, className = "" }: { size?: number; className?: string }) {
  const id = React.useId().replace(/:/g, "");
  return (
    <img src={heroImage} alt="Meta Monk Logo" width={size} height={size} className={className} />
  );
}

export function LogoFull({ size = 100, className = "" }: { size?: number; className?: string }) {
  return (
    <LogoMark />
  );
}
