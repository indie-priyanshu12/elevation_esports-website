import { TournamentModel, ITournament } from "@/lib/db/models";
import type { TournamentMutationInput, TournamentRecord } from "./types";

function mapRow(row: ITournament): TournamentRecord {
  return {
    id: row._id.toString(),
    slug: row.slug,
    name: row.name,
    game: row.game,
    summary: row.summary ?? null,
    formLink: row.form_url,
    detailLink: row.detail_url,
    dateUploaded: row.uploaded_at.toISOString(),
    eventDate: row.event_date.toISOString(),
    registrationClosesAt: row.registration_closes_at ? row.registration_closes_at.toISOString() : null,
    format: row.format,
    status: row.status,
    slots: row.slots_info,
    location: row.location_label ?? null,
    archived: row.is_archived,
  };
}

export async function listTournaments(): Promise<TournamentRecord[]> {
  const docs = await TournamentModel.find()
    .sort({ is_archived: 1, event_date: 1, uploaded_at: -1 });

  return docs.map(mapRow);
}

export async function getTournamentBySlug(slug: string): Promise<TournamentRecord | null> {
  const doc = await TournamentModel.findOne({ slug });
  return doc ? mapRow(doc) : null;
}

export async function createTournament(input: TournamentMutationInput): Promise<TournamentRecord | null> {
  if (!input.slug) {
    throw new Error("Tournament slug is required.");
  }

  const doc = await TournamentModel.create({
    slug: input.slug,
    name: input.name,
    game: input.game,
    summary: input.summary ?? null,
    form_url: input.formLink,
    detail_url: input.detailLink,
    uploaded_at: new Date(input.dateUploaded),
    event_date: new Date(input.eventDate),
    registration_closes_at: input.registrationClosesAt ? new Date(input.registrationClosesAt) : undefined,
    format: input.format,
    status: input.status,
    slots_info: input.slots,
    location_label: input.location ?? null,
    is_archived: input.archived ?? false,
  });

  return mapRow(doc);
}

export async function updateTournament(slug: string, input: TournamentMutationInput): Promise<TournamentRecord | null> {
  if (!input.slug) {
    throw new Error("Tournament slug is required.");
  }

  const updateData = {
    slug: input.slug,
    name: input.name,
    game: input.game,
    summary: input.summary ?? null,
    form_url: input.formLink,
    detail_url: input.detailLink,
    uploaded_at: new Date(input.dateUploaded),
    event_date: new Date(input.eventDate),
    registration_closes_at: input.registrationClosesAt ? new Date(input.registrationClosesAt) : undefined,
    format: input.format,
    status: input.status,
    slots_info: input.slots,
    location_label: input.location ?? null,
    is_archived: input.archived ?? false,
  };

  const doc = await TournamentModel.findOneAndUpdate({ slug }, updateData, { new: true });
  return doc ? mapRow(doc) : null;
}

export async function deleteTournament(slug: string): Promise<boolean> {
  const result = await TournamentModel.deleteOne({ slug });
  return result.deletedCount > 0;
}

export async function countTournaments(): Promise<number> {
  return TournamentModel.countDocuments();
}

export async function seedTournament(input: TournamentMutationInput): Promise<void> {
  if (!input.slug) {
    throw new Error("Tournament slug is required.");
  }

  const updateData = {
    name: input.name,
    game: input.game,
    summary: input.summary ?? null,
    form_url: input.formLink,
    detail_url: input.detailLink,
    uploaded_at: new Date(input.dateUploaded),
    event_date: new Date(input.eventDate),
    registration_closes_at: input.registrationClosesAt ? new Date(input.registrationClosesAt) : undefined,
    format: input.format,
    status: input.status,
    slots_info: input.slots,
    location_label: input.location ?? null,
    is_archived: input.archived ?? false,
  };

  await TournamentModel.findOneAndUpdate({ slug: input.slug }, updateData, { upsert: true, new: true });
}
