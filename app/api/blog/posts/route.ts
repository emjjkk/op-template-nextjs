import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* GET /api/blog/posts (get all blog posts) */

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const categoryId = searchParams.get("category_id");

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
        .from("blog_posts")
        .select("id, title, slug, content, author_id, category_id, published, created_at", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

    if (search) {
        query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    if (categoryId) {
        query = query.eq("category_id", categoryId);
    }

    const { data, error, count } = await query;

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
        posts: data,
        total: count,
        page,
        totalPages: Math.ceil(count! / limit),
    });
}


/* POST /api/blog/posts (create new blog post) */

export async function POST(req: Request) {
    try {
        const { title, slug, content, author_id, category_id, published } =
            await req.json();

        const { data, error } = await supabase
            .from("blog_posts")
            .insert([{ title, slug, content, author_id, category_id, published }])
            .select("*");

        if (error) throw error;

        return NextResponse.json(data[0], { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
