import { connectToDatabase } from "@/lib/db/mongoose";
import { NewsPost, TournamentModel, UplinkMessage } from "@/lib/db/models";
import AdminDashboard from "@/components/admin/AdminDashboard";

import { getHomeData } from "@/lib/home/service";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await connectToDatabase();

  const rawNews = await NewsPost.find({}).sort({ created_at: -1 }).lean();
  const rawTournaments = await TournamentModel.find({}).sort({ uploaded_at: -1 }).lean();
  const rawUplinks = await UplinkMessage.find({}).sort({ created_at: -1 }).lean();

  const news = rawNews.map((n: any) => ({
    _id: n._id.toString(),
    slug: n.slug,
    title: n.title,
    summary: n.summary,
    content: n.content,
    cover_image_url: n.cover_image_url,
    published_at: n.published_at ? n.published_at.toISOString() : null,
    is_published: n.is_published,
    created_at: n.created_at.toISOString(),
  }));

  const tournaments = rawTournaments.map((t: any) => ({
    _id: t._id.toString(),
    slug: t.slug,
    name: t.name,
    game: t.game,
    summary: t.summary,
    form_url: t.form_url,
    detail_url: t.detail_url,
    uploaded_at: t.uploaded_at.toISOString(),
    event_date: t.event_date.toISOString(),
    registration_closes_at: t.registration_closes_at ? t.registration_closes_at.toISOString() : null,
    format: t.format,
    status: t.status,
    slots_info: t.slots_info,
    location_label: t.location_label,
    is_archived: t.is_archived,
  }));

  const uplinks = rawUplinks.map((u: any) => ({
    _id: u._id.toString(),
    name: u.name,
    email: u.email,
    message: u.message,
    created_at: u.created_at.toISOString(),
  }));

  const homeData = await getHomeData();

  return <AdminDashboard initialNews={news} initialTournaments={tournaments} initialHomeData={homeData} initialUplinks={uplinks} />;
}
