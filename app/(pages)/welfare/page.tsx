import Title from "@/app/(components)/layout/Title";
import DataTable from "@/app/(components)/data/DataTable";
import type { GridRowsProp } from "@mui/x-data-grid";
import dynamic from "next/dynamic";
import { headers, cookies } from "next/headers";
import Divider from "@/app/(components)/layout/Divider";
import Actions from "@/app/(components)/action/Actions";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { getContributionAmount, getTransactionData } from "@/utils/fetchers";
import { ContributionTransaction } from "@prisma/client";
import { groupTransactionsByMonth } from "@/utils/helpers";

const InfoCard = dynamic(() => import("@/app/(components)/data/InfoCard"));
const Trend = dynamic(() => import("@/app/(components)/data/Trend"));

export default async function Welfare() {
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

  const contributionAmountData = getContributionAmount(session.user.id);
  const transactionsData: Promise<GridRowsProp<ContributionTransaction>> =
    getTransactionData(session.user.id, undefined, "welfare");

  const [{ welfare }, transactions] = await Promise.all([
    contributionAmountData,
    transactionsData,
  ]);

  return (
    <main>
      <Title title="My Welfare" pageTitle />
      {/* View welfare */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <InfoCard content="welfare" amount={welfare} />
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

      {/* Welfare Transactions */}
      <Title title="Welfare Transactions" />
      <DataTable rows={transactions} />

      <Divider />

      <Title title="Welfare Actions" />
      <Actions content="welfare" />

      <div style={{ height: "200px" }}></div>
    </main>
  );
}
