import Title from "@/app/(components)/layout/Title";
import DataTable from "@/app/(components)/data/DataTable";
import { createTransactionData } from "@/utils/helpers";
import type { GridRowsProp } from "@mui/x-data-grid";
import dynamic from "next/dynamic";
import Divider from "@/app/(components)/layout/Divider";
import Actions from "@/app/(components)/action/Actions";

const InfoCard = dynamic(() => import("@/app/(components)/data/InfoCard"));
const Trend = dynamic(() => import("@/app/(components)/data/Trend"));

const rows: GridRowsProp<Transaction> = [
  createTransactionData({
    id: "281936183",
    amount: 200000,
    balance: 200000,
    content: "loans",
    type: "debit",
    method: "MPESA",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "282936183",
    amount: 200000,
    balance: 200000,
    content: "loans",
    type: "debit",
    method: "MPESA",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "283936183",
    amount: 200000,
    balance: 200000,
    content: "loans",
    type: "debit",
    method: "MPESA",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "284936183",
    amount: 200000,
    balance: 200000,
    content: "loans",
    type: "debit",
    method: "MPESA",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "285936183",
    amount: 200000,
    balance: 200000,
    content: "loans",
    type: "debit",
    method: "MPESA",
    dateTime: "2004-10-19 10:23:54",
  }),

  createTransactionData({
    id: "81936183",
    amount: 200000,
    balance: 200000,
    content: "loans",
    type: "debit",
    method: "MPESA",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "28293183",
    amount: 200000,
    balance: 200000,
    content: "loans",
    type: "debit",
    method: "MPESA",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "28393618",
    amount: 200000,
    balance: 200000,
    content: "loans",
    type: "debit",
    method: "MPESA",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "24936183",
    amount: 200000,
    balance: 200000,
    content: "loans",
    type: "debit",
    method: "MPESA",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "28593683",
    amount: 200000,
    balance: 200000,
    content: "loans",
    type: "debit",
    method: "MPESA",
    dateTime: "2004-10-19 10:23:54",
  }),
];

export default function Loans() {
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
        <InfoCard content="loans" amount={200000} />
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
              data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
            },
          ]}
        />
      </div>

      <Divider />

      {/* Loans Transactions */}
      <Title title="Loans Transactions" />
      <DataTable rows={rows} />

      <Divider />

      <Title title="Loans Actions" />
      <Actions content="loans" />

      <div style={{ height: "200px" }}></div>
    </main>
  );
}
