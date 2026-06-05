"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

type TournamentItem = {
  name: string;
  game: string;
  formLink: string;
  detailLink: string;
  dateUploaded: string;
  eventDate: string;
  format: string;
  status: string;
  slots: string;
};

const upcomingTournaments: TournamentItem[] = [
  {
    name: "Neon Clash Open",
    game: "Valorant",
    formLink: "#register-neon-clash-open",
    detailLink: "#details-neon-clash-open",
    dateUploaded: "June 3, 2026",
    eventDate: "June 14, 2026",
    format: "5v5, double elimination",
    status: "Registration live",
    slots: "24/32 teams filled",
  },
  {
    name: "Battleground Blitz Cup",
    game: "BGMI",
    formLink: "#register-battleground-blitz-cup",
    detailLink: "#details-battleground-blitz-cup",
    dateUploaded: "June 2, 2026",
    eventDate: "June 18, 2026",
    format: "Squads, 6-match finals",
    status: "Roster lock in 4 days",
    slots: "18/20 squads filled",
  },
  {
    name: "Rocket Rumble Night",
    game: "Rocket League",
    formLink: "#register-rocket-rumble-night",
    detailLink: "#details-rocket-rumble-night",
    dateUploaded: "June 1, 2026",
    eventDate: "June 21, 2026",
    format: "3v3 Swiss into playoffs",
    status: "Check-in opens soon",
    slots: "12/16 teams filled",
  },
];

const completedTournaments: TournamentItem[] = [
  {
    name: "Cyber Checkmate Series",
    game: "Chess",
    formLink: "#archive-cyber-checkmate-series",
    detailLink: "#results-cyber-checkmate-series",
    dateUploaded: "May 28, 2026",
    eventDate: "May 30, 2026",
    format: "Rapid Swiss, 7 rounds",
    status: "Results published",
    slots: "Winner: Arjun S.",
  },
  {
    name: "Free Fire Flashpoint",
    game: "Free Fire",
    formLink: "#archive-free-fire-flashpoint",
    detailLink: "#results-free-fire-flashpoint",
    dateUploaded: "May 24, 2026",
    eventDate: "May 27, 2026",
    format: "Squads, points race",
    status: "VOD and standings live",
    slots: "Winner: Team Ember",
  },
  {
    name: "Campus Counter-Strike Finals",
    game: "CS2",
    formLink: "#archive-campus-counter-strike-finals",
    detailLink: "#results-campus-counter-strike-finals",
    dateUploaded: "May 18, 2026",
    eventDate: "May 22, 2026",
    format: "5v5, BO3 playoffs",
    status: "Highlights uploaded",
    slots: "Winner: Headshot Unit",
  },
];

function TournamentList({
  items,
  archived = false,
}: {
  items: TournamentItem[];
  archived?: boolean;
}) {
  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.08 }}
        >
          <Card>
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <CardTitle className="text-xl md:text-2xl">{item.name}</CardTitle>
                  <span className="rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-3 py-1 text-xs font-bold uppercase tracking-cyber text-neon-cyan">
                    {item.game}
                  </span>
                  <span className="rounded-full border border-neon-pink/40 bg-neon-pink/10 px-3 py-1 text-xs font-bold uppercase tracking-cyber text-neon-pink">
                    {item.status}
                  </span>
                </div>
                <p className="font-sans text-sm text-ice/70">
                  Event date: <span className="text-ice">{item.eventDate}</span>
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={item.formLink}
                  className="inline-flex h-11 items-center justify-center border-2 border-neon-cyan bg-neon-cyan px-5 font-display text-sm font-bold uppercase tracking-cyber text-void shadow-neon-cyan transition hover:bg-white hover:text-neon-cyan"
                >
                  {archived ? "Archive Link" : "Form Link"}
                </a>
                <a
                  href={item.detailLink}
                  className="inline-flex h-11 items-center justify-center border-2 border-neon-pink bg-transparent px-5 font-display text-sm font-bold uppercase tracking-cyber text-neon-pink shadow-[0_0_10px_rgba(255,0,127,0.3)_inset,0_0_10px_rgba(255,0,127,0.3)] transition hover:bg-neon-pink hover:text-void hover:shadow-neon-pink"
                >
                  Details
                </a>
              </div>
            </CardHeader>

            <CardContent className="grid gap-4 md:grid-cols-4">
              <div>
                <p className="mb-1 font-display text-xs font-bold uppercase tracking-cyber text-cyber-purple">
                  Date Uploaded
                </p>
                <p className="font-sans text-sm text-ice">{item.dateUploaded}</p>
              </div>
              <div>
                <p className="mb-1 font-display text-xs font-bold uppercase tracking-cyber text-cyber-purple">
                  Format
                </p>
                <p className="font-sans text-sm text-ice">{item.format}</p>
              </div>
              <div>
                <p className="mb-1 font-display text-xs font-bold uppercase tracking-cyber text-cyber-purple">
                  Slots / Result
                </p>
                <p className="font-sans text-sm text-ice">{item.slots}</p>
              </div>
              <div>
                <p className="mb-1 font-display text-xs font-bold uppercase tracking-cyber text-cyber-purple">
                  Recommended Note
                </p>
                <p className="font-sans text-sm text-ice/75">
                  {archived
                    ? "Keep result sheets, MVP notes, and stream links together for quick recap access."
                    : "Include roster lock timing, Discord check-in, and rulebook access in the detail page."}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

export const TournamentTabs = () => {
  const [active, setActive] = useState<"upcoming" | "completed">("upcoming");

  const handleClick = (tab: "upcoming" | "completed") => {
    setActive(tab);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-wrap justify-center gap-4">
        {(["upcoming", "completed"] as const).map((tab) => (
          <motion.button
            key={tab}
            onClick={() => handleClick(tab)}
            whileHover={{ scale: 1.05 }}
            className={`rounded-full border-2 px-4 py-2 transition ${
              active === tab
                ? "border-neon-pink text-neon-pink"
                : "border-void/30 text-ice hover:border-neon-cyan hover:text-neon-cyan"
            }`}
          >
            {tab === "upcoming" ? "Upcoming Tournaments" : "Completed Tournaments"}
          </motion.button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4 md:p-6">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-2xl uppercase tracking-cyber text-ice">
              {active === "upcoming" ? "Open Tournament Queue" : "Completed Tournament Archive"}
            </h2>
            <p className="mt-2 font-sans text-sm text-ice/70">
              {active === "upcoming"
                ? "Use the form link for registration and the detail link for rules, check-in, and brackets."
                : "Use the archive link for original announcements and the detail link for results, recaps, and standings."}
            </p>
          </div>
          <p className="font-display text-xs uppercase tracking-cyber text-neon-cyan">
            {active === "upcoming" ? "Sorted by soonest event date" : "Sorted by latest upload"}
          </p>
        </div>

        {active === "upcoming" ? (
          <TournamentList items={upcomingTournaments} />
        ) : (
          <TournamentList items={completedTournaments} archived />
        )}
      </div>
    </div>
  );
};
