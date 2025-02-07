import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("cookie")?.split("=")[1];

    if (!token) throw new Error("Unauthorized");

    const user = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
