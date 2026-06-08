import { connectToDatabase, isDatabaseConfigured } from "./mongoose";
import { countTournaments, seedTournament } from "@/lib/tournaments/repository";
import { seedTournaments } from "@/lib/tournaments/seed";

declare global {
  var __elevationBootstrapPromise: Promise<void> | undefined;
}

async function bootstrapDatabase() {
  await connectToDatabase();

  const totalTournaments = await countTournaments();
  if (totalTournaments === 0) {
    for (const tournament of seedTournaments) {
      await seedTournament(tournament);
    }
  }
}

export async function ensureDatabaseReady() {
  if (!isDatabaseConfigured()) {
    return;
  }

  if (!globalThis.__elevationBootstrapPromise) {
    globalThis.__elevationBootstrapPromise = bootstrapDatabase().catch((error) => {
      globalThis.__elevationBootstrapPromise = undefined;
      throw error;
    });
  }

  await globalThis.__elevationBootstrapPromise;
}
