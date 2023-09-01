import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

type Params = {
  uid: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const uid = params.uid;

  try {
    const successfulLoanRepayments = await prisma.loanTransaction.count({
      where: {
        loan: {
          userId: uid,
          status: "approved",
        },
        type: "debit",
      },
    });

    const totalLoanRepayments = await prisma.loanTransaction.count({
      where: {
        loan: {
          userId: uid,
          status: "approved",
        },
      },
    });
    return new NextResponse(
      JSON.stringify({ successfulLoanRepayments, totalLoanRepayments }),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
