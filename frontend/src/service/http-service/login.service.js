import axios from "axios";
import { getData } from "../../utils/Cookies.utils";

const BASE_URL = "http://localhost:3001/api";

async function userLogin(data) {
  const payload = {
    username: data.username,
    password: data.password,
  };

  return axios
    .post(`${BASE_URL}/auth/login`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
}

async function checkToken() {
  const token = getData("token");

  if (token) {
    return axios
      .get(`${BASE_URL}/auth/validity`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.valid) {
          return true;
        }
      })
      .catch(() => {
        return false;
      });
  } else {
    return false;
  }
}

async function tokeOverSession(data) {
  const payload = {
    username: data.username,
    password: data.password,
  };

  return axios
    .post(`${BASE_URL}/auth/takeover`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
}

async function userLogout() {
  const token = getData("token");

  return axios
    .post(
      `${BASE_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
}
export { userLogin, checkToken, tokeOverSession, userLogout };
