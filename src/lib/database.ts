import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://samuraiadmin:phoneix1234@cluster0.18dsp1k.mongodb.net/project-phoenix?retryWrites=true&w=majority&appName=Cluster0';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || {
  conn: null,
  promise: null,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB(): Promise<typeof mongoose> {
  // Check if already connected
  if (cached.conn && mongoose.connection.readyState === 1) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  // If connection exists but not ready, reset
  if (mongoose.connection.readyState !== 1) {
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
    };

    console.log(' Creating new MongoDB connection...');
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log(' MongoDB Connected Successfully!');
      if (mongoose.connection.db) {
        console.log(`Database: ${mongoose.connection.db.databaseName}`);
      }
      return mongoose;
    }).catch((error) => {
      console.error(' MongoDB Connection Failed:', error);
      cached.promise = null;
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    console.error('MongoDB Connection Error:', error);
    throw error;
  }
}

// Export both the function and mongoose for direct access
export default connectDB;
export { mongoose };