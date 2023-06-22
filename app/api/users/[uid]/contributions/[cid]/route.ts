import { isValidSafaricomPhoneNumber } from "@/utils/helpers";
import { NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
import { getContributions } from "@/utils/data/getters";
import { updateContribution } from "@/utils/data/patchers";

type Params = {
  uid: string;
  cid: string;
};

type Fields = {
  action: "deposit shares" | "withdraw" | "transfer" | "deposit welfare";
  amount: number;
  phone: string;
};

// TODO: maybe split into separate routes: GET, POST, PATCH

const getContributionAmount = async (uid: string, cid?: number) => {
  const contributionAmount: number | undefined = await getContributions(
    uid
  ).then((data) => {
    if (!cid) return data?.shares.amount;
    else
      return data?.shares.id === cid
        ? data.shares.amount
        : data?.welfare.amount;
  });

  if (!contributionAmount) {
    throw new Error("Contribution not found");
  }

  return contributionAmount;
};

export async function POST(request: Request, { params }: { params: Params }) {
  const uid = params.uid;
  const cid = parseInt(params.cid);
  const { action, amount, phone }: Fields = await request.json();

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

  if (action.startsWith("deposit") && (amount < 1000 || amount > 100000)) {
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
    const contributionAmount = await getContributionAmount(uid, cid);

    if (!contributionAmount) {
      throw new Error("Contribution not found");
    }

    if (
      action === "withdraw" &&
      (amount < 100 || amount > 0.6 * contributionAmount)
    ) {
      throw new NextResponse(
        "Amount must be between 100 and 60% of your shares",
        { status: 400 }
      );
    }
    await prisma.contributionTransaction.create({
      data: {
        id: Math.floor(Math.random() * 1000000000),
        contributionId: cid,
        amount: amount,
        balance:
          action === "withdraw"
            ? contributionAmount - amount
            : contributionAmount + amount,
        type: action === "withdraw" ? "debit" : "credit",
        method: "mpesa",
      },
    });

    await updateContribution(action, amount, uid, cid);
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }

  return new NextResponse(JSON.stringify({ action, amount, phone, cid }), {
    status: 200,
  });
}

export async function PATCH(request: Request, { params }: { params: Params }) {
  const uid = params.uid;
  const cid = parseInt(params.cid);
  const { action, amount }: Fields = await request.json();

  if (!amount || !action) {
    return new NextResponse("Missing fields", {
      status: 400,
    });
  }

  try {
    const contributionAmount = await getContributionAmount(uid, cid);
    if (amount > contributionAmount) {
      throw new NextResponse("Amount must be less than your shares", {
        status: 400,
      });
    }

    if (action === "transfer") {
      const { searchParams } = new URL(request.url);
      const transferChoice = searchParams.get(
        "transferchoice"
      ) as TransferChoice;
      const toId = searchParams.get("toid");

      if (transferChoice === "other shares") {
        if (!toId || toId.length !== 8) {
          return new NextResponse("Invalid ID", {
            status: 400,
          });
        }

        const toUserId = await prisma.user
          .findUniqueOrThrow({
            where: {
              nationalId: toId,
            },
            select: {
              id: true,
            },
          })
          .then((data) => data.id);

        if (toUserId === uid) {
          return new NextResponse("You cannot transfer to yourself", {
            status: 400,
          });
        }

        const toContributions = await getContributions(toUserId);
        if (!toContributions?.shares) throw new Error("Shares not found");

        await prisma.contribution.update({
          where: {
            id: cid,
          },
          data: {
            amount: contributionAmount - amount,
          },
        });
        await prisma.contribution.update({
          where: {
            id: toContributions.shares.id,
          },
          data: {
            amount: toContributions.shares.amount + amount,
          },
        });
      } else {
        const contributions = await getContributions(uid);
        if (!contributions?.welfare) throw new Error("Welfare not found");

        await prisma.contribution.update({
          where: {
            id: cid,
          },
          data: {
            amount: contributionAmount - amount,
          },
        });
        await prisma.contribution.update({
          where: {
            id: contributions.welfare.id,
          },
          data: {
            amount: contributions.welfare.amount + amount,
          },
        });
      }
    } else {
      await prisma.contribution.update({
        where: {
          id: cid,
        },
        data: {
          amount:
            action === "withdraw"
              ? contributionAmount - amount
              : contributionAmount + amount,
        },
      });
    }
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }

  return new NextResponse(JSON.stringify(`Update Successful: ${cid}`), {
    status: 200,
  });
}
