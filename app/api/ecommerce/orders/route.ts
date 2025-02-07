import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* POST /api/ecommerce/orders  (Make order) */

export async function POST(req: Request) {
    try {
        const { user_id, items, total_price } = await req.json();

        // First, create the order
        const { data: order, error } = await supabase
            .from("orders")
            .insert([{ user_id, total_price, status: "pending" }])
            .select("id")
            .single();

        if (error) throw error;

        // Then, create order items
        const orderItems = items.map((item: { product_id: number, quantity: number, price: number }) => ({
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
        }));

        await supabase.from("order_items").insert(orderItems);

        return NextResponse.json(order, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

/* Get all orders */

export async function GET(req: Request) {
    const { data, error } = await supabase
      .from("orders")
      .select("id, user_id, total_price, status, created_at")
      .order("created_at", { ascending: false });
  
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
    return NextResponse.json(data);
  }
  