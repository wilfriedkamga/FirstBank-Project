import axios from "axios";
import Variable from "../Variable";

const routes = Variable.routeApi + "api/usermanagement/signin";
const route_verify_password =
  Variable.routeApi + "api/usermanagement/testPassword";
const route_update_profil =
  Variable.routeApi + "api/usermanagement/updateprofil";
const route_update_send_mailOtp =
  Variable.routeApi + "api/usermanagement/SendOtpMail";
const route_verfy_mail_otp =
  Variable.routeApi + "api/usermanagement/verifyOTPMail";
const route_upload_file = Variable.routeApi + "api/usermanagement/uploadFile";
const route_download_imageBase64 =
  Variable.routeApi + "api/usermanagement/imageBase64";
const route_user_has_account =
  Variable.routeApi + "api/usermanagement/userExist";

type TLoginModel = {
  phone: string;
  password: string;
};

type TProfilModel = {
  phone: string;
  newPhone: string;
  fullName: string;
  birthDate: string;
  gender: string;
  password: string;
  email: string;
  idCardIm: string;
  signature: string;
  photo: string;
};
type TUploadFileModel = {
  cniRecto: string;
  cniVerso: string;
  signature: string;
  photo: string;
  phone: string;
};

class Authentication {
  loginService(loginModel: TLoginModel) {
    return axios.post(routes, loginModel);
    
  }

  verifyPasswordService(phone: string, password: string) {
    const loginModel: TLoginModel = {
      phone: phone,
      password: password,
    };
    console.log(loginModel);
    return axios.post(route_verify_password, loginModel);
  }
  verifyUserHasAccount(phone: string) {
    const loginModel = {
      phone: phone,
    };
   

    return axios.post(route_user_has_account, loginModel);
  }

  ChangePassword(phone: string, password: string) {
    const loginModel = {
      phone: phone,
      newPhone: phone,
      password: password,
    };
    console.log(loginModel);
    return axios.post(route_update_profil, loginModel);
  }

  updateProfil(profilModel: any) {
    return axios.post(route_update_profil, profilModel);
  }

  uploadFile(profilModel: any) {
    return axios.post(route_upload_file, profilModel, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  downloadImageBase64(profilModel: any) {
    console.log(profilModel);
    return axios.post(route_download_imageBase64, profilModel);
  }

  SendMailOtp(mail: string) {
    const tempUser = {
      email: mail,
    };
    console.log(tempUser);
    return axios.post(route_update_send_mailOtp, JSON.stringify(tempUser));
  }

  VerifyMailOtp(mail: string, code: string) {
    const tempUser = {
      email: mail,
      code: code,
    };
    console.log(tempUser);
    return axios.post(route_verfy_mail_otp, JSON.stringify(tempUser));
  }
}

export default new Authentication();
