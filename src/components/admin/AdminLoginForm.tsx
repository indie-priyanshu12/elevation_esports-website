"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.refresh(); // This will re-trigger the layout component which checks the cookie
      } else {
        setError(data.message || "Invalid password");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-xl bg-void border border-neon-cyan/20 shadow-[0_0_30px_rgba(0,243,255,0.1)] relative overflow-hidden group">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-3xl font-display text-ice tracking-widest mb-2">RESTRICTED AREA</h2>
        <p className="text-ice/60 font-mono text-sm">Please authenticate to access the system.</p>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
        <div>
          <label className="block text-xs font-mono text-neon-cyan mb-2 tracking-widest uppercase">Admin Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/50 border border-ice/10 rounded-none px-4 py-3 text-ice focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all font-mono placeholder:text-ice/30"
            placeholder="••••••••••••"
            required
          />
        </div>

        {error && (
          <div className="p-3 border border-neon-pink/50 bg-neon-pink/10 text-neon-pink text-sm font-mono text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="relative w-full py-3 mt-4 overflow-hidden rounded-none border border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan font-display tracking-widest hover:bg-neon-cyan/20 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group/btn"
        >
          <span className="relative z-10">{isLoading ? "AUTHENTICATING..." : "INITIATE ACCESS"}</span>
          <div className="absolute inset-0 h-full w-0 bg-neon-cyan/20 group-hover/btn:w-full transition-all duration-300 ease-out" />
        </button>
      </form>
    </div>
  );
}
