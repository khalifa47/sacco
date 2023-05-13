import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session === null) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl));
  }

  return res;
}

export const config = {
  // match all routes, including /api/auth/logout, except /api/auth/*, /auth/*, /_next/static/*, /_next/image/*, /favicon.ico, and the root route
  matcher: [
    "/((?!api/auth(?!/logout)|auth|_next/static|_next/image|favicon.ico|$).*)",
  ],
};
