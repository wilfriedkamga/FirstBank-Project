import React from "react";
import SpaceDashboardSharpIcon from "@mui/icons-material/SpaceDashboardSharp";
import { useNavigate, useLocation } from "react-router-dom";

export const MaTontine = () => {
  const stats = [
    {
      _id: "1",
      label: "caisses",
      total: 4,
      icon: <SpaceDashboardSharpIcon />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "reunions",
      total: 4,
      icon: <SpaceDashboardSharpIcon />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "evenements",
      total: 12,
      icon: <SpaceDashboardSharpIcon />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "membres",
      total: 5,
      icon: <SpaceDashboardSharpIcon />,
      bg: "bg-[#be185d]" || 0,
    },

    {
      _id: "4",
      label: "parametres",
      total: "3",
      icon: <SpaceDashboardSharpIcon />,
      bg: "bg-[#be185d]" || 0,
    },
  ];

  const navigate = useNavigate();

  const location = useLocation();

  const Card = ({ label, count, bg, icon }: any) => {
    return (
      <div className="w-full h-50 bg-white p-5 shadow-md rounded-md flex items-center justify-between">
        <div className="h-full flex flex-1 flex-col justify-between">
          <p className="text-base text-gray-600">{label}</p>
          <span className="text-2xl font-semibold">{count}</span>
          <span className="text-sm text-gray-400">{"5 dernier mois"}</span>
        </div>

        <div className={bg}>{icon}</div>
      </div>
    );
  };

  const Style =
    "w-10 h-10 rounded-full flex items-center justify-center text-white";
  const viewCard = (path: string) => {
    navigate(path);
  };
  const currentPath = location.pathname + "/";
  return (
    <div>
      <div className="h-full  py-4">
        <div className="grid p-4 grid-cols-1 md:grid-cols-4 gap-5">
          {stats.map(({ icon, bg, label, total }, index) => (
            <div
              onClick={() => viewCard(currentPath + label)}
              className="cursor-pointer "
            >
              <Card
                key={index}
                icon={icon}
                bg="w-10 cursor-pointer h-10 rounded-full flex items-center bg-red-600 justify-center text-white"
                label={label}
                count={total}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
