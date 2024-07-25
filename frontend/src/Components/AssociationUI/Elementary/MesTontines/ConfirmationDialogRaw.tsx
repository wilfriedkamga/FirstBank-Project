import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import PhoneInputRole from "./PhoneInputRole";
import SelectItem from "../Component/SelectItem";

type ConfirmationDialogRawProps = {
  open: boolean;
  onClose: () => void;
};

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

const ConfirmationDialogRaw: React.FC<ConfirmationDialogRawProps> = ({
  open,
  onClose,
}) => {
  const [end, setEnd] = React.useState<boolean>(false);
  const [contact1, setContact1] = React.useState("");
  const [contact2, setContact2] = React.useState("");
  const [contact3, setContact3] = React.useState("");
  const [role1, setRole1] = React.useState("");
  const [role2, setRole2] = React.useState("");
  const [role3, setRole3] = React.useState("");
  const [name, setName] = React.useState("Association 1");
  const [frequence, setFrequence] = React.useState("");
  const [day, setDay] = React.useState("");

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    console.log("Nom de l'association :", name);
    console.log("Jour des réunions :", day);
    console.log("Fréquence des réunions :", frequence);
    console.log("Administrateur 1 - Phone :", contact1);
    console.log("Administrateur 1 - Role :", role1);
    console.log("Administrateur 2 - Phone :", contact2);
    console.log("Administrateur 2 - Role :", role2);
    console.log("Administrateur 3 - Phone :", contact3);
    console.log("Administrateur 3 - Role :", role3);
  };

  const goNextPage = () => {
    if (frequence) {
      setEnd(true);
    }
  };

  const goPreviousPage = () => {
    setEnd(false);
  };

  return (
    <Dialog
      maxWidth="xs"
      open={open}
    >
      <DialogTitle className="font-bold">
        Créer une association
      </DialogTitle>
      <DialogContent dividers className="flex flex-col gap-2">
        {!end ? (
          <>
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
              <label className="font-bold" htmlFor="">
                Fréquence des réunions.
              </label>
              <TextField
                id="outlined-required"
                label=""
                value={frequence}
                placeholder="Fréquence des réunions"
                className="w-full"
                onChange={(e) => setFrequence(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <label className="font-bold" htmlFor="">
              Administrateur 1
            </label>
            <Divider />
            <label className="font-bold" htmlFor="">
              Phone
            </label>
            <PhoneInputRole defaultValue={""} setPhone={setContact1} />

            <label className="font-bold" htmlFor="">
              Role
            </label>
            <SelectItem defaultValue={role1} options={roles} onSelect={setRole1} />

            <label className="font-bold" htmlFor="">
              Administrateur 2
            </label>
            <Divider />
            <label className="font-bold" htmlFor="">
              Phone
            </label>
            <PhoneInputRole defaultValue={""} setPhone={setContact2} />

            <label className="font-bold" htmlFor="">
              Role
            </label>
            <SelectItem defaultValue={roles[0]} options={roles} onSelect={setRole2} />

            <label className="font-bold" htmlFor="">
              Administrateur 3
            </label>
            <Divider />
            <label className="font-bold" htmlFor="">
              Phone
            </label>
            <PhoneInputRole defaultValue={""} setPhone={setContact3} />

            <label className="font-bold" htmlFor="">
              Role
            </label>
            <SelectItem defaultValue={roles[0]} options={roles} onSelect={setRole3} />
          </>
        )}
      </DialogContent>
      <DialogActions>
        {!end ? (
          <>
            <Button sx={{ color: "red" }} autoFocus onClick={handleCancel}>
              Annuler
            </Button>
            <Button sx={{ color: "red" }} onClick={goNextPage}>
              Suivant
            </Button>
          </>
        ) : (
          <>
            <Button sx={{ color: "red" }} onClick={goPreviousPage}>
              Retour
            </Button>
            <Button sx={{ color: "red" }} onClick={handleOk}>
              OK
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialogRaw;
