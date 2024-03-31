/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkToken } from "../../service/http-service/login.service";
import { useAuth } from "../../context/AuthContext";

/* eslint-disable react/prop-types */
function Content(props) {
  const navigate = useNavigate();
  let location = useLocation();
  const { children } = props;
  const { isLoggedIn, login, logout } = useAuth();

  useEffect(() => {
    Promise.all[getLoggedInState()];
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

  return <>{handleAuthenticatedPageRender()}</>;
}

export default Content;
