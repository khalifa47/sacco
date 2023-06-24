import Title from "@/app/(components)/layout/Title";
import DataTable from "@/app/(components)/data/DataTable";
import dynamic from "next/dynamic";
import Divider from "@/app/(components)/layout/Divider";
import { getContributions, getTransactionData } from "@/utils/data/getters";
import type { TransactionPromise } from "@/types/othTypes";
import { groupTransactionsByMonth } from "@/utils/helpers";
import type { Contribution } from "@prisma/client";

type ContributionData = {
  shares: Contribution[];
  welfare: Contribution[];
};

const InfoCard = dynamic(() => import("@/app/(components)/data/InfoCard"));
const Trend = dynamic(() => import("@/app/(components)/data/Trend"));

export default async function AdminShares() {
  const contributionsData = getContributions() as Promise<ContributionData>;
  const transactionsData: TransactionPromise = getTransactionData(
    undefined,
    undefined,
    "shares"
  );

  const [contributions, transactions] = await Promise.all([
    contributionsData,
    transactionsData,
  ]);

  const sharesTotal = contributions?.shares.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  return (
    <main>
      <Title title="Admin Shares" pageTitle />

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <InfoCard content="shares" amount={sharesTotal ?? 0} />
        <Trend
          content="shares"
          labels={[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]}
          datasets={[
            {
              data: groupTransactionsByMonth(transactions),
            },
          ]}
        />
      </div>
      <Divider />

      {/* Admin Shares Transactions */}
      <Title title="Admin Shares Transactions" />
      <DataTable admin rows={transactions} />

      <div style={{ height: "200px" }}></div>
    </main>
  );
}
