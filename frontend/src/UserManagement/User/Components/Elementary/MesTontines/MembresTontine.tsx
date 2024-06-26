import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MembresTontineCard from "./MembresTontineCard";
import AddTontineMembre from "./AddTontineMembre";
import TontinesServices from "../../../../../Services/TontinesServices";
import AddTontineMembreDialog from "./AddMembreTontine";
import AddMembreTontineDialog from "./AddMembreTontine";
import AssociationServices from "../../../../../Services/AssociationServices";

type TTontineMembreModel = {
  id: string;
  name: string;
  role: string;
  phone: string;
  creationDate: Date;
};

const MembresTontine = () => {
  const elements = [];
  const [toogle, setToogle] = useState<boolean>(false);
  const [tontineMembreList, setTontineMembreList] = useState<
    TTontineMembreModel[]
  >([]);
  const location = useLocation();

  useEffect(() => {
    MembreAssoInit(location.pathname.split("/")[3]);
  }, []);

  const MembreAssoInit = (idAsso:string) => {
    
    AssociationServices.GetMembersByAssociationId(idAsso)
    .then((response)=>{
      console.log(response.data);
      setTontineMembreList(response.data)
      
    })
    .catch((error)=>{
     console.log("erreur survenue lors de la recuperation des membres de l'association")
    })
  };
  const addMember=(data:any)=>{
    setTontineMembreList(tontineMembreList.concat(data))
  }


  return (
    <div>
      <div className="h-full  w-full grid  grid-cols-1 md:grid-cols-3 gap-5 ">
        {tontineMembreList.map((item, index) => (
          <MembresTontineCard
            nom={item.name}
            phone={item.phone}
            role={item.role}
          />
        ))}
      </div>
      
      <AddMembreTontineDialog addMember={addMember} />
    </div>
  );
};

export default MembresTontine;
