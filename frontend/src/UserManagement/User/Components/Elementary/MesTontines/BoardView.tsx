import React, { CSSProperties, useEffect, useRef, useState } from "react";
import TontineCard from "./TontineCard";
import AddTontine from "./AddTontine";
import TontinesServices from "../../../../../Services/TontinesServices";
import TontineCardM from "./TontineCardM";
import Variable from "../../../../../Variable";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Alert, dividerClasses } from "@mui/material";
import AddAssociationDialog from "./AddAssociationDialog";
import AssociationServices from "../../../../../Services/AssociationServices";
import AssociationCard from "./AssociationCard";
import AssociationCardM from "./AssociationCardM";
import Sucess from "../Notifications/Sucess";
import AssoNotificationDialog from "./AssoNotificationDialog";
import logo from "../../../Assets/Images/logoFB.png";

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
  const [notify, setNotify] = useState<boolean>(false);

  const [notifTitle, setNotifTitle] = useState<string>("");
  const [notifMessage, setNotifMessage] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [addTontineVisibility, setAddTontineVisibility] =
    useState<boolean>(false);

  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    Initializepage(user.user.phone);
  }, []);

  const sendPushNotification = () => {
    // Demander la permission de notification
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        // Si la permission est accordée, envoyer la notification
        new Notification("Envoi d une notification", {
          body: "Nouveau message vous a été envoyé dans votre boite mail.",
          icon: "http://via.placeholder.com/150", // Optionnel : chemin vers une icône de notification
        });
      } else {
        alert("Permission non accordée pour les notifications.");
      }
    });
  };
  const setNotification = (
    visibility: boolean,
    title: string,
    message: string
  ) => {
    setNotify(visibility);
    setNotifMessage(message);
    setNotifTitle(title);
  };

  const Initializepage = (phone: string) => {
    AssociationServices.GetMyAssociations(phone)
      .then((response) => {
        //setTontinesList(response.data.data);

        setAssociationList(response.data);
       
        if (response.data.data.length != 0) {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        
      });
  };

  const printError = (title: string, message: string) => {
    setNotify(true);
    
  };

  const addAssociation = (association: any) => {
    
    setAssociationList(associationList.concat(association));
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    position: "absolute",
    fontWeight: "bold",
  };
 

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
            {associationList.map((asso, index) => (
              <div key={index}>
                <div className="hidden sm:block lg:block">
                  <AssociationCard association={asso} />
                </div>
                <div  className="block sm:hidden lg:hidden">
                  <AssociationCardM association={asso} />
                </div>
              </div>
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

      <AddAssociationDialog
        printError={(title, message) => printError(title, message)}
        setData={addAssociation}
      />

      <AssoNotificationDialog
        title={notifTitle}
        message={notifMessage}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
      <button
        onClick={() => sendPushNotification()}
        className="bg-red-700 hover:bg-red-900 rounded-md text-white font-bold p-4"
      >
        Envoyer une notification
      </button>
    </div>
  );
};

export default BoardView;
