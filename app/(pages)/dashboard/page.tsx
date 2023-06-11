import dynamic from "next/dynamic";
import Title from "@/app/(components)/layout/Title";
import Divider from "@/app/(components)/layout/Divider";
import SummaryTable from "@/app/(components)/data/SummaryTable";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import {
  getContributions,
  getLoans,
  getTransactionData,
} from "@/utils/fetchers";

const InfoCard = dynamic(() => import("@/app/(components)/data/InfoCard"));

export default async function Dashboard() {
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

  const contributionsData = getContributions(session.user.id);
  const loansData = getLoans(session.user.id);
  const transactionsData = getTransactionData(session.user.id, 5);

  const [contributions, loans, transactions] = await Promise.all([
    contributionsData,
    loansData,
    transactionsData,
  ]);

  return (
    <main>
      <Title title="My Dashboard" pageTitle />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          columnGap: 0,
          rowGap: "15px",
        }}
      >
        <InfoCard content="shares" amount={contributions?.shares.amount ?? 0} />
        <InfoCard content="loans" amount={loans.amount} />
        <InfoCard
          content="welfare"
          amount={contributions?.welfare.amount ?? 0}
        />
      </div>
      <Divider />
      <Title title="Recent Transactions" />
      <SummaryTable rows={transactions} />
    </main>
  );
}

// TODO: Think about migrating to Tailwind because that's the only way you can make Suspense work => server components
