import Title from "@/app/(components)/layout/Title";
import TransactionsTable from "@/app/(components)/data/TransactionsTable";
import { createTransactionData } from "@/utils/helpers";
import type { GridRowsProp } from "@mui/x-data-grid/models";

const rows: GridRowsProp = [
  createTransactionData({
    id: "281936183",
    amount: 200000,
    balance: 200000,
    content: "shares",
    type: "debit",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "282936183",
    amount: 200000,
    balance: 200000,
    content: "shares",
    type: "debit",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "283936183",
    amount: 200000,
    balance: 200000,
    content: "shares",
    type: "debit",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "284936183",
    amount: 200000,
    balance: 200000,
    content: "shares",
    type: "debit",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "285936183",
    amount: 200000,
    balance: 200000,
    content: "shares",
    type: "debit",
    dateTime: "2004-10-19 10:23:54",
  }),

  createTransactionData({
    id: "81936183",
    amount: 200000,
    balance: 200000,
    content: "shares",
    type: "debit",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "28293183",
    amount: 200000,
    balance: 200000,
    content: "shares",
    type: "debit",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "28393618",
    amount: 200000,
    balance: 200000,
    content: "shares",
    type: "debit",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "24936183",
    amount: 200000,
    balance: 200000,
    content: "shares",
    type: "debit",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "28593683",
    amount: 200000,
    balance: 200000,
    content: "shares",
    type: "debit",
    dateTime: "2004-10-19 10:23:54",
  }),
];

export default function Transactions() {
  return (
    <main>
      <Title title="My Transactions" pageTitle />
      <TransactionsTable rows={rows} content="all" />
    </main>
  );
}
