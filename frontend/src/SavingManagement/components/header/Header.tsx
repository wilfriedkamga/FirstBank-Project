import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import logo from "../../../UserManagement/User/Assets/Images/FBLogo.png";
import Variable from "../../../Variable";
import { Avatar } from "@mui/material";
import { UserAvatar } from "./UserAvatar";
import AccountMenu from "./AccountMenu";

const Header = () => {

  return (
    <div className="flex fixed   bg-white border-gray-500 border-b justify-between w-full border-[2px p-3">
      <div className="h-10 right-1 relative bottom-6 ">
        <img src={logo} alt="logo" width={200} height={30} />
      </div>
      <div className="h-10 flex space-x-1">
        <div className="h-full">
          <a
            className="flex font-bold items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full"
            href="/search"
          >
            <MagnifyingGlassIcon className="h-8 w-8" />
          </a>
        </div>
        <div className="h-full">
          <a
            className="flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full"
            href="/notifications"
          >
            <BellIcon className="h-8  font-bold w-8" />
          </a>
        </div>
        <div className="h-full ">
          <AccountMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
