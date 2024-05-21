import React from "react";
import BoardView from "./BoardView";
import { Outlet } from "react-router-dom";

const MesTontines = () => {
  const tontinesList = [
    {
      id: "123455678",
      nom: "Les jeunes de bandjoun",
      Description:
        "C'est une tontine qui regroupe l'ensemble des jeunes de bandjoun",
      nbMembres: 12,
      type: "En ligne",
      nbNotifications: 3,
      nbCaisses: 2,
      Admins: [
        {
          nom: "kamga junior",
          telephone: " +237 650657843",
        },
        {
          nom: "kamga junior",
          telephone: " +237 650657843",
        },
        {
          nom: "kamga junior",
          telephone: " +237 650657843",
        },
      ],
    },
  ];

  return (
    <div className="flex p-2">
      <div className="fixed w-[79vw]  h-[5vh] bg-green-500 z-100 mr-9 ">
        voici mon composant pour la navigation
      </div>
      <div className=" w-full h-full bottom-30 mt-10 z-0">
        <Outlet />
      </div>
    </div>
  );
};

export default MesTontines;
