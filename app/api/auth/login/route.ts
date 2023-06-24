import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { type NextRequest, NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import prisma from "@/utils/prismadb";
import { User } from "@prisma/client";

type LoginBody = {
  isEmail: boolean;
  identifier: string;
  password: string;
};

// do not cache this page
export const revalidate = 60;

export async function POST(req: NextRequest) {
  const body: LoginBody = await req.json();
  let user: User | null = null;

  const supabase = createRouteHandlerSupabaseClient({
    headers,
    cookies,
  });

  try {
    if (!body.isEmail) {
      user = await prisma.user.findUnique({
        where: {
          nationalId: body.identifier,
        },
      });
    }
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }

  const {
    data: { session },
    error,
  } = await supabase.auth.signInWithPassword({
    email: body.isEmail ? body.identifier : user ? user.email : "",
    password: body.password,
  });

  if (error !== null) {
    return new NextResponse(error.message, {
      status: error.status || 500,
    });
  }

  await prisma.user.update({
    where: {
      id: session?.user.id,
    },
    data: {
      lastActive: new Date(),
    },
  });

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
