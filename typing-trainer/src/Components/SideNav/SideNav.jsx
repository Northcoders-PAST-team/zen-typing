import "../Nav/Nav.scss";

import { Link } from "react-router-dom";
import { db } from "../../firebaseConfig";
import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";

// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

//

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import PeopleIcon from "@mui/icons-material/People";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

import { UserContext } from "../User/UserContext";
import { useContext } from "react";

import {
  serverTimestamp,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const drawerWidth = 240;

const pages = ["About", "Community", "Statistics"];
const settings = ["Account", "Dashboard"];

const ResponsiveAppBar = () => {
  const { user, auth } = useContext(UserContext);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = () => {
    const usersRef = doc(db, "users", user.uid);
    updateDoc(usersRef, {
      online: false,
    }).then(() => {
      auth.signOut();
    });
  };

  return (
    <Box sx={{ display: "flex", background: "black" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>

      <Drawer
        sx={{
          background: "black",
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: ["Plus Jakarta Sans", "sans-serif"],
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            justifyContent: "center",
            paddingBottom: "20px",
            marginBottom: "60px",
          }}
        >
          Typing Trainer
        </Typography>
        <Divider />
        <MenuItem key="statistics" sx={{ fontSize: "50px", mt: "30px" }}>
          <LeaderboardIcon sx={{ mr: "20px", fontSize: "40px" }} />
          <Typography textAlign="center">Statistics</Typography>
        </MenuItem>

        <MenuItem key="community" sx={{ fontSize: "50px", mb: "30px" }}>
          <PeopleIcon sx={{ mr: "20px", fontSize: "40px" }} />
          <Typography textAlign="center">Community</Typography>
        </MenuItem>
        <Divider />
        {user ? null : (
          <Link to={`/signup`}>
            <MenuItem key="signup" sx={{ fontSize: "50px" }}>
              <HowToRegIcon sx={{ mr: "20px", fontSize: "40px" }} />
              <Typography textAlign="center">Sign Up</Typography>
            </MenuItem>
          </Link>
        )}
        {user ? (
          <Link to={`/users/${user.uid}`}>
            <MenuItem key="profile" sx={{ fontSize: "50px" }}>
              <AccountCircleIcon sx={{ mr: "20px", fontSize: "40px" }} />
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
          </Link>
        ) : null}
        {user ? (
          <Link to="/">
            <MenuItem
              key="Logout"
              onClick={handleCloseUserMenu}
              sx={{ fontSize: "50px" }}
            >
              <LogoutIcon sx={{ mr: "20px", fontSize: "40px" }} />
              <Typography textAlign="center" onClick={logOut}>
                Logout
              </Typography>
            </MenuItem>
          </Link>
        ) : (
          <Link to="/signin">
            <MenuItem key="Login" sx={{ fontSize: "50px" }}>
              <LoginIcon sx={{ mr: "20px", fontSize: "40px" }} />
              <Typography textAlign="center">Login</Typography>
            </MenuItem>
          </Link>
        )}
      </Drawer>
    </Box>
  );
};
export default ResponsiveAppBar;
