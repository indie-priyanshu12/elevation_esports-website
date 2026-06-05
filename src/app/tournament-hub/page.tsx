import type { Metadata } from "next";
import Link from "next/link";
import { GameSelection } from "@/components/tournament/GameSelection";
import { TournamentTabs } from "@/components/tournament/TournamentTabs";

export const metadata: Metadata = {
  title: "Tournament Hub",
  description: "Explore and register for esports tournaments.",
};

export default function TournamentHubPage() {
  return (
    <main className="relative min-h-screen bg-void text-ice overflow-x-hidden">
      {/* Back button — pinned top-left */}
      <Link
        href="/"
        className="absolute top-4 left-4 z-20 flex items-center gap-1 text-ice hover:text-neon-cyan transition text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>

      {/* Centred content column — fills viewport, no scroll */}
      <section className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-6 pb-14 pt-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-neon-pink tracking-widest">
          Tournament Hub
        </h1>

        <GameSelection />

        {/* Tab buttons */}
        <TournamentTabs />
      </section>
    </main>
  );
}
