"use client";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Radio from "@mui/material/Radio";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
// import { useState } from "react";

type Data = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const Trend = ({
  labels,
  datasets,
}: {
  labels: string[];
  datasets: Data[];
}) => {
  //   const [selectedScale, setSelectedScale] = useState("monthly");
  //   const handleChangeScale = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setSelectedScale(event.target.value);
  //   };

  return (
    <Card
      sx={{
        p: 2,
        flex: 1,
        borderRadius: "10px",
        ":hover": { boxShadow: 5 },
      }}
    >
      <Typography textAlign="center" fontWeight={600}>
        My Shares Distribution
      </Typography>
      {/* <RadioGroup row sx={{ justifyContent: "center" }}>
        <FormControlLabel
          control={
            <Radio
              size="small"
              value="monthly"
              checked={selectedScale === "monthly"}
              onChange={handleChangeScale}
            />
          }
          label="Monthly"
        />
        <FormControlLabel
          control={
            <Radio
              size="small"
              value="yearly"
              checked={selectedScale === "yearly"}
              onChange={handleChangeScale}
            />
          }
          label="Yearly"
        />
      </RadioGroup> */}
      <Line
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          responsive: true,
        }}
        data={{
          labels: labels,
          datasets: datasets,
        }}
      />
    </Card>
  );
};
export default Trend;
