import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getMysqlPool } from "@/lib/db/mysql";
import type { TournamentMutationInput, TournamentRecord } from "./types";

type TournamentRow = RowDataPacket & {
  id: number;
  slug: string;
  name: string;
  game: string;
  summary: string | null;
  form_url: string;
  detail_url: string;
  uploaded_at: string;
  event_date: string;
  registration_closes_at: string | null;
  format: string;
  status: string;
  slots_info: string;
  location_label: string | null;
  is_archived: number;
};

function mapRow(row: TournamentRow): TournamentRecord {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    game: row.game,
    summary: row.summary,
    formLink: row.form_url,
    detailLink: row.detail_url,
    dateUploaded: row.uploaded_at,
    eventDate: row.event_date,
    registrationClosesAt: row.registration_closes_at,
    format: row.format,
    status: row.status,
    slots: row.slots_info,
    location: row.location_label,
    archived: Boolean(row.is_archived),
  };
}

export async function listTournaments() {
  const pool = getMysqlPool();
  const [rows] = await pool.query<TournamentRow[]>(
    `
      SELECT
        id,
        slug,
        name,
        game,
        summary,
        form_url,
        detail_url,
        uploaded_at,
        event_date,
        registration_closes_at,
        format,
        status,
        slots_info,
        location_label,
        is_archived
      FROM tournaments
      ORDER BY is_archived ASC, event_date ASC, uploaded_at DESC
    `,
  );

  return rows.map(mapRow);
}

export async function getTournamentBySlug(slug: string) {
  const pool = getMysqlPool();
  const [rows] = await pool.query<TournamentRow[]>(
    `
      SELECT
        id,
        slug,
        name,
        game,
        summary,
        form_url,
        detail_url,
        uploaded_at,
        event_date,
        registration_closes_at,
        format,
        status,
        slots_info,
        location_label,
        is_archived
      FROM tournaments
      WHERE slug = ?
      LIMIT 1
    `,
    [slug],
  );

  return rows[0] ? mapRow(rows[0]) : null;
}

export async function createTournament(input: TournamentMutationInput) {
  if (!input.slug) {
    throw new Error("Tournament slug is required.");
  }

  const pool = getMysqlPool();
  await pool.execute<ResultSetHeader>(
    `
      INSERT INTO tournaments (
        slug,
        name,
        game,
        summary,
        form_url,
        detail_url,
        uploaded_at,
        event_date,
        registration_closes_at,
        format,
        status,
        slots_info,
        location_label,
        is_archived
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      input.slug,
      input.name,
      input.game,
      input.summary ?? null,
      input.formLink,
      input.detailLink,
      input.dateUploaded,
      input.eventDate,
      input.registrationClosesAt ?? null,
      input.format,
      input.status,
      input.slots,
      input.location ?? null,
      input.archived ? 1 : 0,
    ],
  );

  return getTournamentBySlug(input.slug);
}

export async function updateTournament(slug: string, input: TournamentMutationInput) {
  if (!input.slug) {
    throw new Error("Tournament slug is required.");
  }

  const pool = getMysqlPool();
  await pool.execute(
    `
      UPDATE tournaments
      SET
        slug = ?,
        name = ?,
        game = ?,
        summary = ?,
        form_url = ?,
        detail_url = ?,
        uploaded_at = ?,
        event_date = ?,
        registration_closes_at = ?,
        format = ?,
        status = ?,
        slots_info = ?,
        location_label = ?,
        is_archived = ?
      WHERE slug = ?
    `,
    [
      input.slug,
      input.name,
      input.game,
      input.summary ?? null,
      input.formLink,
      input.detailLink,
      input.dateUploaded,
      input.eventDate,
      input.registrationClosesAt ?? null,
      input.format,
      input.status,
      input.slots,
      input.location ?? null,
      input.archived ? 1 : 0,
      slug,
    ],
  );

  return getTournamentBySlug(input.slug ?? slug);
}

export async function deleteTournament(slug: string) {
  const pool = getMysqlPool();
  const [result] = await pool.execute<ResultSetHeader>(
    `DELETE FROM tournaments WHERE slug = ?`,
    [slug],
  );

  return result.affectedRows > 0;
}

export async function countTournaments() {
  const pool = getMysqlPool();
  const [rows] = await pool.query<Array<RowDataPacket & { total: number }>>(
    `SELECT COUNT(*) AS total FROM tournaments`,
  );

  return rows[0]?.total ?? 0;
}

export async function seedTournament(input: TournamentMutationInput) {
  if (!input.slug) {
    throw new Error("Tournament slug is required.");
  }

  const pool = getMysqlPool();
  await pool.execute(
    `
      INSERT INTO tournaments (
        slug,
        name,
        game,
        summary,
        form_url,
        detail_url,
        uploaded_at,
        event_date,
        registration_closes_at,
        format,
        status,
        slots_info,
        location_label,
        is_archived
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        game = VALUES(game),
        summary = VALUES(summary),
        form_url = VALUES(form_url),
        detail_url = VALUES(detail_url),
        uploaded_at = VALUES(uploaded_at),
        event_date = VALUES(event_date),
        registration_closes_at = VALUES(registration_closes_at),
        format = VALUES(format),
        status = VALUES(status),
        slots_info = VALUES(slots_info),
        location_label = VALUES(location_label),
        is_archived = VALUES(is_archived)
    `,
    [
      input.slug,
      input.name,
      input.game,
      input.summary ?? null,
      input.formLink,
      input.detailLink,
      input.dateUploaded,
      input.eventDate,
      input.registrationClosesAt ?? null,
      input.format,
      input.status,
      input.slots,
      input.location ?? null,
      input.archived ? 1 : 0,
    ],
  );
}
