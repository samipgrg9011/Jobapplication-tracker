import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
throw new Error(
"Please define the MONGODB_URI environment variable inside .env"
);
};

interface MongooseCache {
conn: typeof mongoose | null;
promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}



let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
    if (!MONGODB_URI) {
throw new Error(
"Please define the MONGODB_URI environment variable inside .env"
);
};

  // If we already have a connection, use it
  if (cached.conn) {
    return cached.conn;
  }

  // If there's already a connection promise in progress, wait for it
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable mongoose buffering
      // You can add more options if needed:
      // maxPoolSize: 10,
      // serverSelectionTimeoutMS: 5000,
      // socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        cached.promise = null; // Reset promise on failure
        throw error;
      });
  }

  // Wait for the promise to resolve/reject
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;   // Important: reset so next attempt will try again
    throw e;
  }

  return cached.conn;
}

export default connectDB;