import React, { useEffect, useRef, useState } from "react";
import SpaceDashboardSharpIcon from "@mui/icons-material/SpaceDashboardSharp";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Variable from "../../../../../Variableprod1";
import { getInitials } from "../Utils";
import { Link } from "react-router-dom";
import logo from "../../../../../Utils/Assets/Avatar.png";

type ChildComponentProps = {
  dropdownVisibility: boolean;
};
const UserAvatar = ({ dropdownVisibility }: ChildComponentProps) => {
  const userAvatarItems = [
    {
      label: "portail",
      link: "/home",
      Icon: <SpaceDashboardSharpIcon />,
    },
    {
      label: "Profil",
      link: "/settings",
      Icon: <AccountCircleIcon />,
    },

    {
      label: "Déconnexion",
      link: "/",
      Icon: <LogoutIcon />,
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

  const handleLogout = () => {
    alert("vous allez vous déconnecté");
    Variable.removeFromLocalStorage("user");
  };

  window.addEventListener("click", (e) => {
    if (e.target != menuRef.current && e.target != butRef.current) {
      setToogle(false);
    }
  });

  return (
    <>
      {false ? (
        <div className="">
          <div
            ref={butRef}
            onClick={() => setToogle(!toogle)}
            className="w-[40px]  flex justify-center items-center font-bold h-[40px] rounded-full text-red-700 bg-[#828181] cursor-pointer"
          >
            {getInitials(user.user.fullName)}
          </div>
          {toogle && dropdownVisibility ? (
            <div
              ref={menuRef}
              className="absolute bg-gray-100 rounded-lg border-[2px] right-[20px] w-[150px]"
            >
              <ul>
                {userAvatarItems.map((item: any, index: any) => (
                  <div
                    key={index}
                    className="flex p-2 hover:bg-gray-400 cursor-pointer"
                  >
                    <Link
                      onClick={item.link == "/" ? handleLogout : () => null}
                      className="flex"
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
      ) : (
        <div className="">
          <div
            ref={butRef}
            onClick={() => setToogle(!toogle)}
            style={{ backgroundImage: `url(${logo})` }}
            className="w-[40px]   flex justify-center border-gray-600 border-[2px] items-center font-bold h-[40px] rounded-full bg-cover  text-white bg-  cursor-pointer"
          ></div>
          {toogle && dropdownVisibility ? (
            <div
              ref={menuRef}
              className="absolute bg-gray-100 rounded-lg border-[2px] right-[20px] w-[150px]"
            >
              <ul>
                {userAvatarItems.map((item: any, index: any) => (
                  <div
                    key={index}
                    className="flex p-2 hover:bg-gray-400 cursor-pointer"
                  >
                    <Link
                      onClick={item.link == "/" ? handleLogout : () => null}
                      className="flex"
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
      )}
    </>
  );
};

export default UserAvatar;
