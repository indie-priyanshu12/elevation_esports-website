"use client";

import React, { useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "cyber" | "outline" | "glitch";
  children: React.ReactNode;
}

export function Button({ variant = "cyber", className = "", children, ...props }: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const baseStyles = "relative inline-flex items-center justify-center h-12 px-8 font-display uppercase tracking-cyber text-sm transition-all duration-300 overflow-hidden font-bold";
  
  if (variant === "cyber") {
    return (
      <motion.button
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileTap={{ scale: 0.95 }}
        className={`${baseStyles} bg-neon-cyan text-void shadow-neon-cyan hover:bg-white hover:text-neon-cyan ${className}`}
        {...props}
      >
        {/* Animated scanline effect on hover */}
        {isHovered && (
          <motion.div 
            initial={{ top: "-100%" }}
            animate={{ top: "200%" }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-4 bg-white/50 blur-sm z-0"
          />
        )}
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }

  if (variant === "outline") {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${baseStyles} bg-transparent text-neon-pink border-2 border-neon-pink shadow-[0_0_10px_rgba(255,0,127,0.3)_inset,0_0_10px_rgba(255,0,127,0.3)] hover:bg-neon-pink hover:text-void hover:shadow-neon-pink ${className}`}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }

  // Glitch variant
  return (
    <motion.button
      whileHover={{ scale: 1.05, x: [-2, 2, -2, 0] }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`${baseStyles} bg-cyber-purple text-ice shadow-cyber-purple ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
