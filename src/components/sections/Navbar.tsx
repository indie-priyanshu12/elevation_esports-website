import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-void bg-opacity-70 backdrop-blur-md border-b border-void/30 py-4">
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
        <Link href="/" className="text-2xl font-bold text-neon-pink">Elevation Esports</Link>
        <ul className="flex space-x-6 items-center">
          <li><Link href="/" className="text-ice hover:text-neon-cyan transition">Home</Link></li>
          <li><Link href="/tournament-hub" className="text-ice hover:text-neon-cyan transition">Tournament Hub</Link></li>
          <li><Link href="/news" className="text-ice hover:text-neon-cyan transition">News</Link></li>
          {/* other nav items can be added here */}
        </ul>
        <div className="flex items-center gap-8">
          <a href="https://discord.gg/PEjbSkNmb8" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neon-cyan transition-colors" title="Join Discord">
            <svg width="36" height="36" viewBox="0 0 127.14 96.36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a67.73,67.73,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.09,53,91.08,65.69,84.69,65.69Z"/>
            </svg>
          </a>
          <Button variant="cyber">Login</Button>
        </div>
      </div>
    </nav>
  );
}
