import dynamic from "next/dynamic";
import Title from "@/app/components/Title";

const InfoCard = dynamic(() => import("@/app/components/InfoCard"));
const SummaryTable = dynamic(() => import("@/app/components/SummaryTable"), {
  // loading: () => <Skeleton variant="rectangular" width="100%" height={100} />,
  loading: () => <h5>Loading</h5>,
});

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
      <hr style={{ marginTop: 30, marginBottom: 20 }} />
      <Title title="Recent Transactions" />
      <SummaryTable />
    </main>
  );
}
