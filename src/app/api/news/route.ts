import { ensureDatabaseReady } from "@/lib/db/bootstrap";
import { isDatabaseConfigured } from "@/lib/db/mongoose";
import { createNews } from "@/lib/news/repository";
import type { NewsMutationInput } from "@/lib/news/types";
import { requireAdminAuth } from "@/lib/auth/guard";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    if (!isDatabaseConfigured()) {
      return Response.json({ error: "MongoDB is not configured." }, { status: 500 });
    }

    await ensureDatabaseReady();
    
    const payload = (await request.json()) as NewsMutationInput;
    
    // Basic validation
    if (!payload.title || !payload.slug) {
      return Response.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const newsItem = await createNews(payload);
    
    return Response.json({ news: newsItem }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return Response.json({ error: message }, { status: 400 });
  }
}
