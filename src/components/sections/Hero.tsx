"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Dynamic Animated Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 100, -100, 0],
          y: [0, -100, 100, 0],
          scale: [1, 1.2, 0.8, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-neon-cyan/20 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          x: [0, -150, 100, 0],
          y: [0, 150, -50, 0],
          scale: [1, 0.8, 1.2, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-cyber-purple/20 rounded-full blur-[80px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          x: [0, 80, -80, 0],
          y: [0, 80, -80, 0],
          scale: [0.8, 1.1, 0.9, 0.8]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/3 w-[35vw] h-[35vw] bg-neon-pink/15 rounded-full blur-[90px] pointer-events-none"
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-8"
        >
          {/* Glowing logo mark */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
            <div className="relative w-24 h-24 md:w-28 md:h-28 scale-[2]">
              <Image
                src="/logo/EE_logo.webp"
                alt="Elevation Esports logo"
                fill
                className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,1)]"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative w-full max-w-full"
        >
          <h1 className="text-[clamp(1rem,4.2vw,4.5rem)] mb-6 font-black tracking-tighter leading-[1.1] flex flex-row flex-nowrap whitespace-nowrap justify-center gap-[1.5vw] uppercase">
            <motion.span 
              animate={{ textShadow: ["0 0 8px rgba(255, 0, 127, 0.3)", "0 0 18px rgba(255, 0, 127, 0.8)", "0 0 8px rgba(255, 0, 127, 0.3)"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-neon-pink"
            >
              COMPETE.
            </motion.span>
            <motion.span 
              animate={{ filter: ["drop-shadow(0 0 1px rgba(0, 243, 255, 0.2))", "drop-shadow(0 0 8px rgba(0, 243, 255, 0.7))", "drop-shadow(0 0 1px rgba(0, 243, 255, 0.2))"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="text-transparent text-stroke-cyan"
            >
              CONNECT.
            </motion.span>
            <motion.span 
              animate={{ textShadow: ["0 0 8px rgba(255, 0, 127, 0.3)", "0 0 18px rgba(255, 0, 127, 0.8)", "0 0 8px rgba(255, 0, 127, 0.3)"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="text-neon-pink"
            >
              CONQUER.
            </motion.span>
          </h1>

          {/* Glitch duplicate text Layer 1 (Purple Offset) */}
          <motion.h1 
            animate={{ 
              x: [-3, 2, -1, 3, -2, 0],
              y: [1, -2, 1, -1, 2, 0],
              opacity: [0, 0.7, 0.2, 0.8, 0.1, 0]
            }}
            transition={{ 
              duration: 0.25, 
              repeat: Infinity, 
              repeatDelay: 0.7,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-0 w-full text-[clamp(1rem,4.2vw,4.5rem)] mb-6 font-black tracking-tighter leading-[1.1] flex flex-row flex-nowrap whitespace-nowrap justify-center gap-[1.5vw] uppercase pointer-events-none"
          >
            <span className="text-cyber-purple">COMPETE.</span>
            <span className="text-transparent text-stroke-pink">CONNECT.</span>
            <span className="text-cyber-purple">CONQUER.</span>
          </motion.h1>

          {/* Glitch duplicate text Layer 2 (Cyan Offset) */}
          <motion.h1 
            animate={{ 
              x: [2, -3, 2, -2, 1, 0],
              y: [-1, 1, -2, 1, -1, 0],
              opacity: [0, 0.5, 0.1, 0.6, 0, 0]
            }}
            transition={{ 
              duration: 0.2, 
              repeat: Infinity, 
              repeatDelay: 1.2,
              ease: "easeInOut",
              delay: 0.3
            }}
            className="absolute top-0 left-0 w-full text-[clamp(1rem,4.2vw,4.5rem)] mb-6 font-black tracking-tighter leading-[1.1] flex flex-row flex-nowrap whitespace-nowrap justify-center gap-[1.5vw] uppercase pointer-events-none"
          >
            <span className="text-neon-cyan">COMPETE.</span>
            <span className="text-transparent text-stroke-cyan">CONNECT.</span>
            <span className="text-neon-cyan">CONQUER.</span>
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-sans font-medium text-ice/70 text-lg md:text-2xl max-w-3xl mb-12"
        >
          The premier university gaming circuit. Push your limits in a hyper-connected, neon-drenched competitive arena.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Button variant="cyber">Join The Grid</Button>
          <Button variant="outline">News</Button>
        </motion.div>
      </div>
    </section>
  );
}
