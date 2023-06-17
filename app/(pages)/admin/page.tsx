import Title from "@/app/(components)/layout/Title";
import dynamic from "next/dynamic";
import Divider from "@/app/(components)/layout/Divider";
import SummaryTable from "@/app/(components)/data/SummaryTable";
import { users } from "@/utils/data";

const InfoCard = dynamic(() => import("@/app/(components)/data/InfoCard"));

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

      <Divider />

      {/* User Summary */}
      <Title title="Recent Users" />
      <SummaryTable admin rows={users} />

      <Divider />
      {/* Transactions Summary */}
      <Title title="Recent Transactions" />
      <SummaryTable admin rows={[]} />
    </main>
  );
}
