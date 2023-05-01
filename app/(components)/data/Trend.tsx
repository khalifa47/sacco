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
  type ChartDataset,
  Filler,
} from "chart.js";
import { capitalize } from "@/utils/helpers";
// import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const Trend = ({
  content,
  labels,
  datasets,
}: {
  content: Content;
  labels: string[];
  datasets: ChartDataset<"line">[];
}) => {
  //   const [selectedScale, setSelectedScale] = useState("monthly");
  //   const handleChangeScale = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setSelectedScale(event.target.value);
  //   };
  datasets[0].label = "Amount";
  datasets[0].borderColor = "#F4641F";
  datasets[0].borderWidth = 0;
  datasets[0].backgroundColor = "#F4641F50";
  datasets[0].tension = 0.4;
  datasets[0].fill = true;
  datasets[0].pointRadius = 0;

  return (
    <Card
      sx={{
        p: 1,
        pb: 4,
        flex: 1,
        borderRadius: "10px",
        maxHeight: "300px",
        position: "relative",
        ":hover": { boxShadow: 5 },
      }}
    >
      <Typography textAlign="center" fontWeight={600}>
        {`My ${capitalize(content)} ${
          content == "loans" ? "Payments" : "Deposits"
        } Distribution`}
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
        width="100%"
        options={{
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "transparent",
              },
            },
            x: {
              grid: {
                color: "transparent",
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
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
