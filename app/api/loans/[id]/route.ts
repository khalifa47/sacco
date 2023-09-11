import type { Loan, LoanStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { getLoan } from "@/utils/data/getters";
import prisma from "@/utils/prismadb";

type Params = {
  id: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  let loan: Loan;
  const lid = parseInt(params.id);

  try {
    loan = await prisma.loan.findUniqueOrThrow({
      where: {
        id: lid,
      },
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: error.code == "P2025" ? 404 : 500,
    });
  }

  return new NextResponse(JSON.stringify(loan), {
    status: 200,
  });
}

export async function PATCH(request: Request, { params }: { params: Params }) {
  const lid = parseInt(params.id);
  const { status }: { status: LoanStatus } = await request.json();

  if (!status) {
    return new NextResponse("Invalid status", {
      status: 400,
    });
  }

  const loan = await getLoan(lid);

  if (!loan) {
    return new NextResponse("Loan not found", {
      status: 404,
    });
  }

  if (loan.status === status) {
    return new NextResponse("Loan already has that status", {
      status: 400,
    });
  }

  const newLoan = await prisma.loan.update({
    where: {
      id: lid,
    },
    data: {
      status,
    },
  });

  if (newLoan.status === "approved") {
    await prisma.loanTransaction.create({
      data: {
        id: Math.floor(Math.random() * 1000000000),
        loanId: lid,
        amount: newLoan.amount,
        balance: newLoan.amount,
        type: "credit",
        method: "mpesa",
      },
    });
  }

  return new NextResponse(JSON.stringify(newLoan), {
    status: 200,
  });
}
