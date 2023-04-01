import Title from "@/app/components/Title";
import TransactionsTable from "@/app/components/TransactionsTable";
import { createData } from "@/utils/helpers";
import type { GridRowsProp } from "@mui/x-data-grid/models";

const rows: GridRowsProp = [
  createData("281936183", 200000, 200000, "shares", "2004-10-19 10:13:54"),
  createData("282936183", 200000, 200000, "shares", "2004-10-19 10:03:54"),
  createData("283936183", 200000, 200000, "shares", "2004-10-19 00:23:54"),
  createData("284936183", 200000, 200000, "shares", "2004-10-19 11:23:54"),
  createData("285936183", 200000, 200000, "shares", "2004-10-19 23:23:54"),
  createData("381936183", 200000, 200000, "shares", "2004-10-19 10:13:54"),
  createData("482936183", 200000, 200000, "shares", "2004-10-19 10:03:54"),
  createData("583936183", 200000, 200000, "shares", "2004-10-19 00:23:54"),
  createData("684936183", 200000, 200000, "shares", "2004-10-19 11:23:54"),
  createData("785936183", 200000, 200000, "shares", "2004-10-19 23:23:54"),
  createData("881936183", 200000, 200000, "shares", "2004-10-19 10:13:54"),
  createData("982936183", 200000, 200000, "shares", "2004-10-19 10:03:54"),
  createData("273936183", 200000, 200000, "shares", "2004-10-19 00:23:54"),
  createData("264936183", 200000, 200000, "shares", "2004-10-19 11:23:54"),
  createData("255936183", 200000, 200000, "shares", "2004-10-19 23:23:54"),
  createData("241936183", 200000, 200000, "shares", "2004-10-19 10:13:54"),
  createData("232936183", 200000, 200000, "shares", "2004-10-19 10:03:54"),
  createData("223936183", 200000, 200000, "shares", "2004-10-19 00:23:54"),
  createData("214936183", 200000, 200000, "shares", "2004-10-19 11:23:54"),
  createData("205936183", 200000, 200000, "shares", "2004-10-19 23:23:54"),

  createData("281936180", 200000, 200000, "shares", "2004-10-19 10:13:54"),
  createData("282936180", 200000, 200000, "shares", "2004-10-19 10:03:54"),
  createData("283936180", 200000, 200000, "shares", "2004-10-19 00:23:54"),
  createData("284936180", 200000, 200000, "shares", "2004-10-19 11:23:54"),
  createData("285936180", 200000, 200000, "shares", "2004-10-19 23:23:54"),
  createData("381936180", 200000, 200000, "shares", "2004-10-19 10:13:54"),
  createData("482936180", 200000, 200000, "shares", "2004-10-19 10:03:54"),
  createData("583936180", 200000, 200000, "shares", "2004-10-19 00:23:54"),
  createData("684936180", 200000, 200000, "shares", "2004-10-19 11:23:54"),
  createData("785936180", 200000, 200000, "shares", "2004-10-19 23:23:54"),
  createData("881936103", 200000, 200000, "shares", "2004-10-19 10:13:54"),
  createData("982036183", 200000, 200000, "shares", "2004-10-19 10:03:54"),
  createData("273936083", 200000, 200000, "shares", "2004-10-19 00:23:54"),
  createData("204936183", 200000, 200000, "shares", "2004-10-19 11:23:54"),
  createData("255906183", 200000, 200000, "shares", "2004-10-19 23:23:54"),
  createData("240936183", 200000, 200000, "shares", "2004-10-19 10:13:54"),
  createData("232930183", 200000, 200000, "shares", "2004-10-19 10:03:54"),
  createData("223036183", 200000, 200000, "shares", "2004-10-19 00:23:54"),
  createData("214936083", 200000, 200000, "shares", "2004-10-19 11:23:54"),
  createData("200936183", 200000, 200000, "shares", "2004-10-19 23:23:54"),
];

export default function Transactions() {
  return (
    <main>
      <Title title="My Transactions" pageTitle />
      <TransactionsTable rows={rows} content="all" />
    </main>
  );
}
