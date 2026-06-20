import React from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Skeleton } from "@/components/ui/Skeleton";

export default function NewsLoading() {
  return (
    <main className="min-h-screen bg-obsidian flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100%] h-[600px] bg-cyber-purple/10 blur-[150px] rounded-full pointer-events-none -z-10" />
        
        <div className="mb-16 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 border border-cyber-purple/30 bg-cyber-purple/10 rounded-sm font-display text-xs font-bold uppercase tracking-[0.2em] text-cyber-purple backdrop-blur-md">
            Transmission Log
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-ice to-cyber-purple tracking-tight leading-none mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Latest <span className="text-cyber-purple drop-shadow-[0_0_20px_rgba(188,19,254,0.6)]">News</span>
          </h1>
          <p className="font-sans text-ice/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest announcements, tournament results, and community highlights from the Elevation Esports network.
          </p>
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-void/60 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm flex flex-col h-[320px]">
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-4">
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="mb-4 space-y-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-3/4" />
                </div>
                <div className="mb-8 flex-grow space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="mt-auto">
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
