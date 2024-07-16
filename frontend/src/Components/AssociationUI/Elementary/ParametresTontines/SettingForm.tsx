// src/Components/SavingPlanUI/SettingForm/SettingForm.tsx

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
  UsersIcon, // Icone pour les rôles
  CalendarIcon, // Icone pour les réunions
  ExclamationCircleIcon, // Icone pour les sanctions
  ClockIcon // Icone pour les sessions
} from "@heroicons/react/24/outline";
import Variable from "../../../../Variable";
import { useNavigate } from "react-router-dom";
import Authentications from "../../../../Services/Authentications";
import Header from "../../../../Components/SavingPlan/header/Header";
import UserProfileCard from "../../../../Components/SavingPlan/user profile card/UserProfileCard";
import Footer from "../../../../Components/AssociationUI/Elementary/Footer/Footer";
import ParamItem from './ParamItem';

type Item = {
  label: string;
  link: string;
  Icon: any;
};

const SettingForm = () => {
  const [name, setName] = useState("");
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setName(user.user.fullName);
    setEmailIsValid(user.user.emailIsVallid);
    setEmail(user.user.email);
  }, []);

  const verfyEmail = () => {
    if (!emailIsValid && email) {
      navigate("/verify_email");
      Authentications.SendMailOtp(email)
        .then((response) => {})
        .catch((error) => {});
    } else if (!email || email.trim() === "") {
      alert("Veuillez renseigner votre mail dans l'onglet update profil.");
    }
  };

  const Items: Item[] = [
    {
      label: "Informations de l'association",
      link: "/tontine/mestontines/:idTontine/parametres/info",
      Icon: <InformationCircleIcon className="w-8 h-8" />
    },
    {
      label: "Gérer les rôles",
      link: "/tontine/mestontines/:idTontine/parametres/roles",
      Icon: <UsersIcon className="w-8 h-8" />
    },
    {
      label: "Configurer les réunions",
      link: "/tontine/mestontines/:idTontine/parametres/reunions",
      Icon: <CalendarIcon className="w-8 h-8" />
    },
    {
      label: "Configurer les sanctions",
      link: "/tontine/mestontines/:idTontine/parametres/sanctions",
      Icon: <ExclamationCircleIcon className="w-8 h-8" />
    },
    {
      label: "Configurer les sessions",
      link: "/tontine/mestontines/:idTontine/parametres/sessions",
      Icon: <ClockIcon className="w-8 h-8" />
    }
  ];

  return (
    <div className="w-full bg-white h-full min-h-[100vh] flex flex-col">
      <div className="flex flex-col md:px-5 h-full w-full space-y-8 overflow-auto">
        <div className="flex flex-col bg-white w-full p-2 space-y-2">
          {Items.map((item, index) => (
            <ParamItem key={index} tab={item} />
          ))}
        </div>
      </div>
      <div className="w-full h-fit z-20">
        <Footer />
      </div>
    </div>
  );
};

export default SettingForm;
