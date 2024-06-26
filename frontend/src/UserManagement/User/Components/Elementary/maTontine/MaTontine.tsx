import React, { useEffect, useState } from "react";
import SpaceDashboardSharpIcon from "@mui/icons-material/SpaceDashboardSharp";
import { useNavigate, useLocation } from "react-router-dom";
import  logo from "../../../../../Utils/Assets/logo384.png"
import  logo_caisse from "../../../../../Utils/Assets/caisse.png"
import  logo_membre from "../../../../../Utils/Assets/membre.png"
import  logo_parametre from "../../../../../Utils/Assets/parametre.png"
import  logo_reunion from "../../../../../Utils/Assets/reunion.png"
import  logo_evenement from "../../../../../Utils/Assets/Evenement.png"
import Authentications from "../../../../../Services/Authentications";
import AssociationServices from "../../../../../Services/AssociationServices";


export const MaTontine = () => {
const [assocaciation, setAssociation]=useState<any>()
const location=useLocation()

useEffect(()=>{
  AssociationServices.GetAssociationDetails(location.pathname.split("/")[3])
  .then((response)=>{
    setAssociation(response.data.data)
  })
  .catch((error)=>{

   console.log(error)
  })
},[])
  const stats = [
    {
      _id: "1",
      label: "tontines",
      lable_visible:"Tontines",
      total: 0,
      logo:logo_caisse,
     
    },
    {
      _id: "2",
      label: "reunions",
      lable_visible:"Réunions",
      total: 0,
      logo:logo_reunion,
     
    },
    {
      _id: "3",
      label: "evenements",
      lable_visible:"Evenements",
      total: 0,
      logo:logo_evenement,

    },
    {
      _id: "4",
      label: "membres",
      lable_visible:"Membres",
      total: 0,
      logo:logo_membre,
  
    },

    {
      _id: "4",
      label: "parametres",
      lable_visible:"Paramètres",
      total: null,
      logo:logo_parametre,
      
    },
  ];

  const navigate = useNavigate();

  

  const Card = ({ label, count, logo,bool }: any) => {
    return (
      <div className="sm:w-[250px] sm:h-[200px] w-full h-[150px] bg-white flex flex-col items-center justify-center  shadow-md rounded-md">
        <div className="h-10 flex justify-center items-center flex-col ">
          <img src={logo} className=" w-[110px] mb-2 h-[120px] sm:w-[120px] sm:h-[120px]" alt="" />
          {count===null?<p className="text-base text-gray-800 font-bold">{label}</p>:<p className="text-base text-gray-800 font-bold">{label} {"("+count+")"}</p>}
        </div>
      </div>
    );
  };

  const Style =
    "w-10 h-10 rounded-full flex items-center justify-center text-white";
  const viewCard = (path: string) => {
    navigate(path);
  };
  const currentPath = location.pathname + "/";
  return (
    <div className="mb-[20px]">
      <div className="h-full ">
        <div className="grid  grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map(({ logo, lable_visible,label, total }, index) => (
            <div
              onClick={() => viewCard(currentPath + label)}
              className="cursor-pointer "
              key={index}
            >
              <Card
                key={index}
                logo={logo}
                bg="w-10 cursor-pointer rounded-full flex items-center bg-red-600 justify-center text-white"
                label={lable_visible}
                count={total}
                bool={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
