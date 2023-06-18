import { NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
import type { Loan } from "@prisma/client";

type Params = {
  uid: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const uid = params.uid;
  let loans: Loan[] = [];

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
