import mongoose, { Schema, Document } from "mongoose";

// --- Achievement ---
export interface IAchievement extends Document {
  icon: string;
  value: string;
  label: string;
  color: string;
  order: number;
}

const AchievementSchema = new Schema<IAchievement>(
  {
    icon: { type: String, required: true },
    value: { type: String, required: true },
    label: { type: String, required: true },
    color: { type: String, required: true, default: "text-neon-cyan" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Achievement =
  mongoose.models.Achievement ||
  mongoose.model<IAchievement>("Achievement", AchievementSchema);

// --- Home Stat (About Section) ---
export interface IHomeStat extends Document {
  value: number;
  label: string;
  suffix?: string;
  order: number;
}

const HomeStatSchema = new Schema<IHomeStat>(
  {
    value: { type: Number, required: true },
    label: { type: String, required: true },
    suffix: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const HomeStat =
  mongoose.models.HomeStat || mongoose.model<IHomeStat>("HomeStat", HomeStatSchema);

// --- Team ---
export interface ITeam extends Document {
  game: string;
  captain: string;
  roster: string;
  achievements: string;
  order: number;
}

const TeamSchema = new Schema<ITeam>(
  {
    game: { type: String, required: true },
    captain: { type: String, required: true },
    roster: { type: String, required: true },
    achievements: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Team =
  mongoose.models.Team || mongoose.model<ITeam>("Team", TeamSchema);

// --- Sponsor ---
export interface ISponsor extends Document {
  name: string;
  logoUrl?: string;
  order: number;
}

const SponsorSchema = new Schema<ISponsor>(
  {
    name: { type: String, required: true },
    logoUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Sponsor =
  mongoose.models.Sponsor || mongoose.model<ISponsor>("Sponsor", SponsorSchema);
