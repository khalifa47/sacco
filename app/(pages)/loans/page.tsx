import Title from "@/app/(components)/layout/Title";
import DataTable from "@/app/(components)/data/DataTable";
import type { GridRowsProp } from "@mui/x-data-grid";
import dynamic from "next/dynamic";
import Divider from "@/app/(components)/layout/Divider";
import Actions from "@/app/(components)/action/Actions";

const InfoCard = dynamic(() => import("@/app/(components)/data/InfoCard"));
const Trend = dynamic(() => import("@/app/(components)/data/Trend"));

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
      <DataTable rows={[]} />

      <Divider />

      <Title title="Loans Actions" />
      <Actions content="loans" />

      <div style={{ height: "200px" }}></div>
    </main>
  );
}
