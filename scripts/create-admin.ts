/**
 * Script to create or update admin account
 * Email: admin@thesamurai.com
 * Password: SamuraiAdmin123
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') });

const ADMIN_EMAIL = 'admin@thesamurai.com';
const ADMIN_PASSWORD = 'SamuraiAdmin123';
const ADMIN_NAME = 'The Samurai Admin';

// User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI not found in environment variables');
    }

    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    
    if (existingAdmin) {
      console.log(`⚠️  Admin account already exists: ${ADMIN_EMAIL}`);
      console.log('🔄 Updating password...');
      
      // Hash new password
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
      
      // Update existing admin
      existingAdmin.password = hashedPassword;
      existingAdmin.name = ADMIN_NAME;
      await existingAdmin.save();
      
      console.log('✅ Admin password updated successfully!\n');
    } else {
      console.log(`🔄 Creating new admin account: ${ADMIN_EMAIL}`);
      
      // Hash password
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
      
      // Create new admin user
      const admin = await User.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: hashedPassword,
      });
      
      console.log('✅ Admin account created successfully!\n');
      console.log('Admin Details:');
      console.log(`  ID: ${admin._id}`);
      console.log(`  Name: ${admin.name}`);
      console.log(`  Email: ${admin.email}`);
      console.log(`  Created: ${admin.createdAt}\n`);
    }

    console.log('📋 Login Credentials:');
    console.log(`  Email: ${ADMIN_EMAIL}`);
    console.log(`  Password: ${ADMIN_PASSWORD}`);
    console.log('\n✅ You can now login at /auth/login with these credentials\n');
    
  } catch (error) {
    console.error('❌ Error creating admin account:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
}

// Run the script
createAdmin()
  .then(() => {
    console.log('\n✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
