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
  ClockIcon, // Icone pour les sessions
} from "@heroicons/react/24/outline";
import Variable from "../../../../Variable";
import { useLocation, useNavigate } from "react-router-dom";
import Authentications from "../../../../Services/Authentications";
import Footer from "../Footer/Footer";
import ParamItem from "./ParamItem";
import UserProfileCard from "../../../../Front_Usermanagement/Component/header/UserProfileCard";
import AssociationProfileCard from "./AssociationProfilCard";
import AssociationServices from "../../../../Services/AssociationServices";
import { AssociationModel } from "../../../../Services/Types/AssociationModels";
import logo_asso from '../../../Assets/caisse.png'

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
  const [association,setAssociation]=useState<string>("")
  const location=useLocation()

  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setName(user.user.fullName);
    setEmailIsValid(user.user.emailIsVallid);
    setEmail(user.user.email);

    AssociationServices.GetAssociationDetails(location.pathname.split("/")[3])
    .then((response) => {
      setAssociation(response.data.name);
    })
    .catch((error) => {
      console.log(error);
    });
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
      link: "/association/mes associations/:idassociation/parametres/info",
      Icon: <InformationCircleIcon className="w-8 h-8" />,
    },
    {
      label: "Gérer les rôles",
      link: "/association/mes associations/:idassociation/parametres/roles",
      Icon: <UsersIcon className="w-8 h-8" />,
    },
    {
      label: "Configurer les réunions",
      link: "/association/mes associations/:idassociation/parametres/reunions",
      Icon: <CalendarIcon className="w-8 h-8" />,
    },
    {
      label: "Configurer les sanctions",
      link: "/association/mes associations/:idassociation/parametres/sanctions",
      Icon: <ExclamationCircleIcon className="w-8 h-8" />,
    },
    {
      label: "Configurer les sessions",
      link: "/association/mes associations/:idassociation/parametres/sessions",
      Icon: <ClockIcon className="w-8 h-8" />,
    },
  ];

  return (
    <div className="w-full  h-full min-h-[100vh] flex flex-col">
      <div className="flex flex-col md:px-5 h-full w-full space-y-8 overflow-auto">
        <div className="font-medium mt-7 bg-gray-400 w-full space-y-2">
          <AssociationProfileCard  />
          <p className="font-title text-lg md:text-2xl ml-36 md:ml-56">
            {association}
          </p>
        </div>
        <div className="ml-5 border-b border-gray-200">
          <h3 className="font-medium text-gray-500 font-account text-2xl">
            Paramètres
          </h3>
        </div>
        <div className="flex flex-col w-full p-2 space-y-2">
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
