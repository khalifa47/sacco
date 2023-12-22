import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Link from "next/link";
import { Logo } from "../layout/Header";

const LandingHeader = () => {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Logo />
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Typography
              component={Link}
              color="inherit"
              href="/auth"
              sx={{
                fontSize: 16,
                fontWeight: 700,
                color: "common.white",
                ml: 3,
                textDecoration: "none",
              }}
            >
              {"GET STARTED"}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
};

export default LandingHeader;
