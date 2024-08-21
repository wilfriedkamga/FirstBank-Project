import React, { ChangeEvent, useState } from "react";
import { InputOtp } from "primereact/inputotp";
import sendSMS from "../../SendSMS/SendSms";
import logo from "../../../../Assets/Images/FBLogo.png";
import axios from "axios";
import SimpleDialog from "../../Elementary/Dialog/SimpleDialog";
import { Navigate, useNavigate } from "react-router-dom";
import Variable from "../../../../Variable";
import Authentications from "../../../../Services/Authentications";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import OtpInputField from "../../MuiCustomComponent/OtpInputField";
import LabelField from "../../MuiCustomComponent/LabelField";
import SubmitedButton from "../../MuiCustomComponent/SubmitedButton";
import SimpleButtonLink from "../../MuiCustomComponent/SimpleButtonLink";

type ChildComponentProps = {
  OtpCode: string;
  fullName: string;
  birthDate: string;
  phone: string;
  gender: string;
  handleClick: () => void;
};
export default function CheckOTP({
  OtpCode,
  handleClick,
  fullName,
  birthDate,
  phone,
  gender,
}: ChildComponentProps) {
  const messageError = "Invalid otp code";
  const [token1, setTokens1] = useState("");
  const [inputOTP, setInputOTP] = useState("");
  const [yet, setYet] = useState(false);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(messageError);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [token, setTokens] = useState<string | number | null | undefined>();

  const handleCloseDialog = () => {
    setDialogVisibility(false);
  };

  const verify = (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault()

    if (inputOTP.length != 5) {
      setDialogMessage("Otp must have 5 digits");
      setDialogVisibility(true);
    } else {
      setDialogVisibility(false);
      setDialogMessage(messageError);

      if (yet) {
        verifyOTP1(e);
      } else verifyOTP(e);
    }
  };

  const verifyOTP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setYet(true);

    const route = Variable.routeApi + "api/usermanagement/verifyOTP";

    const tempUser = {
      phone: phone,
      code: inputOTP,
    };
    axios
      .post(`${route}`, tempUser)
      .then((response) => {
        setDialogMessage(
          "Verification réussi. vous serez redirigez vers le portail!!"
        );

        setDialogVisibility(true);
        navigate("/home");
      })
      .catch((error) => {
        setDialogMessage(messageError);
        setDialogVisibility(true);
      });
  };

  const verifyOTP1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const route = Variable.routeApi + "api/usermanagement/verifyOTP";

    const tempUser = {
      phone: phone,
      code: inputOTP,
    };
    axios
      .post(`${route}`, tempUser)
      .then((response) => {
        setDialogMessage(
          "Verification réussi. vous serez redirigez vers le portail!!"
        );
        setDialogVisibility(true);
        handleClick();
        navigate("/home");
      })
      .catch((error) => {
        setDialogMessage(messageError);
        setDialogVisibility(true);
        e.preventDefault()
      });
  };

  const resendOTP = () => {
    const route = Variable.routeApi + "api/usermanagement/sendOTP";

    const tempUser = {
      phone: phone,
    };

    axios
      .post(`${route}`, tempUser)
      .then((response) => {
        const otp = response.data.data.code;
        setTokens(otp);
        setDialogMessage("Un Nouveau code vous a été envoyé");
        setDialogVisibility(true);
        // Un nouveau code otp vous a ete envoye
      })
      .catch((error) => {});
  };
  return (
    <section className="bg-white h-full w-full p-4 relative lg:w-[28vw] lg:h-[90vh] dark:bg-gray-900 rounded-xl">
      <div className="">
        <div className=" max-w-2xl mx-auto lg:w-4/5">
          <div className="w-full">
            <h1 className="text-xl font-semibold text-red-600 tracking-wider text-gray-800 text-center mt-3 capitalize">
              {t("usermanagement.otp.title")}
            </h1>

            <div className="absolute z-20 ml-4 lg:ml-0  mt-20 lg:mt-20 lg:mr-15 w-4/5">
              {dialogVisibility ? (
                <SimpleDialog
                  message={dialogMessage}
                  handleClose={() => handleCloseDialog()}
                />
              ) : null}
            </div>

            <p className="mt-4 text-gray-500 text-sm dark:text-gray-400 text-justify">
              {t("usermanagement.otp.welcomeMessage1")} {phone}.{" "}
              {t("usermanagement.otp.welcomeMessage2")}
            </p>

            <form
              className="gap-6 mt-8 "
              onSubmit={(e) => {
                verify(e);
              }}
            >
              <div className=" flex gap-4 mb-[4rem] flex-col">
                <LabelField text={t("usermanagement.otp.labelOtp")} />
                <OtpInputField value={inputOTP} onChange={() => setInputOTP} />
              </div>
              
              <SubmitedButton  text={t("usermanagement.otp.verifyButton")}/>
            </form>

            <p className="mt-3 text-center">
              {t("usermanagement.otp.haventReceive")} &nbsp;
              <SimpleButtonLink onClick={()=>resendOTP()} fontSize="14px" text={t("usermanagement.otp.resendButton")}/>
            </p>

            <img
              src={logo}
              alt="Logo Afriland First Bank"
              className="lg:pb-8 p-8 mt-5  lg:mb-9 lg:w-50 lg:h-25 lg:relative lg:t-10 "
            ></img>
          </div>
        </div>
      </div>
    </section>
  );
}
