import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* GET /api/blog/posts/[slug] (Get a Post by Slug) */
export async function GET(req: Request) {
    const url = new URL(req.url);
    const slug = url.pathname.split("/")[4]; // Extract the slug from the URL path

    const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, content, author_id, category_id, published, created_at")
        .eq("slug", slug)
        .single();

    if (error) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    return NextResponse.json(data);
}
