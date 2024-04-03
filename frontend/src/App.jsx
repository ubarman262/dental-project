import { StyledEngineProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./App.css";
import Content from "./components/Content/Content";
import DrawerPanel from "./components/Drawer/Drawer";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Footer from "./components/Footer/Footer";

function App(props) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StyledEngineProvider injectFirst>
          <RecoilRoot>
            <Content {...props}>
              <DrawerPanel />
              <Routes>
                <Route path="/dashboard" exact element={<Dashboard />} />
                <Route path="/login" exact element={<Login />} />
              </Routes>
            </Content>
            <Footer />
          </RecoilRoot>
        </StyledEngineProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
