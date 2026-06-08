import { ensureDatabaseReady } from "@/lib/db/bootstrap";
import { isDatabaseConfigured } from "@/lib/db/mongoose";
import { seedTournaments } from "./seed";
import {
  createTournament,
  deleteTournament,
  getTournamentBySlug,
  listTournaments,
  updateTournament,
} from "./repository";
import type { TournamentHubData, TournamentMutationInput, TournamentRecord } from "./types";

function normalizeSeedRecord(input: TournamentMutationInput, index: number): TournamentRecord {
  return {
    id: (index + 1).toString(),
    slug: input.slug ?? `seed-${index + 1}`,
    name: input.name,
    game: input.game,
    summary: input.summary ?? null,
    formLink: input.formLink,
    detailLink: input.detailLink,
    dateUploaded: input.dateUploaded,
    eventDate: input.eventDate,
    registrationClosesAt: input.registrationClosesAt ?? null,
    format: input.format,
    status: input.status,
    slots: input.slots,
    location: input.location ?? null,
    archived: input.archived ?? false,
  };
}

function groupTournamentData(items: TournamentRecord[], source: "database" | "seed"): TournamentHubData {
  return {
    source,
    upcoming: items.filter((item) => !item.archived),
    completed: items.filter((item) => item.archived),
  };
}

function fallbackTournamentData(): TournamentHubData {
  return groupTournamentData(seedTournaments.map(normalizeSeedRecord), "seed");
}

export async function getTournamentHubData(): Promise<TournamentHubData> {
  if (!isDatabaseConfigured()) {
    return fallbackTournamentData();
  }

  try {
    await ensureDatabaseReady();
    const tournaments = await listTournaments();
    return groupTournamentData(tournaments, "database");
  } catch (error) {
    console.error("Failed to load tournaments from MySQL, using seed data instead.", error);
    return fallbackTournamentData();
  }
}

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 160);
}

function normalizeInput(input: TournamentMutationInput): TournamentMutationInput {
  return {
    slug: input.slug ? createSlug(input.slug) : createSlug(input.name),
    name: input.name.trim(),
    game: input.game.trim(),
    summary: input.summary?.trim() || null,
    formLink: input.formLink.trim(),
    detailLink: input.detailLink.trim(),
    dateUploaded: input.dateUploaded,
    eventDate: input.eventDate,
    registrationClosesAt: input.registrationClosesAt ?? null,
    format: input.format.trim(),
    status: input.status.trim(),
    slots: input.slots.trim(),
    location: input.location?.trim() || null,
    archived: input.archived ?? false,
  };
}

function validateInput(input: TournamentMutationInput) {
  const requiredFields: Array<keyof TournamentMutationInput> = [
    "name",
    "game",
    "formLink",
    "detailLink",
    "dateUploaded",
    "eventDate",
    "format",
    "status",
    "slots",
  ];

  for (const field of requiredFields) {
    if (!input[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
}

export async function createTournamentEntry(input: TournamentMutationInput) {
  if (!isDatabaseConfigured()) {
    throw new Error("MySQL is not configured.");
  }

  await ensureDatabaseReady();
  validateInput(input);

  const normalized = normalizeInput(input);
  return createTournament(normalized);
}

export async function updateTournamentEntry(
  slug: string,
  input: Partial<TournamentMutationInput>,
) {
  if (!isDatabaseConfigured()) {
    throw new Error("MySQL is not configured.");
  }

  await ensureDatabaseReady();
  const current = await getTournamentBySlug(slug);
  if (!current) {
    return null;
  }

  const merged: TournamentMutationInput = {
    slug: input.slug ?? current.slug,
    name: input.name ?? current.name,
    game: input.game ?? current.game,
    summary: input.summary ?? current.summary,
    formLink: input.formLink ?? current.formLink,
    detailLink: input.detailLink ?? current.detailLink,
    dateUploaded: input.dateUploaded ?? current.dateUploaded,
    eventDate: input.eventDate ?? current.eventDate,
    registrationClosesAt: input.registrationClosesAt ?? current.registrationClosesAt,
    format: input.format ?? current.format,
    status: input.status ?? current.status,
    slots: input.slots ?? current.slots,
    location: input.location ?? current.location,
    archived: input.archived ?? current.archived,
  };

  validateInput(merged);
  const normalized = normalizeInput(merged);
  return updateTournament(slug, normalized);
}

export async function getTournamentEntry(slug: string) {
  if (!isDatabaseConfigured()) {
    const fallback = fallbackTournamentData();
    return [...fallback.upcoming, ...fallback.completed].find((item) => item.slug === slug) ?? null;
  }

  await ensureDatabaseReady();
  return getTournamentBySlug(slug);
}

export async function deleteTournamentEntry(slug: string) {
  if (!isDatabaseConfigured()) {
    throw new Error("MySQL is not configured.");
  }

  await ensureDatabaseReady();
  return deleteTournament(slug);
}
