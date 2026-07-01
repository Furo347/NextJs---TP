import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    serverSecretMessage: process.env.SERVER_SECRET_MESSAGE,
  });
}