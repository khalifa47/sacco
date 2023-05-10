"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";

import { type Dispatch, type SetStateAction, useState } from "react";
import { capitalize } from "@/utils/helpers";

type Page = "login" | "register" | "reset password";

const StyledLink = ({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) => (
  <Link
    component="button"
    variant="body2"
    color="secondary.dark"
    onClick={onClick}
    sx={{ textDecoration: "none", ":hover": { textDecoration: "underline" } }}
  >
    {children}
  </Link>
);

const getPageProps = (page: Page, setPage: Dispatch<SetStateAction<Page>>) => {
  switch (page) {
    case "login":
      return {
        component: <Login />,
        links: [
          <StyledLink key={1} onClick={() => setPage("reset password")}>
            Forgot your password?
          </StyledLink>,
          <StyledLink key={2} onClick={() => setPage("register")}>
            Don&apos;t have an account? Sign up
          </StyledLink>,
        ],
      };
    case "register":
      return {
        component: <Register />,
        links: [
          <StyledLink key={1} onClick={() => setPage("login")}>
            Already have an account? Sign In
          </StyledLink>,
        ],
      };
    case "reset password":
      return {
        component: <ResetPassword />,
        links: [
          <StyledLink key={1} onClick={() => setPage("login")}>
            Already have an account? Sign In
          </StyledLink>,
        ],
      };
  }
};

const Auth = () => {
  const [page, setPage] = useState<Page>("login");

  const pageProps = getPageProps(page, setPage);

  return (
    <Box
      boxShadow={24}
      borderRadius={3}
      overflow="hidden"
      width={{ xs: "100%", md: "60%" }}
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      height="80%"
    >
      <Box
        width={{ xs: "100%", md: "35%" }}
        height={{ xs: "30%", md: "100%" }}
        bgcolor="primary.main"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* Styled Box */}
        <Typography
          variant="h3"
          mx={2}
          textAlign="center"
          color="white"
          fontWeight={700}
          letterSpacing={2}
        >
          KADHI SACCO
        </Typography>
      </Box>
      <Box
        width={{ xs: "100%", md: "65%" }}
        height={{ xs: "70%", md: "100%" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h6" fontWeight={600} mb={2}>
          {capitalize(page)}
        </Typography>
        {pageProps.component}
        <Box display="flex" flexDirection="column" mt={2}>
          {pageProps.links.map((link) => link)}
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;
