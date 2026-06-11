import mongoose from 'mongoose';

const uri = "mongodb+srv://utkarsh1203:Utkcu12!@elevationesports.lyjxont.mongodb.net/?appName=ElevationEsports";

async function main() {
  try {
    await mongoose.connect(uri);
    
    const achievements = await mongoose.connection.db.collection('achievements').countDocuments();
    const homestats = await mongoose.connection.db.collection('homestats').countDocuments();
    const teams = await mongoose.connection.db.collection('teams').countDocuments();
    const sponsors = await mongoose.connection.db.collection('sponsors').countDocuments();
    
    const news = await mongoose.connection.db.collection('newsposts').countDocuments();
    const tournaments = await mongoose.connection.db.collection('tournaments').countDocuments();

    console.log(`Achievements: ${achievements}`);
    console.log(`HomeStats: ${homestats}`);
    console.log(`Teams: ${teams}`);
    console.log(`Sponsors: ${sponsors}`);
    console.log(`News: ${news}`);
    console.log(`Tournaments: ${tournaments}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

main();
