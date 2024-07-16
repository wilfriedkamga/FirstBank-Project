import React, { useEffect, useState } from "react";
import logo from "../../../../Assets/Images/FBLogo.png";
import axios from "axios";
import { Navigate } from "react-router-dom";
import sendSMS from "../../SendSMS/SendSms";
import PhoneInput from "react-phone-input-2";
import SimpleDialog from "../../Elementary/Dialog/SimpleDialog";
import Variable from "../../../../Variable";

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
    "The user with this phone number don't exist in our data base. Please verify the phone number";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (phone.length <= 3) {
      setDialogMessage("Please enter a valid number phone");
      setDialogVisibility(true);
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
          })
          .catch((error) => {
            console.log(error);
            setDialogMessage(dialogMessage);
            setDialogVisibility(true);
          });

        setIsLoading(false); // Désactiver le chargement après l'exécution
      }, Variable.preTimeOut);
    }
  };

  return (
    <section className="bg-white w-full h-full  lg:w-[28vw] lg:h-[90vh] p-4 dark:bg-gray-900 relative lg:rounded-xl">
      <div className="">
        <div className=" max-w-2xl mx-auto lg:w-4/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 text-center  mt-3 capitalize dark:text-white">
              Forgot Password
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
              Enter your phone number for verification
            </p>

            <form className="gap-6 mt-8 " onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label className="block mb-2 ">Phone number</label>
                <PhoneInput
                  inputClass="block w-full h-full mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  country={"cm"}
                  onChange={(value: any) => setPhone(value)}
                  countryCodeEditable={false}
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center w-full mt-10 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50"
              >
                Send verification code
              </button>
              <p className="mt-3 inline flex justify-center">
                Back to &nbsp;
                <button
                  className="signin text-red-400"
                  onClick={() => togglePassword()}
                >
                  Signin
                </button>
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
