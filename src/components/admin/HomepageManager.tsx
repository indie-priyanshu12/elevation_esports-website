"use client";

import { useState } from "react";
import { updateAchievements, updateStats, updateTeams, updateSponsors } from "@/app/admin/actions";

export default function HomepageManager({ initialData }: { initialData: any }) {
  const [achievements, setAchievements] = useState(initialData.achievements || []);
  const [stats, setStats] = useState(initialData.stats || []);
  const [teams, setTeams] = useState(initialData.teams || []);
  const [sponsors, setSponsors] = useState(initialData.sponsors || []);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (section: string) => {
    setIsSaving(true);
    try {
      if (section === "achievements") await updateAchievements(achievements);
      if (section === "stats") await updateStats(stats);
      if (section === "teams") await updateTeams(teams);
      if (section === "sponsors") await updateSponsors(sponsors);
      alert(`${section} saved successfully!`);
    } catch (e) {
      alert(`Failed to save ${section}.`);
    } finally {
      setIsSaving(false);
    }
  };

  const updateItem = (list: any[], setList: any, index: number, field: string, value: any) => {
    const newList = [...list];
    newList[index][field] = value;
    setList(newList);
  };

  const addItem = (list: any[], setList: any, defaultItem: any) => {
    setList([...list, defaultItem]);
  };

  const removeItem = (list: any[], setList: any, index: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  return (
    <div className="flex flex-col gap-12 text-ice">
      {/* Achievements */}
      <section className="bg-black/40 border border-white/5 p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-display text-neon-yellow">ACHIEVEMENTS</h2>
          <button disabled={isSaving} onClick={() => handleSave("achievements")} className="bg-neon-yellow/20 text-neon-yellow px-4 py-2 text-sm font-mono hover:bg-neon-yellow hover:text-black">SAVE ACHIEVEMENTS</button>
        </div>
        <div className="flex flex-col gap-4">
          {achievements.map((item: any, i: number) => (
            <div key={i} className="flex gap-4 items-center bg-void p-4 border border-white/10">
              <input className="bg-transparent border border-white/20 p-2 w-16 text-center" value={item.icon} onChange={(e) => updateItem(achievements, setAchievements, i, "icon", e.target.value)} placeholder="Icon" />
              <input className="bg-transparent border border-white/20 p-2 w-24" value={item.value} onChange={(e) => updateItem(achievements, setAchievements, i, "value", e.target.value)} placeholder="Value" />
              <input className="bg-transparent border border-white/20 p-2 flex-1" value={item.label} onChange={(e) => updateItem(achievements, setAchievements, i, "label", e.target.value)} placeholder="Label" />
              <input className="bg-transparent border border-white/20 p-2 w-32" value={item.color} onChange={(e) => updateItem(achievements, setAchievements, i, "color", e.target.value)} placeholder="Color class" />
              <button onClick={() => removeItem(achievements, setAchievements, i)} className="text-red-400 hover:text-red-300">✖</button>
            </div>
          ))}
          <button onClick={() => addItem(achievements, setAchievements, { icon: "🌟", value: "100", label: "New Item", color: "text-neon-cyan", order: achievements.length + 1 })} className="text-sm font-mono text-white/50 hover:text-white border border-dashed border-white/20 p-4 mt-2">
            + ADD ACHIEVEMENT
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-black/40 border border-white/5 p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-display text-neon-cyan">ABOUT STATS</h2>
          <button disabled={isSaving} onClick={() => handleSave("stats")} className="bg-neon-cyan/20 text-neon-cyan px-4 py-2 text-sm font-mono hover:bg-neon-cyan hover:text-black">SAVE STATS</button>
        </div>
        <div className="flex flex-col gap-4">
          {stats.map((item: any, i: number) => (
            <div key={i} className="flex gap-4 items-center bg-void p-4 border border-white/10">
              <input type="number" className="bg-transparent border border-white/20 p-2 w-32" value={item.value} onChange={(e) => updateItem(stats, setStats, i, "value", parseInt(e.target.value) || 0)} placeholder="Value" />
              <input className="bg-transparent border border-white/20 p-2 flex-1" value={item.label} onChange={(e) => updateItem(stats, setStats, i, "label", e.target.value)} placeholder="Label" />
              <input className="bg-transparent border border-white/20 p-2 w-24" value={item.suffix || ""} onChange={(e) => updateItem(stats, setStats, i, "suffix", e.target.value)} placeholder="Suffix" />
              <button onClick={() => removeItem(stats, setStats, i)} className="text-red-400 hover:text-red-300">✖</button>
            </div>
          ))}
          <button onClick={() => addItem(stats, setStats, { value: 0, label: "New Stat", suffix: "", order: stats.length + 1 })} className="text-sm font-mono text-white/50 hover:text-white border border-dashed border-white/20 p-4 mt-2">
            + ADD STAT
          </button>
        </div>
      </section>

      {/* Teams */}
      <section className="bg-black/40 border border-white/5 p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-display text-cyber-purple">TEAMS</h2>
          <button disabled={isSaving} onClick={() => handleSave("teams")} className="bg-cyber-purple/20 text-cyber-purple px-4 py-2 text-sm font-mono hover:bg-cyber-purple hover:text-white border border-cyber-purple">SAVE TEAMS</button>
        </div>
        <div className="flex flex-col gap-4">
          {teams.map((item: any, i: number) => (
            <div key={i} className="flex flex-col gap-4 bg-void p-4 border border-white/10 relative">
              <button onClick={() => removeItem(teams, setTeams, i)} className="absolute top-4 right-4 text-red-400 hover:text-red-300">✖</button>
              <div className="grid grid-cols-2 gap-4 mr-8">
                <input className="bg-transparent border border-white/20 p-2" value={item.game} onChange={(e) => updateItem(teams, setTeams, i, "game", e.target.value)} placeholder="Game Name" />
                <input className="bg-transparent border border-white/20 p-2" value={item.captain} onChange={(e) => updateItem(teams, setTeams, i, "captain", e.target.value)} placeholder="Captain Name" />
                <input className="bg-transparent border border-white/20 p-2 col-span-2" value={item.roster} onChange={(e) => updateItem(teams, setTeams, i, "roster", e.target.value)} placeholder="Roster (comma separated)" />
                <input className="bg-transparent border border-white/20 p-2 col-span-2" value={item.achievements} onChange={(e) => updateItem(teams, setTeams, i, "achievements", e.target.value)} placeholder="Recent Achievement" />
              </div>
            </div>
          ))}
          <button onClick={() => addItem(teams, setTeams, { game: "New Game", captain: "Captain", roster: "Player1, Player2", achievements: "No achievements yet", order: teams.length + 1 })} className="text-sm font-mono text-white/50 hover:text-white border border-dashed border-white/20 p-4 mt-2">
            + ADD TEAM
          </button>
        </div>
      </section>

      {/* Sponsors */}
      <section className="bg-black/40 border border-white/5 p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-display text-neon-pink">SPONSORS</h2>
          <button disabled={isSaving} onClick={() => handleSave("sponsors")} className="bg-neon-pink/20 text-neon-pink px-4 py-2 text-sm font-mono hover:bg-neon-pink hover:text-black">SAVE SPONSORS</button>
        </div>
        <div className="flex flex-col gap-4">
          {sponsors.map((item: any, i: number) => (
            <div key={i} className="flex gap-4 items-center bg-void p-4 border border-white/10">
              <input className="bg-transparent border border-white/20 p-2 flex-1" value={item.name} onChange={(e) => updateItem(sponsors, setSponsors, i, "name", e.target.value)} placeholder="Sponsor Name (e.g., SYS_1)" />
              <button onClick={() => removeItem(sponsors, setSponsors, i)} className="text-red-400 hover:text-red-300">✖</button>
            </div>
          ))}
          <button onClick={() => addItem(sponsors, setSponsors, { name: "NEW_SYS", order: sponsors.length + 1 })} className="text-sm font-mono text-white/50 hover:text-white border border-dashed border-white/20 p-4 mt-2">
            + ADD SPONSOR
          </button>
        </div>
      </section>
    </div>
  );
}
