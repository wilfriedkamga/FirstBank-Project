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
import { Alert, IconButton, TextField, Typography } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import PhoneInputRole from "./PhoneInputRole";
import SelectItem from "../ParametresTontines/SelectItem";
import axios from "axios";
import AssociationServices from "../../../../../Services/AssociationServices";
import AlertDialog from "../Notifications/AlertDialog";
import AssoNotificationDialog from "./AssoNotificationDialog";


type childComponents = {
  options: string[];
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
const names = [
  "Hebdomadaire",
  "Mensuelle",
  "Bimensuelle",
  "Trimestriel",
  "Autre",
];
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
  const [type, setType] = React.useState("");
  const [notifTitle, setNotifTitle] = React.useState<string>("");
  const [notifMessage, setNotifMessage] = React.useState<string>("");
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [contact1, setContact1] = React.useState("");
  const [contact2, setContact2] = React.useState("");
  const [contact3, setContact3] = React.useState("");
  const [day, setDay] = React.useState("");
  const [name, setName] = React.useState("Association 1");
  const [frequence, setFrequence] = React.useState("");
  const [selectedRoles, setSelectedRoles] = React.useState<{
    admin1: string;
    admin2: string;
    admin3: string;
  }>({
    admin1: "",
    admin2: "",
    admin3: "",
  });
  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleRoleChange = (
    admin: "admin1" | "admin2" | "admin3",
    role: string
  ) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [admin]: role,
    }));
  };

  const getAvailableRoles = (currentAdmin: "admin1" | "admin2" | "admin3") => {
    const selected = Object.values(selectedRoles).filter(
      (role) => role && role !== selectedRoles[currentAdmin]
    );
    return roles.filter((role) => !selected.includes(role));
  };
  const handleCancel = () => {
    onClose();
  };

  const handleOk = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const data = {
      name: name,
      frequenceReunion: frequence,
      jourReunion: day,
      phoneAdmin1: contact1,
      phoneAdmin2: contact2,
      phoneAdmin3: contact3,

     
    };

    AssociationServices.CreateAssociation(data)
      .then((response) => {
        console.log("Association created successfully" + response.data);
        setNotifTitle("Sucess")
        setNotifMessage("L'association a été créee avec sucess")
        setDialogOpen(true)
        const data2={
          id:response.data.id,
          creationDate: [2024, 6, 25],
          frequenceReunion:response.data.frequenceReunion,
          jourReunion:response.data.jourReunion,
          name:response.data.name,
          nbMembre:response.data.membres.size,
          nbTontine:response.data.membres.nbTontine
   }
        addAssociation(data2);
        onClose(value);
      })
      .catch((error) => {
        setNotifTitle("Erreur")
        setNotifMessage("L'érreur suivante est survenue lors de cette operation"+error.message)
        setDialogOpen(true)
        
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const goNextPage = () => {
    if (frequence == null || frequence == "") {
      alert("Il faut remplir tous les champs");
    } else {
      setEnd(true);
    }
  };

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
      <AssoNotificationDialog title={notifTitle} message={notifMessage} open={dialogOpen}
        onClose={() => setDialogOpen(false)} />
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
                placeholder="Nom de l'association"
                defaultValue="Hello World"
                className="w-full"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold" htmlFor="">
                Jour des réunions
              </label>
              <SelectItem setRole={setDay} multiple={false} table={days} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block font-bold text-sm  ">
                Fréquence des réunions.
              </label>
              <SelectItem
                setRole={setFrequence}
                multiple={false}
                table={names}
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
              Président
            </label>
            <PhoneInputRole setPhone={setContact1} />

            <label className="font-bold" htmlFor="">
              Trésorier
            </label>
            <PhoneInputRole setPhone={setContact2} />
            <label className="font-bold" htmlFor="">
              Sécretaire
            </label>
            <PhoneInputRole setPhone={setContact3} />
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ color: "red" }}
              autoFocus
              onClick={() => setEnd(false)}
            >
              Back
            </Button>
            <Button
              sx={{ color: "red" }}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                handleOk(e)
              }
            >
              ok
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

type childProps = {
  setData: (data: any) => void;
  printError: (title: string, message: string) => void;
};
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
