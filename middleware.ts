import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });
  await supabase.auth.getSession().then((res) => {
    if (res.data.session === null) {
      return NextResponse.redirect(new URL("/auth", req.nextUrl));
    }
  });

  return res;
}

export const config = {
  // match all routes, including /api/auth/logout, except /api/auth/*, /auth/*, /_next/static/*, /_next/image/*, /favicon.ico, and the root route
  matcher: [
    // "/((?!api/auth(?!/logout)|auth|_next/static|_next/image|favicon.ico|$).*)",
    "/((?!api|auth|_next/static|_next/image|favicon.ico|$).*)",
  ],
};

// TODO: Find a way to make middleware work with turbopack
