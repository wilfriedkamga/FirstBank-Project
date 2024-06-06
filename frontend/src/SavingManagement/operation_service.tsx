import axios from "axios";
// Operation management
axios.defaults.baseURL = "http://62.169.22.170:8082";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const getAuthToken = () => {
    return localStorage.getItem("auth_token");
}

export const setAuthToken = (token : string) => {
    window.localStorage.setItem("auth_token", token);
}

export const request = (method: string, url: string, data: any) => {
    let headers = {};
    if (getAuthToken() !== null && getAuthToken()!== "null") {
        headers = {"Authorization": `Bearer ${getAuthToken()}`};
    }
    return axios({
        method: method,
        headers: headers,
        url: url,
        data: data
    });
}
