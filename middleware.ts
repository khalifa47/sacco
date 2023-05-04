import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const canAccess =
    req.nextUrl.pathname === "/" ||
    req.nextUrl.pathname.startsWith("/_next/static/chunks") ||
    session;

  if (canAccess) return res;

  return NextResponse.redirect(new URL("/", req.nextUrl));
}
