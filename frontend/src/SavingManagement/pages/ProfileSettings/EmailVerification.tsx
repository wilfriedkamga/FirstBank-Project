import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import Variable from "../../../Variableprod1";
import Authentications from "../../../Services/Authentications";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AssoNotificationDialog from "../../../UserManagement/User/Components/Elementary/MesTontines/AssoNotificationDialog";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [inputOtp, setinputOTP] = useState("");
  const [notifTitle, setNotifTitle] = useState<string>("");
  const [notifMessage, setNotifMessage] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setMail(user.user.email);
  }, []);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Authentications.VerifyMailOtp(mail, inputOtp)
      .then((response) => {
        const user = Variable.getLocalStorageItem("user");
        const updatedUser = {
          ...user.user,
          emailIsVallid: true,
          mail: mail,
        };
        Variable.setLocalStorageItem("user", { user: updatedUser });
        setNotifMessage("Sucess de la vérification de votre adresse mail");
        setNotifTitle("Verification de l'opt par mail");
        setDialogOpen(true);
        alert("error");
      })
      .then((error) => {});
  };
  const verfyEmail = () => {
    Authentications.SendMailOtp(mail)
      .then((response) => {
        setNotifMessage(
          "Un otp vous a été envoyé avec sucess à l'adresse mail ci-dessus"
        );
        setNotifTitle("Envoi de l'otp");
        setDialogOpen(true);
      })
      .catch((error) => {
        setNotifMessage(
          "Une erreure s'est produite lors de l'envoi de l'otp. Verifiez votre connexion et réessayez"
        );
        setNotifTitle("Erreur");
        setDialogOpen(true);
      });
  };

  return (
    <div className="w-full bg-white h-[100vh]  flex flex-col">
      <Header />

      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex p-2.5 mt-[10vh] flex-col justify-center items-center  h-50vh bg-white w-full  md:w-4/5 mx-auto">
          <div className="flex flex-row w-full md:w-2/5">
            <div className=" bg-white w-[15vw] sm:w-[10vw]  flex justify-center items-center border  shadow h-[10vh]">
              <button
                className=" px-2 rounded-lg "
                onClick={() => window.history.back()}
              >
                <KeyboardBackspaceIcon style={{ fontSize: "3rem" }} />
              </button>
            </div>
            <div className=" bg-white w-full flex justify-center items-center  shadow h-[10vh]">
              Vérification de l'adresse mail
            </div>
          </div>

          <div className="flex flex-col font-semibold bg-white mt-2 rounded-lg mb-2 mx-auto w-full md:w-2/5 p-2 md:p-5 shadow-lg border h-full">
            <div className="flex w-full flex-col  ">
              <p>
                Un email contenant un code à 5 chiffres a été envoyé à l'adresse
                : {mail}
              </p>
              <p>
                {" "}
                Vous n'avez reçu de mail ?{" "}
                <button
                  onClick={() => verfyEmail()}
                  className="bg-red-600 hover:bg-red-700 rounded-lg p-1 text-white"
                >
                  Renvoyer
                </button>
              </p>
              <label className="block mb-2 text-sm mt-3 ">
                Entrez le code otp que vous avez reçu
              </label>
              <input
                value={inputOtp}
                onChange={(e) => setinputOTP(e.target.value)}
                className="block required:true py-2 px-5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                type="text"
                placeholder="X X X X X "
              />
              <input
                type="submit"
                value="Verifier"
                placeholder="Le nouveau numero de telephone"
                className="  px-5 py-2 mt-5 bg-gray-600 rounded hover:bg-gray-800 text-white font-bold cursor-pointer"
              />
            </div>
            <AssoNotificationDialog
              title={notifTitle}
              message={notifMessage}
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmailVerification;
