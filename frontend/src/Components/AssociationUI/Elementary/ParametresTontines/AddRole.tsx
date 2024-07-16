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
import { IconButton, TextField, Typography } from "@mui/material";
import SelectItem from "../Component/SelectItem";

type childComponents = {
  options: string[];
};

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef<HTMLElement>(null);
  const [pivileges, setPrivileges] = React.useState("");

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

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": { width: "90%", maxHeight: 600 },
        marginLeft: "20vw",
      }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Ajouter un nouveau rôle</DialogTitle>
      <DialogContent dividers className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label className="m-2" htmlFor="">
            Label du role
          </label>
          <TextField
            required
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="m-2" htmlFor="">
            Description du rôle
          </label>

          <TextField
            id="outlined-textarea"
            label="Multiline Placeholder"
            placeholder="Placeholder"
            multiline
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="m-2" htmlFor="">
            Choisir ses privilleges
          </label>
          <SelectItem defaultValue="" onSelect={setPrivileges} options={names} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function AddRoleDialog() {
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
      />
    </>
  );
}
