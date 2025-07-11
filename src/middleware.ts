import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { origin } = request.nextUrl;

  const authToken = request.cookies.get("authToken")?.value;

  if (!authToken) {
    const loginUrl = new URL("/auth/login", origin);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
