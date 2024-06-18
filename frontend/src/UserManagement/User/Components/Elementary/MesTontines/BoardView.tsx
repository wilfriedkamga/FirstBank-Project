import React, { CSSProperties, useEffect, useRef, useState } from "react";
import TontineCard from "./TontineCard";
import AddTontine from "./AddTontine";
import TontinesServices from "../../../../../Services/TontinesServices";
import TontineCardM from "./TontineCardM";
import Variable from "../../../../../Variable";
import PropagateLoader from "react-spinners/PropagateLoader";
import { dividerClasses } from "@mui/material";
import AddAssociationDialog from "./AddAssociationDialog";
import AssociationServices from "../../../../../Services/AssociationServices";
import AssociationCard from "./AssociationCard";
import AssociationCardM from "./AssociationCardM";

type Tontine = {
  id: string;
  nom: string;
  description: string;
  type: string;
  frequence: string;
  jourReunion: string;
  nbCaisse: number;
  nbMembre: number;
};
type TTontineModel = {
  id: string;
  nom: string;
  description: string;
  type: string;
  frequence: string;
  jourReunion: string;
  nbCaisse: number;
  nbMembre: number;
  create_par: string;
  id_admin1: string;
  id_admin2: string;
  id_admin3: string;
};

const BoardView: React.FC = () => {
  const [toogle, setToogle] = useState(false);
  const butRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [tontinesList, setTontinesList] = useState<TTontineModel[]>([]);
  const [associationList, setAssociationList] = useState<any[]>([]);
  const [tontine, setTontine] = useState<TTontineModel>();
  const [addTontineVisibility, setAddTontineVisibility] =
    useState<boolean>(false);

  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    Initializepage(user.user.phone);
  }, []);

  const Initializepage = (phone: string) => {
    AssociationServices.GetMyAssociations(phone)
      .then((response) => {
        //setTontinesList(response.data.data);
        setAssociationList(response.data);
        console.log(response.data);
        if (response.data.data.length != 0) {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTontine = (tontine: TTontineModel) => {
    setTontinesList(tontinesList.concat(tontine));
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    position: "absolute",
    fontWeight: "bold",
  };
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <div className="">
      {isLoading ? (
        <div className="absolute bottom-[50vh] left-[55vw]">
          <PropagateLoader
            color={"red"}
            loading={isLoading}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        
      ) : (
        <div>
          <div className="w-full grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-4 mb-5 gap-4 2xl:gap-10 ">
            {associationList.map((asso) => (
              <>
                <div className="hidden sm:block lg:block">
                  <AssociationCard association={asso} />
                </div>
                <div className="block sm:hidden lg:hidden p-1">
                  <AssociationCardM association={asso} />
                </div>
              </>
            ))}
          </div>
          {associationList == null || associationList.length == 0 ? (
            <div className="text-lg w-full text-center text-red font-bold">
              {" "}
              Vous n'êtes dans aucune association !
            </div>
          ) : null}
        </div>
      )}

      <div className="hidden absolute shadow-sm shadow-white h-[65vh] w-[90vw] mr-4 mx-auto  border-[1px] border-red-600 sm:h-[55vh] sm:top-40 sm:w-[30vw] shadow-lg bg-white  sm:bg-white top-[13vh]  sm:right-[25vw] right-[1vw] rounded-lg   ">
        <AddTontine
          setVisibility={setAddTontineVisibility}
          addTontine={addTontine}
        />
      </div>

      <AddAssociationDialog />
    </div>
  );
};

export default BoardView;
