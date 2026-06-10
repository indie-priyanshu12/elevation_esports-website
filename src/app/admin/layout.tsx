import { cookies } from "next/headers";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  title: "Admin Portal | Elevation Esports",
  description: "Manage news and tournaments for Elevation Esports.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has("admin_auth");

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen bg-void text-ice flex items-center justify-center p-4 ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}>
        <AdminLoginForm />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-void text-ice flex flex-col ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}>
      <header className="border-b border-neon-cyan/20 bg-black/40 backdrop-blur-md p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Elevation Esports" className="h-8 w-auto object-contain" />
          <h1 className="text-xl font-display text-neon-cyan tracking-wider">ADMIN_PORTAL</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-neon-pink bg-neon-pink/10 px-2 py-1 rounded border border-neon-pink/30">SYS_ONLINE</span>
          <form action="/api/admin/logout" method="POST" className="inline">
            <button type="submit" className="text-sm text-ice/70 hover:text-white transition-colors">Logout</button>
          </form>
        </div>
      </header>
      <main className="flex-1 p-6 lg:p-12 relative z-10">
        {children}
      </main>
    </div>
  );
}
