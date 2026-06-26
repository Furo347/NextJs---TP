import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const session = req.auth;

  const isAdmin = session?.user?.role === "ADMIN";

  if (!isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};