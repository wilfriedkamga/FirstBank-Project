import React from "react";
import SpaceDashboardSharpIcon from "@mui/icons-material/SpaceDashboardSharp";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaidIcon from "@mui/icons-material/Paid";
import { useNavigate, useLocation } from "react-router-dom";
import { Home } from "@mui/icons-material";


const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className=" fixed bottom-0 w-full flex lg:hidden justify-between bg-white   items-center px-4 py-  ">
      
      <div
        onClick={() => window.history.back()}
        className="text-red-600 hover:bg-gray-400 px-4 py-2 font-bold"
      >
        <Home style={{ fontSize: "2rem" }} />
      </div>

      <div
        onClick={() => navigate("/home")}
        className="text-red-600 hover:bg-gray-400  px-4 py-2  font-bold"
      >
        <AccountBalanceWalletIcon style={{ fontSize: "2rem" }} />
      </div>
      <div
        onClick={() => navigate("/association/mes associations")}
        className="text-red-600 hover:bg-gray-400 px-4 py-2  font-bold"
      >
        <PaidIcon style={{ fontSize: "2rem" }} />
      </div>
      <div className="text-red-600 hover:bg-gray-400  px-4 py-2 font-bold">
        <ModeCommentIcon style={{ fontSize: "2rem" }} />
      </div>
    </div>
  );
};

export default Footer;
