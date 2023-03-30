"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SavingsIcon from "@mui/icons-material/Savings";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

const Logo = () => {
  return (
    <Box
      component={Link}
      href="/"
      display={{ xs: "none", md: "flex" }}
      sx={{
        alignItems: "center",
        fontFamily: "monospace",
        fontWeight: 700,
        color: "white",
        textDecoration: "none",
        mr: 2,
      }}
    >
      <Image src="/logo_white.png" alt="logo" height={50} width={50} />
      <Typography letterSpacing={"0.2rem"} variant="h6" noWrap mr={10}>
        KADHI SACCO
      </Typography>
    </Box>
  );
};

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = () => {
    console.log("logged out");
  };

  const pages = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      name: "Shares",
      icon: <SavingsIcon />,
    },
    {
      name: "Loans",
      icon: <LocalAtmIcon />,
    },
    {
      name: "Welfare",
      icon: <VolunteerActivismIcon />,
    },
    {
      name: "Admin",
      icon: <SupervisorAccountIcon />,
    },
  ];

  const settings = [
    {
      name: "Account",
      icon: <AccountCircleIcon />,
      action: handleCloseUserMenu,
    },
    {
      name: "Logout",
      icon: <LogoutIcon />,
      action: logOut,
    },
  ];

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Logo />

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.name}
                    LinkComponent={Link}
                    href={
                      page.name === "Dashboard"
                        ? "/"
                        : `/${page.name.toLowerCase()}`
                    }
                  >
                    <ListItemIcon>{page.icon}</ListItemIcon>
                    <ListItemText>
                      <Typography sx={{ mx: 2 }}>{page.name}</Typography>
                    </ListItemText>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  LinkComponent={Link}
                  key={page.name}
                  href={
                    page.name === "Dashboard"
                      ? "/"
                      : `/${page.name.toLowerCase()}`
                  }
                  sx={{ m: 1, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <Button onClick={handleOpenUserMenu} sx={{ color: "white" }}>
                  {Boolean(anchorElUser) ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                  <Typography letterSpacing={"0.15rem"} ml={1}>
                    Khalifa Fumo
                  </Typography>
                </Button>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.name} onClick={setting.action}>
                    <ListItemIcon>{setting.icon}</ListItemIcon>
                    <ListItemText>
                      <Typography sx={{ mx: 2 }}>{setting.name}</Typography>
                    </ListItemText>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};
export default Header;
