import { Button } from "@mui/material";
import React from "react";
import { formatDate } from "../Utils";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import UserInfo from "./UserInfo";
import { Link } from "react-router-dom";


const add = (baseUrl: string, id: string) => {
  return baseUrl + id;
};
const AssociationCardM = ({ association }: any) => {
  return (
    <div className="w-full h-fit border border-gray-400  bg-white shadow-lg p-1 rounded">
      <>
        <div className="flex items-center">
          <h4 className="line-clamp-2 font-semibold mt-2 mb-1 text-lg text-black">{association.name}  </h4>
        </div>
        <span className="text-[12px] text-gray-600"> {formatDate(new Date())}</span>
      </>
      <div className="w-full border-t border-gray-200 my-2" />
      <div className="flex items-center justify-between mb-2">
        <div className="flex  items-center gap-2">
          <div className="flex items-center text-sm text-black font-bold">
            <PeopleOutlineIcon />
            <span>{/*tontine.nbMembres*/}{association.nbMembre}</span>
          </div>
          <div className="flex items-center text-sm text-black font-bold ">
            <SavingsOutlinedIcon />
            <span>{/*tontine.nbCaisses*/}{association.nbTontine}</span>
          </div>
          <div className="flex items-center text-sm text-black font-bold ">
            <NotificationsNoneIcon />
            <span>{/*tontine.nbNotifications*/}0</span>
          </div>
        </div>
      </div>

      <button className="bg-red-600 hover:bg-red-800 m-3 rounded-md border-gray-200 p-2 border shadow-lg  text-white font-bold w-4/5">
        <Link to={"/tontine/mestontines/" + association.id}> Visiter</Link>
      </button>
    </div>
  );
};

export default AssociationCardM;
