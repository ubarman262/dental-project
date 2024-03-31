/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Takeover from "../../components/Dialogs/Takeover/Takeover";
import { useAuth } from "../../context/AuthContext";
import { userLogin } from "../../service/http-service/login.service";
import { setData } from "../../utils/Cookies.utils";

import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [openTakeoverDialog, setOpenTakeoverDialog] = useState(false);
  const [loginData, setLoginData] = useState(null);

  const onSubmit = async (data) => {
    await userLogin(data)
      .then((data) => {
        setData("token", data.token);
        login();
      })
      .catch((err) => {
        if (err.message === "Session already active") {
          setLoginData(data);
          setOpenTakeoverDialog(true);
        }
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  return (
    <div className="login-bg-container">
      <Takeover
        open={openTakeoverDialog}
        close={() => setOpenTakeoverDialog(false)}
        data={loginData}
        login={login}
      />
      {/* <img className="login-top-circle" src={Circle} alt="circle" width={500} /> */}
      {/* <img className="login-bottom-circle" src={Circle} alt="circle" width={300} /> */}
      <div className="login-form-container">
        <h1>DentalC</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="ux-input"
            type="text"
            placeholder="Username"
            {...register("username", {
              required: true,
            })}
          />
          {errors?.username?.type === "required" && (
            <span className="form-input-error">This field is required</span>
          )}
          <br />
          <input
            className="ux-input"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors?.password?.type === "required" && (
            <span className="form-input-error">This field is required</span>
          )}
          <br />
          <input className="ux-button" type="submit" />
        </form>
      </div>
    </div>
  );
}
