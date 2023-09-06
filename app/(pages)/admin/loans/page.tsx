import Title from "@/app/(components)/layout/Title";
import DataTable from "@/app/(components)/data/DataTable";
import dynamic from "next/dynamic";
import Divider from "@/app/(components)/layout/Divider";
import { getLoans, getTransactionData } from "@/utils/data/getters";
import type { TransactionPromise } from "@/types/othTypes";
import { groupTransactionsByMonth } from "@/utils/helpers";

const InfoCard = dynamic(() => import("@/app/(components)/data/InfoCard"));
const Trend = dynamic(() => import("@/app/(components)/data/Trend"));

export default async function AdminLoans() {
  const loansData = getLoans();
  const transactionsData: TransactionPromise = getTransactionData(
    undefined,
    undefined,
    "loans"
  );

  const [loans, transactions] = await Promise.all([
    loansData,
    transactionsData,
  ]);

  return (
    <main>
      <Title title="Admin Loans" pageTitle />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <InfoCard content="loans" amount={loans.amount ?? 0} />
        <Trend
          content="loans"
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

      {/* Admin Loans Transactions */}
      <Title title="Admin Loans Transactions" />
      <DataTable admin rows={transactions} />

      {/* Admin Loan History */}
      <Title title="Loan History" />
      <DataTable admin rows={loans.loans} />

      <div style={{ height: "200px" }}></div>
    </main>
  );
}
