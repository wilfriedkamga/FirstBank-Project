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
import Variable from "../../../Variable";
import Authentications from "../../../Services/Authentications";
import PortalTontine from "./PortalTontine";
import Footer from "../../../Front_Association/Component/Elementary/Footer/Footer";
import { Link } from "react-router-dom";
import AccountBalanceBox from "../../../Front_Saving/Component/accountBalance/AccountBalanceBox";
import BottomNavigation from "../../../Front_Saving/Component/bottom navigation/BottomNavigation";
import NewAssociation from "./Icons/NewAssociation";
import ContributeFund from "./Icons/ContributeFund";
import ContributePlan from "./Icons/ContributePlan";
import NewPlan from "./Icons/NewPlan";
import AssociationSlick from "./Association/AssociationSlick";
import Header from "../../Component/header/Header";
import NotificationService from "../../../Services/NotificationService";

const listIconSaving = [
  {
    lien: "/savings/newPlan",
    Icon: <NewPlan />,
    span: "Create a plan",
  },
  {
    lien: "/savings/newPlan",
    Icon: <ContributePlan />,
    span: "Contribute for a plan",
  },
];
const listIconAssociation = [
  {
    lien: "/association/mes associations",
    Icon: <NewAssociation />,
    span: "Create a association",
  },

  {
    lien: "/association",
    Icon: <ContributeFund />,
    span: "Contribute for a plan",
  },
];

const Portal = () => {
 

  return (
    <div className="w-full h-full flex flex-col">
      <Header />

      <div className="flex flex-col p-2 mt-[10vh] pt-5 h-full w-full space-y-8 overflow-y-auto">
        <AccountBalanceBox />
        <div className="mb-5 ml-5 border-b border-gray-200">
          <h3 className="font-title font-semibold text-[#0C1013] text-md">
            Savings App Services
          </h3>
        </div>

        <div className="flex flex-row w-full justify-start space-x-6 md:space-x-24">
          {listIconSaving.map((item, index) => (
            <Link to={item.lien} className="w-18 justify-center">
              <div className="rounded-full bg-[#FF6161] h-16 w-16 mb-1 mx-5 md:h-16 md:w-16 p-5 md:p-4 items-center flex">
                {item.Icon}
              </div>
              <span className="font-account text-center block">
                {item.span}
              </span>
            </Link>
          ))}
        </div>

        <div className="mb-5 ml-5 border-b border-gray-200">
          <h3 className="font-title font-semibold text-[#0C1013] text-md">
            Association App Services
          </h3>
        </div>

        <div className="flex flex-row w-full justify-start space-x-6 md:space-x-24">
          {listIconAssociation.map((item, index) => (
            <Link to={item.lien} className="w-18 justify-center">
              <div className="rounded-full bg-[#FF6161] h-16 w-16 mb-1 mx-5 md:h-16 md:w-16 p-5 md:p-4 items-center flex">
                {item.Icon}
              </div>
              <span className="font-account text-center block">
                {item.span}
              </span>
            </Link>
          ))}
        </div>

        <div className="h-fit">
          <div className="mb-5 ml-5 border-b border-gray-200">
            <h3 className="font-title font-semibold text-[#0C1013] text-md">
              Recent Association
            </h3>
          </div>
          <AssociationSlick />
        </div>

        <div className="mt-16">
          <div className="mb-5 ml-5 border-b border-gray-200">
            <h3 className="font-title font-semibold text-[#0C1013] text-md">
              Need help ?
            </h3>
          </div>
          <Link to="/contact-us" className="w-2/3 flex flex-col">
            <div className="rounded-full bg-[#FF6161] h-16 w-16 mb-1 mx-5 md:h-16 md:w-16 p-5 md:p-4 items-center flex">
              <FontAwesomeIcon
                icon={faHeadset}
                size="lg"
                className="text-[#F5F5F5] mx-auto"
              />
            </div>
            <span className="font-account text-center ml-5 md:ml-7 block w-1/3 md:w-1/12">
              Contact an agent
            </span>
          </Link>
        </div>
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
        <Footer />
      </div>
    </div>
  );
};

export default Portal;
