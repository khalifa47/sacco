import Title from "@/app/(components)/layout/Title";
import DataTable from "@/app/(components)/data/DataTable";
import dynamic from "next/dynamic";
import { headers, cookies } from "next/headers";
import Divider from "@/app/(components)/layout/Divider";
import Actions from "@/app/(components)/action/Actions";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { getContributions, getTransactionData } from "@/utils/data/getters";
import { groupTransactionsByMonth } from "@/utils/helpers";
import type { TransactionPromise } from "@/types/othTypes";
import type { Contribution } from "@prisma/client";

type ContributionData = {
  shares: Contribution;
  welfare: Contribution;
};

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

  const contributionsData = getContributions(
    session.user.id
  ) as Promise<ContributionData>;
  const transactionsData: TransactionPromise = getTransactionData(
    session.user.id,
    undefined,
    "welfare"
  );

  const [contributions, transactions] = await Promise.all([
    contributionsData,
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
        <InfoCard
          content="welfare"
          amount={contributions?.welfare.amount ?? 0}
        />
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
      <Actions
        content="welfare"
        phone={session.user.user_metadata.phone || ""}
        settings={{
          frequency: contributions?.welfare.frequency ?? "monthly",
          amount: contributions?.welfare.amountPerFrequency ?? 10000,
        }}
      />

      <div style={{ height: "200px" }}></div>
    </main>
  );
}
