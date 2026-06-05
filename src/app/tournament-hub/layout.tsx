import React from "react";
import "../globals.css";

export default function TournamentHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-void text-ice py-12">
      <div className="container mx-auto px-4 lg:px-8">{children}</div>
    </section>
  );
}
