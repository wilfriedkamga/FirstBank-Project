import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import Header from "../../../Front_Usermanagement/Component/header/Header";
import BottomNavigation from "../../Component/bottom navigation/BottomNavigation";
import AccountBalanceBox from "../../Component/accountBalance/AccountBalanceBox";
import Tabs from "../../Component/tabs/Tabs";
import LastOngoingPlan from "../../Component/Ongoing Plans/LastOngoingPlan";

const SavingsDash = () => {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      <Header />

      <div className="flex p-2 mt-[10vh] flex-col pt-5 h-full w-full space-y-6 overflow-auto">
        <AccountBalanceBox />
        <div className="w-full mt-2 px-2">
          <Tabs />
        </div>
        <div className="pt-5 ml-5 border-b border-gray-200">
          <h3 className="font-title font-semibold text-[#0C1013] text-md">
            Savings App Services
          </h3>
        </div>
        <div className="w-full flex flex-row justify-start">
          <Link to="/savings/newPlan" className="justify-center items-center">
            <div className="rounded-lg h-16 w-16 mb-1 mx-5 md:h-24 md:w-24 p-2.5 md:p-3.5">
              <img
                src="./assets/images/iconTopUp.svg"
                alt="logo"
                width={200}
                height={300}
              />
            </div>
            <span className="font-account text-center px-3">
              Top Up my Wallet
            </span>
          </Link>
          <Link to="/savings/newPlan" className="justify-center items-center">
            <div className="rounded-lg h-16 w-16 mb-1 mx-5 md:h-24 md:w-24 p-2.5 md:p-3.5">
              <img
                src="./assets/images/iconWithdraw.svg"
                alt="logo"
                width={200}
                height={300}
              />
            </div>
            <span className="font-account text-center px-3">
              Withdraw my Wallet
            </span>
          </Link>
        </div>
        <div className="pt-5 ml-5 border-b border-gray-200">
          <h3 className="font-title font-semibold text-[#0C1013] text-md">
            Ongoing Plans
          </h3>
        </div>
        <LastOngoingPlan />
        <div className="fixed end-6 bottom-20 group z-30">
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
        <BottomNavigation />
      </div>
    </div>
  );
};

export default SavingsDash;
