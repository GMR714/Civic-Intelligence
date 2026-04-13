"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInPageProps extends HTMLMotionProps<"div"> {
  className?: string;
  delay?: number;
}

export function FadeInPage({
  children,
  className,
  delay = 0,
  ...props
}: FadeInPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn("w-full h-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
