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
      {currentPath == link ? (
        <Link
          to={link}
          className="w-full lg:w-3/4 flex gap-2 px-5 py-3 font-bold rounded-full items-center text-gray-800 text-base bg-red-500"
        >
          <span className="text-white">{label}</span>
        </Link>
      ) : (
        <Link
          to={link}
          className="w-full lg:w-3/4 flex gap-2 px-5 py-3 rounded-full items-center text-gray-800 font-bold text-base hover:bg-red-500"
        >
          <span className="hover:text-white">{label}</span>
        </Link>
      )}
    </div>
  );
};

export default SideBarItem;
