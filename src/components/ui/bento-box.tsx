import React from "react";

interface BentoBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowingAccent?: "green" | "magenta" | "yellow" | "none";
}

export function BentoBox({ children, className = "", glowingAccent = "none", ...props }: BentoBoxProps) {
  const accentBorders = {
    green: "border-t-[1px] border-t-[#00FF66]/50 shadow-[0_-5px_20px_-10px_rgba(0,255,102,0.15)]",
    magenta: "border-b-[1px] border-b-[#FF00AA]/50 shadow-[0_5px_20px_-10px_rgba(255,0,170,0.15)]",
    yellow: "border-l-[1px] border-l-[#E1FF00]/50 shadow-[-5px_0_20px_-10px_rgba(225,255,0,0.15)]",
    none: "",
  };

  return (
    <div
      className={`glass-panel rounded-2xl p-6 flex flex-col ${accentBorders[glowingAccent]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
