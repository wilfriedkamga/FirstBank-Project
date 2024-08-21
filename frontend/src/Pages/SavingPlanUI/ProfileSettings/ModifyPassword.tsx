import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TontinesServices from "../../../Services/TontinesServices";
import Authentications from "../../../Services/Authentications";
import Variable from "../../../Variable";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Header from "../../../Components/SavingPlan/header/Header";
import AssoNotificationDialog from "../../../Components/AssociationUI/Elementary/MesTontines/AssoNotificationDialog";

const ModifyPassword = () => {
  const navigate = useNavigate();
  const [nowPassword, setNowPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [isNowPasswordCorrect, setisNowPasswordCorrect] =
    useState<boolean>(false);
  const [notifTitle, setNotifTitle] = useState<string>("");
  const [notifMessage, setNotifMessage] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setPhone(user.user.phone);
  });

  const changePassword = () => {
    Authentications.ChangePassword(phone, newPassword)
      .then((response) => {
        setNotifMessage("La modification de votre mot de passe a réussie");
        setNotifTitle("Sucess");
        setDialogOpen(true);
      })
      .catch((error) => {
        setNotifMessage(
          "Un pb est survenu lors de cette opération. Verifier votre connexion"
        );
        setNotifTitle("Erreur");
        setDialogOpen(true);
        alert("error");
      });
  };

  const verifyPassword = () => {
    Authentications.verifyPasswordService(phone, nowPassword)
      .then((response) => {
        setisNowPasswordCorrect(true);
      })
      .catch((error) => {
        alert("Le mot de passe actuel n'est pas valide");
        setisNowPasswordCorrect(false);
      });
  };
  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword != confirmPassword) {
      setNotifMessage("Les deux nouveaux mots de passe ne matchent pas");
      setNotifTitle("Erreur");
      setDialogOpen(true);
    } else {
      Authentications.verifyPasswordService(phone, nowPassword)
        .then((response) => {
          changePassword();
        })
        .catch((error) => {
          setNotifMessage(
            "Votre mot de passe actuel n'est pas correct. Vérifier et ressayez"
          );
          setNotifTitle("Erreur");
          setDialogOpen(true);
        });
    }
  };

  return (
    <div className="w-full bg-white h-[100vh] flex flex-col">
      <Header />
      <div className="flex mt-[13vh] mb-[] p-4 justify-center flex-col  h-full w-full space-y-6 ">
        <div className="rounded-t-lg h-[15vh] flex items-center font-bold text-white text-3xl pl-6 overflow-hidden bg-red-700">
          Modifier votre mot de passe
        </div>
        <div className="bg-white w-[15vw] sm:w-[10vw] flex justify-center items-center   shadow h-[10vh]">
          <button
            className="  rounded-lg"
            onClick={() => window.history.back()}
          >
            <KeyboardBackspaceIcon style={{ fontSize: "2rem" }} />
          </button>
        </div>
      </div>
      <form action="" onSubmit={(e) => handleClick(e)}>
        <div className="flex p-2 mt-[0vh] flex-col justify-center items-center  h-50vh bg-white w-full  md:w-4/5 mx-auto">
          <div className="flex flex-col font-semibold  bg-white rounded-lg mb-2 mx-auto w-full md:w-3/5 p-2 md:p-5 shadow-lg border h-full">
            <div className="flex w-full flex-col  ">
              <label className="block mb-1 text-sm mt-3 ">
                Mot de passe actuel
              </label>
              <input
                type={passwordVisibility ? "text" : "password"}
                value={nowPassword}
                onChange={(e) => setNowPassword(e.target.value)}
                placeholder="Entrez votre mot de passe actuel"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>
            <div className="flex w-full flex-col">
              <label className="block mb-1 text-sm mt-3 ">
                Nouveau mot de passe
              </label>
              <input
                type={passwordVisibility ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Entrez votre nouveau mot de passe"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>
            <div className="flex w-full flex-col">
              <label className="block mb-1 text-sm mt-3 ">
                Confirmer le mot de passe
              </label>
              <input
                type={passwordVisibility ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmer votre nouveau mot de passe"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
              <div className="flex flex-row mb-6  h-[20px] mt-2 relative ml-2">
                <input
                  type="checkbox"
                  onChange={() => setPasswordVisibility(!passwordVisibility)}
                  className="border  h-[20px] w-[20px] "
                />
                <label htmlFor="" className="ml-2 relative  bottom-[2px]  ">
                  Voir
                </label>
              </div>
            </div>
              <input
                type="submit"
                value={"Valider"}
                placeholder="Enter your password"
                className=" px-5 py-2 bg-red-600 hover:bg-red-900 w-full  text-white font-bold rounded cursor-pointer"
              />

            
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

export default ModifyPassword;
