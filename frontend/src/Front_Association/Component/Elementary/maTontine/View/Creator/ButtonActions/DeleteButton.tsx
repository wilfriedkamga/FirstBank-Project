import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Delete } from "@mui/icons-material";
import { CircularProgress, Divider, IconButton, Tooltip } from "@mui/material";
import { ActionType, membreAssoModel } from "../../../../../../../Services/Types";
import CancelIcon from "@mui/icons-material/Cancel";

interface props {
  handleDelete: (memb: membreAssoModel, type:ActionType) => void;
  memb: membreAssoModel;
}
export default function DeleteButton({ handleDelete, memb }: props) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const localHandleDelete = (memb: membreAssoModel) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      handleDelete(memb, ActionType.CANCEL);
      setOpen(false);
    }, 2000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Tooltip title="Annuler l'invitation">
        <IconButton size="small"  onClick={handleClickOpen}>
          <CancelIcon sx={{color:"#c00"}} />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{ backgroundColor: "#b00", color: "white" }}
          id="alert-dialog-title"
        >
          Annuler cette invitation ?
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            sx={{ color: "black" }}
            id="alert-dialog-description"
          >
            Êtes vous sur de bien vouloir annuler cette invitation ?
          </DialogContentText>
          <DialogContentText
            sx={{ color: "black", textAlign:"center" }}
            id="alert-dialog-description"
          >
            L'annulation de cette invitation va entraîner la suppression de ce
            membre de votre association.
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#c00",
              "&:hover": { backgroundColor: "#a00" },
            }}
            onClick={() => localHandleDelete(memb)}
          >
            {" "}
            {!isLoading ? (
              "Oui"
            ) : (
              <CircularProgress
                size={20}
                sx={{ color: "white", fontWeight: "bold" }}
              />
            )}{" "}
            <Delete />
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
            Non
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
