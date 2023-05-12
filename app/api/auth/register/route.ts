import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { type NextRequest, NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import prisma from "@/utils/prismadb";

type RegisterBody = {
  nationalId: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  otherNames: string;
  password: string;
  confirmPassword: string;
};

// do not cache this page
export const revalidate = 0;

export async function POST(req: NextRequest) {
  const body: RegisterBody = await req.json();

  if (body.password !== body.confirmPassword)
    return new NextResponse("Password and Confirm Password do not match", {
      status: 400,
    });

  const supabase = createRouteHandlerSupabaseClient({
    headers,
    cookies,
  });

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
  });

  if (error !== null) {
    console.log(error.status);
    return new NextResponse(error.message, {
      status: error.status || 500,
    });
  }

  if (user?.identities?.length === 0) {
    return new NextResponse("Email address has already been taken", {
      status: 409,
    });
  }

  return new NextResponse(JSON.stringify(user), {
    status: 200,
  });
}

// TODO: Create user in the database
