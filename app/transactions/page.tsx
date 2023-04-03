import Title from "@/app/(components)/Title";
import TransactionsTable from "@/app/(components)/TransactionsTable";
import { createTransactionData } from "@/utils/helpers";
import type { GridRowsProp } from "@mui/x-data-grid/models";

const rows: GridRowsProp = [
  createTransactionData(
    "281936183",
    200000,
    200000,
    "shares",
    "2004-10-19 10:13:54"
  ),
  createTransactionData(
    "282936183",
    200000,
    200000,
    "shares",
    "2004-10-19 10:03:54"
  ),
  createTransactionData(
    "283936183",
    200000,
    200000,
    "shares",
    "2004-10-19 00:23:54"
  ),
  createTransactionData(
    "284936183",
    200000,
    200000,
    "shares",
    "2004-10-19 11:23:54"
  ),
  createTransactionData(
    "285936183",
    200000,
    200000,
    "shares",
    "2004-10-19 23:23:54"
  ),
  createTransactionData(
    "381936183",
    200000,
    200000,
    "shares",
    "2004-10-19 10:13:54"
  ),
  createTransactionData(
    "482936183",
    200000,
    200000,
    "shares",
    "2004-10-19 10:03:54"
  ),
  createTransactionData(
    "583936183",
    200000,
    200000,
    "shares",
    "2004-10-19 00:23:54"
  ),
  createTransactionData(
    "684936183",
    200000,
    200000,
    "shares",
    "2004-10-19 11:23:54"
  ),
  createTransactionData(
    "785936183",
    200000,
    200000,
    "shares",
    "2004-10-19 23:23:54"
  ),
  createTransactionData(
    "881936183",
    200000,
    200000,
    "shares",
    "2004-10-19 10:13:54"
  ),
  createTransactionData(
    "982936183",
    200000,
    200000,
    "shares",
    "2004-10-19 10:03:54"
  ),
  createTransactionData(
    "273936183",
    200000,
    200000,
    "shares",
    "2004-10-19 00:23:54"
  ),
  createTransactionData(
    "264936183",
    200000,
    200000,
    "shares",
    "2004-10-19 11:23:54"
  ),
  createTransactionData(
    "255936183",
    200000,
    200000,
    "shares",
    "2004-10-19 23:23:54"
  ),
  createTransactionData(
    "241936183",
    200000,
    200000,
    "shares",
    "2004-10-19 10:13:54"
  ),
  createTransactionData(
    "232936183",
    200000,
    200000,
    "shares",
    "2004-10-19 10:03:54"
  ),
  createTransactionData(
    "223936183",
    200000,
    200000,
    "shares",
    "2004-10-19 00:23:54"
  ),
  createTransactionData(
    "214936183",
    200000,
    200000,
    "shares",
    "2004-10-19 11:23:54"
  ),
  createTransactionData(
    "205936183",
    200000,
    200000,
    "shares",
    "2004-10-19 23:23:54"
  ),

  createTransactionData(
    "281936180",
    200000,
    200000,
    "shares",
    "2004-10-19 10:13:54"
  ),
  createTransactionData(
    "282936180",
    200000,
    200000,
    "shares",
    "2004-10-19 10:03:54"
  ),
  createTransactionData(
    "283936180",
    200000,
    200000,
    "shares",
    "2004-10-19 00:23:54"
  ),
  createTransactionData(
    "284936180",
    200000,
    200000,
    "shares",
    "2004-10-19 11:23:54"
  ),
  createTransactionData(
    "285936180",
    200000,
    200000,
    "shares",
    "2004-10-19 23:23:54"
  ),
  createTransactionData(
    "381936180",
    200000,
    200000,
    "shares",
    "2004-10-19 10:13:54"
  ),
  createTransactionData(
    "482936180",
    200000,
    200000,
    "shares",
    "2004-10-19 10:03:54"
  ),
  createTransactionData(
    "583936180",
    200000,
    200000,
    "shares",
    "2004-10-19 00:23:54"
  ),
  createTransactionData(
    "684936180",
    200000,
    200000,
    "shares",
    "2004-10-19 11:23:54"
  ),
  createTransactionData(
    "785936180",
    200000,
    200000,
    "shares",
    "2004-10-19 23:23:54"
  ),
  createTransactionData(
    "881936103",
    200000,
    200000,
    "shares",
    "2004-10-19 10:13:54"
  ),
  createTransactionData(
    "982036183",
    200000,
    200000,
    "shares",
    "2004-10-19 10:03:54"
  ),
  createTransactionData(
    "273936083",
    200000,
    200000,
    "shares",
    "2004-10-19 00:23:54"
  ),
  createTransactionData(
    "204936183",
    200000,
    200000,
    "shares",
    "2004-10-19 11:23:54"
  ),
  createTransactionData(
    "255906183",
    200000,
    200000,
    "shares",
    "2004-10-19 23:23:54"
  ),
  createTransactionData(
    "240936183",
    200000,
    200000,
    "shares",
    "2004-10-19 10:13:54"
  ),
  createTransactionData(
    "232930183",
    200000,
    200000,
    "shares",
    "2004-10-19 10:03:54"
  ),
  createTransactionData(
    "223036183",
    200000,
    200000,
    "shares",
    "2004-10-19 00:23:54"
  ),
  createTransactionData(
    "214936083",
    200000,
    200000,
    "shares",
    "2004-10-19 11:23:54"
  ),
  createTransactionData(
    "200936183",
    200000,
    200000,
    "shares",
    "2004-10-19 23:23:54"
  ),
];

export default function Transactions() {
  return (
    <main>
      <Title title="My Transactions" pageTitle />
      <TransactionsTable rows={rows} content="all" />
    </main>
  );
}
