import { NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
import type { Frequency, Loan, User } from "@prisma/client";
import { calculateCreditScore } from "@/utils/credit/getCreditScore";
import { getCreditData } from "@/utils/credit/calculateCredit";

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
  riskAppetite?: number;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const uid = params.uid;
  let loans: Loan[] = [];

  try {
    loans = await prisma.loan.findMany({
      where: {
        userId: uid,
      },
      include: {
        guarantor: {
          select: {
            id: true,
            approved: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
  } catch (error: any) {
    throw new NextResponse(error.message, {
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
    riskAppetite,
  }: Fields = await request.json();

  let creditDataServer: CreditData | undefined;

  if (!amount || !purpose || !frequency || !amount_per_frequency) {
    return new NextResponse("Missing fields", {
      status: 400,
    });
  }

  if (!creditData) {
    creditDataServer = await getCreditData(uid);
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

    const getContributionAmount = async () => {
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

    const annualIncome = await getContributionAmount();

    const getLoanAmount = async () => {
      const { _sum: loanSum } = await prisma.loan.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          userId: uid,
        },
      });

      return (loanSum.amount ?? 0) + amount;
    };

    const loanAmount = await getLoanAmount();

    const predictBody = {
      data: {
        "credit.policy": 1,
        purpose: purpose,
        installment: getMonthlyInstallments() / 135,
        "log.annual.inc": Math.log(annualIncome / 135),
        dti: loanAmount / annualIncome,
        fico: calculateCreditScore(creditData ? creditData : creditDataServer!),
        "days.with.cr.line": 1290.041667, // TBD
        "revol.bal": 887, // TBD
        "revol.util": 38.6, // TBD
        "inq.last.6mths": 0,
        "delinq.2yrs": 0,
        "pub.rec": 0,
      },
    };

    const localServerURL = "http://127.0.0.1:5000";
    const otherServerURL = "https://khalifa47.pythonanywhere.com";

    const isLocalServerRunning = async () => {
      try {
        const response = await fetch(localServerURL);
        return response.ok;
      } catch (error) {
        return false;
      }
    };

    const isLocalServer = await isLocalServerRunning();

    const res = await fetch(
      `${isLocalServer ? localServerURL : otherServerURL}/predict_default`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(predictBody),
      }
    ).then((res) => res.json());

    if (res.error) {
      throw new Error(`${res.error}: Model error`);
    }

    // add to db
    const dataToAdd: any = {
      userId: uid,
      amount: amount,
      purpose: purpose,
      frequency: frequency,
      amountPerFrequency: amount_per_frequency,
      loanRisk: parseFloat(res.probability_of_default.toFixed(2)),
    };

    if (guarantor && guarantor!.id != "0") {
      dataToAdd.guarantor = {
        create: {
          userId: guarantor!.id,
        },
      };
    }

    const createdLoan = await prisma.loan.create({
      data: dataToAdd,
    });

    // TODO: send notification to guarantor

    let invRecommendations = [];

    if (purpose.toLowerCase().includes("invest")) {
      console.log("Investment loan");
      const getAverageLoanRisk = async () => {
        const { _avg: loanRiskAvg } = await prisma.loan.aggregate({
          _avg: {
            loanRisk: true,
          },
          where: {
            userId: uid,
          },
        });

        return loanRiskAvg?.loanRisk ?? 0.11;
      };

      const averageLoanRisk = await getAverageLoanRisk();

      const recommendBody = {
        data: {
          user_appetite: riskAppetite ?? 0.38,
          user_loan_amount: loanAmount,
          user_average_loan_risk: averageLoanRisk,
          user_shares_amount: annualIncome,
        },
      };

      const res = await fetch(
        `${isLocalServer ? localServerURL : otherServerURL}/predict_investment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recommendBody),
        }
      ).then((res) => res.json());

      if (res.error) {
        // throw new Error(
        //   `${res.error}: Model error. Could not recommend investments.`
        // );
        console.error(
          `${res.error}: Model error. Could not recommend investments.`
        );
      }

      invRecommendations = res.top3inv;
    }

    return new NextResponse(
      JSON.stringify({ createdLoan, invRecommendations }),
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
