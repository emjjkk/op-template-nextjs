import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { full_name, email, password } = await req.json();

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Insert user into database
    const { data, error } = await supabase
      .from("users")
      .insert([{ full_name, email, password_hash }])
      .select("id, email, full_name");

    if (error) throw error;

    return NextResponse.json({ user: data[0] }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
