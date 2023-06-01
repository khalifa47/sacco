import Title from "@/app/(components)/layout/Title";
import DataTable from "@/app/(components)/data/DataTable";
import type { GridRowsProp } from "@mui/x-data-grid";
import dynamic from "next/dynamic";
import Divider from "@/app/(components)/layout/Divider";
import Actions from "@/app/(components)/action/Actions";

const InfoCard = dynamic(() => import("@/app/(components)/data/InfoCard"));
const Trend = dynamic(() => import("@/app/(components)/data/Trend"));

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
              data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
            },
          ]}
        />
      </div>

      <Divider />

      {/* Welfare Transactions */}
      <Title title="Welfare Transactions" />
      <DataTable rows={[]} />

      <Divider />

      <Title title="Welfare Actions" />
      <Actions content="welfare" />

      <div style={{ height: "200px" }}></div>
    </main>
  );
}
