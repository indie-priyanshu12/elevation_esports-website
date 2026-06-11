"use server";

import { connectToDatabase } from "@/lib/db/mongoose";
import { Achievement, HomeStat, Team, Sponsor } from "@/lib/home/models";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_auth");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateAchievements(achievements: any[]) {
  await connectToDatabase();
  await Achievement.deleteMany({});
  await Achievement.insertMany(achievements);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateStats(stats: any[]) {
  await connectToDatabase();
  await HomeStat.deleteMany({});
  await HomeStat.insertMany(stats);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateTeams(teams: any[]) {
  await connectToDatabase();
  await Team.deleteMany({});
  await Team.insertMany(teams);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateSponsors(sponsors: any[]) {
  await connectToDatabase();
  await Sponsor.deleteMany({});
  await Sponsor.insertMany(sponsors);
  revalidatePath("/");
  revalidatePath("/admin");
}
