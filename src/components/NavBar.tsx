import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link as RouterLink } from "react-router-dom";
import { NetworkSelector } from "./NetworkSelector";
import { AccountSelector } from "./AccountSelector.js";

const NavBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const navItems = [
    { label: "Swap", path: "/" },
    { label: "Pool / Add", path: "/add" },
    { label: "Admin", path: "/admin" },
  ];

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 1, sm: 2 },
          }}
        >
          {/* Logo + Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1.5, sm: 2 },
            }}
          >
            <Box
              sx={{
                width: { xs: 30, sm: 36 },
                height: { xs: 30, sm: 36 },
                borderRadius: "50%",
                background: "linear-gradient(45deg,#FF007A,#FF8AC6)",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Cloak Finance
            </Typography>
          </Box>

          {/* Desktop nav buttons */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            {navItems.map(item => (
              <Button
                key={item.path}
                component={RouterLink}
                to={item.path}
                color="inherit"
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Spacer / flex grow so network selector stays right */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }} />

          {/* Network Selector always visible, under title on mobile */}
          <Box
            sx={{
              minWidth: { xs: "100%", sm: "auto" },
              mt: { xs: 1, sm: 0 },
              order: { xs: 3, sm: 2 },  // to position after buttons if needed
            }}
          >
            <NetworkSelector />
          </Box>
          <Box
            sx={{
              minWidth: { xs: "100%", sm: "auto" },
              mt: { xs: 1, sm: 0 },
              order: { xs: 3, sm: 2 },  // to position after buttons if needed
            }}
          >
            <AccountSelector />
          </Box>
          {/* Hamburger menu (mobile only) */}
          <Box sx={{ display: { xs: "flex", sm: "none" } }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile navigation */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true, // improves performance on mobile
        }}
      >
        <Box
          sx={{
            width: 250,
            pt: 2,
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {navItems.map(item => (
              <ListItem
                key={item.path}
                component={RouterLink}
                to={item.path}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>

        </Box>
      </Drawer>
    </>
  );
};

export default NavBar;
