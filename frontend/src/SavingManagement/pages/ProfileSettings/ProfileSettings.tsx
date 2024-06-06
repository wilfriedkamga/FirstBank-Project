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
import UserProfileCard from "../../components/user profile card/UserProfileCard";
import Variable from "../../../Variable";

const ProfileSettings = () => {
  useEffect(()=>{
    const user=Variable.getLocalStorageItem("user")
    setName(user.user.fullName)
  })
  const [name, setName] = useState("John Kennyston");

  return (
    <div className="w-full bg-white h-full flex flex-col">
      <div className="border-b border-gray-500 w-full   z-20">
        <Header />
      </div>
      <div className="flex mt-[10vh] flex-col pt-5 md:px-5 h-full w-full space-y-8 overflow-auto">
        <div className="font-medium bg-gray-400 w-full space-y-2">
          <UserProfileCard />
          <p className="font-title text-lg md:text-2xl ml-36 md:ml-56">
            {name}
          </p>
        </div>
        <div className="ml-5 border-b border-gray-200">
          <h3 className="font-medium text-gray-500 font-account text-2xl">
            Settings
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
              Edit profile
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
              Modify your password
            </p>
          </a>
          <a
            href="/verify_email"
            className="flex flex-row group items-center justify-start bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <IdentificationIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 group-hover:text-[#BB0A01] text-gray-700 font-title">
              Add e-mail
            </p>
          </a>

          <a
            href="/add_cni"
            className="flex flex-row group items-center justify-start bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <IdentificationIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 group-hover:text-[#BB0A01] text-gray-700 font-title">
              Add CNI
            </p>
          </a>

          <a
            href="/profile/new/phone"
            className="flex flex-row group items-center justify-start bg-white rounded-lg w-full hover:bg-gray-100"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              <InboxArrowDownIcon className="h-8 w-8" />
            </div>
            <p className="font-normal p-5 group-hover:text-[#BB0A01] text-gray-700 font-title">
              Add a phone number
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

export default ProfileSettings;
