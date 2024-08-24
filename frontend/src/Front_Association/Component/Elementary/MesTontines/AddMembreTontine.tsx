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
import SelectItem from "../Component/SelectItem";
import axios from "axios";

import AlertDialog from "../Notifications/AlertDialog";
import { useLocation } from "react-router-dom";
import AssociationServices from "../../../../Services/AssociationServices";

type childComponents = {
  addMember: (data: any) => void;
};

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
  addMember: (member: any) => void;
}
const names = [
  "Hebdomadaire",
  "Mensuelle",
  "Bimensuelle",
  "Trimestriel",
  "Autre",
];

const roles = ["Président", "Trésorier", "Createur"];

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onClose, value: valueProp, open, addMember, ...other } = props;
  const [datas, setDatas]=React.useState<string[]>(roles)
  const [roleList, setRoleList]=React.useState<string[]>([])
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef<HTMLElement>(null);
  const [end, setEnd] = React.useState<boolean>(false);
  const [type, setType] = React.useState("");
  const [role, setRole] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [name, setName] = React.useState("Association 1");
  const location = useLocation();

  React.useEffect(() => {
    setName(location.pathname.split("/")[3]);
    if (!open) {
      setValue(valueProp);
    }
    initializeRolesList()
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
    
  };

  const initializeRolesList=()=>{
    AssociationServices.GetRoleByAssociation(location.pathname.split("/")[3])
    .then((response)=>{
      const liste=response.data;
      const roleNames = liste.map((role:any )=> role.label);
      console.log(roleNames)
      setRoleList(liste.map((role:any )=> role.label))
    })
    .catch((error)=>{

    })
  }

  const handleCancel = () => {
    onClose();
  };

  const handleOk = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const data = {
      associationId: name,
      phone: phone,
      roleLabel: role,
    };

    console.log(data);
    AssociationServices.AddMember(data)
      .then((response) => {
        console.log("" + response.data.data);
        const data2 = {
          name: response.data.data.name,
          associationId: name,
          phone: phone,
          role: role,
        };
        addMember(data2);
        onClose(value);
      })
      .catch((error) => {
        console.log(error)
        onClose(value);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
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
      <DialogTitle className="font-bold">
        <label className="font-bold" htmlFor="">
          Ajouter un nouveau membre
        </label>
      </DialogTitle>
      <DialogContent dividers className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="">
            Telephone du membre
          </label>
          <PhoneInputRole defaultValue={""} setPhone={setPhone} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="">
            Rôle du membre
          </label>
          <SelectItem defaultValue={role} onSelect={setRole} options={roleList} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "red" }} autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button sx={{ color: "red" }} onClick={(e) => handleOk(e)}>
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function AddMembreTontineDialog(props: childComponents) {
  const { addMember } = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("Dione");

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
        addMember={addMember}
      />
      <AlertDialog />
    </>
  );
}
