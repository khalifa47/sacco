"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import MenuItem from "@mui/material/MenuItem";
import LinearProgress from "@mui/material/LinearProgress";
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
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { createNotificationData, getTimeAgo } from "@/utils/helpers";
import { useToast } from "@/utils/hooks";

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
      <Image src="/logo_white.png" alt="logo" height={40} width={40} />
      <Typography letterSpacing={"0.2rem"} variant="h6" noWrap mr={10}>
        KADHI SACCO
      </Typography>
    </Box>
  );
};

const Notifications = ({
  anchorEl,
  notifications,
}: {
  anchorEl: null | HTMLElement;
  notifications: AppNotification[];
}) => {
  return (
    <Popper
      id="popper-notifications"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      transition
      sx={{ zIndex: 1 }}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper
            sx={{
              mt: 2,
              boxShadow: 1,
              borderRadius: 3,
              maxWidth: 400,
            }}
          >
            <List>
              {notifications.map((notification, index) => (
                <ListItem
                  key={notification.id}
                  disablePadding
                  divider={index !== notifications.length - 1}
                >
                  <ListItemButton
                    component={Link}
                    href={notification.go_to}
                    sx={{ flexDirection: "column" }}
                  >
                    <ListItemText
                      primary={notification.title}
                      secondary={notification.content}
                    />
                    <Typography
                      variant="body2"
                      color="#4f4f4f"
                      alignSelf="flex-end"
                    >
                      {getTimeAgo(notification.created_at)}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

const notifications = [
  createNotificationData({
    id: 1,
    title: "Guarantor Request",
    content:
      "You've got a guarantor request from Khalifa Fumo for a loan amount of Ksh. 200,000",
    go_to: "/loans/1",
    isRead: false,
    created_at: "2023-01-19 10:23:54",
  }),
  createNotificationData({
    id: 2,
    title: "Guarantor Request",
    content:
      "You've got a guarantor request from Khalifa Fumo for a loan amount of Ksh. 200,000",
    go_to: "/loans/1",
    isRead: false,
    created_at: "2023-01-19 10:23:54",
  }),
  createNotificationData({
    id: 3,
    title: "Guarantor Request",
    content:
      "You've got a guarantor request from Khalifa Fumo for a loan amount of Ksh. 200,000",
    go_to: "/loans/1",
    isRead: false,
    created_at: "2023-01-19 10:23:54",
  }),
];

const Header = () => {
  const { showToast } = useToast();

  const [loggingOut, setLoggingOut] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElNotification, setAnchorElNotification] =
    useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleToggleNotifications = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotification(anchorElNotification ? null : event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = async () => {
    setLoggingOut(true);
    try {
      const res = await fetch("/api/auth/logout", { method: "GET" });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg === "" ? res.statusText : msg);
      }
    } catch (error: any) {
      showToast(error.toString(), "error");
    } finally {
      setLoggingOut(false);
    }
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
      <AppBar
        position="absolute"
        sx={{
          maxHeight: "50px",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
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
                  <Link
                    key={page.name}
                    style={{ textDecoration: "none", color: "#000000DE" }}
                    href={`/${page.name.toLowerCase()}`}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <ListItemIcon>{page.icon}</ListItemIcon>
                      <ListItemText>
                        <Typography sx={{ mx: 2 }}>{page.name}</Typography>
                      </ListItemText>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  LinkComponent={Link}
                  key={page.name}
                  href={`/${page.name.toLowerCase()}`}
                  sx={{
                    m: 1,
                    color: "white",
                    display: "block",
                    ":hover": { color: "secondary.main" },
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                onClick={handleToggleNotifications}
                sx={{ color: "white" }}
              >
                <Badge badgeContent={notifications.length} color="secondary">
                  <NotificationsNoneOutlinedIcon />
                </Badge>
              </IconButton>
              <Notifications
                anchorEl={anchorElNotification}
                notifications={notifications}
              />

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
                {settings.map((setting) =>
                  setting.name === "Logout" && loggingOut ? (
                    <Box key={setting.name} width="80%" m="10px auto">
                      <LinearProgress />
                    </Box>
                  ) : (
                    <MenuItem key={setting.name} onClick={setting.action}>
                      <ListItemIcon>{setting.icon}</ListItemIcon>
                      <ListItemText>
                        <Typography sx={{ mx: 2 }}>{setting.name}</Typography>
                      </ListItemText>
                    </MenuItem>
                  )
                )}
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
