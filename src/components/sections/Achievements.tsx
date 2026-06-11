"use client";

import { motion } from "framer-motion";

export interface AchievementData {
  icon: string;
  value: string;
  label: string;
  color: string;
}

export function Achievements({ achievements }: { achievements: AchievementData[] }) {
  return (
    <section className="py-24 relative overflow-hidden bg-void border-y border-white/5">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-void via-[#1a0b2e]/30 to-void" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display text-ice mb-4"
          >
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-cyan">ACHIEVEMENTS</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-ice/60 font-mono"
          >
            Dominating the campus esports scene.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(achievements || []).map((item, index) => {
            if (!item) return null;
            return (
            <motion.div
              key={`achievement-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, translateY: -5 }}
              className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center flex flex-col items-center justify-center group hover:border-neon-cyan/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div className={`text-4xl md:text-5xl font-display mb-2 ${item.color} drop-shadow-[0_0_15px_currentColor]`}>
                {item.value}
              </div>
              <div className="text-ice/80 font-mono text-sm tracking-widest uppercase">
                {item.label}
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
