import { ensureDatabaseReady } from "@/lib/db/bootstrap";
import { isDatabaseConfigured } from "@/lib/db/mongoose";
import { listNews } from "./repository";
import type { NewsRecord } from "./types";

export async function getNewsData(): Promise<{ source: "database" | "seed"; items: NewsRecord[] }> {
  if (!isDatabaseConfigured()) {
    return { source: "seed", items: [] };
  }

  try {
    await ensureDatabaseReady();
    const items = await listNews();
    return { source: "database", items };
  } catch (error) {
    console.error("Failed to load news from MongoDB.", error);
    return { source: "database", items: [] };
  }
}
