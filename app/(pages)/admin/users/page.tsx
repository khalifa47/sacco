import DataTable from "@/app/(components)/data/DataTable";
import Title from "@/app/(components)/layout/Title";
import { getUsers } from "@/utils/data/getters";

export default async function AdminUsers() {
  const users = await getUsers();
  return (
    <main>
      <Title title="Admin Users" pageTitle />
      <DataTable admin rows={users} />
    </main>
  );
}
