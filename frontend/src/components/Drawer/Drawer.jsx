// import DashboardIcon from "@mui/icons-material/Dashboard";
// import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
// import PersonIcon from "@mui/icons-material/Person";
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
import CalenderIcon from "../../assets/calender.svg";
import PersonsGroupIcon from "../../assets/person-2.svg";
import PersonIcon from "../../assets/person.svg";
import ToothIcon from "../../assets/tooth.svg";
import DashboardIcon from "../../assets/graph.svg";
import LogoutIcon from "../../assets/logout.svg";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Drawer.css";

const DRAWER_WIDTH = 241;

const DRAWER_OPTIONS = [
  {
    key: "dashboard",
    displayText: "Dashboard",
    icon: (
      <img
        src={DashboardIcon}
        width={26}
        style={{ color: "#030303", fontSize: "2rem" }}
      />
    ),
    path: "/dashboard",
  },
  {
    key: "patientInfo",
    displayText: "Patient Info",
    icon: (
      <img
        src={PersonIcon}
        width={27}
        style={{ color: "#030303", fontSize: "2rem" }}
      />
    ),
    path: "/patientInfo",
  },
  {
    key: "calender",
    displayText: "Calender",
    icon: (
      <img
        src={CalenderIcon}
        width={25}
        style={{ color: "#030303", fontSize: "2rem" }}
      />
    ),
    path: "/calender",
  },
  {
    key: "appointments",
    displayText: "Appointments",
    icon: (
      <img
        src={PersonsGroupIcon}
        width={28}
        style={{ color: "#030303", fontSize: "2rem" }}
      />
    ),
    path: "/appointments",
  },
  {
    key: "treatments",
    displayText: "Treatments",
    icon: (
      <img
        src={ToothIcon}
        width={25}
        style={{ color: "#030303", fontSize: "2rem" }}
      />
    ),
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
        {DRAWER_OPTIONS.map((item) => (
          <ListItem key={item.key}>
            <ListItemButton
              onClick={() => handleItemClick(item)}
              style={{ ...isActive(item) }}
            >
              <ListItemIcon style={{ justifyContent: "center" }}>
                {item.icon}
              </ListItemIcon>
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
      <List style={{ position: "absolute", bottom: "10px" }}>
        <ListItem>
          <ListItemButton
            onClick={() => logout()}
            style={{ border: "none", boxShadow: "none" }}
          >
            <ListItemIcon style={{ justifyContent: "center" }}>
              <img
                className="ux-img-icon"
                src={LogoutIcon}
                width={25}
                style={{ color: "#030303", fontSize: "2rem" }}
              />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
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
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: DRAWER_WIDTH,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            className="ux-drawer"
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: DRAWER_WIDTH,
              },
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
