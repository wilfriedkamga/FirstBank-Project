import * as React from "react";

import { Box, Divider } from "@mui/material";
import AssoNotificationDialog from "../MesTontines/AssoNotificationDialog";
import PhoneInputRole from "../MesTontines/PhoneInputRole";
import Variable from "../../../../Variable";
import Authentications from "../../../../Services/Authentications";
import NotificationService from "../../../../Services/NotificationService";
import { rolesData } from "../../../../Services/data";
import { RoleAssoModel } from "../../../../Services/Types";
import SelectItem2 from "../Component/SelectItem2";
import LabelField from "../../MuiCustomComponent/LabelField";

type childComponents = {
  options: string[];
};

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  open: boolean;
  contact: string;
  setContact: (label: string) => void;
  setRole: (label: string) => void;
  role: string;
  roleDate: RoleAssoModel[];
}

export default function AdminForm(props: ConfirmationDialogRawProps) {
  const { contact, role, setRole, setContact } = props;

  const [notifTitle, setNotifTitle] = React.useState<string>("");
  const [notifMessage, setNotifMessage] = React.useState<string>("");
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [contact1, setContact1] = React.useState("");
  const [rolesAvailable, setRolesAvailable] =
    React.useState<RoleAssoModel[]>(rolesData);
  const [inviter2IsLoading, setInviter2IsLoading] =
    React.useState<boolean>(false);
  const [noContact3, setNoContact3] = React.useState<boolean>(false);

  React.useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setContact1(user.user.phone);
  }, []);

  const nb_chiffre_tel = Variable.nb_chiffres_telephone;

  React.useEffect(() => {
    const checkPhoneValidity = async () => {
      if (contact.length >= 12) {
        const existancePhone3 = await verifyPhone(contact);
        if (!existancePhone3) {
          setNoContact3(true);
        } else {
          setNoContact3(false);
        }
      }
    };

    checkPhoneValidity();
  }, [contact]);

  async function verifyPhone(phone: string): Promise<boolean> {
    try {
      const response = await Authentications.verifyUserHasAccount(phone);
      console.log(response.status === 200);
      return response.status === 200;
    } catch (error) {
      console.error("Error verifying phone:", error);
      return false;
    }
  }

  const sendInvitaion = (destPhone: string, emetPhone: string) => {
    const formData = {
      destPhone: destPhone,
      emetPhone: emetPhone,
    };

    NotificationService.sendInvitation(formData)
      .then((response) => {
        setNotifTitle("Sucess");
        setNotifMessage("L'envoi de l'invitation a réussie");
        setDialogOpen(true);
        console.log(
          "Sucess de l'envoi de l'invitation a monsieur : " + destPhone
        );
      })
      .catch((error) => {
        setNotifTitle("Échec");
        setNotifMessage("Erreure lors de l'envoi de la notification");
        setDialogOpen(true);
      });
  };

  const handleInvitationContact3 = () => {
    sendInvitaion(contact, contact1);
  };

  return (
    <div>
      <AssoNotificationDialog
        title={notifTitle}
        message={notifMessage}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
      <LabelField hiddenStar={contact?.length !== 0} text="Phone" />
      <PhoneInputRole defaultValue={contact} setPhone={setContact} />
      {noContact3 && contact?.length >= nb_chiffre_tel && (
        <label className="text-xs text-red-500">
          Aucun compte avec ce numero.
          <button
            onClick={() => {
              handleInvitationContact3();
            }}
            className="bg-red-600 text-white p-1 hover:bg-red-800 rounded-lg"
          >
            inviter
          </button>
        </label>
      )}

      {
        <>
          <Box sx={{marginTop:2}}>
            <LabelField hiddenStar={role.length !== 0} text="Role" />
            <SelectItem2
              options={rolesData}
              value={role}
              onSelect={(role) => setRole(role.id)}
            />
          </Box>
        </>
      }
    </div>
  );
}
