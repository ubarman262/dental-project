import Cookies from "js-cookie";

function setData(key, data) {
  Cookies.set(key, data, { path: "/" });
}

function getData(key) {
  return Cookies.get(key);
}

function removeData(key) {
  Cookies.remove(key, { path: "/" });
}

export { setData, getData, removeData };
