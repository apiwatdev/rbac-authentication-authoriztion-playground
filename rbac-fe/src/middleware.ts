import { NextRequest, NextResponse } from "next/server";
import { COOKIE_ACCESS } from "./lib/auth/cookieNames";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtectedPath = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  if (!isProtectedPath) return NextResponse.next();

  const token = req.cookies.get(COOKIE_ACCESS)?.value;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

   return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
