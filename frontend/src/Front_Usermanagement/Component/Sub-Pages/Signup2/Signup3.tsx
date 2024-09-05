import React, { useEffect, useState } from "react";
import logo from "../../../../Front_Association/Assets/FBLogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Signup.css";
import SimpleDialog from "../../../../Front_Association/Component/Elementary/Dialog/SimpleDialog";
import Variable from "../../../../Variable";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Authentications from "../../../../Services/Authentications";
import { useTranslation } from "react-i18next";
import LabelField from "../../../../Front_Association/Component/MuiCustomComponent/LabelField";
import TextFieldPassword from "../../../../Front_Association/Component/MuiCustomComponent/TextFieldPassword";
import SubmitedButton from "../../../../Front_Association/Component/MuiCustomComponent/SubmitedButton";
import SimpleButtonLink from "../../../../Front_Association/Component/MuiCustomComponent/SimpleButtonLink";

type ChildComponentProps = {
  handleClick: () => void;
  toggleSinup2: () => void;
  togglePrevious: () => void;
  fullName: string;
  mail: string;
  birthDate: string;
  gender: string;
  uploadCodeToComponent: (value: string) => void;
  uploadFieldValueCodeToPrevious: (
    fullName: string,
    mail: string,
    birthDate: string,
    gender: string
  ) => void;
};
const Signup3: React.FC<ChildComponentProps> = ({
  handleClick,
  toggleSinup2,
  togglePrevious,
  fullName,
  mail,
  birthDate,
  gender,
  uploadCodeToComponent,
  uploadFieldValueCodeToPrevious,
}) => {
  const messageError = "Votre compte a été créee avec succèss";
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [response, setResponse] = useState("");
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(messageError);

  const { t } = useTranslation();

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  const handleCloseDialog = () => {
    setDialogVisibility(false);
  };
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };
  const handlePasswordChange = (value:string) => {
    setPassword(value);
  };
  const handleConfirmPasswordChange = (value:string
  ) => {
    setConfirmPassword(value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsLoading(true)
    
    if (password != Confirmpassword || phone.length<=3) {
      
       if(phone.length<=3){
        setDialogMessage("veuillez entrer un numéro de téléphone correct");
        setDialogVisibility(true);
        setIsLoading(false)
        
       }
       else{
        setDialogMessage("Password doesn't match with confirm password !");
        setDialogVisibility(true);
        setIsLoading(false)
       }
     
    } else {
      setDialogMessage(messageError);
      const tempUser = {
        phone: phone,
        email: mail,
        fullname: fullName,
        birthDate: birthDate,
        gender: gender,
        password: password,
      };
      const tempLogin = {
        phone: phone,
        password: password,
      };
      const route = Variable.routeApi + "api/usermanagement/signup";

      axios
        .post(`${route}`, tempUser)
        .then((response) => {
          Authentications.loginService(tempLogin)
            .then((response: any) => {
              const data = Variable.setLocalStorageItem(
                "user",
                response.data.data
               
              );
              setIsLoading(false)
            })
            .catch((error: any) => {
              console.log("Une erreure s'est produite lors du login");
              setIsLoading(false)
            });

          setDialogVisibility(true);
          uploadCodeToComponent(phone);
          toggleSinup2();
        })
        .catch((error) => {
          console.log();
          setDialogMessage(error.response.data.message);
          setDialogVisibility(true);
          console.log(error);
          setIsLoading(false)
        });
    }
  };

  return (
    <section className="bg-white relative w-full  box-shadow lg:w-[28vw] lg:h-[90vh] lg:p-4 p-5 dark:bg-gray-900 lg:rounded-xl">
      <div className="">
        <div className=" max-w-2xl mx-auto lg:w-4/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider  flex gap-10  text-red-600 mt-10 lg:mt-3 text-gray-800 text-center  capitalize dark:text-white">
              <button
                onClick={() => {
                  console.log(fullName + mail + birthDate + gender);
                  uploadFieldValueCodeToPrevious(
                    fullName,
                    mail,
                    birthDate,
                    gender
                  );
                  togglePrevious();
                }}
                className=" flex justify-center text-center p-1 items-center rounded-lg"
              >
                <ArrowBackIosIcon />{" "}
              </button>
              {t("usermanagement.signup.title")}
            </h1>
            <div className="absolute z-20 ml-4 lg:ml-0  mt-20 lg:mt-20 lg:mr-15 w-4/5">
              {dialogVisibility ? (
                <SimpleDialog
                  message={dialogMessage}
                  handleClose={() => handleCloseDialog()}
                />
              ) : null}
            </div>

            <form className="gap-7 mt-4 flex flex-col " onSubmit={(e) => handleSubmit(e)}>
              <div>
                <LabelField text={t("usermanagement.signin.labelPhone")} />
                <PhoneInput
                  inputClass="block w-full h-full mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  country={"cm"}
                  onChange={(value: any) => setPhone(value)}
                  countryCodeEditable={false}
                />
              </div>

              <div>
                <LabelField text={t("usermanagement.signin.labelPassword")} />
                <TextFieldPassword
                  required
                  label="Mot de passe"
                  value={password}
                  onChange={(value:string)=>handlePasswordChange(value)}
                  placeholder={t("usermanagement.signin.placeHolderPassword")}
                />
                
              </div>

              <div >
                <LabelField
                  text={t("usermanagement.signup.labelConfirmPassword")}
                />
                <TextFieldPassword
                  required
                  label="Mot de passe"
                  value={Confirmpassword}
                  onChange={(value:string)=>handleConfirmPasswordChange(value)}
                  placeholder={t("usermanagement.signin.placeHolderPassword")}
                />
              </div>
              <SubmitedButton isLoading={isLoading} text={t("usermanagement.signup.signupButton")}/>
              <p className="flex items-center justify-center mt-2">
                {t("usermanagement.signup.haveAccountMessage")}
                <SimpleButtonLink text={t("usermanagement.signup.signinButton")} fontSize="14px" onClick={() => handleClick()}/>
              </p>
            </form>
            <img
              src={logo}
              alt="Logo Afriland First Bank"
              className="lg:pb-8  lg:mb-9 lg:w-50 lg:h-25 lg:relative lg:t-10 "
            ></img>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup3;
