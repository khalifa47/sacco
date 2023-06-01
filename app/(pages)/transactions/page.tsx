import Title from "@/app/(components)/layout/Title";
import DataTable from "@/app/(components)/data/DataTable";
import type { GridRowsProp } from "@mui/x-data-grid/models";

export default function Transactions() {
  return (
    <main>
      <Title title="My Transactions" pageTitle />
      <DataTable rows={[]} />
    </main>
  );
}
