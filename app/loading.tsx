"use client";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function Loading() {
  return (
    <Box width="80%" m="70px auto">
      <LinearProgress />
    </Box>
  );
}
