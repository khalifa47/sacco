import { NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
import type { Loan } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let loans: Loan[] = [];

  let uid = searchParams.get("uid");

  if (uid === null) {
    return new NextResponse("Missing user ID", {
      status: 400,
    });
  }

  try {
    loans = await prisma.loan.findMany({
      where: {
        userId: uid,
      },
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }

  return new NextResponse(JSON.stringify(loans), {
    status: 200,
  });
}
