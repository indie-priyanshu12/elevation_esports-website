import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-void border-t border-neon-cyan/20 pt-16 pb-8 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2 pr-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-8 h-8 flex items-center justify-center overflow-visible">
                <div className="relative w-6 h-6 scale-[2]">
                  <Image
                    src="/logo/EE_logo.webp"
                    alt="Elevation Esports logo"
                    fill
                    className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,1)]"
                  />
                </div>
              </div>
              <span className="font-display font-bold text-ice text-xl uppercase tracking-cyber">Elevation</span>
            </div>
            <p className="font-sans font-medium text-ice/50 text-sm leading-relaxed mb-6 max-w-md">
              The next-generation university esports circuit. Pushing the boundaries of competitive gaming through raw skill and cybernetic precision.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-cyber-purple text-sm uppercase tracking-cyber mb-6">Protocols</h4>
            <ul className="space-y-3 font-sans text-sm font-medium text-ice/70">
              <li><a href="#" className="hover:text-neon-cyan hover:translate-x-1 inline-block transition-transform">FPS Operations</a></li>
              <li><a href="#" className="hover:text-neon-cyan hover:translate-x-1 inline-block transition-transform">MOBA Tactics</a></li>
              <li><a href="#" className="hover:text-neon-cyan hover:translate-x-1 inline-block transition-transform">FGC Arena</a></li>
              <li><a href="#" className="hover:text-neon-cyan hover:translate-x-1 inline-block transition-transform">Simulators</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-cyber-purple text-sm uppercase tracking-cyber mb-6">Database</h4>
            <ul className="space-y-3 font-sans text-sm font-medium text-ice/70">
              <li><a href="#about" className="hover:text-neon-pink hover:translate-x-1 inline-block transition-transform">System Status</a></li>
              <li><a href="#teams" className="hover:text-neon-pink hover:translate-x-1 inline-block transition-transform">Active Rosters</a></li>
              <li><a href="#sponsors" className="hover:text-neon-pink hover:translate-x-1 inline-block transition-transform">Network Nodes</a></li>
              <li><a href="#" className="hover:text-neon-pink hover:translate-x-1 inline-block transition-transform">Hardware Store</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-cyber-purple text-sm uppercase tracking-cyber mb-6">Security</h4>
            <ul className="space-y-3 font-sans text-sm font-medium text-ice/70">
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Privacy Protocol</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Terms of Use</a></li>
              <li><Link href="/rules-of-engagement" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Rules of Engagement</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-sans font-bold text-ice/40 tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} Elevation Esports. System Online.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-neon-cyan mr-2 animate-pulse" /> Network Stable</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
