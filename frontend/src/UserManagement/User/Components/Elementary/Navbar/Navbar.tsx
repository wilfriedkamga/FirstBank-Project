import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import NotificationPanel from "./NotificationPanel";
import UserAvatar from "./UserAvatar";
import SpaceDashboardSharpIcon from "@mui/icons-material/SpaceDashboardSharp";
import Variable from "../../../../../Variable";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const userAvatarItems = [
    {
      label: "Dashboard",
      link: "/tontine",
      Icon: <SpaceDashboardSharpIcon />,
    },
    {
      label: "Mes Tontines",
      link: "/tontine/mestontines",
      Icon: <SpaceDashboardSharpIcon />,
    },
    {
      label: "Mes cotisations",
      link: "/tontine/mescotisations",
      Icon: <SpaceDashboardSharpIcon />,
    },
    {
      label: "Mes sanctions",
      link: "/tontine/messanctions",
      Icon: <SpaceDashboardSharpIcon />,
    },
    {
      label: "Mes dettes",
      link: "/tontine/mesdettes",
      Icon: <SpaceDashboardSharpIcon />,
    },
  ];
  type userAvatarItem = {
    abel: string;
    link: string;
    Icon: any;
  };
  const [toogle, setToogle] = useState(false);
  const butRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const user = Variable.getLocalStorageItem("user");
  const [currentPath, setCurrentPath] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  window.addEventListener("click", (e) => {
    if (e.target != menuRef.current && e.target != butRef.current) {
      setToogle(false);
    }
  });

  return (
    <div className=" relative rounded-right flex justify-between items-center bg-red-600  px-4 py-3 2xl:py-4 sticky z-100 top-0">
      <div className="flex gap-4">
        <div
          ref={butRef}
          onClick={() => setToogle(!toogle)}
          className="text-2xl text-white pr-3 cursor-pointer font-bold block md:hidden"
        >
          ☰
        </div>

        <div
          onClick={() => navigate(Variable.getParentPath(location.pathname))}
          className="text-2xl text-white hover:text-[#828181] cursor-pointer p-2   font-bold block md:block hidden"
        >
          <ArrowCircleLeftIcon style={{ fontSize: "3rem" }} />
        </div>

        {toogle ? (
          <div
            ref={menuRef}
            className="absolute bg-[#828181]  border-[2px] left-[20px] top-[60px] w-[200px]"
          >
            <ul>
              {userAvatarItems.map((item: any, index: any) => (
                <div
                  key={index}
                  className="flex p-2 mb-4 hover:bg-red-600 hover:text-white rounded-full hover:font-bold cursor-pointer"
                >
                  <Link
                    onClick={item.link}
                    className="flex rounded-lg"
                    to={item.link}
                  >
                    <span className="px-2">{item.Icon}</span>
                    <li className="">{item.label}</li>
                  </Link>
                </div>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div className="w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]">
        <SearchRoundedIcon className="text-gray-500 text-xl" />

        <input
          type="text"
          placeholder="Search...."
          className="flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800"
        />
      </div>
      <div className="flex gap-2 items-center">
        <NotificationPanel />

        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
