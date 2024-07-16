import React, { useEffect, useState } from "react";
import {
  FaCog,
  FaHome,
  FaPoll,
  FaRegEnvelope,
  FaRegFileAlt,
} from "react-icons/fa";
import SpaceDashboardSharpIcon from "@mui/icons-material/SpaceDashboardSharp";
import SideBarItem from "./SideBarItem";
import { useLocation } from "react-router-dom";

const sidebarItems = [
  {
    label: "Dashboard",
    link: "/tontine",
    icon: SpaceDashboardSharpIcon,
  },
  {
    label: "Mes associations",
    link: "/tontine/mestontines",
    icon: SpaceDashboardSharpIcon,
  },
  ,
  {
    label: "Mes cotisations",
    link: "/tontine/mescotisations",
    icon: <SpaceDashboardSharpIcon />,
  },
  ,
  {
    label: "Mes sanctions",
    link: "/tontine/messanctions",
    icon: <SpaceDashboardSharpIcon />,
  },
  ,
  {
    label: "Mes dettes",
    link: "/tontine/mesdettes",
    icon: <SpaceDashboardSharpIcon />,
  }
];
type sidebarItem = {
  label: string;
  link: string;
  Icon: any;
};

function SideBar() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState<string>(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <div className="w-full h-full bg-white  flex flex-col gap-6 p-2 ">
      
      <h1 className="flex gap-1 items-center">
        <span className="text-2xl font-bold text-black ">FBTontine</span>
      </h1>
      <div className="flex-1 gap-4 flex flex-col mt-10  ">
        {sidebarItems.map((item: any, index: number) => (
          <div key={index}>
            <SideBarItem
              label={item.label}
              link={item.link}
              Icon={item.Icon}
              currentPath={currentPath}
            />
          </div>
        ))}
      </div>
      <div className=""></div>
    </div>
  );
}

export default SideBar;
