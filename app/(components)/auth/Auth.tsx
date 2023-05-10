"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import Login from "./Login";
import Register from "./Register";

const StyledLink = ({ children }: { children: string }) => (
  <Link
    component="button"
    variant="body2"
    color="secondary.dark"
    sx={{ textDecoration: "none", ":hover": { textDecoration: "underline" } }}
  >
    {children}
  </Link>
);

const Auth = () => {
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
          {/* Log In */}
          Register
        </Typography>
        <Register />
        {/* <Login /> */}
        <Box display="flex" flexDirection="column" mt={2}>
          {/* <StyledLink>Forgot your password?</StyledLink>
          <StyledLink>Don&apos;t have an account? Sign up</StyledLink> */}
          <StyledLink>Already have an account? Sign In</StyledLink>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;

// Forgot your password?
// Your email address
// Send reset password instructions

// Don't have an account? Sign up
// Already have an account? Sign in
