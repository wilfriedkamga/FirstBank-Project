import React, { CSSProperties, useEffect, useRef, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import AssociationCard from "./AssociationCard";
import AssociationCardM from "./AssociationCardM";
import AssoNotificationDialog from "./AssoNotificationDialog";
import Variable from "../../../../Variable";
import AssociationServices from "../../../../Services/AssociationServices";
import AddAssociationDialog from "./AddAssociation";
import { AssociationModel } from "../../../../Services/Types/AssociationModels";
import AssociationCard3 from "../../MuiCustomComponent/AssociationCard3";
import NotificationManager, {
  showNotification,
} from "../../../../Front_Usermanagement/Component/PushNotifications/PushNotifications";

const BoardView: React.FC = () => {
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
        setAssociationList(response.data.data);

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
          <div className="w-full grid mt-[5vh] ml-[2vh] grid-cols-1 sm:grid-cols-2 md:grid-cols-3  2xl:gap-10 ">
            {associationList.length != 0
              ? associationList.map((asso, index) => (
                  <div key={index}>
                    <div className="hidden mb-2 mt-2 sm:block lg:block">
                      <AssociationCard3 {...asso} />
                    </div>

                    <div className="block mb-2 sm:hidden lg:hidden">
                      <AssociationCard3 {...asso} />
                    </div>
                  </div>
                ))
              : null}
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
        printError={(title: string, message: string) =>
          printError(title, message)
        }
        setData={addAssociation}
      />

      <AssoNotificationDialog
        title={notifTitle}
        message={notifMessage}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
};

export default BoardView;
