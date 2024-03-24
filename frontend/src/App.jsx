import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header/Header";
import { StyledEngineProvider } from "@mui/material";
import Content from "./components/Content/Content";

function App(props) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StyledEngineProvider injectFirst>
          <Header />
          <Content {...props}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Content>
        </StyledEngineProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
