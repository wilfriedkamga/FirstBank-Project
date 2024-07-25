import React from "react";
import SpaceDashboardSharpIcon from "@mui/icons-material/SpaceDashboardSharp";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import GavelIcon from "@mui/icons-material/Gavel";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useNavigate, useLocation } from "react-router-dom";
import CaisseInfo from "./CaisseInfo";

function UneCaisse() {
  const stats = [
    {
      id: "parametres",
      label: "Parametres",
      total: "",
      icon: <SettingsIcon />,
      bg: "bg-[#1d4ed8]",
    },
    {
      id: "membre",
      label: "Membre(s)",
      total: "4",
      icon: <GroupIcon />,
      bg: "bg-[#1d4ed8]",
    },
    {
      id: "dettes",
      label: "Dette(s)",
      total: 0,
      icon: <MoneyOffIcon />,
      bg: "bg-[#f59e0b]",
    },
    {
      id: "remboursements",
      label: "Remboursement(s)",
      total: 0,
      icon: <CreditCardIcon />,
      bg: "bg-[#f59e0b]",
    },
    {
      id: "sanctions",
      label: "Sanction(s)",
      total: 0,
      icon: <GavelIcon />,
      bg: "bg-[#be185d]" || 0,
    },
    {
      id: "cagnotte",
      label: "Cagnotte(s)",
      total: "0",
      icon: <AccountBalanceWalletIcon />,
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
      <div className="flex flex-col">
        <div className="flex gapt-4 p-1">
          <div className="bg-red-600 mx-auto rounded-xl p-1 text-xs border w-full h-[10vh] flex flex-col justify-center font-bold text-white sm:w-1/5">
            <label>Personnel</label>
            <label>20 000 fcfa</label>
          </div>
          <div className="bg-red-600 mx-auto rounded-xl p-1 text-xs flex-col border w-full h-[10vh] flex justify-center font-bold text-white sm:w-1/5">
            <label>Actuel</label>
            <label>20 000 fcfa</label>
          </div>
          <div className="bg-red-600 mx-auto rounded-xl p-1 text-xs flex-col border w-full h-[10vh] flex justify-center font-bold text-white sm:w-1/5">
            <label>Dette</label>
            <label>20 000 fcfa</label>
          </div>
          <div className="bg-red-600 mx-auto rounded-xl p-1 text-xs flex-col border w-full h-[10vh] flex justify-center font-bold text-white sm:w-1/5">
            <label>Reel</label>
            <label>20 000 fcfa</label>
          </div>
        </div>
        <div>
          <div>
            <div className="grid p-4 grid-cols-1 md:grid-cols-4 gap-5">
              {stats.map(({ icon, bg, label, total, id }, index) => (
                <div
                  className="cursor-pointer"
                  onClick={() => viewCard(currentPath + label)}
                  key={index}
                >
                  <Card
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
