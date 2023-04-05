import dynamic from "next/dynamic";
import Title from "@/app/(components)/Title";
import { createTransactionData } from "@/utils/helpers";

const InfoCard = dynamic(() => import("@/app/(components)/InfoCard"));
const SummaryTable = dynamic(() => import("@/app/(components)/SummaryTable"), {
  // loading: () => <Skeleton variant="rectangular" width="100%" height={100} />,
  loading: () => <h5>Loading</h5>,
});

const rows = [
  createTransactionData({
    id: "281936183",
    amount: 200000,
    balance: 200000,
    type: "credit",
    content: "shares",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "282936183",
    amount: 200000,
    balance: 200000,
    type: "credit",
    content: "shares",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "283936183",
    amount: 200000,
    balance: 200000,
    type: "credit",
    content: "shares",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "284936183",
    amount: 200000,
    balance: 200000,
    type: "credit",
    content: "shares",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "285936183",
    amount: 200000,
    balance: 200000,
    type: "credit",
    content: "shares",
    dateTime: "2004-10-19 10:23:54",
  }),
];

export default function Dashboard() {
  return (
    <main>
      <Title title="My Dashboard" pageTitle />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          columnGap: 0,
          rowGap: "15px",
        }}
      >
        <InfoCard content="shares" amount={20000000} />
        <InfoCard content="loans" amount={200000} />
        <InfoCard content="welfare" amount={20000} />
      </div>
      <hr style={{ marginTop: 25, marginBottom: 15 }} />
      <Title title="Recent Transactions" />
      <SummaryTable rows={rows} />
    </main>
  );
}
