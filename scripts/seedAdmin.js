// scripts/seedAdmin.js
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from '../db/db.js';
import { User } from '../models/userModel.js';

dotenv.config();

async function run() {
  try {
    await connectDB();

    const email = process.env.ADMIN_SEED_EMAIL;
    const password = process.env.ADMIN_SEED_PASSWORD;
    const username = process.env.ADMIN_SEED_USERNAME;

    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Super admin already exists:', email);
      process.exit(0);
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hash,
      address: 'HQ',
      phone: '9999999999',
      answer: 'seed',
      usertype: 'admin',
    });

    console.log('Super admin created:', { email: user.email, id: user._id.toString() });
    console.log('Rotate ADMIN_SEED_PASSWORD after first login.');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

run();