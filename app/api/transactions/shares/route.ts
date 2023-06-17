import { isValidSafaricomPhoneNumber } from "@/utils/helpers";
import { NextResponse } from "next/server";
import prisma from "@/utils/prismadb";

type Fields = {
  amount: number;
  phone: string;
  userId: string;
};

// deposit shares
export async function POST(request: Request) {
  const { amount, phone, userId }: Fields = await request.json();

  if (!amount || !phone) {
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

  try {
    const contribution = await prisma.contribution.findFirstOrThrow({
      where: {
        userId: userId,
        type: "shares",
      },
    });

    await prisma.contributionTransaction.create({
      data: {
        id: Math.floor(Math.random() * 1000000000),
        contributionId: contribution.id,
        amount: amount,
        balance: contribution.amount + amount,
        type: "credit",
        method: "mpesa",
      },
    });

    await prisma.contribution.update({
      where: {
        id: contribution.id,
      },
      data: {
        amount: contribution.amount + amount,
      },
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }

  return new NextResponse(JSON.stringify({ amount, phone, userId }), {
    status: 200,
  });
}
