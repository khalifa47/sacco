import DataTable from "@/app/(components)/data/DataTable";
import Title from "@/app/(components)/layout/Title";
import { getTransactionData } from "@/utils/data/getters";

export default async function AdminTransactions() {
  const transactions = await getTransactionData();
  return (
    <main>
      <Title title="Admin Transactions" pageTitle />
      <DataTable rows={transactions} />
    </main>
  );
}
