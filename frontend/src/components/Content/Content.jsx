/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { checkToken } from "../../service/http-service/login.service";

/* eslint-disable react/prop-types */
function Content(props) {
  const navigate = useNavigate();
  let location = useLocation();
  const { children } = props;
  const { isLoggedIn, login, logout } = useAuth();

  useEffect(() => {
    getLoggedInState();
  }, [isLoggedIn]);

  const getLoggedInState = async () => {
    await checkToken().then((response) => {
      if (!response) {
        navigate("/login");
        logout();
      } else {
        login();
      }
    });
  };

  const handleAuthenticatedPageRender = () => {
    if (isLoggedIn && location.pathname !== "/login") {
      return (
        <div className="main-content-container">
          <div id="back-to-top-anchor"></div>
          {children}
        </div>
      );
    } else if (location.pathname === "/login") {
      return (
        <>
          <div id="back-to-top-anchor"></div>
          {children}
        </>
      );
    }
  };

  return (
    <>
      {" "}
      <ToastContainer limit={8} stacked />
      {handleAuthenticatedPageRender()}
    </>
  );
}

export default Content;
