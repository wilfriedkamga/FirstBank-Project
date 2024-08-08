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
    nom: "Caisse Épargne",
    total: "4",
    type: "épargne",
    montant: "50 000 FCFA",
    bg: "bg-[#1d4ed8]",
    association_id: "",
    creerPar: "",
    nbMembres: 3,
    typeCaisse: "épargne",
    montantEpargne: "50 000 FCFA",
    date_creation: "",
  },
  {
    id: "2hjkl",
    nom: "Caisse Sociale",
    total: "4",
    type: "sociale",
    montant: "60 000 FCFA",
    bg: "bg-[#1d4ed8]",
    association_id: "",
    creerPar: "",
    nbMembres: 5,
    typeCaisse: "sociale",
    montantEpargne: "30 000 FCFA",
    date_creation: "",
  },
];

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
        const tontines = TontineModel.fromSimpleList(response.data);
        setTontineList(tontines);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Card = ({
    label,
    nbMembre,
    bg,
    type,
    montant,
    typeCaisse,
    montantEpargne,
    montantCotisation,
  }: any) => {
    return (
      <div className="sm:w-[250px] w-full h-[150px] bg-white p-5 shadow-md rounded-md flex items-center">
        <div className="h-full flex flex-1 flex-col">
          <p className="font-bold text-xl text-gray-600">
            <p className="">{label}</p>
            <p className="text-lg font-normal ">{type}</p>
          </p>
          <span className="text-sm mt-2 text-gray-400">
            {"(" + nbMembre + ")"} membres
          </span>
          <span className="text-lg mt-2 font-semibold text-gray-800">
            {typeCaisse === "épargne" || typeCaisse === "sociale"
              ? montant
              : montant}
          </span>
        </div>
        <div className={bg + " text-xl text-white font-bold"}>
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
              bg,
              nom,
              nbMembres,
              montant,
              total,
              id,
              typeCaisse,
              montantEpargne,
              montantCotisation,
            },
            index
          ) => (
            <div
              className="cursor-pointer"
              onClick={() => navigate(currentPath + id)}
              key={index}
            >
              <Card
                montant={montant}
                type={type}
                bg="w-10 h-10 rounded-full flex items-center bg-red-700 justify-center text-white"
                label={nom}
                nbMembre={nbMembres}
                typeCaisse={typeCaisse}
                montantEpargne={montantEpargne}
                montantCotisation={montantCotisation}
              />
            </div>
          )
        )}
      </div>
      {tontineList == null || tontineList.length == 0 ? (
        <div className="text-lg">
          {" "}
          Vous n'êtes dans aucune Caisse de cette tontine !
        </div>
      ) : null}
      <AddTontineDialog />
    </div>
  );
};

export default MesCaisse;
