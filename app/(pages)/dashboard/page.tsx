import dynamic from "next/dynamic";
import Title from "@/app/(components)/layout/Title";
import Divider from "@/app/(components)/layout/Divider";
import SummaryTable from "@/app/(components)/data/SummaryTable";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { ContributionTransaction, Loan } from "@prisma/client";

const getTransactionData = async (
  uid: string,
  limit?: number,
  content?: Content
) => {
  let res: Response;
  let transactions: ContributionTransaction[] = [];

  try {
    res = await fetch(
      `http://localhost:3000/api/transactions?uid=${uid}&limit=${limit}&content=${content}`,
      { headers: headers(), next: { revalidate: 60 } }
    );
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg === "" ? res.statusText : msg);
    }

    transactions = await res.json();
  } catch (error: any) {
    console.error(error);
  }

  return transactions;
};

const getLoanAmount = async (uid: string) => {
  let res: Response;
  let loans: Loan[] = [];

  try {
    res = await fetch(`http://localhost:3000/api/loans?uid=${uid}`, {
      headers: headers(),
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg === "" ? res.statusText : msg);
    }

    loans = await res.json();
  } catch (error: any) {
    console.error(error);
  }

  return loans.reduce((acc, loan) => acc + loan.amount, 0);
};

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

  const loanAmountData = getLoanAmount(session.user.id);
  const transactionsData = getTransactionData(session.user.id);

  const [loanAmount, transactions] = await Promise.all([
    loanAmountData,
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
        <InfoCard content="shares" amount={20000000} />
        <InfoCard content="loans" amount={loanAmount} />
        <InfoCard content="welfare" amount={20000} />
      </div>
      <Divider />
      <Title title="Recent Transactions" />
      <SummaryTable rows={transactions} />
    </main>
  );
}
