
import { Box } from "@mui/material";
import ListeAssociations from "./ListeAssociations";
import { useEffect, useState } from "react";
import Variable from "../../../../Variable";
import AssociationServices from "../../../../Services/AssociationServices";
import { CSSProperties } from "@mui/material/styles/createMixins";

export interface AssociationModel {
  id: number;
  name_association: string;
  name_fund: string;
  mode: string;
  date: Date;
  amount: number;
  validateur1: string;
  validateur2: string;
}

const MesAssociations= () => {

  const [associationList, setAssociationList] = useState<AssociationModel[]>(
    []
  );
  const [notify, setNotify] = useState<boolean>(false);
  const [notifTitle, setNotifTitle] = useState<string>("");
  const [notifMessage, setNotifMessage] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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
        console.log(response.data);
        setAssociationList(response.data);

        if (response.data.data.length != 0) {
          setIsLoading(false);
        }
      })
      .catch((error) => {});
  };

  const printError = (title: string, message: string) => {
    setNotify(true);
  };

  const addAssociation = (association: AssociationModel) => {
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
  const data: AssociationModel[] = [
    {
      id: 1,
      name_association: "Les enfants de Dieu",
      name_fund: "Caisse 1",
      mode: "En ligne",
      date: new Date(12, 8, 2024),
      amount: 4000000,
      validateur1: "",
      validateur2: "",
    },
  ];

  return (
    <div>
      <Box m={4}>
      <Box sx={{ marginBottom: "12px",fontWeight:"bold", fontSize:"18px", color:"#dc2626", backgroundColor:"white",borderRadius:"10px", padding:2,  border:"1px solid gray" }}>
          <h1>Mes Association</h1>
        </Box>
        <ListeAssociations data={data} />
      </Box>
    </div>
  );
};

export default MesAssociations;
