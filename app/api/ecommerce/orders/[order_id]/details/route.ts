import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* This route fetches the details for a specific order, including its items. */

export async function GET(req: Request) {
    const url = new URL(req.url);
    const order_id = url.pathname.split("/")[4]; // Extract the order_id from the URL path

    // Fetch the order
    const { data: order, error: orderError } = await supabase
        .from("orders")
        .select("id, total_price, status, created_at")
        .eq("id", order_id)
        .single();

    if (orderError) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    // Fetch the order items
    const { data: orderItems, error: itemsError } = await supabase
        .from("order_items")
        .select("product_id, quantity, price")
        .eq("order_id", order_id);

    if (itemsError) return NextResponse.json({ error: itemsError.message }, { status: 500 });

    return NextResponse.json({ order, items: orderItems });
}