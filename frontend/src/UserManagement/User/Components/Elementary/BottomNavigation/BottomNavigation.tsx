import React from "react";
import {
  BanknotesIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const BottomNavigation = () => {
  return (
    <div className="px-5 bg-white shadow-2xl rounded-2xl md:rounded h-18">
      <div className="flex space-x-5">
        <div className="flex-1 group">
          <a
            href="/portal"
            className="flex items-center justify-center text-center mx-auto px-4 w-full text-gray-400 group-active:text-[#BB0A01] group-hover:text-[#BB0A01]"
          >
            <span className="block px-1 pt-1 pb-1">
              <HomeIcon className="h-8 w-8 text-2xl pt-1 mb-1 block" />
              <span className="block text-xs pb-1">Home</span>
              <span className="block w-5 mx-auto h-1 group-hover:bg-[#BB0A01] rounded-full"></span>
            </span>
          </a>
        </div>
        <div className="flex-1 group">
          <a
            href="/savings/app"
            className="flex items-end justify-center text-center mx-auto px-4 w-full text-gray-400 group-active:text-[#BB0A01] group-hover:text-[#BB0A01]"
          >
            <span className="block px-1 pt-1 pb-1">
              <BanknotesIcon className="h-8 w-8 text-2xl pt-1 mb-1 block" />
              <span className="block text-xs pb-1">Savings</span>
              <span className="block w-5 mx-auto h-1 group-hover:bg-[#BB0A01] rounded-full"></span>
            </span>
          </a>
        </div>
        <div className="flex-1 group">
          <a
            href="/tontine/app"
            className="flex items-end justify-center text-center mx-auto px-4 w-full text-gray-400 group-active:text-[#BB0A01] group-hover:text-[#BB0A01]"
          >
            <span className="block px-1 pt-1 pb-1">
              <UserGroupIcon className="h-8 w-8 text-2xl pt-1 mb-1 block" />
              <span className="block text-xs pb-1">Tontines</span>
              <span className="block w-5 mx-auto h-1 group-hover:bg-[#BB0A01] rounded-full"></span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
