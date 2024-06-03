import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import UserAvatar from "../../../UserManagement/User/Components/Elementary/Navbar/UserAvatar";

const Header = () => {
  return (
    <div className="flex  justify-between">
      <div className="h-10">
        <img
          src="./assets/images/logo.svg"
          alt="logo"
          width={200}
          height={300}
        />
      </div>
      <div className="h-10 flex space-x-1">
        <div className="h-full">
          <a
            className="flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full"
            href="/search"
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </a>
        </div>
        <div className="h-full">
          <a
            className="flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full"
            href="/notifications"
          >
            <BellIcon className="h-6 w-6" />
          </a>
        </div>
        <div className="h-full flex items-center justify-center rounded-full">
          
            <UserAvatar dropdownVisibility={true} />
          
        </div>
      </div>
    </div>
  );
};

export default Header;
