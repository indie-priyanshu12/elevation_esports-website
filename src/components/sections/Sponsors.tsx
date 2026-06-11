"use client";

import React from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

export interface SponsorData {
  name: string;
  logoUrl?: string;
}

export function Sponsors({ sponsors }: { sponsors: SponsorData[] }) {
  return (
    <section id="sponsors" className="py-32 relative border-y border-cyber-purple/20 bg-void overflow-hidden">
      {/* Animated scanlines across background */}
      <motion.div 
        animate={{ backgroundPosition: ["0% 0%", "0% 100%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,243,255,0.2)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none"
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <SectionHeader title="Network Nodes" subtitle="The corporate entities powering our ascent to the top." />

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-20 mb-20">
          {(sponsors || []).map((sponsor, index) => {
            if (!sponsor) return null;
            return (
            <motion.div
              key={`sponsor-${index}`}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Cyberpunk Skewed Box */}
              <div className="w-32 h-24 md:w-48 md:h-32 bg-glass backdrop-blur border border-cyber-purple/50 flex items-center justify-center transform -skew-x-12 transition-all duration-300 group-hover:border-neon-cyan group-hover:shadow-neon-cyan overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-neon-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="transform skew-x-12 font-display text-white/50 group-hover:text-neon-cyan font-bold transition-colors duration-300 text-lg md:text-xl tracking-cyber">
                  {sponsor.name}
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button variant="outline">Initiate Partnership</Button>
        </motion.div>
      </div>
    </section>
  );
}
