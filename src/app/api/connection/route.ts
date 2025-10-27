import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectDB();
    
    const connection = mongoose.connection;
    
    // Check if connection is ready and db exists
    if (connection.readyState !== 1) {
      throw new Error('Database connection not established');
    }

    if (!connection.db) {
      throw new Error('Database instance not available');
    }

    const collections = await connection.db.listCollections().toArray();
    
    return NextResponse.json({
      status: 'success',
      message: 'MongoDB Connected Successfully!',
      database: connection.db.databaseName,
      collections: collections.map(col => col.name),
      connectionState: connection.readyState,
      host: connection.host,
      port: connection.port
    });
  } catch (error: any) {
    console.error('MongoDB Connection Error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'MongoDB Connection Failed',
      error: error.message
    }, { status: 500 });
  }
}