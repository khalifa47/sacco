import Title from "@/app/(components)/Title";
import TransactionsTable from "@/app/(components)/TransactionsTable";
import { createTransactionData } from "@/utils/helpers";
import type { GridRowsProp } from "@mui/x-data-grid";
import dynamic from "next/dynamic";
import Divider from "@/app/(components)/Divider";
import ActionCard from "@/app/(components)/ActionCard";

const InfoCard = dynamic(() => import("@/app/(components)/InfoCard"));
const Trend = dynamic(() => import("@/app/(components)/Trend"));

const rows: GridRowsProp = [
  createTransactionData({
    id: "281936183",
    amount: 200000,
    balance: 200000,
    content: "welfare",
    type: "credit",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "282936183",
    amount: 200000,
    balance: 200000,
    content: "welfare",
    type: "credit",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "283936183",
    amount: 200000,
    balance: 200000,
    content: "welfare",
    type: "credit",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "284936183",
    amount: 200000,
    balance: 200000,
    content: "welfare",
    type: "credit",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "285936183",
    amount: 200000,
    balance: 200000,
    content: "welfare",
    type: "credit",
    dateTime: "2004-10-19 10:23:54",
  }),

  createTransactionData({
    id: "81936183",
    amount: 200000,
    balance: 200000,
    content: "welfare",
    type: "credit",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "28293183",
    amount: 200000,
    balance: 200000,
    content: "welfare",
    type: "credit",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "28393618",
    amount: 200000,
    balance: 200000,
    content: "welfare",
    type: "credit",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "24936183",
    amount: 200000,
    balance: 200000,
    content: "welfare",
    type: "credit",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "28593683",
    amount: 200000,
    balance: 200000,
    content: "shares",
    type: "credit",
    dateTime: "2004-10-19 10:23:54",
  }),
];

export default function Welfare() {
  return (
    <main>
      <Title title="My Welfare" pageTitle />
      {/* View welfare */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <InfoCard content="welfare" amount={200000} />
        <Trend
          content="welfare"
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
              label: "Amount",
              data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
              borderColor: "#F4641F",
              backgroundColor: "#F4641F80",
              tension: 0.2,
            },
          ]}
        />
      </div>

      <Divider />

      {/* Welfare Transactions */}
      <Title title="Welfare Transactions" />
      <TransactionsTable rows={rows} content="welfare" />

      <Divider />

      <Title title="Welfare Actions" />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <ActionCard action="deposit" />
        <ActionCard action="settings" />
      </div>

      <div style={{ height: "200px" }}></div>
    </main>
  );
}
