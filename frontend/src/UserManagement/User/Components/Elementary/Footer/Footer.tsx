import React from "react";
import SpaceDashboardSharpIcon from "@mui/icons-material/SpaceDashboardSharp";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaidIcon from "@mui/icons-material/Paid";
import { useNavigate, useLocation } from "react-router-dom";
import Variable from "../../../../../Variable";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex justify-between bg-red-600   items-center px-4 py-2  ">
      <div 
      onClick={() => navigate("/home")}
      className="text-white hover:bg-red-800  px-4 py-2  font-bold">
        <AccountBalanceWalletIcon style={{ fontSize: '2rem' }} />
      </div>
      <div
        onClick={() => navigate(Variable.getParentPath(location.pathname))}
        className="text-white hover:bg-red-800 px-4 py-2 font-bold"
      >
        <ArrowCircleLeftIcon style={{ fontSize: '2rem' }} />
      </div>
      <div
        onClick={() => navigate("/tontine/mestontines")}
        className="text-white hover:bg-red-800  px-4 py-2  font-bold"
      >
        <PaidIcon style={{ fontSize: '2rem' }} />
      </div>

      <div className="text-white hover:bg-red-800  px-4 py-2 font-bold">
        <ModeCommentIcon style={{ fontSize: '2rem' }} />
      </div>
    </div>
  );
};

export default Footer;
