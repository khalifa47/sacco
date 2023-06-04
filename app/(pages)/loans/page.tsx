import Title from "@/app/(components)/layout/Title";
import DataTable from "@/app/(components)/data/DataTable";
import type { GridRowsProp } from "@mui/x-data-grid";
import dynamic from "next/dynamic";
import Divider from "@/app/(components)/layout/Divider";
import Actions from "@/app/(components)/action/Actions";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { getLoanAmount, getTransactionData } from "@/utils/fetchers";
import type { LoanTransaction } from "@prisma/client";
import { groupTransactionsByMonth } from "@/utils/helpers";
import type { TransactionPromise } from "@/types/othTypes";

const InfoCard = dynamic(() => import("@/app/(components)/data/InfoCard"));
const Trend = dynamic(() => import("@/app/(components)/data/Trend"));

export default async function Loans() {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session === null) {
    throw new Error("User not authenticated");
  }

  const loanAmountData = getLoanAmount(session.user.id);
  const transactionsData: TransactionPromise = getTransactionData(
    session.user.id,
    undefined,
    "loans"
  );

  const [loanAmount, transactions] = await Promise.all([
    loanAmountData,
    transactionsData,
  ]);

  return (
    <main>
      <Title title="My Loans" pageTitle />
      {/* View loans */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <InfoCard content="loans" amount={loanAmount} />
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

      {/* Loans Transactions */}
      <Title title="Loans Transactions" />
      <DataTable rows={transactions} />

      <Divider />

      <Title title="Loans Actions" />
      <Actions content="loans" />

      <div style={{ height: "200px" }}></div>
    </main>
  );
}
