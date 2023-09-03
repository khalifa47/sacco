import Title from "@/app/(components)/layout/Title";
import DataTable from "@/app/(components)/data/DataTable";
import dynamic from "next/dynamic";
import Divider from "@/app/(components)/layout/Divider";
import Actions from "@/app/(components)/action/Actions";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { getContributions, getTransactionData } from "@/utils/data/getters";
import type { TransactionPromise } from "@/types/othTypes";
import { groupTransactionsByMonth } from "@/utils/helpers";
import type { Contribution } from "@prisma/client";

type ContributionData = {
  shares: Contribution;
  welfare: Contribution;
};
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

  const contributionsData = getContributions(
    session.user.id
  ) as Promise<ContributionData>;
  const transactionsData: TransactionPromise = getTransactionData(
    session.user.id,
    undefined,
    "shares"
  );

  const [contributions, transactions] = await Promise.all([
    contributionsData,
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
        <InfoCard content="shares" amount={contributions.shares.amount ?? 0} />
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
      <Actions
        content="shares"
        phone={session.user.user_metadata.phone || ""}
        loans={[]}
        settings={{
          frequency: contributions?.shares.frequency ?? "monthly",
          amount: contributions?.shares.amountPerFrequency ?? 10000,
        }}
      />

      <div style={{ height: "200px" }}></div>
    </main>
  );
}
