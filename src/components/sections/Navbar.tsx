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
          {/* other nav items can be added here */}
        </ul>
        <Button variant="cyber">Login</Button>
      </div>
    </nav>
  );
}
