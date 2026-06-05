"use client";

import React from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { motion } from "framer-motion";

const teams = [
  { game: "BGMI", captain: "ViperX", roster: "Shadow, Blaze, Nova", achievements: "Campus Champions '24" },
  { game: "Valorant", captain: "JettDiff", roster: "Omen, Sage, Reyna, Killjoy", achievements: "Regional Finalists" },
  { game: "CS2", captain: "Headshot", roster: "Flick, Spray, Nade, Flash", achievements: "Inter-College Winners" },
  { game: "Rocket League", captain: "Aerial", roster: "Boost, Demo", achievements: "Division 1 Leaders" },
];

export function Teams() {
  return (
    <section id="teams" className="py-32 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_rgba(176,38,255,0.1)_0%,_transparent_50%)]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader title="The Vanguard" subtitle="Our elite squadrons representing the university across multiple disciplines." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {teams.map((team, index) => (
            <motion.div
              key={team.game}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
            >
              <Card className="h-full group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="group-hover:text-neon-cyan transition-colors duration-300">{team.game}</CardTitle>
                    <span className="font-display font-black text-white/10 text-4xl leading-none absolute top-4 right-4 pointer-events-none group-hover:text-neon-pink/20 transition-colors duration-300">
                      0{index + 1}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 font-sans text-sm relative z-10">
                    <div>
                      <span className="text-cyber-purple uppercase font-bold tracking-cyber text-xs block mb-1">Commander</span>
                      <span className="text-ice text-lg font-medium">{team.captain}</span>
                    </div>
                    <div>
                      <span className="text-cyber-purple uppercase font-bold tracking-cyber text-xs block mb-1">Squadron</span>
                      <span className="text-ice/70">{team.roster}</span>
                    </div>
                    <div>
                      <span className="text-neon-cyan uppercase font-bold tracking-cyber text-xs block mb-1">Status</span>
                      <span className="text-neon-cyan font-bold">{team.achievements}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
