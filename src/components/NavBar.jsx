import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(45deg,#FF007A,#FF8AC6)",
            }}
          />
          <Typography variant="h6">Cloak Finance</Typography>
        </Box>

        <Box>
          <Button component={RouterLink} to="/" sx={{ mr: 1 }}>
            Swap
          </Button>
          <Button component={RouterLink} to="/add">
            Pool / Add
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
