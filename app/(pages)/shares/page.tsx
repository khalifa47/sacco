import Title from "@/app/(components)/layout/Title";
import DataTable from "@/app/(components)/data/DataTable";
import type { GridRowsProp } from "@mui/x-data-grid";
import dynamic from "next/dynamic";
import Divider from "@/app/(components)/layout/Divider";
import Actions from "@/app/(components)/action/Actions";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { getContributionAmount, getTransactionData } from "@/utils/fetchers";
import type { ContributionTransaction } from "@prisma/client";
import { groupTransactionsByMonth } from "@/utils/helpers";

const InfoCard = dynamic(() => import("@/app/(components)/data/InfoCard"));
const Trend = dynamic(() => import("@/app/(components)/data/Trend"));

export default async function Shares() {
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
    getTransactionData(session.user.id, undefined, "shares");

  const [{ shares }, transactions] = await Promise.all([
    contributionAmountData,
    transactionsData,
  ]);

  return (
    <main>
      <Title title="My Shares" pageTitle />
      {/* View shares */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <InfoCard content="shares" amount={shares} />
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

      {/* Shares Transactions */}
      <Title title="Shares Transactions" />
      <DataTable rows={transactions} />

      <Divider />

      <Title title="Shares Actions" />
      <Actions content="shares" />

      <div style={{ height: "200px" }}></div>
    </main>
  );
}
