import { NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
import type { Loan } from "@prisma/client";

export async function GET(request: Request) {
  let loans: Loan[] = [];

  try {
    loans = await prisma.loan.findMany();
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }

  return new NextResponse(JSON.stringify(loans), {
    status: 200,
  });
}
