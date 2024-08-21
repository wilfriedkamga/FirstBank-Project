import React, { useEffect, useState } from "react";
import {
  ArrowLeftStartOnRectangleIcon,
  BellAlertIcon,
  InformationCircleIcon,
  ListBulletIcon,
  ShareIcon,
  ShieldCheckIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
  GlobeAltIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";
import Variable from "../../../Variable";
import Header from "../../../Components/SavingPlan/header/Header";
import UserProfileCard from "../../../Components/SavingPlan/user profile card/UserProfileCard";
import BottomNavigation from "../../../Components/SavingPlan/bottom navigation/BottomNavigation";
import LanguageDialog from "./LanguageModal";
import { useTranslation } from "react-i18next";


const Settings = () => {
  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setName(user.user.fullName);
  }, []);

  const { t } = useTranslation();

  const [name, setName] = useState("");

  return (
    <div className="w-full h-full bg-white  flex flex-col">
      <Header />
      <div className="flex flex-col mt-[15vh] pt-5 md:px-5 h-full w-full space-y-8 overflow-auto">
        <div className="font-medium bg-gray-400 w-full space-y-2">
          <UserProfileCard />
          <p className="font-title text-lg ml-36 md:ml-56">{name}</p>
        </div>
        <div className="ml-5 border-b border-gray-200">
          <h3 className="font-medium text-gray-500 font-account text-2xl">
            Paramètre généraux {t("hello")}
          </h3>
        </div>
        <div className="font-medium bg-white w-full p-2 space-y-2">
          <a
            href="/profile"
            className="flex flex-row group items-center justify-start bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <UserIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 group-hover:text-[#BB0A01] text-gray-700 font-title">
              Profile et compte
            </p>
          </a>
          <a
            href="/profile/security"
            className="flex flex-row group items-center justify-start bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <ShieldCheckIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 group-hover:text-[#BB0A01] text-gray-700 font-title">
              Sécurité
            </p>
          </a>

          <a
            href="/profile/security"
            className="flex flex-row group items-center justify-start bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <MoonIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 group-hover:text-[#BB0A01] text-gray-700 font-title">
              Mode sombre
            </p>
          </a>

          <button
            className="flex flex-row group items-center justify-start bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <LanguageDialog/>
            
          </button>
        </div>
        <div className="ml-5 border-b border-gray-200">
          <h3 className="font-medium text-gray-500 font-account text-2xl">
            Notifications et Activités
          </h3>
        </div>
        <div className="flex flex-col bg-white w-full p-2 space-y-2">
          <a
            href="/notifications"
            className="flex flex-row group items-center bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <BellAlertIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 text-gray-700 group-hover:text-[#BB0A01] font-title">
              Notifications
            </p>
          </a>
          <a
            href="/reminders"
            className="flex flex-row group items-center bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <ListBulletIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 text-gray-700 group-hover:text-[#BB0A01] font-title">
              Rappels
            </p>
          </a>
        </div>
        <div className="ml-5 border-b border-gray-200">
          <h3 className="font-medium text-gray-500 font-account text-2xl">
            Accebilité et confidentialités
          </h3>
        </div>
        <div className="flex flex-col bg-white w-full p-2 space-y-2">
          <a
            href="/about-us"
            className="flex flex-row group items-center bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <InformationCircleIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 text-gray-700 group-hover:text-[#BB0A01] font-title">
              À propos de nous
            </p>
          </a>
          <a
            href="/share"
            className="flex flex-row group items-center bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <ShareIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 text-gray-700 group-hover:text-[#BB0A01] font-title">
              Inviter un contact
            </p>
          </a>
          <a
            href="/log-out"
            className="flex flex-row group items-center bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <ArrowLeftStartOnRectangleIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 text-gray-700 group-hover:text-[#BB0A01] font-title">
              Se déconnecter
            </p>
          </a>

        </div>
        
      </div>
      <div className="w-full h-fit z-20">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Settings;
