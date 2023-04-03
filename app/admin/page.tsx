import Title from "@/app/(components)/Title";
import { createTransactionData, createUserData } from "@/utils/helpers";
import dynamic from "next/dynamic";

const InfoCard = dynamic(() => import("@/app/(components)/InfoCard"));
const SummaryTable = dynamic(() => import("@/app/(components)/SummaryTable"), {
  // loading: () => <Skeleton variant="rectangular" width="100%" height={100} />,
  loading: () => <h5>Loading</h5>,
});

const transactionRows = [
  createTransactionData(
    "281936183",
    200000,
    200000,
    "shares",
    "2004-10-19 10:23:54"
  ),
  createTransactionData(
    "282936183",
    200000,
    200000,
    "shares",
    "2004-10-19 10:23:54"
  ),
  createTransactionData(
    "283936183",
    200000,
    200000,
    "shares",
    "2004-10-19 10:23:54"
  ),
  createTransactionData(
    "284936183",
    200000,
    200000,
    "shares",
    "2004-10-19 10:23:54"
  ),
  createTransactionData(
    "285936183",
    200000,
    200000,
    "shares",
    "2004-10-19 10:23:54"
  ),
];

const userRows = [
  createUserData(
    "1",
    "khalifa",
    "fumo",
    "khalifafumo5@gmail.com",
    "2004-10-19 10:23:54",
    "bakari"
  ),
  createUserData(
    "2",
    "khalifa",
    "fumo",
    "khalifafumo5@gmail.com",
    "2004-10-19 10:23:54",
    "bakari"
  ),
  createUserData(
    "3",
    "khalifa",
    "fumo",
    "khalifafumo5@gmail.com",
    "2004-10-19 10:23:54"
  ),
  createUserData(
    "4",
    "khalifa",
    "fumo",
    "khalifafumo5@gmail.com",
    "2004-10-19 10:23:54"
  ),
  createUserData(
    "5",
    "khalifa",
    "fumo",
    "khalifafumo5@gmail.com",
    "2004-10-19 10:23:54",
    "bakari"
  ),
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
