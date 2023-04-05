import Title from "@/app/(components)/Title";
import dynamic from "next/dynamic";

const InfoCard = dynamic(() => import("@/app/(components)/InfoCard"));
const Trend = dynamic(() => import("@/app/(components)/Trend"));

export default function Shares() {
  return (
    <main>
      <Title title="My Shares" pageTitle />
      {/* View shares */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <InfoCard content="shares" amount={200000} />
        <Trend
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

      {/* Deposit shares */}
      {/* Withdraw shares */}
      {/* Transfer to Welfare */}
      {/* Shares frequency */}
    </main>
  );
}
