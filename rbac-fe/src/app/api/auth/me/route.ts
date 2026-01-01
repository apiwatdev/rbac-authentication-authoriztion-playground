import { getSession } from "@/src/lib/auth/session";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
     const session = await getSession();
     if (!session) return NextResponse.json({ user: null }, { status: 401 });
     return NextResponse.json(session);
}