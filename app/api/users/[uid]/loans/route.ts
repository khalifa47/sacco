import { NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
import type { Frequency, Loan, User } from "@prisma/client";
import { calculateCreditScore } from "@/utils/credit/getCreditScore";

type Params = {
  uid: string;
};

type Fields = {
  creditData: CreditData;
  amount: number;
  purpose: string;
  frequency: Frequency;
  amount_per_frequency: number;
  guarantor?: User;
};

export async function GET({ params }: { params: Params }) {
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

export async function POST(request: Request, { params }: { params: Params }) {
  const uid = params.uid;

  const {
    amount,
    purpose,
    frequency,
    amount_per_frequency,
    guarantor,
    creditData,
  }: Fields = await request.json();

  if (!amount || !purpose || !frequency || !amount_per_frequency) {
    return new NextResponse("Missing fields", {
      status: 400,
    });
  }

  try {
    // ML model for risk
    const getMonthlyInstallments = () => {
      switch (frequency) {
        case "weekly":
          return amount_per_frequency * 4;
        case "monthly":
          return amount_per_frequency;
        case "quarterly":
          return amount_per_frequency / 3;
        case "yearly":
          return amount_per_frequency / 12;
      }
    };

    const getAnnualIncome = async () => {
      const { _sum: contributionSum } = await prisma.contribution.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          userId: uid,
        },
      });

      return contributionSum.amount ?? 0;
    };

    const annualIncome = await getAnnualIncome();

    const getDti = async () => {
      const { _sum: loanSum } = await prisma.loan.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          userId: uid,
        },
      });

      return (loanSum.amount ?? 0) / annualIncome;
    };

    const dti = await getDti();

    const predictBody = {
      data: {
        "credit.policy": 1,
        purpose: purpose,
        installment: getMonthlyInstallments() / 135,
        "log.annual.inc": Math.log(annualIncome / 135),
        dti: dti,
        fico: calculateCreditScore(creditData),
        "days.with.cr.line": 1290.041667, // TBD
        "revol.bal": 887, // TBD
        "revol.util": 38.6, // TBD
        "inq.last.6mths": 0,
        "delinq.2yrs": 0,
        "pub.rec": 0,
      },
    };

    const predict_default_res = await fetch(
      "http://127.0.0.1:5000/predict_default",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(predictBody),
      }
    ).then((res) => res.json());

    return new NextResponse(JSON.stringify(predict_default_res), {
      status: 200,
    });

    // add to db
    // const createdLoan = await prisma.loan.create({
    //   data: {
    //     userId: uid,
    //     amount: amount,
    //     purpose: purpose,
    //     frequency: frequency,
    //     amountPerFrequency: amount_per_frequency,
    //     loanRisk: probability_of_default.toFixed(2),
    //     guarantor: guarantor
    //       ? {
    //           create: {
    //             userId: guarantor.id,
    //           },
    //         }
    //       : undefined,
    //   },
    // });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
