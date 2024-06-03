import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import BottomNavigation from "../../components/bottom navigation/BottomNavigation";
import {
  ArrowLeftStartOnRectangleIcon,
  BellAlertIcon,
  IdentificationIcon,
  InboxArrowDownIcon,
  InformationCircleIcon,
  LockClosedIcon,
  PencilSquareIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import Variable from "../../../Variable";
import { userInfo } from "os";
import UserAvatar from "../../../UserManagement/User/Components/Elementary/Navbar/UserAvatar";
import { Link, useNavigate } from "react-router-dom";
import Authentications from "../../../Services/Authentications";
import { getInitials } from "../../../../src/UserManagement/User/Components/Elementary/Utils";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const user = Variable.getLocalStorageItem("user");
  const [mail, setMail] = useState("");
  const [imageIsPresent, setImageIsPresent] = useState<boolean>(false);
  const [mailStatus, setMailStatus] = useState<boolean>(false);
  const [filepath, setFilePath] = useState<string>("");
  const handleLogout = () => {
    alert("vous allez vous déconnecté");
    Variable.removeFromLocalStorage("user");
  };
  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setMail(user.user.email);
    setMailStatus(user.user.emailIsVallid)
  });

  const handleEmailVerification = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (mail == null || mail == "" || mailStatus) {
      if (mailStatus) {
        alert("votre adresse mail est déjà validé");
      }
      alert("Renseigner d'abord votre mail sur l'onglet editProfil");
    } else {
      Authentications.SendMailOtp(mail)
        .then((response) => {
          alert("otp envoyé avec success");
          navigate("/verifyEmail");
        })
        .catch((error) => {
          alert("Une erreure s'estproduite lors de l'envoie de l'Otp");
        });
    }
  };

  const handleClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    // Ouvrez le sélecteur de fichier
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; // Définissez le type de fichier que vous voulez accepter
    input.onchange =(event:any)=> handleFileChange(event);
    input.click();

  };

 

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFilePath(URL.createObjectURL(file));
      alert(filepath)
    }
  };

  return (
    <div className="w-full bg-white h-full p-2.5 flex flex-col">
      <div className="border-b border-gray-200 w-full h-fit p-2 z-20">
        <Header />
      </div>
      <div className="flex flex-col pt-5 md:px-5 h-full w-full space-y-8 overflow-auto">
        <div className="ml-5 border-b border-gray-200">
          <h3 className="font-medium text-gray-500 font-account text-2xl">
            Account
          </h3>
        </div>
        <div onClick={(e)=>handleClick(e)} title="ajouter une photo de profil" className="flex flex-row items-center  bg-white md:ml-36 border rounded-lg shadow w-full md:w-5/6 hover:bg-gray-100">
          {imageIsPresent ? (
            <div className="ml-4">
              <UserAvatar dropdownVisibility={false} />
            </div>
          ) : (
            <div className="w-[60px] ml-4 flex justify-center text-3xl items-center font-bold h-[60px] rounded-full text-white bg-[#828181] cursor-pointer">
              {getInitials(user.user.fullName)}
            </div>
          )}

          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {user.user.fullName}
            </h5>
            <p className="mb-3 font-normal text-gray-700">Simple utilisateur</p>
          </div>
          <div>
             
          </div>
        </div>
        <div className="ml-5 border-b border-gray-200">
          <h3 className="font-medium text-gray-500 font-account text-2xl">
            Settings
          </h3>
        </div>
        <div className="flex flex-col bg-white w-full p-2 space-y-2">
          <Link
            to="/editProfil"
            className="flex flex-row group items-center justify-start bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <PencilSquareIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 group-hover:text-[#BB0A01] text-gray-700 font-title">
              Information générale
            </p>
          </Link>
          <a
            href="/modifyPassword"
            className="flex flex-row group items-center bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <LockClosedIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 text-gray-700 group-hover:text-[#BB0A01] font-title">
              Changer de Mot de passe
            </p>
          </a>
          <div
            onClick={(e) => handleEmailVerification(e)}
            className="flex cursor-pointer flex-row group items-center justify-start bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <IdentificationIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 group-hover:text-[#BB0A01] text-gray-700 font-title">
              Vérifier son mail{" "}
              {mailStatus
                ? "(votre mail est déjà vérifié)"
                : "(votre mail n'est pas encore vérifié)"}
            </p>
          </div>
          <a
            href="/changePhone"
            className="flex flex-row group items-center justify-start bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <InboxArrowDownIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 group-hover:text-[#BB0A01] text-gray-700 font-title">
              Change phone number
            </p>
          </a>
          <a
            href="/notifications"
            className="flex hidden flex-row group items-center bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <BellAlertIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 text-gray-700 group-hover:text-[#BB0A01] font-title">
              Notifications
            </p>
          </a>
          <a
            href="/about-us"
            className="flex hidden flex-row group items-center bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <InformationCircleIcon className="h-8 w-8" />
            </div>
            <p className="font hidden-normal p-5 text-gray-700 group-hover:text-[#BB0A01] font-title">
              About us
            </p>
          </a>

          <a
            href="/addCNI"
            className="flex flex-row group items-center bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <ShareIcon className="h-8 w-8" />
            </div>
            <p className="font-normal  p-5 text-gray-700 group-hover:text-[#BB0A01] font-title">
              Add CNI
            </p>
          </a>
          <a
            href="/"
            onClick={handleLogout}
            className="flex flex-row group items-center bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <ArrowLeftStartOnRectangleIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 text-gray-700 group-hover:text-[#BB0A01] font-title">
              Logout
            </p>
          </a>
        </div>
      </div>
      <div className="w-full fixed bottom-0  h-fit z-20">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default ProfileSettings;
