import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Teams } from "@/components/sections/Teams";
import { Achievements } from "@/components/sections/Achievements";
import { Sponsors } from "@/components/sections/Sponsors";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

import { getHomeData } from "@/lib/home/service";

export default async function Home() {
  const { achievements, stats, teams, sponsors } = await getHomeData();

  return (
    <main className="min-h-screen bg-obsidian">
      <Navbar />
      <Hero />
      <About stats={stats} />
      <Achievements achievements={achievements} />
      <Teams teams={teams} />
      <Sponsors sponsors={sponsors} />
      <Contact />
      <Footer />
    </main>
  );
}
