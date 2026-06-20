import React from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/Skeleton";
import { DiscordPopup } from "@/components/ui/DiscordPopup";

export default function TournamentHubLoading() {
  return (
    <main className="relative min-h-screen bg-void text-ice overflow-x-hidden">
      {/* Back button */}
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

      <section className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-6 pb-14 pt-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-neon-pink tracking-widest">
          Tournament Hub
        </h1>

        {/* Skeleton Game Selection */}
        <div className="w-full max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl uppercase tracking-cyber text-ice">
              Select Game
            </h2>
            <div className="h-px flex-grow bg-gradient-to-r from-neon-pink/50 to-transparent ml-4"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square w-full rounded-3xl border border-neon-cyan/20 p-4">
                <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                  <Skeleton className="h-24 w-24 rounded-full" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skeleton Tournament Tabs */}
        <div className="w-full space-y-6 mt-8">
          <div className="flex flex-wrap justify-center gap-4">
             <Skeleton className="h-10 w-48 rounded-full" />
             <Skeleton className="h-10 w-48 rounded-full" />
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 md:p-6">
            <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-96" />
              </div>
              <Skeleton className="h-4 w-40" />
            </div>

            <div className="grid gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-black/40 p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-6">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </div>
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-4 w-64" />
                    </div>
                    <div className="flex gap-3">
                      <Skeleton className="h-11 w-32" />
                      <Skeleton className="h-11 w-24" />
                    </div>
                  </div>
                  <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    {[...Array(6)].map((_, j) => (
                      <div key={j} className="space-y-2">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DiscordPopup />
    </main>
  );
}
