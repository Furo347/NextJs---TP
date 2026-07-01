import { NextResponse } from "next/server";
import { auth } from "@/auth";

const AB_COOKIE_NAME = "ab_variant";

const LOCALE_COOKIE_NAME = "NEXT_LOCALE";

function getValidVariant(value: string | null | undefined) {
  if (value === "A" || value === "B") {
    return value;
  }

  return null;
}

export default auth((req) => {
  const url = req.nextUrl;

  const forcedVariant = getValidVariant(url.searchParams.get("ab_prefetch"));
  const existingVariant = getValidVariant(req.cookies.get(AB_COOKIE_NAME)?.value);

  const variant =
    forcedVariant ?? existingVariant ?? (Math.random() < 0.5 ? "A" : "B");

  const isAdminRoute = url.pathname.startsWith("/admin");
  const isAdmin = req.auth?.user?.role === "ADMIN";

  if (isAdminRoute && !isAdmin) {
    const response = NextResponse.redirect(new URL("/", req.url));

    response.cookies.set(AB_COOKIE_NAME, variant, {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  }

  const response = NextResponse.next();

  const existingLocale = req.cookies.get(LOCALE_COOKIE_NAME)?.value;

  if (!existingLocale) {
    const preferredLocale = getPreferredLocale(
      req.headers.get("accept-language")
  );

  response.cookies.set(LOCALE_COOKIE_NAME, preferredLocale, {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
}

  if (!existingVariant || forcedVariant) {
    response.cookies.set(AB_COOKIE_NAME, variant, {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return response;
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};

function getPreferredLocale(acceptLanguage: string | null) {
  if (!acceptLanguage) {
    return "fr";
  }

  return acceptLanguage.toLowerCase().startsWith("en") ? "en" : "fr";
}