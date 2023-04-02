import Title from "@/app/components/Title";
import dynamic from "next/dynamic";

const InfoCard = dynamic(() => import("@/app/components/InfoCard"));

export default function Admin() {
  return (
    <main>
      <Title title="Admin Dashboard" pageTitle />
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
    </main>
  );
}
