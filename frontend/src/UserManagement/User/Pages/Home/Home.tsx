import React from "react";
import BottomNavigation from "../../Components/Elementary/BottomNavigation/BottomNavigation";
import Header from "../../Components/Elementary/Header/Header";
import AccountBalanceBox from "../../Components/Elementary/AccountBalanceBox/AccountBalanceBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faHandHoldingUsd,
  faHeadset,
  faPeopleGroup,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";
import RecentTontine from "../../Components/Elementary/RecentTontine/RecentTontine";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Portal = () => {
  const navigate=useNavigate();
  return (
    <div className="w-full bg-white h-full p-2 flex flex-col">
      <div className="border-b border-gray-200 w-full h-fit p-2 z-20">
        <Header />
      </div>
      <div className="flex flex-col pt-5 h-full w-full space-y-8 overflow-auto">
        <AccountBalanceBox />
        <div className="flex flex-row w-full justify-center space-x-8 md:space-x-24">
          <a href="/savings/app/new-savings-plan">
            <div className="border border-red-600 rounded-lg h-16 w-16 mb-1 ml-8 md:h-24 md:w-24 p-2.5 md:p-3.5">
              <FontAwesomeIcon
                icon={faPiggyBank}
                size="lg"
                className="text-[#0C1013] bg-gray-400 rounded-full md:p-5 p-2.5"
              />
            </div>
            <span className="font-account text-center block ml-8">
              Create a plan
            </span>
          </a>
          <a href="/savings/app/contribute-to-plan">
            <div className="border border-red-600 rounded-lg h-16 w-16 mb-1 ml-2 md:h-24 md:w-24 p-2.5 md:p-3.5">
              <FontAwesomeIcon
                icon={faHandHoldingUsd}
                size="lg"
                className="text-[#0C1013] bg-gray-400 rounded-full md:p-5 p-2.5"
              />
            </div>
            <span className="font-account text-center block">
              Contribute for a plan
            </span>
          </a>
          <button onClick={()=>navigate("/tontine")}>
            <div className="border border-red-600 rounded-lg h-16 w-16 mb-1 ml-2 md:h-24 md:w-24 p-2.5 md:p-3.5">
              <FontAwesomeIcon
                icon={faPeopleGroup}
                size="lg"
                className="text-[#0C1013] bg-gray-400 rounded-full md:p-5 p-2.5"
              />
            </div>
            
            <span className="font-account text-center block">
              Create a Tontine
            </span>
            </button>
            
         
          <a href="/tontine/app/contribute-to-fund">
            <div className="border border-red-600 rounded-lg h-16 w-16 mb-1 ml-2 md:h-24 md:w-24 p-2.5 md:p-3.5">
              <FontAwesomeIcon
                icon={faCoins}
                size="lg"
                className="text-[#0C1013] bg-gray-400 rounded-full md:p-5 p-2.5"
              />
            </div>
            <span className="font-account text-center block">
              Contribute to a fund
            </span>
          </a>
          <div className="flex flex-col"></div>
        </div>
        <div className="h-fit">
          <div className="mb-5 ml-5 border-b border-gray-200">
            <h3 className="font-medium text-gray-500 font-account text-2xl">
              Recent Tontines
            </h3>
          </div>
          <RecentTontine />
        </div>
        <div className="mt-16">
          <div className="mb-5 ml-5 border-b border-gray-200">
            <h3 className="font-medium text-gray-500 font-account text-2xl">
              Need help ?
            </h3>
          </div>
          <a
            href="/savings/app/new-savings-plan"
            className="w-2/3 flex flex-col"
          >
            <div className="border border-red-600 rounded-lg h-16 w-16 mb-1 ml-8 md:h-24 md:w-24 p-2.5 md:p-3.5">
              <FontAwesomeIcon
                icon={faHeadset}
                size="lg"
                className="text-[#0C1013] bg-gray-400 rounded-full md:p-5 p-2.5"
              />
            </div>
            <span className="font-account text-center ml-5 md:ml-7 block w-1/3 md:w-1/12">
              Contact an agent
            </span>
          </a>
        </div>
      </div>
      <div className="w-full h-fit z-20">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Portal;
