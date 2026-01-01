import { COOKIE_ACCESS } from "@/src/lib/auth/cookieNames";
import { signMockJwt } from "@/src/lib/auth/jwt";
import { NextResponse } from "next/server";



export async  function POST(request: Request) {
    const { email, password } = await request.json();

    console.log("Login attempt:", { email, password });

    if (!email || !password) {
        return NextResponse.json({ message: "Missing email/password" }, { status: 400 });
    }

    const mode = process.env.AUTH_MODE ?? "mock";

     if (mode === "mock") {
      const isAdmin = email === "admin@example.com";
    const token = await signMockJwt({
        sub: email,
        email,
        roles: [isAdmin ? "admin" : "staff"],
        permissions: isAdmin
            ? ["dashboard.view", "admin.view", "reports.view"]
            : ["dashboard.view"],

    });

    const res = NextResponse.json({ ok: true, mode: "mock" });
    res.cookies.set(COOKIE_ACCESS, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    return res;
    }
    return NextResponse.json({ message: "Unsupported auth mode" }, { status: 500 });
    
}