import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* GET /api/blog/posts/[id]/comments (Get Comments for a Post) */
export async function GET(req: Request) {
    const url = new URL(req.url);
    const id = url.pathname.split("/")[4]; // Extract the id from the URL path

    const { data, error } = await supabase
        .from("blog_comments")
        .select("id, content, user_id, created_at")
        .eq("post_id", id)
        .order("created_at", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
}

/* POST /api/blog/posts/[id]/comments (Add a Comment to a Post) */
export async function POST(req: Request) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split("/")[4]; // Extract the id from the URL path
        const { user_id, content } = await req.json();

        const { data, error } = await supabase
            .from("blog_comments")
            .insert([{ post_id: id, user_id, content }])
            .select("*");

        if (error) throw error;

        return NextResponse.json(data[0], { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
