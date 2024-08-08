import { faCoins, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const PortalTontine = () => {
  return (
    <div className="flex md:justify-normal justify-center items-center flex-row w-full  space-x-6 md:space-x-24">
      <Link to="/association/mes associations" className="w-18 ml-3 justify-center">
        <div className="rounded-lg border-gray-500 border-[2px] h-16 w-16 mb-1 mx-5 md:h-24 md:w-24 p-2.5 md:p-3.5">
          <FontAwesomeIcon
            icon={faCoins}
            size="lg"
            className="text-[#0C1013] bg-gray-400 rounded-full md:p-5 p-2.5"
          />
        </div>
        <span className="font-account text-center block">
          Créer association
        </span>
      </Link>
      <Link
        to="/association/"
        className="w-18 ml-3 justify-center"
      >
        <div className="rounded-lg border-gray-500 border-[2px] h-16 w-16 mb-1 mx-5 md:h-24 md:w-24 p-2.5 md:p-3.5">
          <FontAwesomeIcon
            icon={faCoins}
            size="lg"
            className="text-[#0C1013] bg-gray-400 rounded-full md:p-5 p-2.5"
          />
        </div>
        <span className="font-account text-center block">
          Dashbord association
        </span>
      </Link>
    </div>
  );
};

export default PortalTontine;
