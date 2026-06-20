"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Home, Trophy, Newspaper, LogIn } from "lucide-react";

export function Navbar() {
  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-void bg-opacity-70 backdrop-blur-md border-b border-void/30 py-4">
        <div className="container mx-auto flex items-center justify-between px-4 lg:px-8 relative min-h-[44px]">
          {/* Logo Container (Left) */}
          <Link href="/" className="flex items-center gap-2 p-2 -m-2 min-h-[44px] min-w-[44px] z-10">
            <img src="/favicon.ico" alt="Elevation Esports Logo" className="w-16 h-16 -my-4 -translate-y-[2px]" />
            <span className="bg-gradient-to-br from-neon-pink to-neon-cyan bg-clip-text text-transparent text-2xl font-bold hidden md:inline">Elevation Esports</span>
          </Link>

          {/* Mobile Title (Center) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
            <Link href="/" className="text-xl sm:text-2xl font-bold whitespace-nowrap p-2 text-white">
              Elevation Esports
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-2 items-center">
            <li>
              <Link href="/" className="text-ice hover:text-neon-cyan transition px-4 py-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md hover:bg-void/50">
                Home
              </Link>
            </li>
            <li>
              <Link href="/tournament-hub" className="text-ice hover:text-neon-cyan transition px-4 py-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md hover:bg-void/50">
                Tournament Hub
              </Link>
            </li>
            <li>
              <Link href="/news" className="text-ice hover:text-neon-cyan transition px-4 py-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md hover:bg-void/50">
                News
              </Link>
            </li>
          </ul>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a href="https://discord.gg/PEjbSkNmb8" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neon-cyan transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md hover:bg-void/50" title="Join Discord">
              <svg width="28" height="28" viewBox="0 0 127.14 96.36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a67.73,67.73,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.09,53,91.08,65.69,84.69,65.69Z" />
              </svg>
            </a>
            <Button variant="cyber" className="min-h-[44px]">Login</Button>
          </div>
          
          {/* Mobile Discord Action (shows on small screens) */}
          <div className="flex md:hidden items-center ml-auto">
             <a href="https://discord.gg/PEjbSkNmb8" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neon-cyan transition-colors p-3 min-h-[44px] min-w-[44px] flex items-center justify-center" title="Join Discord">
              <svg width="24" height="24" viewBox="0 0 127.14 96.36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a67.73,67.73,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.09,53,91.08,65.69,84.69,65.69Z" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-void bg-opacity-95 backdrop-blur-lg border-t border-void/50 pb-safe">
        <ul className="flex justify-around items-center px-2 py-1">
          <li>
            <Link href="/" className="flex flex-col items-center justify-center p-2 min-w-[64px] min-h-[44px] text-ice hover:text-neon-cyan transition-colors rounded-lg active:bg-void/50">
              <Home size={20} />
              <span className="text-[10px] mt-1 font-medium">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/tournament-hub" className="flex flex-col items-center justify-center p-2 min-w-[64px] min-h-[44px] text-ice hover:text-neon-cyan transition-colors rounded-lg active:bg-void/50">
              <Trophy size={20} />
              <span className="text-[10px] mt-1 font-medium">Hub</span>
            </Link>
          </li>
          <li>
            <Link href="/news" className="flex flex-col items-center justify-center p-2 min-w-[64px] min-h-[44px] text-ice hover:text-neon-cyan transition-colors rounded-lg active:bg-void/50">
              <Newspaper size={20} />
              <span className="text-[10px] mt-1 font-medium">News</span>
            </Link>
          </li>
          <li>
            <button type="button" onClick={() => alert("User login coming soon!")} className="flex flex-col items-center justify-center p-2 min-w-[64px] min-h-[44px] text-ice hover:text-neon-pink transition-colors rounded-lg active:bg-void/50">
              <LogIn size={20} />
              <span className="text-[10px] mt-1 font-medium">Login</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
