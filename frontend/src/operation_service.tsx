import axios from "axios";
import Variable from "./Variable";
// Operation management
axios.defaults.baseURL = Variable.operation_service_base_url;
axios.defaults.headers.post["Content-Type"] = "application/json";

export const getAuthToken = () => {
  return localStorage.getItem("auth_token");
};

export const setAuthToken = (token: string) => {
  window.localStorage.setItem("auth_token", token);
};

export const request = (method: string, url: string, data: any) => {
  let headers = {};
  if (getAuthToken() !== null && getAuthToken() !== "null") {
    headers = { Authorization: `Bearer ${getAuthToken()}` };
  }
  return null /*axios({
    method: method,
    headers: headers,
    url: url,
    data: data,
  });*/
};
