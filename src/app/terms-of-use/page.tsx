import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import Link from "next/link";

export default function TermsOfUse() {
  return (
    <main className="min-h-screen bg-obsidian flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full relative z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[500px] bg-cyber-purple/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="mb-12">
          <div className="inline-block px-3 py-1 mb-6 border border-cyber-purple/30 bg-cyber-purple/10 rounded-sm font-display text-xs font-bold uppercase tracking-[0.2em] text-cyber-purple backdrop-blur-md">
            Security 02
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-ice to-ice/50 tracking-tight leading-none mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Terms of <span className="text-cyber-purple drop-shadow-[0_0_15px_rgba(188,19,254,0.5)]">Use</span>
          </h1>
          <p className="font-sans text-ice/70 text-lg md:text-xl max-w-2xl leading-relaxed border-l-2 border-cyber-purple/50 pl-4">
            The legal framework governing your access to the Elevation Esports platform and participation in our events.
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-void/50 border border-white/10 rounded-lg p-8 backdrop-blur-sm relative overflow-hidden group hover:border-cyber-purple/30 transition-colors duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyber-purple opacity-50 group-hover:opacity-100 transition-opacity" />
            <h2 className="font-display text-2xl font-bold uppercase text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="text-cyber-purple">01.</span> Acceptance of Terms
            </h2>
            <div className="space-y-4 font-sans text-ice/80 leading-relaxed">
              <p>
                By accessing this website, creating an account, or participating in any Elevation Esports tournament, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
              </p>
            </div>
          </section>

          <section className="bg-void/50 border border-white/10 rounded-lg p-8 backdrop-blur-sm relative overflow-hidden group hover:border-neon-cyan/30 transition-colors duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan opacity-50 group-hover:opacity-100 transition-opacity" />
            <h2 className="font-display text-2xl font-bold uppercase text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="text-neon-cyan">02.</span> User Accounts
            </h2>
            <ul className="space-y-4 font-sans text-ice/80 leading-relaxed list-none">
              <li className="flex gap-3">
                <span className="text-cyber-purple mt-1">▹</span>
                <span><strong className="text-white">Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your account and password.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyber-purple mt-1">▹</span>
                <span><strong className="text-white">Accurate Information:</strong> You must provide accurate, complete, and current information when registering for an account or an event.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyber-purple mt-1">▹</span>
                <span><strong className="text-white">Account Termination:</strong> We reserve the right to suspend or terminate your account if you violate any of our Rules of Engagement or Terms of Use.</span>
              </li>
            </ul>
          </section>

          <section className="bg-void/50 border border-white/10 rounded-lg p-8 backdrop-blur-sm relative overflow-hidden group hover:border-neon-pink/30 transition-colors duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-neon-pink opacity-50 group-hover:opacity-100 transition-opacity" />
            <h2 className="font-display text-2xl font-bold uppercase text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="text-neon-pink">03.</span> Intellectual Property
            </h2>
            <div className="space-y-4 font-sans text-ice/80 leading-relaxed">
              <p>
                The content, organization, graphics, design, compilation, and other matters related to the Site are protected under applicable copyrights and intellectual property laws. The copying, redistribution, use, or publication by you of any such matters or any part of the Site is strictly prohibited without explicit permission.
              </p>
            </div>
          </section>
          
          <section className="bg-void/50 border border-white/10 rounded-lg p-8 backdrop-blur-sm relative overflow-hidden group hover:border-cyber-purple/30 transition-colors duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyber-purple opacity-50 group-hover:opacity-100 transition-opacity" />
            <h2 className="font-display text-2xl font-bold uppercase text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="text-cyber-purple">04.</span> Limitation of Liability
            </h2>
            <div className="space-y-4 font-sans text-ice/80 leading-relaxed">
              <p>
                Elevation Esports shall not be liable for any special or consequential damages that result from the use of, or the inability to use, the materials on this site or the performance of the products, even if Elevation Esports has been advised of the possibility of such damages.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 font-display font-bold uppercase tracking-widest text-sm text-void bg-cyber-purple hover:bg-white transition-colors duration-300 rounded-[2px] hover:shadow-[0_0_20px_rgba(188,19,254,0.4)]">
            Return to Base
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
