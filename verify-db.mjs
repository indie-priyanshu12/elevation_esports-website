import mongoose from 'mongoose';

const uri = "mongodb+srv://utkarsh1203:Utkcu12!@cluster0.mongodb.net/elevation_esports";

const TournamentSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    game: { type: String, required: true },
  },
  { strict: false }
);

const TournamentModel = mongoose.models.Tournament || mongoose.model("Tournament", TournamentSchema);

async function main() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("Connected successfully!");

    const count = await TournamentModel.countDocuments();
    console.log(`Total tournaments found: ${count}`);

    if (count > 0) {
      const tournaments = await TournamentModel.find().limit(2);
      console.log("Sample tournaments:");
      console.dir(tournaments.map(t => t.toObject()), { depth: null });
    } else {
      console.log("No tournaments found in the database. But the connection works.");
    }
  } catch (error) {
    console.error("Error connecting or fetching:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

main();
