import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import Link from "next/link";

export default function RulesOfEngagement() {
  return (
    <main className="min-h-screen bg-obsidian flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full relative z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[500px] bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="mb-12">
          <div className="inline-block px-3 py-1 mb-6 border border-neon-cyan/30 bg-neon-cyan/10 rounded-sm font-display text-xs font-bold uppercase tracking-[0.2em] text-neon-cyan backdrop-blur-md">
            Protocol 01
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-ice to-ice/50 tracking-tight leading-none mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Rules of <span className="text-neon-cyan drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">Engagement</span>
          </h1>
          <p className="font-sans text-ice/70 text-lg md:text-xl max-w-2xl leading-relaxed border-l-2 border-neon-cyan/50 pl-4">
            Official guidelines and code of conduct for Elevation Esports. These rules apply to all collegiate events, club activities, and All-India tournaments organized by the community.
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-void/50 border border-white/10 rounded-lg p-8 backdrop-blur-sm relative overflow-hidden group hover:border-neon-cyan/30 transition-colors duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan opacity-50 group-hover:opacity-100 transition-opacity" />
            <h2 className="font-display text-2xl font-bold uppercase text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="text-neon-cyan">01.</span> General Conduct
            </h2>
            <ul className="space-y-4 font-sans text-ice/80 leading-relaxed list-none">
              <li className="flex gap-3">
                <span className="text-neon-pink mt-1">▹</span>
                <span><strong className="text-white">Respect & Fair Play:</strong> All participants must treat fellow players, organizers, and staff with respect. Harassment, hate speech, toxicity, and discrimination will result in immediate disqualification.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neon-pink mt-1">▹</span>
                <span><strong className="text-white">Sportsmanship:</strong> Maintain professional behavior in victory and defeat. "GG" is encouraged; malicious trash talk is not.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neon-pink mt-1">▹</span>
                <span><strong className="text-white">Accountability:</strong> Players are responsible for their accounts, hardware, and internet connection. Disconnects may result in a forfeit depending on the specific tournament ruleset.</span>
              </li>
            </ul>
          </section>

          <section className="bg-void/50 border border-white/10 rounded-lg p-8 backdrop-blur-sm relative overflow-hidden group hover:border-neon-purple/30 transition-colors duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyber-purple opacity-50 group-hover:opacity-100 transition-opacity" />
            <h2 className="font-display text-2xl font-bold uppercase text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="text-cyber-purple">02.</span> Tournament Integrity
            </h2>
            <ul className="space-y-4 font-sans text-ice/80 leading-relaxed list-none">
              <li className="flex gap-3">
                <span className="text-neon-cyan mt-1">▹</span>
                <span><strong className="text-white">Anti-Cheat:</strong> The use of any third-party software, scripts, macros, or exploits that provide an unfair advantage is strictly prohibited. Offenders will face a lifetime ban from all Elevation Esports events.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neon-cyan mt-1">▹</span>
                <span><strong className="text-white">Smurfing & Ringing:</strong> Playing under a false identity or using alternate accounts to circumvent skill-based matchmaking or roster locks is forbidden.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neon-cyan mt-1">▹</span>
                <span><strong className="text-white">Match Fixing:</strong> Any attempt to collude or intentionally alter the outcome of a match will result in severe penalties and potential reporting to official collegiate bodies.</span>
              </li>
            </ul>
          </section>

          <section className="bg-void/50 border border-white/10 rounded-lg p-8 backdrop-blur-sm relative overflow-hidden group hover:border-neon-pink/30 transition-colors duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-neon-pink opacity-50 group-hover:opacity-100 transition-opacity" />
            <h2 className="font-display text-2xl font-bold uppercase text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="text-neon-pink">03.</span> All-India Tournaments
            </h2>
            <ul className="space-y-4 font-sans text-ice/80 leading-relaxed list-none">
              <li className="flex gap-3">
                <span className="text-cyber-purple mt-1">▹</span>
                <span><strong className="text-white">Eligibility:</strong> Unless stated otherwise, national events require participants to possess valid student IDs from recognized Indian colleges/universities.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyber-purple mt-1">▹</span>
                <span><strong className="text-white">Verification:</strong> Rosters must be submitted and verified before the bracket phase begins. Unverified substitutes cannot play.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyber-purple mt-1">▹</span>
                <span><strong className="text-white">Prize Distribution:</strong> Winnings will be disbursed within 30-45 business days post-tournament. The captain/manager is responsible for distributing funds among the team.</span>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 font-display font-bold uppercase tracking-widest text-sm text-void bg-neon-cyan hover:bg-white transition-colors duration-300 rounded-[2px] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]">
            Acknowledge & Return
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
