import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* Fetches all the orders for a user */
export async function GET(req: Request) {
    const url = new URL(req.url);
    const user_id = url.pathname.split("/")[4]; // Extract the user_id from the URL path

    const { data, error } = await supabase
        .from("orders")
        .select("id, total_price, status, created_at")
        .eq("user_id", user_id)
        .order("created_at", { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
}
