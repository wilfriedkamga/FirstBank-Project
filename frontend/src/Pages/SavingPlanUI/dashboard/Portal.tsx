import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faHandHoldingUsd,
  faHeadset,
  faPeopleGroup,
  faPiggyBank,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import Variable from "../../../Variable";

import Authentications from "../../../Services/Authentications";
import PortalTontine from "./PortalTontine";
import Header from "../../../Components/SavingPlan/header/Header";
import AccountBalanceBox from "../../../Components/SavingPlan/accountBalance/AccountBalanceBox";
import RecentTontine from "../../../Components/SavingPlan/recentTontine/RecentTontine";
import Footer from "../../../Components/AssociationUI/Elementary/Footer/Footer";

const Portal = () => {
  const [notifTitle, setNotifTitle] = useState<string>("");
  const [notifMessage, setNotifMessage] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [name, setName] = useState("");
  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setName(user.user.fullName);
  });

  return (
    <div className="w-full bg-white h-full flex flex-col">
      <Header />

      <div className="flex  mt-[10vh] md:p-4 p-2 flex-col pt-5 h-full w-full space-y-8 overflow-auto">
        <div className="font-bold text-xl">Bienvenue, {name}</div>
        <AccountBalanceBox />
        <div className="mb-5 border-b border-gray-200">
          <h3 className="font-title font-bold text-[#0C1013] text-lg">
            Gestion des épargnes
          </h3>
        </div>
        <div className="flex md:justify-normal justify-center items-center flex-row w-full justify-start space-x-6 md:space-x-24">
          <Link to="/newPlan" className="w-18 justify-center">
            <div className="rounded-lg border-gray-500 border-[2px] h-16 w-16 mb-1 mx-5 md:h-24 md:w-24 p-2.5 md:p-3.5">
              <FontAwesomeIcon
                icon={faHandHoldingUsd}
                size="lg"
                className="text-[#0C1013] bg-gray-400 rounded-full md:p-5 p-2.5"
              />
            </div>
            <span className="font-semibold text-center block">
              Mes plans
            </span>
          </Link>
          <Link
            to="/savings/app/contribute/plan"
            className="w-18 justify-center"
          >
            <div className="rounded-lg border-gray-500 border-[2px] h-16 w-16 mb-1 mx-5 md:h-24 md:w-24 p-2.5 md:p-3.5">
              <FontAwesomeIcon
                icon={faHandHoldingUsd}
                size="lg"
                className="text-[#0C1013] bg-gray-400 rounded-full md:p-5 p-2.5"
              />
            </div>
            <span className="font-semibold text-center block">Dashbord</span>
          </Link>
        </div>
        <div className="mb-5  border-b border-gray-200">
          <h3 className="font-title font-bold text-[#0C1013] text-lg">
            Gestion des associations
          </h3>
        </div>
        <PortalTontine />
        <div className="mt-16">
          <div className="mb-5 ml-5 border-b border-gray-200">
            <h3 className="font-title font-semibold text-[#0C1013] text-md">
              Need help ?
            </h3>
          </div>
          <Link to="/contact-us" className="w-2/3 flex flex-col">
            <div className="rounded-lg h-16 w-16 mb-1 ml-8 md:h-24 md:w-24 p-2.5 md:p-3.5">
              <FontAwesomeIcon
                icon={faHeadset}
                size="lg"
                className="text-[#0C1013] bg-gray-400 rounded-full md:p-5 p-2.5"
              />
            </div>
            <span className="font-account text-center ml-5 md:ml-7 block w-1/3 md:w-1/12">
              Contact an agent
            </span>
          </Link>
        </div>
        <div className="fixed end-6 md:block hidden bottom-10 group z-30">
          <button
            type="button"
            className="flex items-center justify-center text-white bg-gray-400 hover:bg-[#d07975] rounded-full shadow-md w-14 h-14 focus:ring-4"
          >
            <FontAwesomeIcon
              icon={faComment}
              size="lg"
              className="text-[#0C1013] rounded-full md:p-5 p-2.5 w-5 h-5"
            />
            <span className="sr-only">Chatbot</span>
          </button>
        </div>
      </div>

      <div className="w-full h-fit z-20">
        <Footer />
      </div>
    </div>
  );
};

export default Portal;
