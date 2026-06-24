import {
  deleteTournamentEntry,
  getTournamentEntry,
  updateTournamentEntry,
} from "@/lib/tournaments/service";
import type { TournamentMutationInput } from "@/lib/tournaments/types";
import { requireAdminAuth } from "@/lib/auth/guard";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const tournament = await getTournamentEntry(slug);

    if (!tournament) {
      return Response.json({ error: "Tournament not found." }, { status: 404 });
    }

    return Response.json({ tournament });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const { slug } = await context.params;
    const payload = (await request.json()) as TournamentMutationInput;
    const tournament = await updateTournamentEntry(slug, payload);

    if (!tournament) {
      return Response.json({ error: "Tournament not found." }, { status: 404 });
    }

    return Response.json({ tournament });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return Response.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const { slug } = await context.params;
    const deleted = await deleteTournamentEntry(slug);

    if (!deleted) {
      return Response.json({ error: "Tournament not found." }, { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return Response.json({ error: message }, { status: 400 });
  }
}
