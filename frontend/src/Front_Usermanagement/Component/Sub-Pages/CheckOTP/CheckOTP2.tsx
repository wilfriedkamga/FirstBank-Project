import React, { ChangeEvent, useState } from "react";
import { InputOtp } from "primereact/inputotp";
import sendSMS from "../../SendSMS/SendSms";
import logo from "../../../../Front_Association/Assets/FBLogo.png";
import axios from "axios";
import SimpleDialog from "../../../../Front_Association/Component/Elementary/Dialog/SimpleDialog";
import Variable from "../../../../Variable";
import { useTranslation } from "react-i18next";
import LabelField from "../../../../Front_Association/Component/MuiCustomComponent/LabelField";
import OtpInputField from "../../../../Front_Association/Component/MuiCustomComponent/OtpInputField";
import SubmitedButton from "../../../../Front_Association/Component/MuiCustomComponent/SubmitedButton";
import SimpleButtonLink from "../../../../Front_Association/Component/MuiCustomComponent/SimpleButtonLink";

type ChildComponentProps = {
  OtpCode: string;
  fullName: string;
  birthDate: string;
  phone: string;
  gender: string;
  handleClick: () => void;
  tooglePassword: () => void;
};
export default function CheckOTP2({
  OtpCode,
  handleClick,
  fullName,
  birthDate,
  phone,
  gender,
  tooglePassword,
}: ChildComponentProps) {
  const messageError = "Invalid otp code";
  const [token, setTokens] = useState("");
  const [inputOTP, setInputOTP] = useState<string>("");
  const [yet, setYet] = useState(false);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(messageError);

  const handleCloseDialog = () => {
    setDialogVisibility(false);
  };

  const verify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
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
    alert(inputOTP)
    setYet(true);

    const route = Variable.routeApi + "api/usermanagement/verifyOTP";

    const tempUser = {
      phone: phone,
      code: inputOTP,
    };
    axios
      .post(`${route}`, tempUser)
      .then((response) => {
        handleClick();
      })
      .catch((error) => {
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
        handleClick();
      })
      .catch((error) => {
        setDialogVisibility(true);
      });
  };

  const { t } = useTranslation();

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
      })
      .catch((error) => {});
  };
  return (
    <section className="bg-white h-full w-full p-4 relative lg:w-[28vw] lg:h-[90vh] dark:bg-gray-900 rounded-xl">
      <div className="">
        <div className=" max-w-2xl mx-auto lg:w-4/5">
          <div className="w-full">
            <h1 className="text-xl text-red-600 font-semibold tracking-wider text-center mt-3 capitalize">
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

            <p className="mt-4 text-gray-500 text-sm   dark:text-gray-400 text-justify">
              {t("usermanagement.otp.welcomeMessage1")} : {phone}{" "}
              {t("usermanagement.otp.welcomeMessage2")}
            </p>

            <form
              className="gap-6 mt-8 "
              onSubmit={(e) => {
                verify(e);
              }}
            >
              <div>
                <div className=" flex gap-4 mb-[4rem] flex-col">
                  <LabelField text={t("usermanagement.otp.labelOtp")} />
                  <OtpInputField
                    value={inputOTP}
                    onChange={(value) => setInputOTP(value)}
                  />
                </div>

                <SubmitedButton text={t("usermanagement.otp.verifyButton")} />
              </div>
            </form>

            <p className="mt-3 text-center">
              {t("usermanagement.otp.haventReceive")}
              <SimpleButtonLink onClick={()=>resendOTP()} fontSize="14px" text={t("usermanagement.otp.resendButton")}/>
            </p>

            <p className="mt-3 inline flex justify-center">
              <SimpleButtonLink onClick={() => tooglePassword()} text={t("usermanagement.otp.signinButton")}/>
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
