/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useMemo, useState } from "react";
import { removeData } from "../utils/Cookies.utils";
import { userLogout } from "../service/http-service/login.service";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = async () => {
    if (isLoggedIn)
      await userLogout()
        .then(() => {
          setIsLoggedIn(false);
          removeData("token");
        })
        .catch((err) => {
          console.log(err.message);
        });
  };

  // Memoize the context value to prevent unnecessary re-renders
  const authContextValue = useMemo(
    () => ({
      isLoggedIn,
      login,
      logout,
    }),
    [isLoggedIn]
  ); // Update the value only when isLoggedIn changes

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuth };
