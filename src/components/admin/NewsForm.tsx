"use client";

import { useState, useEffect } from "react";

export default function NewsForm({ initialData, onSuccess, onCancel }: { initialData?: any, onSuccess: () => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    summary: initialData?.summary || "",
    content: initialData?.content || "",
    cover_image_url: initialData?.cover_image_url || "",
    published_at: initialData?.published_at ? new Date(initialData.published_at).toISOString().slice(0, 16) : "",
    is_published: initialData?.is_published || false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSlugDirty, setIsSlugDirty] = useState(false);

  // Auto-generate slug from title if creating new
  useEffect(() => {
    if (!initialData && !isSlugDirty) {
      setFormData(prev => ({
        ...prev,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }));
    }
  }, [formData.title, initialData, isSlugDirty]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.title || !formData.slug) {
      setError("Title and Slug are required.");
      setIsLoading(false);
      return;
    }

    try {
      const url = initialData ? `/api/news/${initialData.slug}` : `/api/news`;
      const method = initialData ? "PUT" : "POST";
      
      const payload = { ...formData };
      if (payload.published_at) {
        payload.published_at = new Date(payload.published_at).toISOString();
      }

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

  const setNow = () => {
    const now = new Date();
    // Adjust to local timezone for the datetime-local input
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setFormData({ ...formData, published_at: now.toISOString().slice(0, 16) });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 border-b border-white/10 pb-4">
        <h2 className="text-2xl font-display text-ice">{initialData ? "EDIT_NEWS_RECORD" : "NEW_NEWS_RECORD"}</h2>
        <button onClick={onCancel} className="text-ice/50 hover:text-white font-mono text-sm uppercase">Cancel / Abort</button>
      </div>

      {error && <div className="mb-6 p-4 border border-neon-pink/50 bg-neon-pink/10 text-neon-pink font-mono">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-neon-cyan uppercase tracking-widest">Title *</label>
            <input 
              type="text" 
              value={formData.title} 
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="bg-black/50 border border-white/10 p-3 text-ice font-sans focus:outline-none focus:border-neon-cyan transition-colors"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-neon-cyan uppercase tracking-widest">Slug *</label>
            <input 
              type="text" 
              value={formData.slug} 
              onChange={e => {
                setFormData({ ...formData, slug: e.target.value });
                setIsSlugDirty(true);
              }}
              className="bg-black/50 border border-white/10 p-3 text-ice font-mono text-sm focus:outline-none focus:border-neon-cyan transition-colors"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-neon-cyan uppercase tracking-widest">Summary</label>
          <textarea 
            value={formData.summary} 
            onChange={e => setFormData({ ...formData, summary: e.target.value })}
            className="bg-black/50 border border-white/10 p-3 text-ice font-sans focus:outline-none focus:border-neon-cyan transition-colors h-24 resize-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-neon-cyan uppercase tracking-widest">Content (Markdown supported)</label>
          <textarea 
            value={formData.content} 
            onChange={e => setFormData({ ...formData, content: e.target.value })}
            className="bg-black/50 border border-white/10 p-3 text-ice font-mono text-sm focus:outline-none focus:border-neon-cyan transition-colors h-64"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-neon-cyan uppercase tracking-widest">Cover Image URL</label>
            <input 
              type="url" 
              value={formData.cover_image_url} 
              onChange={e => setFormData({ ...formData, cover_image_url: e.target.value })}
              className="bg-black/50 border border-white/10 p-3 text-ice font-mono text-sm focus:outline-none focus:border-neon-cyan transition-colors"
            />
            {formData.cover_image_url && (
              <div className="mt-2 h-32 w-full border border-white/10 bg-black/50 relative overflow-hidden flex items-center justify-center">
                <img src={formData.cover_image_url} alt="Cover Preview" className="h-full w-auto object-cover opacity-80" onError={(e) => (e.currentTarget.style.display = 'none')} />
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-neon-cyan uppercase tracking-widest">Published At</label>
              <div className="flex gap-2">
                <input 
                  type="datetime-local" 
                  value={formData.published_at} 
                  onChange={e => setFormData({ ...formData, published_at: e.target.value })}
                  className="flex-1 bg-black/50 border border-white/10 p-3 text-ice font-mono text-sm focus:outline-none focus:border-neon-cyan transition-colors [color-scheme:dark]"
                />
                <button type="button" onClick={setNow} className="px-4 border border-white/10 bg-white/5 hover:bg-white/10 font-mono text-xs transition-colors">SET NOW</button>
              </div>
            </div>

            <label className="flex items-center gap-4 cursor-pointer group">
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={formData.is_published} 
                  onChange={e => setFormData({ ...formData, is_published: e.target.checked })}
                  className="sr-only"
                />
                <div className={`w-12 h-6 rounded-full transition-colors ${formData.is_published ? 'bg-neon-cyan/50 border border-neon-cyan' : 'bg-black/50 border border-white/20'}`}></div>
                <div className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform ${formData.is_published ? 'translate-x-6 bg-neon-cyan shadow-[0_0_10px_#00f3ff]' : 'bg-white/50'}`}></div>
              </div>
              <span className="font-mono text-sm text-ice group-hover:text-neon-cyan transition-colors">IS_PUBLISHED</span>
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-end gap-4">
          <button type="button" onClick={onCancel} className="w-full sm:w-auto px-6 py-3 font-display tracking-widest text-ice/60 hover:text-white border border-transparent">
            CANCEL
          </button>
          <button type="submit" disabled={isLoading} className="w-full sm:w-auto px-8 py-3 bg-neon-cyan/20 border border-neon-cyan text-neon-cyan font-display tracking-widest hover:bg-neon-cyan hover:text-void hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all disabled:opacity-50">
            {isLoading ? "UPLOADING..." : initialData ? "COMMIT CHANGES" : "PUBLISH RECORD"}
          </button>
        </div>
      </form>
    </div>
  );
}
