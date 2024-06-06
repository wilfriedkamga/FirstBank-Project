import axios from "axios";
// Saving

axios.defaults.baseURL = "http://62.169.22.170:8085";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const request = (method: string, url: string, data: any) => {
    return axios({
        method: method,
        url: url,
        data: data
    });
}
