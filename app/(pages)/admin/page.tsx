import Title from "@/app/(components)/layout/Title";
import dynamic from "next/dynamic";
import Divider from "@/app/(components)/layout/Divider";
import SummaryTable from "@/app/(components)/data/SummaryTable";
import { users } from "@/utils/data";
import {
  getContributions,
  getLoans,
  getTransactionData,
} from "@/utils/data/getters";
import type { Contribution } from "@prisma/client";

type ContributionData = {
  shares: Contribution[];
  welfare: Contribution[];
};

const InfoCard = dynamic(() => import("@/app/(components)/data/InfoCard"));

export default async function Admin() {
  const contributionsData = getContributions() as Promise<ContributionData>;
  const loansData = getLoans();
  const transactionsData = getTransactionData(undefined, 5);

  const [contributions, loans, transactions] = await Promise.all([
    contributionsData,
    loansData,
    transactionsData,
  ]);

  const sharesTotal = contributions?.shares.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const welfareTotal = contributions?.welfare.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  return (
    <main>
      <Title title="Admin Dashboard" pageTitle />

      {/* Accounts Summary */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          columnGap: 0,
          rowGap: "15px",
        }}
      >
        <InfoCard admin content="balance" amount={2000000000} />
        <InfoCard admin content="shares" amount={sharesTotal} />
        <InfoCard admin content="loans" amount={loans.amount} />
        <InfoCard admin content="welfare" amount={welfareTotal} />
      </div>

      <Divider />

      {/* User Summary */}
      <Title title="Recent Users" />
      <SummaryTable admin rows={users} />

      <Divider />
      {/* Transactions Summary */}
      <Title title="Recent Transactions" />
      <SummaryTable admin rows={transactions} />
    </main>
  );
}

// TODO: User API routes and finish up admin dashboard
