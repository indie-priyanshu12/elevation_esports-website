import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Teams } from "@/components/sections/Teams";
import { Achievements } from "@/components/sections/Achievements";
import { Sponsors } from "@/components/sections/Sponsors";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-obsidian">
      <Navbar />
      <Hero />
      <About />
      <Achievements />
      <Teams />
      <Sponsors />
      <Contact />
      <Footer />
    </main>
  );
}
