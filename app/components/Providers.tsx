"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import Container from "@mui/material/Container";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F4641F",
    },
  },
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">{children}</Container>
    </ThemeProvider>
  );
};

export default Providers;
