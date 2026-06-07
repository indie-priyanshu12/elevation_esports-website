import { getMysqlPool, isDatabaseConfigured } from "./mysql";
import { coreSchemaStatements } from "./schema";
import { countTournaments, seedTournament } from "@/lib/tournaments/repository";
import { seedTournaments } from "@/lib/tournaments/seed";

declare global {
  var __elevationBootstrapPromise: Promise<void> | undefined;
}

async function bootstrapDatabase() {
  const pool = getMysqlPool();

  for (const statement of coreSchemaStatements) {
    await pool.query(statement);
  }

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
