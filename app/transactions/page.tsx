import Title from "@/app/components/Title";
import TransactionsTable from "@/app/components/TransactionsTable";
import { createData } from "@/utils/helpers";
import type { GridRowsProp } from "@mui/x-data-grid/models";

const rows: GridRowsProp = [
  createData("281936183", 200000, 200000, "shares", "2004-10-19 10:23:54"),
  createData("282936183", 200000, 200000, "shares", "2004-10-19 10:23:54"),
  createData("283936183", 200000, 200000, "shares", "2004-10-19 10:23:54"),
  createData("284936183", 200000, 200000, "shares", "2004-10-19 10:23:54"),
  createData("285936183", 200000, 200000, "shares", "2004-10-19 10:23:54"),
];

export default function Transactions() {
  return (
    <main>
      <Title title="My Transactions" pageTitle />
      <TransactionsTable rows={rows} content="all" />
    </main>
  );
}
