"use client";
import Image from "next/image";

interface GameCardProps {
  name: string;
  logoSrc: string;
  onSelect?: () => void;
}

export function GameCard({ name, logoSrc, onSelect }: GameCardProps) {
  return (
    <button
      onClick={onSelect}
      className="relative flex flex-col items-center justify-center gap-3 rounded-3xl p-4 w-full h-full overflow-hidden border border-neon-cyan/20 hover:border-neon-cyan/60 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-all duration-300 group"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,255,255,0.05) 0%, rgba(15,5,30,0.8) 50%, rgba(255,0,200,0.05) 100%)",
      }}
    >
      {/* Subtle inner glow panel behind logo — rounded-full to avoid boxy look */}
      <div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: "10rem",
          height: "10rem",
          background:
            "radial-gradient(circle, rgba(0,255,255,0.15) 0%, transparent 70%)",
        }}
      >
        <div className="relative w-24 h-24">
          <Image
            src={logoSrc}
            alt={name + " logo"}
            fill
            className="object-contain drop-shadow-[0_0_6px_rgba(200,240,255,0.4)] transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Game name */}
      <span className="text-lg font-bold text-neon-cyan uppercase tracking-wider text-center leading-tight group-hover:text-neon-pink transition-colors">
        {name}
      </span>
    </button>
  );
}
