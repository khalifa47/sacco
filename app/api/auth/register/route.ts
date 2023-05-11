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

  const { data, error } = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
  });

  if (error !== null) {
    throw new Error(`${error.message}, Name: ${error.name}`);
  }

  return new NextResponse(JSON.stringify(data), {
    status: 200,
  });
}

// TODO: Check if user exists in the database

// TODO: Create user in the database

// TODO: Send user message
