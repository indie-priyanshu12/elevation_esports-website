"use client";
import { motion } from "framer-motion";
import { GameCard } from "./GameCard";

const games = [
  { id: "bgmi",         name: "BGMI",          logo: "/logo/bgmi.svg" },
  { id: "valorant",     name: "Valorant",       logo: "/logo/valorant.svg" },
  { id: "cs2",          name: "CS2",            logo: "/logo/cs2.svg" },
  { id: "freefire",     name: "Free Fire",      logo: "/logo/freefire.svg" },
  { id: "rocket-league",name: "Rocket League",  logo: "/logo/rocket-league.svg" },
  { id: "ea-fc",        name: "EA Sports FC",   logo: "/logo/ea-fc.svg" },
  { id: "chess",        name: "Chess",          logo: "/logo/chess.svg" },
  { id: "clash-royale", name: "Clash Royale",   logo: "/logo/clash-royale.svg" },
];

export function GameSelection({ onSelect }: { onSelect?: (gameId: string) => void }) {
  return (
    <motion.div
      className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2"
      style={{ minHeight: "24rem" }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {games.map((g) => (
        <GameCard
          key={g.id}
          name={g.name}
          logoSrc={g.logo}
          onSelect={() => onSelect?.(g.id)}
        />
      ))}
    </motion.div>
  );
}
