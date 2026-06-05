"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`bg-glass backdrop-blur-md border border-cyber-purple/30 hover:border-neon-cyan hover:shadow-neon-cyan transition-colors duration-300 relative overflow-hidden rounded-lg ${className}`}
      {...props}
    >
      {/* Glitch diagonal line */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-neon-cyan/20 to-transparent transform rotate-45 translate-x-8 -translate-y-8 pointer-events-none" />
      {children}
    </motion.div>
  );
}

export function CardHeader({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`p-6 border-b border-white/10 bg-black/20 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <h3 className={`font-display text-ice text-2xl uppercase tracking-cyber ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <p className={`font-sans text-neon-cyan/80 text-sm font-medium mt-2 ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}
