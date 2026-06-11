import { connectToDatabase } from "../db/mongoose";
import { ensureDatabaseReady } from "../db/bootstrap";
import { Achievement, HomeStat, Team, Sponsor } from "./models";

export async function getHomeData() {
  await ensureDatabaseReady();
  let achievements = await Achievement.find().sort({ order: 1 }).lean();
  let stats = await HomeStat.find().sort({ order: 1 }).lean();
  let teams = await Team.find().sort({ order: 1 }).lean();
  let sponsors = await Sponsor.find().sort({ order: 1 }).lean();

  if (achievements.length === 0 || stats.length === 0 || teams.length === 0 || sponsors.length === 0) {
    await seedHomeData();
    achievements = await Achievement.find().sort({ order: 1 }).lean();
    stats = await HomeStat.find().sort({ order: 1 }).lean();
    teams = await Team.find().sort({ order: 1 }).lean();
    sponsors = await Sponsor.find().sort({ order: 1 }).lean();
  }

  return {
    achievements: JSON.parse(JSON.stringify(achievements)),
    stats: JSON.parse(JSON.stringify(stats)),
    teams: JSON.parse(JSON.stringify(teams)),
    sponsors: JSON.parse(JSON.stringify(sponsors)),
  };
}

export async function seedHomeData() {
  await connectToDatabase();

  const achievementsCount = await Achievement.countDocuments();
  if (achievementsCount === 0) {
    await Achievement.insertMany([
      { icon: "🏆", value: "+", label: "Tournaments Hosted", color: "text-neon-yellow", order: 1 },
      { icon: "👥", value: "2,000+", label: "Participants", color: "text-neon-cyan", order: 2 },
      { icon: "🎮", value: "8", label: "Supported Games", color: "text-neon-green", order: 3 },
      { icon: "💰", value: "₹1,00,000+", label: "Prize Pool Distributed", color: "text-neon-pink", order: 4 },
    ]);
  }

  const statsCount = await HomeStat.countDocuments();
  if (statsCount === 0) {
    await HomeStat.insertMany([
      { value: 450, label: "Active Operators", suffix: "+", order: 1 },
      { value: 24, label: "Circuits Hosted", suffix: "", order: 2 },
      { value: 12, label: "Trophies Secured", suffix: "", order: 3 },
      { value: 5, label: "Elite Squadrons", suffix: "", order: 4 },
    ]);
  }

  const teamsCount = await Team.countDocuments();
  if (teamsCount === 0) {
    await Team.insertMany([
      { game: "BGMI", captain: "ViperX", roster: "Shadow, Blaze, Nova", achievements: "Campus Champions '24", order: 1 },
      { game: "Valorant", captain: "JettDiff", roster: "Omen, Sage, Reyna, Killjoy", achievements: "Regional Finalists", order: 2 },
      { game: "CS2", captain: "Headshot", roster: "Flick, Spray, Nade, Flash", achievements: "Inter-College Winners", order: 3 },
      { game: "Rocket League", captain: "Aerial", roster: "Boost, Demo", achievements: "Division 1 Leaders", order: 4 },
    ]);
  }

  const sponsorsCount = await Sponsor.countDocuments();
  if (sponsorsCount === 0) {
    await Sponsor.insertMany([
      { name: "SYS_1", order: 1 },
      { name: "SYS_2", order: 2 },
      { name: "SYS_3", order: 3 },
      { name: "SYS_4", order: 4 },
    ]);
  }
}
