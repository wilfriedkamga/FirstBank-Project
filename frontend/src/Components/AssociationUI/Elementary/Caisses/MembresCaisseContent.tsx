import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MembresCard from "./membreCard";
import AddCaisseMembre from "./AddCaisseMembre";

import AddTontineDialog from "./AddTontineDialog";
import TontinesServices from "../../../../Services/TontinesServices";
import AssociationServices from "../../../../Services/AssociationServices";

type TTontineMembreModel = {
    id: string;
    nomUtilisateur: string;
    role: string;
    nb_occur:number;
    idutiliateur: string;
    creer_par: string;
  };

const MembresCaisseContent = () => {
  const elements = [];
  const [toogle, setToogle] = useState<boolean>(false);
  const location=useLocation()
  const [tontineMembreList, setTontineMembreList]=useState<TTontineMembreModel[]>([])
 
 useEffect(() => {
  MembreAssoInit(location.pathname.split("/")[3]);
}, []);

const MembreAssoInit = (idAsso: string) => {
  AssociationServices.GetMembersByAssociationId(idAsso)
    .then((response) => {
      console.log(response.data);
      setTontineMembreList(response.data);
    })
    .catch((error) => {
      console.log(
        "erreur survenue lors de la recuperation des membres de l'association"
      );
    });
};
const addMember = (data: any) => {
  setTontineMembreList(tontineMembreList.concat(data));
};

  return (
    <div>
      <div className="h-full  w-full grid  grid-cols-1 md:grid-cols-4 gap-5 ">
        {tontineMembreList.map((item,index)=>(
            <MembresCard nom={item.nomUtilisateur} phone={item.idutiliateur} role={item.role}/>
        ))}
      </div>
      <div
        onClick={() =>setToogle(!toogle)}
        className="text-[20px] cursor-pointer absolute  sm:bottom-8 sm:right-8 right-2 bottom-[75px]  w-[60px] h-[60px] sm:h-[60px] sm:w-[60px] flex justify-center items-center  rounded-full  bg-red-700 text-white font-bold"
      >
        +
      </div>

      {toogle && (
        <div className="absolute shadow-sm shadow-white h-[50vh] w-[90vw] mr-4 mx-auto  border-[1px] border-green-200 sm:h-[60vh] sm:top-40 sm:w-[30vw] shadow-lg bg-white  sm:bg-[#a09b9b] top-[13vh]  sm:right-[25vw] right-[1vw] rounded-lg   ">
          <AddCaisseMembre setVisibility={setToogle} visibility={toogle} />
        </div>
      )}
      
      
    </div>
  );
};

export default MembresCaisseContent;
