"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col items-center justify-center mb-16 ${className}`}>
      <motion.div 
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 1, width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="flex items-center justify-center mb-4 max-w-3xl mx-auto overflow-hidden"
      >
        <motion.div 
          animate={{ x: [-20, 0, -20] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="h-px w-24 md:w-32 bg-gradient-to-r from-transparent via-neon-cyan to-neon-cyan opacity-80 shadow-neon-cyan" 
        />
        <h2 className="text-center text-3xl md:text-5xl font-bold mx-6 text-ice text-glow whitespace-nowrap">
          {title}
        </h2>
        <motion.div 
          animate={{ x: [20, 0, 20] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="h-px w-24 md:w-32 bg-gradient-to-l from-transparent via-neon-pink to-neon-pink opacity-80 shadow-neon-pink" 
        />
      </motion.div>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-neon-cyan/70 text-center max-w-2xl font-sans text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
