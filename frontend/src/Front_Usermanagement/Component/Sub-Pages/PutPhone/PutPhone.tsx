import React, { useEffect, useState } from "react";
import logo from "../../../../Front_Association/Assets/FBLogo.png";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import SimpleDialog from "../../../../Front_Association/Component/Elementary/Dialog/SimpleDialog";
import Variable from "../../../../Variable";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useTranslation } from "react-i18next";
import SubmitedButton from "../../../../Front_Association/Component/MuiCustomComponent/SubmitedButton";
import SimpleButtonLink from "../../../../Front_Association/Component/MuiCustomComponent/SimpleButtonLink";

type ChildComponentProps = {
  handleClick: (code: string) => void;
  togglePassword: () => void;
  uploadOtpCodeToParent: (value: string, phone: string) => void;
};

type Props = {
  otpCode: string;
};

const PutPhone: React.FC<ChildComponentProps> = ({
  handleClick,
  togglePassword,
  uploadOtpCodeToParent,
}) => {
  const messageError =
    "L'utilisateur avec ce numéro de téléphone n'existe pas dans notre base de données. Veuillez vérifier si vous n'avez pas fait d'erreure";

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(messageError);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseDialog = () => {
    setDialogVisibility(false);
  };

  const OTPGenerate = (nb: number) => {
    const characters = "0123456789";
    let otp = "";

    for (let i = 0; i < nb; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      otp += characters[randomIndex];
    }

    return otp;
  };

  const otpcode = "12345"; // OTPGenerate(5);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (phone.length <= 3) {
      setDialogMessage("Please enter a valid number phone");
      setDialogVisibility(true);
      setIsLoading(false);
    } else {
      setDialogMessage(messageError);
      setTimeout(() => {
        // Contenu de la méthode handleSubmit à exécuter après le délai de 3 secondes
        // ...
        // Faire ce que vous voulez faire après le délai de 3 secondes
        const route = Variable.routeApi + "api/usermanagement/sendOTP";

        const tempUser = {
          phone: phone,
        };

        axios
          .post(`${route}`, tempUser)
          .then((response) => {
            const otp = response.data.data.code;
            uploadOtpCodeToParent(otp, phone);
            setDialogMessage("otp code has been send in your phone ");
            setDialogVisibility(true);
            handleClick(otp);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setDialogMessage(dialogMessage);
            setDialogVisibility(true);
            setIsLoading(false);
          });

        // Désactiver le chargement après l'exécution
      }, 3000);
    }
  };

  return (
    <section className="bg-white w-full h-full  lg:w-[28vw] lg:h-[90vh] p-4 dark:bg-gray-900 relative lg:rounded-xl">
      <div className="">
        <div className=" max-w-2xl mx-auto lg:w-4/5">
          <div className="w-full">
            <h1 className="text-xl p-2 rounded-lg flex gap-4 text-red-600 font-semibold tracking-wider   mt-3 capitalize dark:text-white">
              <button className=" flex  bg-gray-100 shadow-lg p-1 justify-center text-center items-center rounded-lg">
                <ArrowBackIosIcon />{" "}
              </button>
              {t("usermanagement.putPhone.title")}
            </h1>
            <div className="absolute z-20 ml-4 lg:ml-0  mt-20 lg:mt-20 lg:mr-15 w-4/5">
              {dialogVisibility ? (
                <SimpleDialog
                  message={dialogMessage}
                  handleClose={() => handleCloseDialog()}
                />
              ) : null}
            </div>

            <p className="mt-4 text-gray-500 dark:text-gray-400 text-center">
              {t("usermanagement.putPhone.welcomeMessage")}
            </p>

            <form className="gap-6 mt-8 " onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-[40px]">
                <label className="block mb-2 ">
                  {t("usermanagement.signin.labelPhone")}
                </label>
                <PhoneInput
                  inputClass="block w-full h-full mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  country={"cm"}
                  onChange={(value: any) => setPhone(value)}
                  countryCodeEditable={false}
                />
              </div>

              <SubmitedButton
                isLoading={isLoading}
                text={t("usermanagement.putPhone.sendButton")}
              />
              <p className="mt-3  text-center ">
                {t("usermanagement.putPhone.backMessage")} &nbsp;
                <SimpleButtonLink
                  fontSize="14px"
                  text={t("usermanagement.putPhone.signinButton")}
                  onClick={() => togglePassword()}
                />
              </p>
            </form>
            <img
              src={logo}
              alt="Logo Afriland First Bank"
              className="lg:pb-8  p-5 lg:w-50 lg:h-25 lg:relative lg:t-10 "
            ></img>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PutPhone;
