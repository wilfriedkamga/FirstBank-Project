import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Edit } from "@mui/icons-material";
import { CircularProgress, TextareaAutosize } from "@mui/material";
import { Editor } from "primereact/editor";
import { MembreTontineModel } from "../MesMembresTontines";
import LabelField from "../../../../MuiCustomComponent/LabelField";
import TextFieldSimple from "../../../../MuiCustomComponent/TextFieldSimple";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface props{
    handleSave:(member:MembreTontineModel)=>void;
    member:MembreTontineModel
}

export default function EditButton({handleSave, member}:props) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };



  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>
        <Edit />
      </IconButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: "#b00", color: "white" }}
          id="customized-dialog-title"
        >
          Modifier un document
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography
            gutterBottom
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <LabelField text="Description du document" />
            <Editor value={""} style={{ height: "120px" }} />
            <TextareaAutosize />
          </Typography>
          <Typography gutterBottom>
            <LabelField text="Nom du document" />
            <TextFieldSimple  onChange={() => null} value={member.name_association} />
          </Typography>
          <Typography sx={{marginTop:3}}>
           
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#c00",
              "&:hover": { backgroundColor: "#a00" },
            }}
          >
            {" "}
            {!isLoading ? (
              "Sauvegarder"
            ) : (
              <CircularProgress
                size={20}
                sx={{ color: "white", fontWeight: "bold" }}
              />
            )}
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#666",
              "&:hover": { backgroundColor: "#444" },
            }}
            onClick={handleClose}
            autoFocus
          >
            Annuler
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
