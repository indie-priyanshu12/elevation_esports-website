"use client";

import React from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { AnimatedCounter } from "../ui/AnimatedCounter";

export function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background diagonal slash */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyber-purple/5 via-transparent to-neon-cyan/5 transform -skew-y-12 scale-150 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader 
          title="System Status" 
          subtitle="We don't just play games. We engineer champions in an elite, high-octane environment."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <AnimatedCounter value={450} label="Active Operators" suffix="+" />
          <AnimatedCounter value={24} label="Circuits Hosted" />
          <AnimatedCounter value={12} label="Trophies Secured" />
          <AnimatedCounter value={5} label="Elite Squadrons" />
        </div>
      </div>
    </section>
  );
}
