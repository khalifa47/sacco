import { NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
import type { Contribution } from "@prisma/client";

type Params = {
  uid: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const uid = params.uid;
  let contributions: Contribution[] = [];

  try {
    contributions = await prisma.contribution.findMany({
      where: {
        userId: uid,
      },
    });

    if (!contributions) {
      throw new Error("No contributions found");
    }
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
