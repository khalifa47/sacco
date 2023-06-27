import { NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
import type { Role, User, UserStatus } from "@prisma/client";
import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

type Params = {
  uid: string;
};

type Fields = {
  firstName: string;
  otherNames: string;
  lastName: string;
  role: Role;
  status: UserStatus;
  admin: boolean;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const uid = params.uid;
  let user: User | null = null;

  try {
    user = await prisma.user.findUniqueOrThrow({
      where: {
        id: uid,
      },
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: error.code === "P2025" ? 404 : 500,
    });
  }

  return new NextResponse(JSON.stringify(user), {
    status: 200,
  });
}

export async function PATCH(request: Request, { params }: { params: Params }) {
  const uid = params.uid;
  const { firstName, otherNames, lastName, role, status, admin }: Fields =
    await request.json();

  const supabase = createRouteHandlerSupabaseClient({
    headers,
    cookies,
  });
  try {
    await prisma.user
      .update({
        where: {
          id: uid,
        },
        data: {
          firstName,
          otherNames,
          lastName,
          role,
          status,
        },
      })
      .then(() => {
        if (admin) {
          supabase.auth.admin.updateUserById(uid, {
            user_metadata: {
              firstName,
              otherNames,
              lastName,
            },
          });
        } else {
          supabase.auth.updateUser({
            data: {
              firstName,
              otherNames,
              lastName,
            },
          });
        }
      });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: error.code === "P2025" ? 404 : 500,
    });
  }

  return new NextResponse(JSON.stringify("User updated successfully"), {
    status: 200,
  });
}
