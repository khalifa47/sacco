import { NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
import type { User } from "@prisma/client";

export async function GET(request: Request) {
  let users: User[] = [];

  try {
    users = await prisma.user.findMany();
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }

  return new NextResponse(JSON.stringify(users), {
    status: 200,
  });
}
