import axios from "axios";
import Variable from "../Variable";
// Saving

axios.defaults.baseURL = Variable.saving_base_url;
axios.defaults.headers.post["Content-Type"] = "application/json";

export const request = (method: string, url: string, data: any) => {
    return axios({
        method: method,
        url: url,
        data: data
    });
}