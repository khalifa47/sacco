import dynamic from "next/dynamic";
import PageTitle from "@/app/components/PageTitle";

const InfoCard = dynamic(() => import("@/app/components/InfoCard"), {
  loading: () => <p>Loading</p>,
});

export default function Dashboard() {
  return (
    <main>
      <PageTitle title="My Dashboard" />
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
    </main>
  );
}
