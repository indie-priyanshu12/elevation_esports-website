import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  display_name: string;
  role: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    display_name: { type: String, required: true },
    role: { type: String, default: "member" },
    avatar_url: { type: String },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export interface INewsPost extends Document {
  slug: string;
  title: string;
  summary?: string;
  content?: string;
  cover_image_url?: string;
  published_at?: Date;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
}

const NewsPostSchema = new Schema<INewsPost>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    summary: { type: String },
    content: { type: String },
    cover_image_url: { type: String },
    published_at: { type: Date },
    is_published: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const NewsPost = mongoose.models.NewsPost || mongoose.model<INewsPost>("NewsPost", NewsPostSchema);

export interface ITournament extends Document {
  slug: string;
  name: string;
  game: string;
  summary?: string;
  form_url: string;
  prize_pool?: string;
  entry_fee?: string;
  uploaded_at: Date;
  event_date: Date;
  registration_closes_at?: Date;
  format: string;
  status: string;
  slots_info: string;
  location_label?: string;
  is_archived: boolean;
  created_at: Date;
  updated_at: Date;
}

const TournamentSchema = new Schema<ITournament>(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    game: { type: String, required: true },
    summary: { type: String },
    form_url: { type: String, required: true },
    prize_pool: { type: String },
    entry_fee: { type: String },
    uploaded_at: { type: Date, required: true },
    event_date: { type: Date, required: true },
    registration_closes_at: { type: Date },
    format: { type: String, required: true },
    status: { type: String, required: true },
    slots_info: { type: String, required: true },
    location_label: { type: String },
    is_archived: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const TournamentModel = mongoose.models.Tournament || mongoose.model<ITournament>("Tournament", TournamentSchema);

export interface IUplinkMessage extends Document {
  name: string;
  email: string;
  message: string;
  created_at: Date;
  updated_at: Date;
}

const UplinkMessageSchema = new Schema<IUplinkMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const UplinkMessage = mongoose.models.UplinkMessage || mongoose.model<IUplinkMessage>("UplinkMessage", UplinkMessageSchema);
