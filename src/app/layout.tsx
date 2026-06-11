import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const rajdhani = Rajdhani({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  title: "Elevation Esports | Gaming Unleashed",
  description: "Next-gen university esports club and gaming community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${rajdhani.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-void text-ice overflow-x-hidden relative">
        {/* Persistent animated background grain/grid */}
        <div className="fixed inset-0 pointer-events-none z-[-2] bg-cyber-grid bg-[length:50px_50px] opacity-25 animate-grid-drift" />
        <div className="fixed inset-0 pointer-events-none z-[-3] bg-gradient-to-br from-void via-[#0d0022] to-void" />
        
        {/* Glitch Wave Scanlines sweeping down the viewport */}
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
          <div 
            className="absolute top-0 left-0 right-0 flex flex-col gap-[1px] opacity-70"
            style={{ animation: 'scanline-sweep 15s linear infinite, scanline-glitch 6s linear infinite' }}
          >
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-80" />
            <div className="w-full h-[6px] bg-gradient-to-r from-transparent via-neon-pink to-transparent opacity-30 blur-[1px]" />
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-ice to-transparent opacity-60" />
            <div className="w-full h-[8px] bg-gradient-to-r from-transparent via-cyber-purple to-transparent opacity-20 blur-[2px]" />
            <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-neon-cyan via-neon-pink to-transparent opacity-70" />
          </div>
        </div>
        
        {children}
      </body>
    </html>
  );
}
