import mongoose from "mongoose";
import fs from "fs";

const envLocal = fs.readFileSync(".env.local", "utf-8");
const uriMatch = envLocal.match(/MONGODB_URI=(.*)/);
const uri = uriMatch ? uriMatch[1].trim() : null;

async function test() {
  if (!uri) return;
  try {
    await mongoose.connect(uri);
    const TournamentSchema = new mongoose.Schema({}, { strict: false });
    const TournamentModel = mongoose.models.Tournament || mongoose.model("Tournament", TournamentSchema);
    const tournaments = await TournamentModel.find();
    console.log("Tournaments in DB:", JSON.stringify(tournaments, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
  }
}
test();
