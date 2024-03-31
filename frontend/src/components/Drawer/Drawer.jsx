import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DateRangeIcon from "@mui/icons-material/DateRange";
import GppGoodIcon from "@mui/icons-material/GppGood";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Divider,
  Drawer,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Drawer.css";

const DRAWER_OPTIONS = [
  {
    key: "dashboard",
    displayText: "Dashboard",
    icon: <DashboardIcon style={{ color: "#030303", fontSize: "2rem" }} />,
    path: "/dashboard",
  },
  {
    key: "patientInfo",
    displayText: "Patient Info",
    icon: <PersonIcon style={{ color: "#030303", fontSize: "2rem" }} />,
    path: "/patientInfo",
  },
  {
    key: "calender",
    displayText: "Calender",
    icon: <CalendarMonthIcon style={{ color: "#030303", fontSize: "2rem" }} />,
    path: "/calender",
  },
  {
    key: "appointments",
    displayText: "Appointments",
    icon: <DateRangeIcon style={{ color: "#030303", fontSize: "2rem" }} />,
    path: "/appointments",
  },
  {
    key: "treatments",
    displayText: "Treatments",
    icon: <GppGoodIcon style={{ color: "#030303", fontSize: "2rem" }} />,
    path: "/treatments",
  },
];

export default function DrawerPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleItemClick = (item) => {
    navigate(item.path);
  };

  const isActive = (item) => {
    if (location.pathname === item.path) {
      return {
        background: "white",
        filter: "invert(1)",
      };
    } else {
      return false;
    }
  };

  const drawer = (
    <div style={{ textAlign: "center" }}>
      <h2>DentalC</h2>
      <Divider style={{ margin: "0px 20px" }} />
      <List>
        {DRAWER_OPTIONS.map((item, index) => (
          <ListItem key={item.key}>
            <ListItemButton
              onClick={() => handleItemClick(item)}
              style={{ ...isActive(item) }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <span
                    style={
                      isActive(item)
                        ? {
                            fontWeight: 600,
                            fontFamily: "Poppins",
                          }
                        : {
                            fontWeight: 400,
                            fontFamily: "Poppins",
                          }
                    }
                  >
                    {item.displayText}
                  </span>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider style={{ margin: "0px 20px" }} />
      <List>
        {/* {["Logout", "Trash", "Spam"].map((text, index) => ( */}
        <ListItem>
          <ListItemButton onClick={() => logout()}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
        {/* ))} */}
      </List>
    </div>
  );

  return (
    <>
      {isLoggedIn ? (
        <>
          {" "}
          <Fab
            className="floating-button"
            color="primary"
            aria-label="add"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </Fab>
          <Drawer
            className="ux-drawer"
            // container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            className="ux-drawer"
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
            }}
            open
          >
            {drawer}
          </Drawer>
        </>
      ) : null}
    </>
  );
}
