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
  const {
    data: { session },
    error,
  } = await supabase.auth.signInWithPassword({
    email: body.identifier,
    password: body.password,
  });

  if (error !== null) {
    return new NextResponse(error.message, {
      status: error.status,
    });
  }
  return new NextResponse(JSON.stringify(session), {
    status: 200,
    headers: {
      "Set-Cookie": `supabase-auth-token=${encodeURIComponent(
        `["${session!.access_token}", "${session!.refresh_token}"]`
      )}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${
        session!.expires_in
      };`,
    },
  });
}
