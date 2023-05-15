import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { type NextRequest, NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import prisma from "@/utils/prismadb";
import { Prisma } from "@prisma/client";

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
    return new NextResponse(error.message, {
      status: error.status || 500,
    });
  }

  try {
    await prisma.user.create({
      data: {
        id: user?.id as string,
        nationalId: body.nationalId,
        email: body.email,
        phone: body.phone,
        firstName: body.firstName,
        lastName: body.lastName,
        otherNames: body.otherNames,
        contributions: {
          createMany: {
            data: [
              {
                amount: 0,
                frequency: "monthly",
                amountPerFrequency: 0,
                type: "shares",
              },
              {
                amount: 0,
                frequency: "monthly",
                amountPerFrequency: 0,
                type: "welfare",
              },
            ],
          },
        },
      },
    });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return new NextResponse("User already exists", {
          status: 409,
        });
      }

      return new NextResponse(error.message, {
        status: 400,
      });
    }

    return new NextResponse(error.message, {
      status: 500,
    });
  }

  return new NextResponse(JSON.stringify(user), {
    status: 200,
  });
}
