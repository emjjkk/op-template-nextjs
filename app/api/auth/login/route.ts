import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Find user by email
    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, password_hash, role")
      .eq("email", email)
      .single();

    if (error || !user) throw new Error("Invalid email or password");

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) throw new Error("Invalid email or password");

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Set cookie
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("token", token, { httpOnly: true, secure: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
