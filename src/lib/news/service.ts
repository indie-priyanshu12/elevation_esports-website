import { ensureDatabaseReady } from "@/lib/db/bootstrap";
import { isDatabaseConfigured } from "@/lib/db/mongoose";
import { seedNews } from "./seed";
import { listNews } from "./repository";
import type { NewsRecord, NewsMutationInput } from "./types";

function normalizeSeedRecord(input: NewsMutationInput, index: number): NewsRecord {
  return {
    id: `seed-${index + 1}`,
    slug: input.slug,
    title: input.title,
    summary: input.summary ?? null,
    content: input.content ?? null,
    coverImage: input.coverImage ?? null,
    publishedAt: input.publishedAt ?? null,
    isPublished: input.isPublished,
  };
}

function fallbackNewsData(): NewsRecord[] {
  return seedNews.map(normalizeSeedRecord);
}

export async function getNewsData(): Promise<{ source: "database" | "seed"; items: NewsRecord[] }> {
  if (!isDatabaseConfigured()) {
    return { source: "seed", items: fallbackNewsData() };
  }

  try {
    await ensureDatabaseReady();
    const items = await listNews();
    
    // Auto-seed if empty
    if (items.length === 0) {
      const { createNews } = await import("./repository");
      console.log("News collection is empty, auto-seeding sample news...");
      const seededItems = [];
      for (const item of seedNews) {
        seededItems.push(await createNews(item));
      }
      return { source: "database", items: seededItems.sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()) };
    }

    return { source: "database", items };
  } catch (error) {
    console.error("Failed to load news from MongoDB, using seed data instead.", error);
    return { source: "seed", items: fallbackNewsData() };
  }
}
