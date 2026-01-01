import { COOKIE_ACCESS } from "@/src/lib/auth/cookieNames";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_ACCESS, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
