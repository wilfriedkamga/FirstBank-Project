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
    label: "Mes Tontines",
    link: "/tontine/mestontines",
    icon: SpaceDashboardSharpIcon,
  },
  ,
  {
    label: "Mes cotisations",
    link: "/tontine/mescotisations",
    icon: SpaceDashboardSharpIcon,
  },
  ,
  {
    label: "Mes sanctions",
    link: "/tontine/messanctions",
    icon: SpaceDashboardSharpIcon,
  },
  ,
  {
    label: "Mes dettes",
    link: "/tontine/mesdettes",
    icon: SpaceDashboardSharpIcon,
  },
  {
    label: "Parametres",
    link: "/tontine/mesdettes",
    icon: SpaceDashboardSharpIcon,
  },
];
type sidebarItem = {
  label: string;
  link: string;
  Icon: any;
};

function MobileSideBar() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState<string>(location.pathname);

  useEffect(()=>{
    setCurrentPath(location.pathname)
  },[location])

  return (
    
      <div className=" absolute z-1000 flex-1 flex flex-col     bg-[#828181] rounded-lg gap-y-5 py-12 px-4">
        {sidebarItems.map((item: any) => (
          <>
            <SideBarItem
              label={item.label}
              link={item.link}
              Icon={item.Icon}
              currentPath={currentPath}
            />
          </>
        ))}
       
      </div>
     
  );
}

export default MobileSideBar;
