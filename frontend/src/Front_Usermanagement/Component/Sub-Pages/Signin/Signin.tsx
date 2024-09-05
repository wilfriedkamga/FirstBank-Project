import React, { useEffect, useState } from "react";
import axios from "axios";
import { Await, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Signin.css";
import logo from "../../../../Front_Association/Assets/FBLogo.png";
import SimpleDialog from "../../../../Front_Association/Component/Elementary/Dialog/SimpleDialog";
import Authentications from "../../../../Services/Authentications";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Variable from "../../../../Variable";
import { useTranslation } from "react-i18next";
import TextFieldPassword from "../../../../Front_Association/Component/MuiCustomComponent/TextFieldPassword";
import SubmitedButton from "../../../../Front_Association/Component/MuiCustomComponent/SubmitedButton";
import SimpleButtonLink from "../../../../Front_Association/Component/MuiCustomComponent/SimpleButtonLink";
import { Box } from "@mui/material";
import LabelField from "../../../../Front_Association/Component/MuiCustomComponent/LabelField";
import NotificationService from "../../../../Services/NotificationService";

/* definitiion des nouveaux types*/

type ChildComponentProps = {
  handleClick: () => void;
  togglePassword: () => void;
  toggleOtp: () => void;
  uploadCodeToComponent: (value: string, signin: boolean) => void;
};

/** deut de la fonction de signin */

const Signup: React.FC<ChildComponentProps> = ({
  handleClick,
  togglePassword,
  toggleOtp,
  uploadCodeToComponent,
}) => {
  /* Definition des variables pour stocker l'état de nos composants*/

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(
    "Incorrect password or phone"
  );

  const [showPasswordError, setShowPasswordError] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange2 = (value: string) => {
    setPassword(value);
    setShowPasswordError(value.length < 6); // Ex: Erreur si le mot de passe a moins de 6 caractères
  };

  /** Definition des différentes fonctions à utiliser */

  // fonction de tradcution
  const { t } = useTranslation();

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const handleCloseDialog = () => {
    setErrorVisibility(false);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (phone.length <= 3) {
      setDialogMessage("veuillez entrer un numéro de téléphone correct");
      setErrorVisibility(true);
    } else {
      setDialogMessage("Téléphone ou mot de passe incorrects");

      const tempUser = {
        phone: phone,
        password: password,
      };
      setIsLoading(true);

      Authentications.loginService(tempUser)
        .then((response: any) => {
          setErrorVisibility(false);
          const data = Variable.setLocalStorageItem("user", response.data.data);
          console.log("Voici le code " + response.data.responseCode);
          const fcmToken = Variable.getLocalStorageItem("fcmToken");
          if (response.data.responseCode == 2) {
            setDialogMessage(
              "votre compte n'est pas activé, Vous serez rediriger vers la vérification de votre compte"
            );

            const route = Variable.routeApi + "api/usermanagement/sendOTP";

            const tempUser = {
              phone: phone,
            };

            axios
              .post(`${route}`, tempUser)
              .then((response) => {
                const otp = response.data.data.code;
                setDialogMessage("Un Nouveau code vous a été envoyé");
                // Un nouveau code otp vous a ete envoye
              })
              .catch((error) => {});

            setErrorVisibility(true);
            uploadCodeToComponent(phone, true);
            toggleOtp();
          } else {
            NotificationService.StoreToken(phone, fcmToken)
              .then((response) => {
                console.log(
                  "Le token a été stokcé avec succèss dans notre base de donnéés "
                );
              })
              .catch((error) => {
                console.log(
                  "Désolé, mais vous ne pourrez pas recevoir de push notification. "
                );
              });
            navigate("/home");
          }
        })
        .catch((error: any) => {
          console.log(error);
          setErrorVisibility(true);
        });
    }
  };

  return (
    <section className="bg-white w-full relative h-full lg:w-[28vw] lg:h-[90vh] dark:bg-gray-900 lg:rounded-xl p-4">
      <div className="">
        <div className=" max-w-2xl mx-auto lg:w-4/5 ">
          <div className="w-full h-full ">
            <h1 className="text-xl flex gap-10  mb-4 text-red-600 font-semibold tracking-wider  text-center mt-3 capitalize dark:text-white">
              <button
                onClick={() => handleClick()}
                className=" flex justify-start text-center ml-4 items-center rounded-lg"
              >
                <ArrowBackIosIcon />{" "}
              </button>
              {t("usermanagement.signin.title")}
            </h1>
            <div className="absolute z-20 ml-4 lg:ml-0  mt-20 lg:mt-20 lg:mr-15 w-4/5">
              {errorVisibility ? (
                <SimpleDialog
                  message={dialogMessage}
                  handleClose={() => handleCloseDialog()}
                />
              ) : null}
            </div>
            <form
              className="gap- mt-6 flex flex-col "
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="mt-3">
                <LabelField text={t("usermanagement.signin.labelPhone")} />
                <PhoneInput
                  inputClass="block required:true w-full h-full mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  country={"cm"}
                  onChange={(value: any) => setPhone(value)}
                  countryCodeEditable={false}
                />
              </div>

              <div className="mt-5">
                <LabelField text={t("usermanagement.signin.labelPassword")} />
                <Box>
                  <TextFieldPassword
                    required
                    label="Mot de passe"
                    value={password}
                    onChange={handlePasswordChange2}
                    placeholder={t("usermanagement.signin.placeHolderPassword")}
                    helperText={
                      showPasswordError
                        ? "Le mot de passe doit contenir au moins 6 caractères"
                        : ""
                    }
                    error={showPasswordError}
                    unview={true} // Par défaut, le mot de passe est masqué
                  />
                </Box>
                <div className="mb-6">
                  <SimpleButtonLink
                    text={t("usermanagement.signin.messageForgetPassword")}
                    float="right"
                    onClick={() => togglePassword()}
                  />
                </div>
              </div>
              <div className="mt-6 ">
                <SubmitedButton
                  text={t("usermanagement.signin.signinButton")}
                />
              </div>

              <p className="flex items-center justify-center mr-1 mt-3">
                {t("usermanagement.signin.haveAccountMessage")}
                <SimpleButtonLink
                  fontSize="14px"
                  text={t("usermanagement.signin.signupButton")}
                  onClick={() => handleClick()}
                />
              </p>
            </form>
            <img
              src={logo}
              alt="Logo Afriland First Bank"
              className="lg:pb-8 p-5 lg:w-50 lg:h-25 lg:relative lg:t-10 "
            ></img>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
