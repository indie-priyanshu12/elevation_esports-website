"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface GameCardProps {
  name: string;
  logoSrc: string;
  onSelect?: () => void;
}

export function GameCard({ name, logoSrc, onSelect }: GameCardProps) {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.06, boxShadow: "0 0 28px rgba(0,255,255,0.35)" }}
      whileTap={{ scale: 0.97 }}
      className="relative flex flex-col items-center justify-center gap-2 rounded-xl p-3 w-full h-full overflow-hidden border border-neon-cyan/30 hover:border-neon-pink/70 transition-colors group"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,255,255,0.07) 0%, rgba(15,5,30,0.85) 50%, rgba(255,0,200,0.07) 100%)",
      }}
    >
      {/* Subtle inner glow panel behind logo — makes dark logos pop */}
      <div
        className="relative flex items-center justify-center rounded-lg"
        style={{
          width: "12.8rem",
          height: "12.8rem",
          background:
            "radial-gradient(ellipse at center, rgba(180,220,255,0.18) 0%, rgba(0,255,255,0.06) 60%, transparent 100%)",
          filter: "drop-shadow(0 0 8px rgba(0,255,255,0.25))",
        }}
      >
        <div className="relative" style={{ width: "11.2rem", height: "11.2rem" }}>
          <Image
            src={logoSrc}
            alt={name + " logo"}
            fill
            className="object-contain drop-shadow-[0_0_6px_rgba(200,240,255,0.6)]"
          />
        </div>
      </div>

      {/* Game name */}
      <span className="text-xl font-bold text-neon-cyan uppercase tracking-widest text-center leading-tight group-hover:text-neon-pink transition-colors">
        {name}
      </span>

      {/* Corner accent lines */}
      <span className="pointer-events-none absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-cyan/60 rounded-tl-xl" />
      <span className="pointer-events-none absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-cyan/60 rounded-tr-xl" />
      <span className="pointer-events-none absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-pink/50 rounded-bl-xl" />
      <span className="pointer-events-none absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-pink/50 rounded-br-xl" />
    </motion.button>
  );
}
