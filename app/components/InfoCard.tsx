"use client";

import { capitalize, formatNumber } from "@/utils/helpers";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Vector from "./Vector";
import Link from "next/link";

const getColors = (content: "shares" | "loans" | "welfare") => {
  switch (content) {
    case "shares":
      return {
        bgColor: "rgb(220, 252, 231)",
        titleColor: "rgba(54,110,40,1)",
        amountColor: "rgba(32,66,24,1)",
      };
    case "loans":
      return {
        bgColor: "rgb(254, 226, 226)",
        titleColor: "rgba(103,48,45,1)",
        amountColor: "rgba(67,32,30,1)",
      };
    case "welfare":
      return {
        bgColor: "rgb(237, 233, 254)",
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
      component={Link}
      href={`/${content}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        backgroundColor: contentColors.bgColor,
        p: 2,
        position: "relative",
        width: { xs: "100%", md: "46%", lg: "30%" },
        textDecoration: "none",
        ":hover": { boxShadow: 5 },
      }}
    >
      <Typography
        variant="h4"
        align="left"
        color={contentColors.titleColor}
        mb={2}
        zIndex={1}
      >
        {capitalize(content)}{" "}
      </Typography>
      <Typography
        variant="h3"
        fontSize={`clamp(1rem, 3rem, 2.9rem)`}
        justifySelf={"center"}
        alignSelf={"center"}
        color={contentColors.amountColor}
        zIndex={1}
      >
        {`Ksh. ${formatNumber(amount)}`}
      </Typography>
      <Typography
        component={Link}
        href={`/transactions?filterBy=${content}`}
        variant="subtitle1"
        fontWeight={600}
        align="right"
        color="#000a4a"
        mt={3}
        zIndex={1}
        sx={{
          textDecoration: "none",
          transition: "ease-in-out 200ms",
          ":hover": { color: "#293dbf" },
        }}
      >
        View Transactions
      </Typography>
      <Box position="absolute" top={0} bottom={-5} left={0} right={0}>
        <Vector />
      </Box>
    </Card>
  );
};

export default InfoCard;
