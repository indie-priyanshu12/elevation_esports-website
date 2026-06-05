"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({ value, label, suffix = "", duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: duration * 1000,
  });

  const displayValue = useTransform(springValue, (current) => 
    Math.round(current).toString()
  );

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, springValue, value]);

  return (
    <motion.div 
      ref={ref} 
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center justify-center p-8 bg-glass backdrop-blur-md border border-neon-cyan/30 rounded-xl relative overflow-hidden group"
    >
      {/* Glitch background sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
      
      <div className="flex items-end font-display font-bold text-5xl md:text-6xl text-ice mb-2 text-glow relative z-10">
        <motion.span>{displayValue}</motion.span>
        <span className="text-neon-pink ml-1">{suffix}</span>
      </div>
      <div className="h-1 w-16 bg-gradient-to-r from-neon-cyan to-cyber-purple my-3 rounded-full" />
      <span className="font-sans text-sm text-neon-cyan/80 uppercase tracking-cyber font-bold text-center relative z-10">{label}</span>
    </motion.div>
  );
}
