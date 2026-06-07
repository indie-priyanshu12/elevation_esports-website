import { createTournamentEntry, getTournamentHubData } from "@/lib/tournaments/service";
import type { TournamentMutationInput } from "@/lib/tournaments/types";

export const runtime = "nodejs";

export async function GET() {
  try {
    const data = await getTournamentHubData();
    return Response.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as TournamentMutationInput;
    const tournament = await createTournamentEntry(payload);
    return Response.json({ tournament }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return Response.json({ error: message }, { status: 400 });
  }
}
