import { Download } from "@mui/icons-material";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Delete } from "@mui/icons-material";
import {
  Alert,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { DocumentModel } from "../../../../../Services/Types/DocumetType";

interface props {
  handleDownload: (doc: DocumentModel) => void;
  doc: DocumentModel;
}
export default function DownloadButton({ handleDownload, doc }: props) {
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
      <IconButton size="small" onClick={handleClickOpen}>
        <Download />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{ backgroundColor: "#b00", color: "white" }}
          id="alert-dialog-title"
        >
          {"Télecharger un document"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            sx={{ color: "black" }}
            id="alert-dialog-description"
          >
            Votre téléchargement a débuté avec success.
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleClose}
            autoFocus
            variant="contained"
            sx={{
              backgroundColor: "#c00",
              "&:hover": { backgroundColor: "#a00" },
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
