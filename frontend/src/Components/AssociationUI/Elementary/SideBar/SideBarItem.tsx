import React from "react";
import { Link, useLocation } from "react-router-dom";

type ChildComponentProps = {
  sideBarItems: [];
};
type sidebarItem = {
  label: string;
  link: string;
  Icon: any;
  currentPath: string;
};

const SideBarItem: React.FC<sidebarItem> = ({
  label,
  link,
  Icon,
  currentPath,
}) => {
  return (
    <div>
      {currentPath.includes(link) && link !="tontine" ? (
        <Link
          to={link}
          className="w-full lg:w-3/4 flex p-3 gap-4 font-bold rounded-lg items-center text-red-800  bg-gray-300"
        >
          <span className="text-red-500">{label}</span>
        </Link>
      ) : (
        <Link
          to={link}
          className="w-full lg:w-3/4 flex gap-4 p-3 rounded-lg items-center text-black hover:text-red-500 hover:bg-gray-300"
        >
          <span className="hover:text-white">{label}</span>
        </Link>
      )}
    </div>
  );
};

export default SideBarItem;
