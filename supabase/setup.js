require("dotenv").config({ path: ".env.local" });
const fs = require("fs").promises;
const { Client } = require("pg");

async function seedDatabase() {
  const sqlFilePath = "./supabase/seed.sql";
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  // Extract the database host from the Supabase URL
  const dbHost = new URL(supabaseUrl).hostname;
  const connectionString = `postgres://postgres:${supabaseKey}@${dbHost}:5432/postgres?sslmode=require`;

  try {
    // Read the SQL file
    const sql = await fs.readFile(sqlFilePath, "utf8");

    // Connect to the database
    const client = new Client({ connectionString });
    await client.connect();

    console.log("Seeding database...");
    await client.query(sql);
    console.log("✅ Database seeded successfully!");

    await client.end();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
