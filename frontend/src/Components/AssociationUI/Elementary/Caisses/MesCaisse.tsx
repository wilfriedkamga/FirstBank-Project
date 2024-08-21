import React, { useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate, useLocation } from "react-router-dom";
import AddTontineDialog from "./AddTontineDialog";
import TontinesServices from "../../../../Services/TontinesServices";
import AssociationServices from "../../../../Services/AssociationServices";
import { TontineModel } from "../../../../Services/Types";

const stats: TontineModel[] = [
  {
    id: "1hjkl",
    tontineName: "Caisse Épargne",
    type: "épargne",
    association_id: "",
    creatorPhone: "",
    nbMembres: 3,
    amount: "50 000 FCFA",
    creationDate: "",
    nbNotifications:0
  }

];

interface cardProps{
  id:string,
  amount:string|null,
  nbMembre:number|null,
  tontineName:string,
  type:string|null
}

const MesCaisse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tontineList, setTontineList] = useState<TontineModel[]>(stats);

  const extractTontineId = (url: string): string => {
    const parts = url.split("/");
    return parts[3]; // L'ID de la tontine est à l'indice 3 dans le tableau de segments
  };

  useEffect(() => {
    console.log(location.pathname.split("/")[3]);
    Initializepage(location.pathname.split("/")[3]);
  }, []);

  const Initializepage = (idAssociation: string) => {
    AssociationServices.GetTontinesByAssociationId(idAssociation)
      .then((response) => {
        setTontineList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Card = ({
    id,
    tontineName,
    type,
    nbMembre,
    amount,
  }: cardProps) => {
    return (
      <div className="sm:w-[250px] w-full h-[150px] bg-white p-5 shadow-md rounded-md flex items-center">
        <div className="h-full flex flex-1 flex-col">
          <p className="font-bold text-xl text-gray-600">
            <p className="">{tontineName}</p>
            <p className="text-lg font-normal ">{type}</p>
          </p>
          <span className="text-sm mt-2 text-gray-400">
            {"(" + nbMembre + ")"} membres
          </span>
          <span className="text-lg mt-2 font-semibold text-gray-800">
            {type === "épargne" || type=== "dette"? (<><span className="text-xs font-normal text-gray-400">cible  </span> {amount}</>):""}
           
            {type === "sociale"? <span> + {amount}</span>:""}
          </span>
        </div>
        <div className={"w-10 h-10 rounded-full flex items-center bg-red-700 justify-center text-white text-xl text-white font-bold"}>
          <KeyboardArrowRightIcon />
        </div>
      </div>
    );
  };

  const currentPath = location.pathname + "/";
  return (
    <div>
      <div className="grid p-4 grid-cols-1 md:grid-cols-4 gap-5">
        {tontineList.map(
          (
            {
              type,
              tontineName,
              nbMembres,
              id,
              amount,
            },
            index
          ) => (
            <div
              className="cursor-pointer"
              onClick={() => navigate(currentPath + id)}
              key={index}
            >
              <Card
                amount={amount}
                type={type}
                tontineName={tontineName}
                nbMembre={nbMembres}
                id={id}
              />
            </div>
          )
        )}
      </div>
      {tontineList == null || tontineList.length == 0 ? (
        <div className="text-lg">
          {" "}
          Vous n'êtes dans aucune tontine de cette association !
        </div>
      ) : null}
      <AddTontineDialog />
    </div>
  );
};

export default MesCaisse;
