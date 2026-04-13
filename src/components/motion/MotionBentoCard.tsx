"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MotionBentoCardProps extends HTMLMotionProps<"div"> {
  className?: string;
  delay?: number;
}

export function MotionBentoCard({
  children,
  className,
  delay = 0,
  ...props
}: MotionBentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay,
      }}
      className={cn(
        "glass-panel rounded-2xl p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-ipe-green/10",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
