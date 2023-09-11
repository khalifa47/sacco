import type { PaymentMethod } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
import { getLoan } from "@/utils/data/getters";
import { isValidSafaricomPhoneNumber } from "@/utils/helpers";

type Params = {
  uid: string;
  lid: string;
};

type Fields = {
  amount: number;
  phone: string;
  method: PaymentMethod;
};

// creating loan transactions
export async function POST(request: Request, { params }: { params: Params }) {
  const uid = params.uid;
  const lid = parseInt(params.lid);

  const { amount, phone, method }: Fields = await request.json();

  if (!amount || !phone || !method) {
    return new NextResponse("Missing fields", {
      status: 400,
    });
  }

  if (amount < 1000 || amount > 100000) {
    return new NextResponse("Amount must be between 1000 and 100000", {
      status: 400,
    });
  }

  if (!isValidSafaricomPhoneNumber(phone)) {
    return new NextResponse("Invalid phone number", {
      status: 400,
    });
  }

  const loan = await getLoan(lid);

  if (!loan) {
    return new NextResponse("Server: Loan not found", {
      status: 404,
    });
  }

  const invalidStatuses = ["approved", "disbursed"];

  if (!invalidStatuses.includes(loan.status)) {
    return new NextResponse("No loan eligible for repayment", {
      status: 400,
    });
  }

  if (amount > loan.amount) {
    return new NextResponse("Amount exceeds loan amount", {
      status: 400,
    });
  }

  try {
    const loanTransaction = await prisma.loanTransaction.create({
      data: {
        id: Math.floor(Math.random() * 1000000000),
        loanId: lid,
        amount: amount,
        balance: loan.amount - amount,
        type: "debit",
        method: method,
      },
    });

    return new NextResponse(JSON.stringify(loanTransaction), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
