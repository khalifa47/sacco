import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { type NextRequest, NextResponse } from "next/server";
import { headers, cookies } from "next/headers";

type LoginBody = {
  isEmail: boolean;
  identifier: string;
  password: string;
};

// do not cache this page
export const revalidate = 0;

export async function POST(req: NextRequest) {
  const body: LoginBody = await req.json();

  const supabase = createRouteHandlerSupabaseClient({
    headers,
    cookies,
  });
  const { error } = await supabase.auth.signInWithPassword({
    email: body.identifier,
    password: body.password,
  });

  if (error !== null) {
    return new NextResponse(error.message, {
      status: error.status,
    });
  }
  return new NextResponse(null, {
    status: 200,
  });
}
