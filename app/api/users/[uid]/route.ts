import { NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
import type { User } from "@prisma/client";

type Params = {
  uid: string;
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
