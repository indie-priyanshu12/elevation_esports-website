"use client";

import { useState } from "react";
import NewsForm from "./NewsForm";
import TournamentForm from "./TournamentForm";

import HomepageManager from "./HomepageManager";

type Tab = "news" | "tournaments" | "homepage" | "uplink";

export default function AdminDashboard({ initialNews, initialTournaments, initialHomeData, initialUplinks = [] }: { initialNews: any[], initialTournaments: any[], initialHomeData?: any, initialUplinks?: any[] }) {
  const [activeTab, setActiveTab] = useState<Tab>("news");
  const [news, setNews] = useState(initialNews);
  const [tournaments, setTournaments] = useState(initialTournaments);
  const [uplinks, setUplinks] = useState(initialUplinks);
  
  const [editingNews, setEditingNews] = useState<any | null>(null);
  const [editingTournament, setEditingTournament] = useState<any | null>(null);
  
  const [isCreating, setIsCreating] = useState(false);

  const stats = {
    totalNews: news.length,
    publishedNews: news.filter(n => n.is_published).length,
    totalTournaments: tournaments.length,
    activeTournaments: tournaments.filter(t => !t.is_archived).length,
    totalUplinks: uplinks.length,
    unreadUplinks: uplinks.filter(u => !u.is_read).length,
  };

  const handleNewsSubmit = () => {
    setIsCreating(false);
    setEditingNews(null);
    window.location.reload(); // Quick refresh to get new data
  };

  const handleTournamentSubmit = () => {
    setIsCreating(false);
    setEditingTournament(null);
    window.location.reload();
  };

  const handleDeleteNews = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this news post?")) return;
    try {
      const res = await fetch(`/api/news/${slug}`, { method: "DELETE" });
      if (res.ok) setNews(news.filter(n => n.slug !== slug));
    } catch (e) {
      alert("Failed to delete news post.");
    }
  };

  const handleDeleteTournament = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this tournament?")) return;
    try {
      const res = await fetch(`/api/tournaments/${slug}`, { method: "DELETE" });
      if (res.ok) setTournaments(tournaments.filter(t => t.slug !== slug));
    } catch (e) {
      alert("Failed to delete tournament.");
    }
  };

  const handleDeleteUplink = async (id: string) => {
    if (!confirm("Are you sure you want to delete this uplink message?")) return;
    try {
      const res = await fetch(`/api/uplink?id=${id}`, { method: "DELETE" });
      if (res.ok) setUplinks(uplinks.filter(u => u._id !== id));
    } catch (e) {
      alert("Failed to delete uplink message.");
    }
  };

  const handleToggleReadStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/uplink`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_read: !currentStatus })
      });
      if (res.ok) {
        setUplinks(uplinks.map(u => u._id === id ? { ...u, is_read: !currentStatus } : u));
      } else {
        alert("Failed to update status.");
      }
    } catch (e) {
      alert("Failed to update status.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "TOTAL POSTS", value: stats.totalNews },
          { label: "PUBLISHED", value: stats.publishedNews },
          { label: "TOURNAMENTS", value: stats.totalTournaments },
          { label: "ACTIVE EVENTS", value: stats.activeTournaments },
        ].map((stat, i) => (
          <div key={i} className="bg-black/30 border border-neon-cyan/20 p-6 flex flex-col gap-2 hover:border-neon-cyan/50 hover:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all">
            <span className="text-neon-cyan/70 text-xs font-mono uppercase tracking-widest">{stat.label}</span>
            <span className="text-4xl font-display text-ice">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-white/10 pb-4 overflow-x-auto whitespace-nowrap">
        <button
          onClick={() => { setActiveTab("news"); setIsCreating(false); setEditingNews(null); }}
          className={`px-6 py-2 font-display tracking-widest transition-all ${
            activeTab === "news" ? "text-neon-cyan border-b-2 border-neon-cyan" : "text-ice/50 hover:text-ice"
          }`}
        >
          MANAGE NEWS
        </button>
        <button
          onClick={() => { setActiveTab("tournaments"); setIsCreating(false); setEditingTournament(null); }}
          className={`px-6 py-2 font-display tracking-widest transition-all ${
            activeTab === "tournaments" ? "text-neon-pink border-b-2 border-neon-pink" : "text-ice/50 hover:text-ice"
          }`}
        >
          MANAGE TOURNAMENTS
        </button>
        <button
          onClick={() => { setActiveTab("homepage"); setIsCreating(false); setEditingTournament(null); setEditingNews(null); }}
          className={`px-6 py-2 font-display tracking-widest transition-all ${
            activeTab === "homepage" ? "text-neon-yellow border-b-2 border-neon-yellow" : "text-ice/50 hover:text-ice"
          }`}
        >
          MANAGE HOMEPAGE
        </button>
        <button
          onClick={() => { setActiveTab("uplink"); setIsCreating(false); setEditingTournament(null); setEditingNews(null); }}
          className={`px-6 py-2 font-display tracking-widest transition-all ${
            activeTab === "uplink" ? "text-cyber-purple border-b-2 border-cyber-purple" : "text-ice/50 hover:text-ice"
          }`}
        >
          MANAGE UPLINK {stats.unreadUplinks > 0 ? `(${stats.unreadUplinks})` : ""}
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-black/40 border border-white/5 p-4 sm:p-6 min-h-[500px]">
        {activeTab === "homepage" && initialHomeData && (
          <HomepageManager initialData={initialHomeData} />
        )}

        {activeTab === "news" && (
          <>
            {isCreating || editingNews ? (
              <NewsForm 
                initialData={editingNews} 
                onSuccess={handleNewsSubmit} 
                onCancel={() => { setIsCreating(false); setEditingNews(null); }} 
              />
            ) : (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                  <h2 className="text-2xl font-display text-ice">NEWS_DATABASE</h2>
                  <button 
                    onClick={() => setIsCreating(true)}
                    className="bg-neon-cyan/10 text-neon-cyan border border-neon-cyan px-4 py-2 font-mono text-sm hover:bg-neon-cyan hover:text-void transition-colors"
                  >
                    + CREATE NEW POST
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {news.map(n => (
                    <div key={n.slug} className="group border border-white/10 bg-void p-5 hover:border-neon-cyan/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex gap-2">
                        <button onClick={() => setEditingNews(n)} className="bg-blue-500/20 text-blue-400 p-2 text-xs font-mono hover:bg-blue-500 hover:text-white">EDIT</button>
                        <button onClick={() => handleDeleteNews(n.slug)} className="bg-red-500/20 text-red-400 p-2 text-xs font-mono hover:bg-red-500 hover:text-white">DEL</button>
                      </div>
                      <div className="text-xs font-mono text-ice/40 mb-2">{n.is_published ? "PUBLISHED" : "DRAFT"}</div>
                      <h3 className="font-display text-lg text-ice mb-2 truncate">{n.title}</h3>
                      <p className="text-sm text-ice/60 line-clamp-2">{n.summary || "No summary provided."}</p>
                    </div>
                  ))}
                  {news.length === 0 && <p className="text-ice/40 font-mono">No news posts found.</p>}
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "tournaments" && (
          <>
            {isCreating || editingTournament ? (
              <TournamentForm 
                initialData={editingTournament} 
                onSuccess={handleTournamentSubmit} 
                onCancel={() => { setIsCreating(false); setEditingTournament(null); }} 
              />
            ) : (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                  <h2 className="text-2xl font-display text-ice">TOURNAMENTS_DATABASE</h2>
                  <button 
                    onClick={() => setIsCreating(true)}
                    className="bg-neon-pink/10 text-neon-pink border border-neon-pink px-4 py-2 font-mono text-sm hover:bg-neon-pink hover:text-void transition-colors"
                  >
                    + CREATE TOURNAMENT
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tournaments.map(t => (
                    <div key={t.slug} className="group border border-white/10 bg-void p-5 hover:border-neon-pink/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex gap-2">
                        <button onClick={() => setEditingTournament(t)} className="bg-blue-500/20 text-blue-400 p-2 text-xs font-mono hover:bg-blue-500 hover:text-white">EDIT</button>
                        <button onClick={() => handleDeleteTournament(t.slug)} className="bg-red-500/20 text-red-400 p-2 text-xs font-mono hover:bg-red-500 hover:text-white">DEL</button>
                      </div>
                      <div className="flex gap-2 mb-2">
                        <span className="text-xs font-mono px-2 py-0.5 bg-white/10 text-ice">{t.game}</span>
                        <span className="text-xs font-mono px-2 py-0.5 bg-neon-pink/20 text-neon-pink">{t.status}</span>
                      </div>
                      <h3 className="font-display text-lg text-ice mb-1 truncate">{t.name}</h3>
                      <p className="text-sm text-ice/60 mb-2 truncate">{t.format} • {t.slots_info}</p>
                    </div>
                  ))}
                  {tournaments.length === 0 && <p className="text-ice/40 font-mono">No tournaments found.</p>}
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "uplink" && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-display text-ice">UPLINK_MESSAGES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uplinks.map(u => (
                <div key={u._id} className={`group border border-white/10 bg-void p-5 hover:border-cyber-purple/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden ${!u.is_read ? 'border-l-4 border-l-cyber-purple' : ''}`}>
                  <div className="absolute top-0 right-0 p-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex gap-2">
                    <button onClick={() => handleToggleReadStatus(u._id, u.is_read)} className="bg-cyber-purple/20 text-cyber-purple p-2 text-xs font-mono hover:bg-cyber-purple hover:text-white">
                      {u.is_read ? 'MARK UNREAD' : 'MARK READ'}
                    </button>
                    <button onClick={() => handleDeleteUplink(u._id)} className="bg-red-500/20 text-red-400 p-2 text-xs font-mono hover:bg-red-500 hover:text-white">DEL</button>
                  </div>
                  <div className="flex gap-2 items-center mb-1">
                    {!u.is_read && <span className="w-2 h-2 rounded-full bg-cyber-purple"></span>}
                    <h3 className="font-display text-lg text-ice truncate">{u.name}</h3>
                  </div>
                  <p className="text-xs font-mono text-neon-cyan mb-2 truncate">{u.email}</p>
                  <p className="text-sm text-ice/80 whitespace-pre-wrap">{u.message}</p>
                  <div className="mt-4 text-xs font-mono text-ice/40">{new Date(u.created_at).toLocaleString()}</div>
                </div>
              ))}
              {uplinks.length === 0 && <p className="text-ice/40 font-mono">No uplink messages received.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
