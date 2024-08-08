import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import axios from "axios";

import AssoNotificationDialog from "./AssoNotificationDialog";

import PhoneInputRole from "./PhoneInputRole";
import AssociationServices from "../../../../Services/AssociationServices";
import Variable from "../../../../Variable";
import SelectItem from "../Component/SelectItem";
import Authentications from "../../../../Services/Authentications";
import NotificationService from "../../../../Services/NotificationService";
type childComponents = {
  options: string[];
};

type childProps = {
  setData: (data: any) => void;
  printError: (title: string, message: string) => void;
};

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
  addAssociation: (data: any) => void;
  printError: (title: string, message: string) => void;
}
const names = ["adherent", "secretaire", "president", "tresorier", "censeur"];
const days = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];
const roles = ["Président", "Trésorier", "Createur"];

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const {
    onClose,
    value: valueProp,
    open,
    addAssociation,
    printError,
    ...other
  } = props;

  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef<HTMLElement>(null);
  const [end, setEnd] = React.useState<boolean>(false);
  const [notifTitle, setNotifTitle] = React.useState<string>("");
  const [notifMessage, setNotifMessage] = React.useState<string>("");
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [contact1, setContact1] = React.useState("");
  const [contact2, setContact2] = React.useState("");
  const [contact3, setContact3] = React.useState("");
  const [role1, setRole1] = React.useState("");
  const [role2, setRole2] = React.useState("");
  const [role3, setRole3] = React.useState("");
  const [defaultRoles, setDefaultRoles] = React.useState<any[]>([]);
  const [defaultFrequencies, setDefaultFrequencies] = React.useState<any[]>([]);
  const [day, setDay] = React.useState("");
  const [name, setName] = React.useState("");
  const [frequence, setFrequence] = React.useState("");
  const [activate, setActivate] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [inviter1IsLoading, setInviter1IsLoading] =
    React.useState<boolean>(false);
  const [inviter2IsLoading, setInviter2IsLoading] =
    React.useState<boolean>(false);
  const [noContact2, setNoContact2] = React.useState<boolean>(false);
  const [noContact3, setNoContact3] = React.useState<boolean>(false);

  // Les variables pour garder le contexte
  const [phone1, setPhone1] = React.useState("");
  const [phone2, setPhone2] = React.useState("");

  const nb_chiffre_tel = Variable.nb_chiffres_telephone;

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
    if (
      contact2.length >= nb_chiffre_tel &&
      contact3.length >= nb_chiffre_tel
    ) {
      setActivate(true);
    }
    if (contact2.length < nb_chiffre_tel || contact3.length < 10) {
      setActivate(false);
    }
  }, [valueProp, open, contact3, contact2]);

  React.useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setContact1(user.user.phone);
    setRole1("createur");

    AssociationServices.getDefaultRole()
      .then((response) => {
        setDefaultRoles(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("Voici l'erreur qui est survenue" + error);
      });

    AssociationServices.getDefaultFrequency()
      .then((response) => {
        setDefaultFrequencies(response.data.data);
      })
      .catch((error) => {
        console.log("Voici l'erreur qui est survenue" + error);
      });
  }, []);
  // Recupération des roles qui sont dans l'application

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

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

  const handleOk = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    setIsLoading(true);

    const data = {
      name: name,
      frequenceReunion: frequence,
      jourReunion: day,
      phoneAdmin1: contact1,
      phoneAdmin2: contact2,
      phoneAdmin3: contact3,
      roleAdmin1: role1,
      roleAdmin2: role2,
      roleAdmin3: role3,
    };

    const existancePhone2 = await verifyPhone(contact2);
    const existancePhone3 = await verifyPhone(contact3);

    console.log(
      "existence du phone 1 :" +
        existancePhone2 +
        " existence phone 2 :" +
        existancePhone3
    );

    if (existancePhone2 && existancePhone3) {
      AssociationServices.CreateAssociation(data)
        .then((response) => {
          console.log("Association created successfully" + response.data);
          setNotifTitle("Sucess");
          setNotifMessage("L'association a été créee avec sucess");
          setDialogOpen(true);
          const data2 = {
            id: response.data.id,
            creationDate: [2024, 6, 25],
            frequenceReunion: response.data.frequenceReunion,
            jourReunion: response.data.jourReunion,
            name: response.data.name,
            nbMembre: response.data.membres.size,
            nbTontine: response.data.membres.nbTontine,
          };
          addAssociation(data2);
          onClose(value);
          setIsLoading(false);
        })
        .catch((error) => {
          setNotifTitle("Erreur");
          setNotifMessage(
            "L'érreur suivante est survenue lors de cette operation" +
              error.message
          );
          setDialogOpen(true);
          setIsLoading(false);
        });
    } else {
      if (!existancePhone2) {
        setNoContact2(true);
      } else {
        setNoContact2(false);
      }

      if (!existancePhone3) {
        setNoContact3(true);
      } else {
        setNoContact3(false);
      }

      setIsLoading(false);
    }
  };

  const handleInvitationContact2 = () => {
    sendInvitaion(contact2, contact1);
    setInviter1IsLoading(false);
  };
  const handleInvitationContact3 = () => {
    sendInvitaion(contact3, contact1);
    setInviter2IsLoading(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const goNextPage = () => {
    if (frequence == null || frequence == "") {
    } else {
      setEnd(true);
    }
  };

  const filteredOptions1 = defaultRoles; //filter((option) => option !== role3 && option !==role2);
  const filteredOptions2 = defaultRoles;
  const filteredOptions3 = defaultRoles; //filter((option) => option !== role2);

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": { width: "100%", height: 450 },
        marginLeft: { xl: "20vw", lg: "20vw" },
      }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <AssoNotificationDialog
        title={notifTitle}
        message={notifMessage}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
      {!end ? (
        <>
          <DialogTitle className="font-bold">
            <label className="font-bold" htmlFor="">
              Créer une association
            </label>
          </DialogTitle>
          <DialogContent dividers className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <label className="font-bold" htmlFor="">
                Nom de l'association
              </label>
              <TextField
                required
                id="outlined-required"
                label=""
                value={name}
                defaultValue={name}
                placeholder="Nom de l'association"
                className="w-full"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold" htmlFor="">
                Jour des réunions
              </label>
              <SelectItem defaultValue={day} onSelect={setDay} options={days} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block font-bold text-sm  ">
                Fréquence des réunions.
              </label>
              <SelectItem
                defaultValue={frequence}
                onSelect={setFrequence}
                options={defaultFrequencies}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button sx={{ color: "red" }} autoFocus onClick={handleCancel}>
              Cancel
            </Button>
            <Button sx={{ color: "red" }} onClick={() => goNextPage()}>
              Next
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle>
            <label className="font-bold" htmlFor="">
              Créer une association
            </label>
          </DialogTitle>

          <DialogContent dividers className="flex flex-col gap-2">
            <label className="font-bold" htmlFor="">
              Administrateur 1
            </label>
            <Divider />
            <label className="font-bold" htmlFor="">
              Phone
            </label>
            <PhoneInputRole disabled={true} defaultValue={contact1} setPhone={setContact1} />

            <label className="font-bold" htmlFor="">
              Role
            </label>
            <SelectItem
              options={filteredOptions1}
              onSelect={setRole1}
            />

            <label className="font-bold" htmlFor="">
              Administrateur 2
            </label>
            <Divider />
            <label className="font-bold" htmlFor="">
              Phone
            </label>
            <PhoneInputRole defaultValue={contact2} setPhone={setContact2} />
            {noContact2 && (
              <label className="text-xs text-red-500">
                Aucun compte avec ce numero.{" "}
                {!inviter1IsLoading ? (
                  <button
                    onClick={() => {
                      setInviter1IsLoading(true);
                      handleInvitationContact2();
                    }}
                    className="bg-red-600 text-white p-1 hover:bg-red-800 rounded-lg"
                  >
                    inviter
                  </button>
                ) : (
                  <button
                    disabled={true}
                    className="bg-red-900 text-white p-1  rounded-lg"
                  >
                    ...inv
                  </button>
                )}
              </label>
            )}

            <label className="font-bold" htmlFor="">
              Role
            </label>
            <SelectItem
              options={filteredOptions1}
              onSelect={setRole2}
            />

            <label className="font-bold" htmlFor="">
              Administrateur 3
            </label>
            <Divider />
            <label className="font-bold" htmlFor="">
              Phone
            </label>
            <PhoneInputRole defaultValue={contact3} setPhone={setContact3} />
            {noContact3 && (
              <label className="text-xs text-red-500">
                Aucun compte avec ce numero.{" "}
                {!inviter2IsLoading ? (
                  <button
                    onClick={() => {
                      setInviter2IsLoading(true);
                      handleInvitationContact3();
                    }}
                    className="bg-red-600 text-white p-1 hover:bg-red-800 rounded-lg"
                  >
                    inviter
                  </button>
                ) : (
                  <button
                    disabled={true}
                    className="bg-red-900 text-white p-1  rounded-lg"
                  >
                    ...inv
                  </button>
                )}
              </label>
            )}

            <label className="font-bold" htmlFor="">
              Role
            </label>
            <SelectItem
              options={filteredOptions3}
              onSelect={setRole3}
            />
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ color: "red" }}
              autoFocus
              onClick={() => {
                setEnd(false);
                setPhone1(contact2);
                setPhone2(contact3);
              }}
            >
              Back
            </Button>
            {isLoading ? (
              <Button disabled={true}>..ok</Button>
            ) : (
              <Button
                disabled={!activate}
                sx={{ color: "red" }}
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  handleOk(e)
                }
              >
                ok
              </Button>
            )}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

export default function AddAssociationDialog({
  setData,
  printError,
}: childProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("Dione");
  const [notifTitle, setNotifTitle] = React.useState<string>("");
  const [notifMessage, setNotifMessage] = React.useState<string>("");
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue?: string) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <>
      <div
        onClick={handleClickListItem}
        className="text-xl cursor-pointer absolute  sm:bottom-8 sm:right-8 right-8 bottom-[75px]  w-[70px] h-[70px] sm:h-[60px] sm:w-[60px] flex justify-center items-center  rounded-full  bg-red-700 text-white font-bold"
      >
        +
      </div>

      <ConfirmationDialogRaw
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
        addAssociation={setData}
        printError={printError}
      />
    </>
  );
}
