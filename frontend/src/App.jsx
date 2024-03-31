import { StyledEngineProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Content from "./components/Content/Content";
import Header from "./components/Header/Header";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { RecoilRoot } from "recoil";
import Dashboard from "./pages/Dashboard/Dashboard";
import DrawerPanel from "./components/Drawer/Drawer";

function App(props) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StyledEngineProvider injectFirst>
          <RecoilRoot>
            {/* <Header /> */}
            <DrawerPanel />
            <Content {...props}>
              <Routes>
                <Route path="/dashboard" exact element={<Dashboard />} />
                <Route path="/login" exact element={<Login />} />
                {/* <Route path="/about" exact component={About} /> */}
              </Routes>
            </Content>
          </RecoilRoot>
        </StyledEngineProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
