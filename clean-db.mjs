import mongoose from 'mongoose';

const uri = "mongodb+srv://utkarsh1203:Utkcu12!@elevationesports.lyjxont.mongodb.net/?appName=ElevationEsports";

async function main() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("Connected successfully! Wiping collections...");

    await mongoose.connection.db.collection('achievements').deleteMany({});
    await mongoose.connection.db.collection('homestats').deleteMany({});
    await mongoose.connection.db.collection('teams').deleteMany({});
    await mongoose.connection.db.collection('sponsors').deleteMany({});

    console.log("Collections wiped. Refresh the homepage to re-seed correctly.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

main();
