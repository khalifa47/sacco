import Title from "@/app/(components)/layout/Title";
import DataTable from "@/app/(components)/data/DataTable";
import InfoCard from "@/app/(components)/data/InfoCard";
import Trend from "@/app/(components)/data/Trend";
import Divider from "@/app/(components)/layout/Divider";
import Actions from "@/app/(components)/action/Actions";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { getLoans, getTransactionData, getUsers } from "@/utils/data/getters";
import { groupTransactionsByMonth } from "@/utils/helpers";
import type { TransactionPromise } from "@/types/othTypes";

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

  const loansData = getLoans(session.user.id);
  const transactionsData: TransactionPromise = getTransactionData(
    session.user.id,
    undefined,
    "loans"
  );
  const usersData = getUsers();

  const [loans, transactions, users] = await Promise.all([
    loansData,
    transactionsData,
    usersData,
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
        <InfoCard content="loans" amount={loans.amount} />
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
      <Actions
        content="loans"
        phone={session.user.user_metadata.phone || ""}
        loans={loans.loans}
        users={users}
        settings={{
          frequency: "monthly",
          amount: 10000,
        }}
      />

      <div style={{ height: "200px" }}></div>
    </main>
  );
}
