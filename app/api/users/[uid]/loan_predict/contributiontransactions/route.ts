import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

type Params = {
  uid: string;
};

async function getCreditUtilization(userId: string) {
  const creditAmount = await prisma.contributionTransaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      contribution: {
        userId,
        type: "shares",
      },
      type: "credit",
    },
  });

  const debitAmount = await prisma.contributionTransaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      contribution: {
        userId,
        type: "shares",
      },
      type: "debit",
    },
  });

  const creditUtilization =
    (debitAmount._sum.amount ?? 1) / (creditAmount._sum.amount ?? 1);

  return { creditUtilization: creditUtilization };
}

async function getCreditHistoryMonths(userId: string) {
  const earliestCreditTransaction: any = await prisma.$queryRaw`
        SELECT MIN(created_at) as earliest_date
        FROM contribution_transactions
        WHERE contribution_id IN (
            SELECT id
            FROM contributions
            WHERE user_id = ${userId}
            AND type = 'shares'
        )
      `;

  if (earliestCreditTransaction[0]?.earliest_date) {
    const currentDate = new Date();
    const earliestDate = new Date(earliestCreditTransaction[0].earliest_date);
    const monthsDifference =
      (currentDate.getFullYear() - earliestDate.getFullYear()) * 12 +
      currentDate.getMonth() -
      earliestDate.getMonth();
    return { creditHistoryMonths: monthsDifference };
  }

  return { creditHistoryMonths: 0 };
}

async function getNumNewCredits(userId: string) {
  const numNewCredits = await prisma.contributionTransaction.count({
    where: {
      contribution: {
        userId,
        type: "shares",
      },
      createdAt: {
        gt: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), // Filter for transactions in the last year
      },
    },
  });

  return { numNewCredits };
}

export async function GET(request: Request, { params }: { params: Params }) {
  const uid = params.uid;

  try {
    const { creditUtilization } = await getCreditUtilization(uid);
    const { creditHistoryMonths } = await getCreditHistoryMonths(uid);
    const { numNewCredits } = await getNumNewCredits(uid);

    return new NextResponse(
      JSON.stringify({ creditUtilization, creditHistoryMonths, numNewCredits }),
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
