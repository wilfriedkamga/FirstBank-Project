import React, { useEffect, useState } from "react";
import SpaceDashboardSharpIcon from "@mui/icons-material/SpaceDashboardSharp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AdjustRoundedIcon from "@mui/icons-material/AdjustRounded";
import { useNavigate, useLocation } from "react-router-dom";
import AddTontine from "../MesTontines/AddTontine";
import AddCaisse from "./AddCaisse";
import TontinesServices from "../../../../../Services/TontinesServices";

type TCaisseModel = {
  id: string;
  nom: string;
  total: string;
  type: string;
  montant: string;
  bg: string;
  tontine_id:string;
  creerPar:string;
};

const stats: TCaisseModel[] = [
  {
    id: "1hjkl",
    nom: "Caisse 1",
    total: "4",
    type: "statique",
    montant: "50 000 FCFA",
    bg: "bg-[#1d4ed8]",
    tontine_id:"",
    creerPar:"",
  }
];

const MesCaisse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [toogle, setToogle] = useState(false);
  const [addTontineVisibility, setAddTontineVisibility] =
    useState<boolean>(false);
  const [caisseList, setCaisseList] = useState<TCaisseModel[]>(stats);

  const addCaisse = (newCaisse: TCaisseModel) => {
    setCaisseList(caisseList.concat(newCaisse));
  };
  const extractTontineId = (url: string): string => {
    const parts = url.split("/");
    return parts[3]; // L'ID de la tontine est à l'indice 3 dans le tableau de segments
  };
  useEffect(() => {
    //const user = Variable.getLocalStorageItem("user")

    Initializepage(extractTontineId(location.pathname));
  }, []);

  const Initializepage = (idTontine: string) => {
    TontinesServices.GetCaissess(idTontine)
      .then((response) => {
        setCaisseList(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Card = ({ label, count, bg, type, montant }: any) => {
    return (
      <div className="sm:w-[250px] w-full h-[150px] bg-white p-5 shadow-md rounded-md flex  items-center">
        <div className="h-full flex  flex-1 flex-col">
          <p className="font-bold text-xl text-gray-600">
            <p className="">{label}</p>
            <p className="text-lg font-normal ">{type}</p>
          </p>

          <span className="text-sm mt-2 text-gray-400">{count} membres</span>
          <span className="text-lg mt-2 font-semibold text-gray-800">
            {montant}
          </span>
        </div>

        <div className={bg + "text-xl text-white font-bold"}>
          <KeyboardArrowRightIcon />
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
    <div>
      <div className="grid p-4 grid-cols-1 md:grid-cols-4 gap-5">
        {caisseList.map(
          ({ type, bg, nom, montant, total, id }, index) => (
            <div
              className="cursor-pointer"
              onClick={() => viewCard(currentPath + id)}
            >
              <Card
                key={index}
                montant={montant}
                type={type}
                bg="w-10 h-10 rounded-full flex items-center bg-red-700 justify-center text-white"
                label={nom}
                count={total}
              />
            </div>
          )
        )}
        
      </div>
      {caisseList==null || caisseList.length==0?<div className='text-lg'> Vous n'êtes dans aucune Caisse de cette tontine  !</div>:null}
      <div
        onClick={() => {
          setToogle(!toogle);
        }}
        className="text-[20px] cursor-pointer absolute  sm:bottom-8 sm:right-8 right-8 bottom-[75px]  w-[70px] h-[70px] sm:h-[60px] sm:w-[60px] flex justify-center items-center  rounded-full  bg-red-700 text-white font-bold"
      >
        +
      </div>

      {toogle && (
        <div className="absolute shadow-sm shadow-white h-[65vh] w-[90vw] mr-4 mx-auto  border-[1px] border-green-200 sm:h-[55vh] sm:top-40 sm:w-[30vw] shadow-lg bg-white  sm:bg-[#a09b9b] top-[13vh]  sm:right-[25vw] right-[1vw] rounded-lg   ">
          <AddCaisse setVisibility={setToogle} addCaisse={addCaisse} />
        </div>
      )}
    </div>
  );
};

export default MesCaisse;
