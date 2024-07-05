import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useEffect, useState } from "react";
import logo from "../../../UserManagement/User/Assets/Images/logoFB.png";
import Variable from "../../../Variableprod1";
import { Avatar } from "@mui/material";
import { UserAvatar } from "./UserAvatar";
import AccountMenu from "./AccountMenu";
import FullScreenDialog from "../../../UserManagement/User/Components/Elementary/Notifications/FullScreenDialog";
import NotificationPanel from "../../../UserManagement/User/Components/Elementary/Notifications/NotificationPanel";

const Header = () => {
  return (
    <div className="flex fixed bg-red-600 border-gray-500 z-[1000]  border-b justify-between w-full border-[2px p-3">
      <div className="h-10 right-1 top-1 relative ">
        <img src={logo} alt="logo" width={40} height={25} />
      </div>
      <div className="h-10 flex gap-2 space-x-1">
        <div className="h-full">
          <a
            className="flex font-bold text-white h-8 w-8 md:h-10 md:w-10 rounded-full"
            href="/search"
          >
            <SearchIcon
              sx={{
                fontSize: "40px",
                top: 2,
                right: "20px",
                position: "relative",
              }}
              className="h-8 font-extrabold w-8"
            />
          </a>
        </div>
        <div className="h-full">
          <FullScreenDialog />
        </div>
        <div className="h-full ">
          <NotificationPanel />
        </div>
        <div className="h-full ">
          <AccountMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
