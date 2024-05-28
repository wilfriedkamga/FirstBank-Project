import React from "react";
import SpaceDashboardSharpIcon from "@mui/icons-material/SpaceDashboardSharp";
import { useNavigate, useLocation } from "react-router-dom";
import CaisseInfo from "./CaisseInfo";

function UneCaisse() {
  const stats = [
    {
      id: "parametre",
      label: "Parametres",
      total: "",
      icon: <SpaceDashboardSharpIcon />,
      bg: "bg-[#1d4ed8]",
    },
    {
      id: "membre",
      label: "membre",
      total: "",
      icon: <SpaceDashboardSharpIcon />,
      bg: "bg-[#1d4ed8]",
    },
    {
      id: "dettes",
      label: "Dettes",
      total: 0,
      icon: <SpaceDashboardSharpIcon />,
      bg: "bg-[#f59e0b]",
    },
    {
      id: "remboursements",
      label: "Remboursements",
      total: 0,
      icon: <SpaceDashboardSharpIcon />,
      bg: "bg-[#f59e0b]",
    },
    {
      id: "4njhuujk",
      label: "Sanctions",
      total: 0,
      icon: <SpaceDashboardSharpIcon />,
      bg: "bg-[#be185d]" || 0,
    },

    {
      id: "4",
      label: "Cagnotte",
      total: "0",
      icon: <SpaceDashboardSharpIcon />,
      bg: "bg-[#be185d]" || 0,
    },
  ];

  const Card = ({ label, count, bg, icon }: any) => {
    return (
      <div className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between">
        <div className="h-full flex flex-1 flex-col justify-between">
          <p className="text-base text-black font-bold">{label}</p>
          <span className="text-2xl font-semibold">{count}</span>
        </div>

        <div className={bg}>{icon}</div>
      </div>
    );
  };

  const navigate = useNavigate();
  const location = useLocation();
  const Style =
    "w-10 h-10 rounded-full flex items-center justify-center text-white";
  const viewCard = (path: string) => {
    navigate(path);
  };

  const currentPath = location.pathname + "/";

  return (
    <>
      <div className="flex flex-col  ">
        <div className="m-4">
            <div className="bg-red-600 mx-auto rounded-xl   border w-full h-[10vh] flex justify-center items-center font-bold text-white sm:w-1/5 text-  text-xl">
              0 FCFA
            </div>
        </div>
        

        <div>
          <div>
            <div className="grid p-4 grid-cols-1 md:grid-cols-4 gap-5">
              {stats.map(({ icon, bg, label, total, id }, index) => (
                <div
                  className="cursor-pointer"
                  onClick={() => viewCard(currentPath + label)}
                >
                  <Card
                    key={index}
                    icon={icon}
                    bg="w-10 h-10 rounded-full flex items-center bg-red-700 justify-center text-white"
                    label={label}
                    count={total}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UneCaisse;
