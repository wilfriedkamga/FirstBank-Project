import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MembresCard from "./membreCard";
import AddCaisseMembre from "./AddCaisseMembre";
import TontinesServices from "../../../../../Services/TontinesServices";
import AddTontineDialog from "./AddTontineDialog";

type TCaisseMembreModel = {
    id: string;
    nomUtilisateur: string;
    role: string;
    id_caisse: string;
    idutiliateur: string;
    creer_par: string;
  };

const MembresCaisseContent = () => {
  const elements = [];
  const [toogle, setToogle] = useState<boolean>(false);
  const [caisseMembreList, setCaisseMembreList]=useState<TCaisseMembreModel[]>([])
  const location=useLocation()

  

  useEffect(() => {
    
    MembreCaisseInit(location.pathname.split("/")[5])
    
  }, []);

 const MembreCaisseInit=(idCaisse:string)=>{
    TontinesServices.GetMembresCaisse(idCaisse)
    .then((response)=>{
      console.log(response.data.data)
      setCaisseMembreList(response.data.data)
    })
    .catch((error)=>{
      console.log("echec")
    })
 }

  return (
    <div>
      <div className="h-full  w-full grid  grid-cols-1 md:grid-cols-4 gap-5 ">
        {caisseMembreList.map((item,index)=>(
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
