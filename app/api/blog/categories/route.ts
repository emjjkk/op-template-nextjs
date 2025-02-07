import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* GET /api/blog/categories 
   api route to get all categories */

export async function GET() {
  const { data, error } = await supabase.from("blog_categories").select("*");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

/* POST /api/blog/categories 
   api route create new category */

export async function POST(req: Request) {
    try {
      const { name } = await req.json();
      const { data, error } = await supabase
        .from("blog_categories")
        .insert([{ name }])
        .select("*");
  
      if (error) throw error;
  
      return NextResponse.json(data[0], { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
  
