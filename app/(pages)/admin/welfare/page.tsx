import Title from "@/app/(components)/layout/Title";
import DataTable from "@/app/(components)/data/DataTable";
import InfoCard from "@/app/(components)/data/InfoCard";
import Trend from "@/app/(components)/data/Trend";
import Divider from "@/app/(components)/layout/Divider";
import { getContributions, getTransactionData } from "@/utils/data/getters";
import type { TransactionPromise } from "@/types/othTypes";
import { groupTransactionsByMonth } from "@/utils/helpers";
import type { Contribution } from "@prisma/client";

type ContributionData = {
  shares: Contribution[];
  welfare: Contribution[];
};

export default async function AdminWelfare() {
  const contributionsData = getContributions() as Promise<ContributionData>;
  const transactionsData: TransactionPromise = getTransactionData(
    undefined,
    undefined,
    "welfare"
  );

  const [contributions, transactions] = await Promise.all([
    contributionsData,
    transactionsData,
  ]);

  const welfareTotal = contributions?.welfare.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  return (
    <main>
      <Title title="Admin Welfare" pageTitle />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <InfoCard content="welfare" amount={welfareTotal ?? 0} />
        <Trend
          content="welfare"
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

      {/* Admin Welfare Transactions */}
      <Title title="Admin Welfare Transactions" />
      <DataTable admin rows={transactions} />

      <div style={{ height: "200px" }}></div>
    </main>
  );
}
