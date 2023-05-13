import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";

// do not cache this page
export const revalidate = 0;

export async function GET() {
  const supabase = createRouteHandlerSupabaseClient({
    headers,
    cookies,
  });

  const { error } = await supabase.auth.signOut();

  if (error !== null) {
    return new NextResponse(error.message, {
      status: error.status || 500,
    });
  }

  return new NextResponse("Logout Success", {
    status: 200,
    headers: {
      "Set-Cookie": `supabase-auth-token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0;`,
    },
  });
}
