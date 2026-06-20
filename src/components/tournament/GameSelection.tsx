"use client";
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
    <div
      className="grid w-full grid-cols-4 grid-rows-2 gap-2 md:gap-4 min-h-[12rem] md:min-h-[22rem]"
    >
      {games.map((g) => (
        <GameCard
          key={g.id}
          name={g.name}
          logoSrc={g.logo}
          onSelect={() => onSelect?.(g.id)}
        />
      ))}
    </div>
  );
}
