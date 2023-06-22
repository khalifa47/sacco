import { NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
import type { Contribution } from "@prisma/client";

export async function GET(request: Request) {
  let contributions: Contribution[] = [];

  try {
    contributions = await prisma.contribution.findMany();
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }

  return new NextResponse(
    JSON.stringify({
      shares: contributions.filter(
        (contribution) => contribution.type === "shares"
      ),
      welfare: contributions.filter(
        (contribution) => contribution.type === "welfare"
      ),
    }),
    {
      status: 200,
    }
  );
}
