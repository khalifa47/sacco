"use client";

import { capitalize, formatNumber } from "@/utils/helpers";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const getColors = (content: "balance" | "shares" | "loans" | "welfare") => {
  switch (content) {
    case "balance":
      return {
        bgColor: "rgb(183, 239, 239)",
        titleColor: "rgb(40, 99, 110)",
        amountColor: "rgb(24, 64, 66)",
      };
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
  admin,
  content,
  amount,
}: {
  admin?: boolean;
  content: "balance" | "shares" | "loans" | "welfare";
  amount: number;
}) => {
  const contentColors = getColors(content);
  return (
    <Card
      component={Link}
      href={
        content === "balance"
          ? "/admin/transactions"
          : `/${admin ? "admin/" : ""}${content}`
      }
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        backgroundColor: contentColors.bgColor,
        p: 2,
        position: "relative",
        width: { ...{ xs: "100%", md: "46%" }, lg: admin ? "47%" : "30%" },
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
        {`${admin ? "Total" : ""} ${capitalize(content)}`}
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
        // component={Link}
        // href={`/transactions?filterBy=${content}`}
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
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          viewBox="0 0 416 218"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32 49C21.9999 98 0 217.5 0 217.5H416C416 217.5 406 146 395 146C384 146 384.5 171 372 171C359.5 171 353.5 58 342 56.5C330.5 55 319.5 79.5 307 80.5C294.5 81.5 284.5 49 284.5 49H269C250.5 49 263.5 0 250.5 0C237.5 0 212 151.5 199 146C186 140.5 185.5 99.2222 175.5 114.222C165.5 129.222 156 191 145 192C134 192 132.5 58 120 65.5C107.5 73 105.5 128.778 72.5 80.5C39.5 32.2223 42 0 32 49Z"
            fill="white"
            fillOpacity="0.4"
          />
        </svg>
      </Box>
    </Card>
  );
};

export default InfoCard;
