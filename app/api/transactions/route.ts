import { NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
import type { ContributionTransaction, LoanTransaction } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let transactions: ContributionTransaction[] | LoanTransaction[] = [];

  const uid = searchParams.get("uid");
  const content = searchParams.get("content");
  let limit = searchParams.get("limit");

  if (uid === null) {
    return new NextResponse("Missing user ID", {
      status: 400,
    });
  }

  if (limit === null || isNaN(parseInt(limit))) {
    limit = null;
  }

  try {
    switch (content) {
      case "shares":
        transactions = await prisma.contributionTransaction.findMany({
          take: limit ? parseInt(limit) : undefined,
          where: {
            contribution: {
              type: "shares",
              userId: uid,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        break;
      case "loans":
        transactions = await prisma.loanTransaction.findMany({
          take: limit ? parseInt(limit) : undefined,
          where: {
            loan: {
              userId: uid,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        break;
      case "welfare":
        transactions = await prisma.contributionTransaction.findMany({
          take: limit ? parseInt(limit) : undefined,
          where: {
            contribution: {
              type: "shares",
              userId: uid,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        break;
      default:
        transactions = await prisma.contributionTransaction.findMany({
          take: limit ? parseInt(limit) : undefined,
          where: {
            contribution: {
              userId: uid,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        break;
    }
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }

  return new NextResponse(JSON.stringify(transactions), {
    status: 200,
  });
}

// TODO: Handle all transaction requests
