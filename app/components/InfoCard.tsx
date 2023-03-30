"use client";

import { capitalize, formatNumber } from "@/utils/helpers";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Vector from "./Vector";

const getColors = (content: "shares" | "loans" | "welfare") => {
  switch (content) {
    case "shares":
      return {
        bgColor: "rgba(114,222,86,1)",
        titleColor: "rgba(54,110,40,1)",
        amountColor: "rgba(32,66,24,1)",
      };
    case "loans":
      return {
        bgColor: "rgba(222,94,86,1)",
        titleColor: "rgba(103,48,45,1)",
        amountColor: "rgba(67,32,30,1)",
      };
    case "welfare":
      return {
        bgColor: "rgba(131,108,222,1)",
        titleColor: "rgba(64,53,109,1)",
        amountColor: "rgba(42,34,72,1)",
      };
  }
};

const InfoCard = ({
  content,
  amount,
}: {
  content: "shares" | "loans" | "welfare";
  amount: number;
}) => {
  const contentColors = getColors(content);
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        backgroundColor: contentColors.bgColor,
        p: 2,
        position: "relative",
        width: { xs: "100%", md: "46%", lg: "30%" },
      }}
    >
      <Typography
        variant="h4"
        align="left"
        color={contentColors.titleColor}
        mb={2}
      >
        {capitalize(content)}{" "}
      </Typography>
      <Typography
        variant="h3"
        fontSize={`clamp(1rem, 3rem, 2.9rem)`}
        justifySelf={"center"}
        alignSelf={"center"}
        color={contentColors.amountColor}
      >
        {`Ksh. ${formatNumber(amount)}`}
      </Typography>
      <Typography
        variant="subtitle1"
        fontWeight={600}
        align="right"
        color="rgba(17,0,211,0.6)"
        mt={3}
      >
        View Transactions
      </Typography>
      <Box
        position="absolute"
        top={{ xs: 0, md: "inherit" }}
        bottom={{ xs: 0, md: -40 }}
        left={0}
        right={{ xs: 0, md: "inherit" }}
      >
        <Vector />
      </Box>
    </Card>
  );
};

export default InfoCard;
