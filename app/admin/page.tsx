import Title from "@/app/(components)/Title";
import { createTransactionData, createUserData } from "@/utils/helpers";
import dynamic from "next/dynamic";

const InfoCard = dynamic(() => import("@/app/(components)/InfoCard"));
const SummaryTable = dynamic(() => import("@/app/(components)/SummaryTable"), {
  // loading: () => <Skeleton variant="rectangular" width="100%" height={100} />,
  loading: () => <h5>Loading</h5>,
});

const transactionRows = [
  createTransactionData({
    id: "281936183",
    amount: 200000,
    balance: 200000,
    type: "shares",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "282936183",
    amount: 200000,
    balance: 200000,
    type: "shares",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "283936183",
    amount: 200000,
    balance: 200000,
    type: "shares",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "284936183",
    amount: 200000,
    balance: 200000,
    type: "shares",
    dateTime: "2004-10-19 10:23:54",
  }),
  createTransactionData({
    id: "285936183",
    amount: 200000,
    balance: 200000,
    type: "shares",
    dateTime: "2004-10-19 10:23:54",
  }),
];

const userRows = [
  createUserData({
    id: "1",
    firstName: "khalifa",
    otherNames: "bakari",
    lastName: "fumo",
    email: "khalifafumo5@gmail.com",
    dateJoined: "2004-10-19 10:23:54",
    dateActive: "2014-10-19 10:23:54",
  }),
  createUserData({
    id: "2",
    firstName: "khalifa",
    otherNames: "bakari",
    lastName: "fumo",
    email: "khalifafumo5@gmail.com",
    dateJoined: "2004-10-19 10:23:54",
    dateActive: "2014-10-19 10:23:54",
  }),
  createUserData({
    id: "3",
    firstName: "khalifa",
    lastName: "fumo",
    email: "khalifafumo5@gmail.com",
    dateJoined: "2004-10-19 10:23:54",
    dateActive: "2014-10-19 10:23:54",
  }),
  createUserData({
    id: "4",
    firstName: "khalifa",
    lastName: "fumo",
    email: "khalifafumo5@gmail.com",
    dateJoined: "2004-10-19 10:23:54",
    dateActive: "2014-10-19 10:23:54",
  }),
  createUserData({
    id: "5",
    firstName: "khalifa",
    otherNames: "bakari",
    lastName: "fumo",
    email: "khalifafumo5@gmail.com",
    dateJoined: "2004-10-19 10:23:54",
    dateActive: "2014-10-19 10:23:54",
  }),
];

export default function Admin() {
  return (
    <main>
      <Title title="Admin Dashboard" pageTitle />

      {/* Accounts Summary */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          columnGap: 0,
          rowGap: "15px",
        }}
      >
        <InfoCard admin content="balance" amount={2000000000} />
        <InfoCard admin content="shares" amount={200000000} />
        <InfoCard admin content="loans" amount={200000} />
        <InfoCard admin content="welfare" amount={20000} />
      </div>

      <hr style={{ marginTop: 30, marginBottom: 20 }} />

      {/* User Summary */}
      <Title title="Recent Users" />
      <SummaryTable admin rows={userRows} />

      <hr style={{ marginTop: 30, marginBottom: 20 }} />

      {/* Transactions Summary */}
      <Title title="Recent Transactions" />
      <SummaryTable admin rows={transactionRows} />
    </main>
  );
}
