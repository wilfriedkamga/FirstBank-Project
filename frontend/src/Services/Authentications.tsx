import axios from "axios";
import Variable from "../Variable";

const routes=Variable.routeApi +"api/usermanagement/signin"

type TLoginModel={
  phone:string,
  password:string
}
class Authentication{
    
    loginService(loginModel:TLoginModel){

        return axios.post(routes,loginModel) ;
     }

}

export default new Authentication;