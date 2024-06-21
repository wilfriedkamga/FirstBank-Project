import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MembresTontineCard from "./MembresTontineCard";
import AddTontineMembre from "./AddTontineMembre";
import TontinesServices from "../../../../../Services/TontinesServices";
import AddTontineMembreDialog from "./AddMembreTontine";
import AddMembreTontineDialog from "./AddMembreTontine";

type TTontineMembreModel = {
  id: string;
  nomUtilisateur: string;
  role: string;
  id_caisse: string;
  idutiliateur: string;
  creer_par: string;
};

const MembresTontine = () => {
  const elements = [];
  const [toogle, setToogle] = useState<boolean>(false);
  const [tontineMembreList, setTontineMembreList] = useState<
    TTontineMembreModel[]
  >([]);
  const location = useLocation();

  useEffect(() => {
    MembreTontineInit(location.pathname.split("/")[3]);
  }, []);

  const MembreTontineInit = (idTontine: string) => {
    TontinesServices.GetMembresTontine(idTontine)
      .then((response) => {
        console.log(response.data.data);
        setTontineMembreList(response.data.data);
      })
      .catch((error) => {
        console.log("echec");
      });
  };
const tontine:TTontineMembreModel={
  id: "123456",
  nomUtilisateur: "Wilfried",
  role: "Administrateur",
  id_caisse: "Aucune",
  idutiliateur: "650641633",
  creer_par: "KAMGA ",
}
const table=[tontine, tontine,tontine,tontine, tontine,tontine]
  return (
    <div>
      <div className="h-full  w-full grid  grid-cols-1 md:grid-cols-3 gap-5 ">
        {table.map((item, index) => (
          <MembresTontineCard
            nom={item.nomUtilisateur}
            phone={item.idutiliateur}
            role={item.role}
          />
        ))}
      </div>
      
      <AddMembreTontineDialog/>
    </div>
  );
};

export default MembresTontine;
