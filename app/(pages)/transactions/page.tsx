import Title from "@/app/(components)/layout/Title";
import DataTable from "@/app/(components)/data/DataTable";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { getTransactionData } from "@/utils/data/getters";

export default async function Transactions() {
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

  const transactions = await getTransactionData(session.user.id);

  return (
    <main>
      <Title title="My Transactions" pageTitle />
      <DataTable rows={transactions} />
    </main>
  );
}
