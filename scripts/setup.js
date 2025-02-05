import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createClient } from "@/utils/supabase/server";

dotenv.config();
const supabase = await createClient();

async function seedDatabase() {
  try {
    const seedFilePath = path.join(process.cwd(), 'supabase', 'seed.sql');
    const sql = fs.readFileSync(seedFilePath, 'utf8');

    const { error } = await supabase.rpc('sql', { sql });

    if (error) {
      console.error('Error seeding database:', error.message);
    } else {
      console.log('✅ Database seeded successfully!');
    }
  } catch (err) {
    console.error('Failed to execute seed.sql:', err);
  }
}

seedDatabase();
