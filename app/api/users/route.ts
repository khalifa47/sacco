import { NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
import type { User } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let users: User[] = [];

  let limit = searchParams.get("limit");

  if (limit === null || isNaN(parseInt(limit))) {
    limit = null;
  }

  try {
    users = await prisma.user.findMany({
      take: limit ? parseInt(limit) : undefined,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }

  return new NextResponse(JSON.stringify(users), {
    status: 200,
  });
}
