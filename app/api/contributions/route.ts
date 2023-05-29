import { NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
import type { Contribution } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let contributions: Contribution[] = [];

  let uid = searchParams.get("uid");

  if (uid === null) {
    return new NextResponse("Missing user ID", {
      status: 400,
    });
  }

  try {
    contributions = await prisma.contribution.findMany({
      where: {
        userId: uid,
      },
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }

  return new NextResponse(
    JSON.stringify({
      shares: contributions.find(
        (contribution) => contribution.type === "shares"
      ),
      welfare: contributions.find(
        (contribution) => contribution.type === "welfare"
      ),
    }),
    {
      status: 200,
    }
  );
}
