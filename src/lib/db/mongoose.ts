import mongoose from "mongoose";

declare global {
  var __elevationMongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.__elevationMongooseCache;

if (!cached) {
  cached = global.__elevationMongooseCache = { conn: null, promise: null };
}

export function isDatabaseConfigured() {
  return !!process.env.MONGODB_URI;
}

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MongoDB is not configured. Set MONGODB_URI.");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
