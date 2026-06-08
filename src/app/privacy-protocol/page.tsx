import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import Link from "next/link";

export default function PrivacyProtocol() {
  return (
    <main className="min-h-screen bg-obsidian flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full relative z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[500px] bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="mb-12">
          <div className="inline-block px-3 py-1 mb-6 border border-neon-cyan/30 bg-neon-cyan/10 rounded-sm font-display text-xs font-bold uppercase tracking-[0.2em] text-neon-cyan backdrop-blur-md">
            Security 01
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-ice to-ice/50 tracking-tight leading-none mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Privacy <span className="text-neon-cyan drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">Protocol</span>
          </h1>
          <p className="font-sans text-ice/70 text-lg md:text-xl max-w-2xl leading-relaxed border-l-2 border-neon-cyan/50 pl-4">
            How Elevation Esports collects, utilizes, and protects your data within our network. Your privacy is a core directive.
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-void/50 border border-white/10 rounded-lg p-8 backdrop-blur-sm relative overflow-hidden group hover:border-neon-cyan/30 transition-colors duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan opacity-50 group-hover:opacity-100 transition-opacity" />
            <h2 className="font-display text-2xl font-bold uppercase text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="text-neon-cyan">01.</span> Data Collection
            </h2>
            <div className="space-y-4 font-sans text-ice/80 leading-relaxed">
              <p>
                We collect information necessary to facilitate tournament operations, verify student eligibility, and maintain account security. This includes:
              </p>
              <ul className="list-none space-y-2 mt-2">
                <li className="flex gap-3"><span className="text-neon-pink mt-1">▹</span><span><strong className="text-white">Identity Data:</strong> Name, age, student ID, and gamer tags.</span></li>
                <li className="flex gap-3"><span className="text-neon-pink mt-1">▹</span><span><strong className="text-white">Contact Data:</strong> Email address and Discord handles.</span></li>
                <li className="flex gap-3"><span className="text-neon-pink mt-1">▹</span><span><strong className="text-white">Technical Data:</strong> IP addresses and browser information for security purposes.</span></li>
              </ul>
            </div>
          </section>

          <section className="bg-void/50 border border-white/10 rounded-lg p-8 backdrop-blur-sm relative overflow-hidden group hover:border-neon-purple/30 transition-colors duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyber-purple opacity-50 group-hover:opacity-100 transition-opacity" />
            <h2 className="font-display text-2xl font-bold uppercase text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="text-cyber-purple">02.</span> Data Usage
            </h2>
            <div className="space-y-4 font-sans text-ice/80 leading-relaxed">
              <p>
                Your data is strictly utilized to enhance your experience within the Elevation Esports ecosystem:
              </p>
              <ul className="list-none space-y-2 mt-2">
                <li className="flex gap-3"><span className="text-neon-cyan mt-1">▹</span><span><strong className="text-white">Tournament Logistics:</strong> Bracket seeding, prize distribution, and communication.</span></li>
                <li className="flex gap-3"><span className="text-neon-cyan mt-1">▹</span><span><strong className="text-white">Platform Security:</strong> Preventing fraud, smurfing, and maintaining competitive integrity.</span></li>
                <li className="flex gap-3"><span className="text-neon-cyan mt-1">▹</span><span><strong className="text-white">Community Updates:</strong> Important announcements regarding upcoming events (opt-out available).</span></li>
              </ul>
            </div>
          </section>

          <section className="bg-void/50 border border-white/10 rounded-lg p-8 backdrop-blur-sm relative overflow-hidden group hover:border-neon-pink/30 transition-colors duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-neon-pink opacity-50 group-hover:opacity-100 transition-opacity" />
            <h2 className="font-display text-2xl font-bold uppercase text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="text-neon-pink">03.</span> Information Protection
            </h2>
            <div className="space-y-4 font-sans text-ice/80 leading-relaxed">
              <p>
                We implement robust security measures to protect your personal information. We do not sell your data to third parties. Limited information may be shared with trusted partners solely for tournament execution (e.g., verifying college enrollment).
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 font-display font-bold uppercase tracking-widest text-sm text-void bg-neon-cyan hover:bg-white transition-colors duration-300 rounded-[2px] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]">
            Return to Base
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
