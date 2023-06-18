import { isValidSafaricomPhoneNumber } from "@/utils/helpers";
import { NextResponse } from "next/server";
import prisma from "@/utils/prismadb";

type Fields = {
  action: ShareActions;
  amount: number;
  phone: string;
  userId: string;
};

// deposit shares
export async function POST(request: Request) {
  const { action, amount, phone, userId }: Fields = await request.json();

  if (!amount || !phone) {
    return new NextResponse("Missing fields", {
      status: 400,
    });
  }

  if (!action) {
    return new NextResponse("Invalid action", {
      status: 400,
    });
  }

  if (!userId) {
    return new NextResponse("User not found", {
      status: 404,
    });
  }

  if ((action === "deposit shares" && amount < 1000) || amount > 100000) {
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

    if (
      (action === "withdraw" && amount < 100) ||
      amount > 0.6 * contribution.amount
    ) {
      return new NextResponse(
        "Amount must be between 100 and 60% of your shares",
        {
          status: 400,
        }
      );
    }

    await prisma.contributionTransaction.create({
      data: {
        id: Math.floor(Math.random() * 1000000000),
        contributionId: contribution.id,
        amount: amount,
        balance:
          action === "withdraw"
            ? contribution.amount - amount
            : contribution.amount + amount,
        type: action === "withdraw" ? "debit" : "credit",
        method: "mpesa",
      },
    });

    await prisma.contribution.update({
      where: {
        id: contribution.id,
      },
      data: {
        amount:
          action === "withdraw"
            ? contribution.amount - amount
            : contribution.amount + amount,
      },
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }

  return new NextResponse(JSON.stringify({ action, amount, phone, userId }), {
    status: 200,
  });
}
