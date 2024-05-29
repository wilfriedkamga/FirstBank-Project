import React, { ChangeEvent, useState } from "react";
import { InputOtp } from "primereact/inputotp";
import sendSMS from "../../SendSMS/SendSms";
import logo from "../../../Assets/Images/FBLogo.png";
import axios from "axios";
import Variable from "../../../../../Variable";
import SimpleDialog from "../../Elementary/Dialog/SimpleDialog";
import { Navigate, useNavigate } from "react-router-dom";

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
  const [token, setTokens] = useState("");
  const [inputOTP, setInputOTP] = useState("");
  const [yet, setYet] = useState(false);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(messageError);

  const navigate = useNavigate();

  const handleCloseDialog = () => {
    setDialogVisibility(false);
  };

  const verify = (e: React.FormEvent<HTMLFormElement>) => {
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
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 text-center mt-3 capitalize dark:text-white">
              OTP Verification
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
              Un code de validation vous a été envoyé sur ce numero :
            </p>

            <form
              className="gap-6 mt-8 "
              onSubmit={(e) => {
                verify(e);
              }}
            >
              <div>
                <label className="block mb-2 ">code verify</label>
                <input
                  value={inputOTP}
                  required
                  onChange={(e) => setInputOTP(e.target.value)}
                  placeholder="X X X X X"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="card flex justify-content-center"></div>

              <input
                type="submit"
                value={"Verifier"}
                className="flex items-center justify-center w-full mt-10 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50"
              />
            </form>
            <p className="mt-3 text-center">
              Havn't receive it?
              <button
                className="signin text-red-600 hover:text-white hover:bg-red-600 rounded-lg"
                onClick={() => resendOTP()}
              >
                Resend
              </button>
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
