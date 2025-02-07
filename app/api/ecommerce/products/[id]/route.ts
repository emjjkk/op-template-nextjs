import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* Get Single Product */
export async function GET(req: Request) {
    const url = new URL(req.url);
    const id = url.pathname.split("/")[4]; // Extract the id from the URL path

    const { data, error } = await supabase
        .from("products")
        .select("id, name, description, price, stock, image_url, created_at")
        .eq("id", id)
        .single();

    if (error) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json(data);
}
