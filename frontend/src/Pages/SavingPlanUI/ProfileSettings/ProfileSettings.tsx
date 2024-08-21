import React, { useEffect, useState } from "react";
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
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import Authentications from "../../../Services/Authentications";
import Header from "../../../Components/SavingPlan/header/Header";
import UserProfileCard from "../../../Components/SavingPlan/user profile card/UserProfileCard";
import Footer from "../../../Components/AssociationUI/Elementary/Footer/Footer";

const ProfileSettings = () => {
  const [name, setName] = useState("");
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setName(user.user.fullName);
    setEmailIsValid(user.user.emailIsVallid);
    setEmail(user.user.email);
  });

  const verfyEmail = () => {
    if (!emailIsValid && email) {
      navigate("/verify_email");
      Authentications.SendMailOtp(email)
        .then((response) => {})

        .catch((error) => {});
    } else if (!email || email.trim() == "") {
      alert("Veuillez renseigner votre mail dans l'onglet update profil.");
    }
  };

  return (
    <div className="w-full bg-white h-full flex flex-col">
      <div className="border-b border-gray-500 w-full   z-20">
        <Header />
      </div>
      <div className="flex mt-[10vh] mb-[10vh] flex-col pt-5 md:px-5 h-full w-full space-y-8 overflow-auto">

        <div className="font-medium bg-gray-400 w-full space-y-2">
          <UserProfileCard />
          <p className="font-title text-lg md:text-2xl ml-36 md:ml-56">
            {name}
          </p>
        </div>
        <div className="ml-5 border-b border-gray-200">
          <h3 className="font-medium text-gray-500 font-account text-2xl">
            Paramètres
          </h3>
        </div>
        <div className="flex flex-col bg-white w-full p-2 space-y-2">
          <a
            href="/profile/edit-profile"
            className="flex flex-row group  items-center justify-start bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <PencilSquareIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 group-hover:text-[#BB0A01] text-gray-700 font-title">
              Éditer votre profil
            </p>
          </a>
          <a
            href="/modify_password"
            className="flex flex-row group border-gray-400 items-center bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <LockClosedIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 text-gray-700 group-hover:text-[#BB0A01] font-title">
              Modifier votre mot de passe
            </p>
          </a>

          <button
            disabled={emailIsValid}
            onClick={() => verfyEmail()}
            className="flex flex-row group items-center justify-start bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <IdentificationIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 group-hover:text-[#BB0A01] text-gray-700 font-title">
              {emailIsValid
                ? "Verifier Email ( déjà vérifier)"
                : "Verifier votre adresse (cliquer pour vérifier votre adresse mail)"}
            </p>
          </button>
          <a
            href="/add_cni"
            className="flex flex-row group items-center justify-start bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <IdentificationIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 group-hover:text-[#BB0A01] text-gray-700 font-title">
              Ajouter votre CNI
            </p>
          </a>

          <a
            href="/add_signature"
            className="flex flex-row group items-center justify-start bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <InboxArrowDownIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 group-hover:text-[#BB0A01] text-gray-700 font-title">
              Ajouter / modifier votre signature
            </p>
          </a>
        </div>
      </div>
      <div className="w-full h-fit z-20">
        <Footer />
      </div>
    </div>
  );
};

export default ProfileSettings;
