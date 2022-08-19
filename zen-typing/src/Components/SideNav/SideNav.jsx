import "../Nav/Nav.scss";
import "./SideNav.scss";
import logo from "../../images/logo.svg";
import animatedLogo from "../../images/animated-logo.gif";

import { Link } from "react-router-dom";
import { db } from "../../firebaseConfig";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import PeopleIcon from "@mui/icons-material/People";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import { UserContext } from "../User/UserContext";
import { useContext } from "react";

import { doc, updateDoc } from "firebase/firestore";

const drawerWidth = 350;

const ResponsiveAppBar = ({ startCounting }) => {
  const { user, auth } = useContext(UserContext);

  const logOut = () => {
    const usersRef = doc(db, "users", user.uid);
    updateDoc(usersRef, {
      online: false,
    }).then(() => {
      auth.signOut();
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      ></AppBar>

      <Drawer
        sx={{
          color: "white",
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "290px",
            boxSizing: "border-box",
            background: "rgba(0, 0, 0, 0.55)",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />

        <Link to="/" style={{ textDecoration: "none" }}>
          <img
            className="logo"
            src={startCounting ? animatedLogo : logo}
            alt="zen-typing-logo"
          />
        </Link>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: ["Plus Jakarta Sans", "sans-serif"],
            fontWeight: 800,
            letterSpacing: ".1rem",
            color: "white",
            textDecoration: "none",
            justifyContent: "center",
            paddingBottom: "20px",
            marginBottom: "60px",
          }}
        ></Typography>
        <Divider />

        {user ? (
          <p style={{ color: "white", textAlign: "center" }}>
            Logged in as{" "}
            <Link to={`/users/${user.uid}`}>
              {" "}
              <strong>{user.displayName || user.email}</strong>
            </Link>
          </p>
        ) : null}

        <Link to="/about">
          <MenuItem
            href="/about"
            key="about"
            sx={{
              fontSize: "50px",
              mb: "30px",
              ml: "20px",
              color: "white",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "rgba(149, 0, 175, 0.45)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "rgba(0, 0, 0, 0)")
            }
          >
            <AutoStoriesIcon
              sx={{ mr: "20px", ml: "20px", fontSize: "40px" }}
            />
            <Typography textAlign="center">About</Typography>
          </MenuItem>
        </Link>
        <Link to="/users">
          <MenuItem
            key="community"
            sx={{ fontSize: "50px", mb: "30px", ml: "20px", color: "white" }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "rgba(149, 0, 175, 0.45)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "rgba(0, 0, 0, 0)")
            }
          >
            <PeopleIcon sx={{ mr: "20px", ml: "20px", fontSize: "40px" }} />
            <Typography textAlign="center">Community</Typography>
          </MenuItem>
        </Link>
        <Divider />
        {user ? null : (
          <Link to={`/signup`}>
            <MenuItem
              key="signup"
              sx={{ fontSize: "50px", mb: "20px", ml: "20px", color: "white" }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgba(149, 0, 175, 0.45)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "rgba(0, 0, 0, 0)")
              }
            >
              <HowToRegIcon sx={{ mr: "20px", ml: "20px", fontSize: "40px" }} />
              <Typography textAlign="center">Sign Up</Typography>
            </MenuItem>
          </Link>
        )}
        {user ? (
          <Link to={`/users/${user.uid}`}>
            <MenuItem
              key="profile"
              sx={{ fontSize: "50px", mb: "20px", ml: "35px", color: "white" }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgba(149, 0, 175, 0.45)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "rgba(0, 0, 0, 0)")
              }
            >
              <AccountCircleIcon sx={{ mr: "20px", fontSize: "40px" }} />
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <Divider />
          </Link>
        ) : null}
        {user ? (
          <Link to="/">
            <MenuItem
              key="Logout"
              onClick={logOut}
              sx={{ fontSize: "50px", ml: "35px", color: "white" }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgba(149, 0, 175, 0.45)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "rgba(0, 0, 0, 0)")
              }
            >
              <LogoutIcon sx={{ mr: "20px", fontSize: "40px" }} />
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Link>
        ) : (
          <Link to="/signin">
            <MenuItem
              key="Login"
              sx={{ fontSize: "50px", ml: "35px", color: "white" }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgba(149, 0, 175, 0.45)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "rgba(0, 0, 0, 0)")
              }
            >
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
