import { getTournamentEntry } from "@/lib/tournaments/service";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export default async function TournamentDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tournament = await getTournamentEntry(slug);

  if (!tournament) {
    notFound();
  }

  const formattedDate = new Date(tournament.eventDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="min-h-screen bg-obsidian text-ice">
      <Navbar />
      
      <div className="pt-32 pb-24 container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/tournament-hub" className="text-neon-cyan hover:text-white font-mono text-sm tracking-wider uppercase transition-colors">
            ← Back to Hub
          </Link>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(255,0,127,0.05)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-pink/10 blur-[100px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-cyan/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-3 py-1 text-xs font-bold uppercase tracking-cyber text-neon-cyan">
                  {tournament.game}
                </span>
                <span className="rounded-full border border-neon-pink/40 bg-neon-pink/10 px-3 py-1 text-xs font-bold uppercase tracking-cyber text-neon-pink">
                  {tournament.status}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display uppercase tracking-wider text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] mb-2">
                {tournament.name}
              </h1>
            </div>
            
            {tournament.formLink && (
              <a
                href={tournament.formLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center border-2 border-neon-cyan bg-neon-cyan px-8 font-display text-lg font-bold uppercase tracking-cyber text-void shadow-[0_0_20px_rgba(0,255,255,0.4)] transition hover:bg-white hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
              >
                {tournament.archived ? "View Archive" : "Register Now"}
              </a>
            )}
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-void/50 border border-white/5 p-6 rounded-xl">
              <p className="mb-2 font-display text-sm font-bold uppercase tracking-cyber text-cyber-purple">Date & Time</p>
              <p className="font-sans text-lg">{formattedDate}</p>
            </div>
            <div className="bg-void/50 border border-white/5 p-6 rounded-xl">
              <p className="mb-2 font-display text-sm font-bold uppercase tracking-cyber text-cyber-purple">Format</p>
              <p className="font-sans text-lg">{tournament.format}</p>
            </div>
            <div className="bg-void/50 border border-white/5 p-6 rounded-xl">
              <p className="mb-2 font-display text-sm font-bold uppercase tracking-cyber text-cyber-purple">Location</p>
              <p className="font-sans text-lg">{tournament.location || "TBA"}</p>
            </div>
            <div className="bg-void/50 border border-white/5 p-6 rounded-xl">
              <p className="mb-2 font-display text-sm font-bold uppercase tracking-cyber text-neon-pink">Prize Pool</p>
              <p className="font-sans text-lg">{tournament.prizePool || "TBD"}</p>
            </div>
            <div className="bg-void/50 border border-white/5 p-6 rounded-xl">
              <p className="mb-2 font-display text-sm font-bold uppercase tracking-cyber text-neon-cyan">Entry Fee</p>
              <p className="font-sans text-lg">{tournament.entryFee || "Free"}</p>
            </div>
            <div className="bg-void/50 border border-white/5 p-6 rounded-xl">
              <p className="mb-2 font-display text-sm font-bold uppercase tracking-cyber text-cyber-purple">Slots Filled</p>
              <p className="font-sans text-lg">{tournament.slots}</p>
            </div>
          </div>

          {tournament.summary && (
            <div className="relative z-10 bg-void/50 border border-white/5 p-8 rounded-xl">
              <h2 className="text-2xl font-display mb-4 text-neon-pink uppercase tracking-widest">Tournament Details</h2>
              <p className="font-sans text-lg text-ice/80 leading-relaxed whitespace-pre-wrap">
                {tournament.summary}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
