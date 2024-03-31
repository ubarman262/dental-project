import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";
import { userLogout } from "../../service/http-service/login.service";

const navItems = ["Home", "About", "Services", "Contact", "Logout"];

const Header = () => {
  const { isLoggedIn, logout } = useAuth();

  const handleMenuClick = async (item) => {
    if (item === "Logout") {
      await userLogout()
        .then(() => {
          logout();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  return (
    <>
      {isLoggedIn ? (
        <AppBar className="appBar" component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              //   onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            ></IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              MUI
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{ color: "black" }}
                  onClick={() => handleMenuClick(item)}
                >
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      ) : null}
    </>
  );
};

export default Header;
