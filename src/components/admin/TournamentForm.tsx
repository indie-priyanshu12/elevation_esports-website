"use client";

import { useState, useEffect } from "react";

const GAME_TITLES = ["Valorant", "BGMI", "Free Fire", "CS2", "Rocket League", "Other"];
const STATUS_LABELS = ["Registration Open", "Ongoing", "Completed", "Upcoming"];

export default function TournamentForm({ initialData, onSuccess, onCancel }: { initialData?: any, onSuccess: () => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    game: initialData?.game || "Valorant",
    summary: initialData?.summary || "",
    format: initialData?.format || "5v5 Single Elimination",
    status: initialData?.status || "Registration Open",
    slots_info: initialData?.slots_info || "0/32 Teams",
    location_label: initialData?.location_label || "Online / Discord",
    form_url: initialData?.form_url || "",
    detail_url: initialData?.detail_url || "",
    uploaded_at: initialData?.uploaded_at ? new Date(initialData.uploaded_at).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
    event_date: initialData?.event_date ? new Date(initialData.event_date).toISOString().slice(0, 16) : "",
    registration_closes_at: initialData?.registration_closes_at ? new Date(initialData.registration_closes_at).toISOString().slice(0, 16) : "",
    is_archived: initialData?.is_archived || false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-generate slug from name if creating new
  useEffect(() => {
    if (!initialData && formData.name && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }));
    }
  }, [formData.name, initialData, formData.slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.name || !formData.slug) {
      setError("Name and Slug are required.");
      setIsLoading(false);
      return;
    }

    try {
      const url = initialData ? `/api/tournaments/${initialData.slug}` : `/api/tournaments`;
      const method = initialData ? "PATCH" : "POST";
      
      const payload = {
        name: formData.name,
        slug: formData.slug,
        game: formData.game,
        summary: formData.summary,
        format: formData.format,
        status: formData.status,
        formLink: formData.form_url,
        detailLink: formData.detail_url,
        dateUploaded: formData.uploaded_at ? new Date(formData.uploaded_at).toISOString() : new Date().toISOString(),
        eventDate: formData.event_date ? new Date(formData.event_date).toISOString() : "",
        registrationClosesAt: formData.registration_closes_at ? new Date(formData.registration_closes_at).toISOString() : null,
        slots: formData.slots_info,
        location: formData.location_label,
        archived: formData.is_archived
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Something went wrong");
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-2xl font-display text-ice">{initialData ? "EDIT_TOURNAMENT_RECORD" : "NEW_TOURNAMENT_RECORD"}</h2>
        <button onClick={onCancel} className="text-ice/50 hover:text-white font-mono text-sm uppercase">Cancel / Abort</button>
      </div>

      {error && <div className="mb-6 p-4 border border-neon-pink/50 bg-neon-pink/10 text-neon-pink font-mono">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-neon-pink uppercase tracking-widest">Tournament Name *</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="bg-black/50 border border-white/10 p-3 text-ice font-sans focus:outline-none focus:border-neon-pink transition-colors"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-neon-pink uppercase tracking-widest">Slug *</label>
            <input 
              type="text" 
              value={formData.slug} 
              onChange={e => setFormData({ ...formData, slug: e.target.value })}
              className="bg-black/50 border border-white/10 p-3 text-ice font-mono text-sm focus:outline-none focus:border-neon-pink transition-colors"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-neon-pink uppercase tracking-widest">Game Title</label>
            <select 
              value={formData.game} 
              onChange={e => setFormData({ ...formData, game: e.target.value })}
              className="bg-black/50 border border-white/10 p-3 text-ice font-mono focus:outline-none focus:border-neon-pink transition-colors [color-scheme:dark]"
            >
              {GAME_TITLES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-neon-pink uppercase tracking-widest">Format</label>
            <input 
              type="text" 
              value={formData.format} 
              onChange={e => setFormData({ ...formData, format: e.target.value })}
              placeholder="e.g. 5v5 Single Elimination"
              className="bg-black/50 border border-white/10 p-3 text-ice font-mono text-sm focus:outline-none focus:border-neon-pink transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-neon-pink uppercase tracking-widest">Status</label>
            <select 
              value={formData.status} 
              onChange={e => setFormData({ ...formData, status: e.target.value })}
              className="bg-black/50 border border-white/10 p-3 text-ice font-mono focus:outline-none focus:border-neon-pink transition-colors [color-scheme:dark]"
            >
              {STATUS_LABELS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-neon-pink uppercase tracking-widest">Slots Indicator</label>
            <input 
              type="text" 
              value={formData.slots_info} 
              onChange={e => setFormData({ ...formData, slots_info: e.target.value })}
              placeholder="e.g. 0/32 Teams"
              className="bg-black/50 border border-white/10 p-3 text-ice font-mono text-sm focus:outline-none focus:border-neon-pink transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-neon-pink uppercase tracking-widest">Location / Platform</label>
            <input 
              type="text" 
              value={formData.location_label} 
              onChange={e => setFormData({ ...formData, location_label: e.target.value })}
              placeholder="e.g. Online / Discord"
              className="bg-black/50 border border-white/10 p-3 text-ice font-mono text-sm focus:outline-none focus:border-neon-pink transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-neon-pink uppercase tracking-widest">Event Date *</label>
            <input 
              type="datetime-local" 
              value={formData.event_date} 
              onChange={e => setFormData({ ...formData, event_date: e.target.value })}
              className="bg-black/50 border border-white/10 p-3 text-ice font-mono text-sm focus:outline-none focus:border-neon-pink transition-colors [color-scheme:dark]"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-neon-pink uppercase tracking-widest">Registration Closes At</label>
            <input 
              type="datetime-local" 
              value={formData.registration_closes_at} 
              onChange={e => setFormData({ ...formData, registration_closes_at: e.target.value })}
              className="bg-black/50 border border-white/10 p-3 text-ice font-mono text-sm focus:outline-none focus:border-neon-pink transition-colors [color-scheme:dark]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-neon-pink uppercase tracking-widest">Registration Form URL</label>
            <input 
              type="url" 
              value={formData.form_url} 
              onChange={e => setFormData({ ...formData, form_url: e.target.value })}
              className="bg-black/50 border border-white/10 p-3 text-ice font-mono text-sm focus:outline-none focus:border-neon-pink transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-neon-pink uppercase tracking-widest">Tournament Bracket/Details URL</label>
            <input 
              type="url" 
              value={formData.detail_url} 
              onChange={e => setFormData({ ...formData, detail_url: e.target.value })}
              className="bg-black/50 border border-white/10 p-3 text-ice font-mono text-sm focus:outline-none focus:border-neon-pink transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-neon-pink uppercase tracking-widest">Short Summary</label>
          <textarea 
            value={formData.summary} 
            onChange={e => setFormData({ ...formData, summary: e.target.value })}
            className="bg-black/50 border border-white/10 p-3 text-ice font-sans focus:outline-none focus:border-neon-pink transition-colors h-24 resize-none"
          />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-4 cursor-pointer group">
            <div className="relative">
              <input 
                type="checkbox" 
                checked={formData.is_archived} 
                onChange={e => setFormData({ ...formData, is_archived: e.target.checked })}
                className="sr-only"
              />
              <div className={`w-12 h-6 rounded-full transition-colors ${formData.is_archived ? 'bg-neon-pink/50 border border-neon-pink' : 'bg-black/50 border border-white/20'}`}></div>
              <div className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform ${formData.is_archived ? 'translate-x-6 bg-neon-pink shadow-[0_0_10px_#ff007f]' : 'bg-white/50'}`}></div>
            </div>
            <span className="font-mono text-sm text-ice group-hover:text-neon-pink transition-colors">IS_ARCHIVED</span>
          </label>
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
          <button type="button" onClick={onCancel} className="px-6 py-3 font-display tracking-widest text-ice/60 hover:text-white border border-transparent">
            CANCEL
          </button>
          <button type="submit" disabled={isLoading} className="px-8 py-3 bg-neon-pink/20 border border-neon-pink text-neon-pink font-display tracking-widest hover:bg-neon-pink hover:text-void hover:shadow-[0_0_20px_rgba(255,0,127,0.4)] transition-all disabled:opacity-50">
            {isLoading ? "UPLOADING..." : initialData ? "COMMIT CHANGES" : "PUBLISH TOURNAMENT"}
          </button>
        </div>
      </form>
    </div>
  );
}
