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
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { CagnotteModel } from "../MesCagnottes";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface props {
  handleSave: (cag: CagnotteModel) => void;
  cag: CagnotteModel;
}

export default function EditButton({ handleSave, cag }: props) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const CustomFileUpload = styled(FileUpload)`
    .p-button {
      background-color: #007bff; /* Remplacez par la couleur de votre choix */
      color: #fff;
      border-color: #007bff;

      &:hover {
        background-color: #0056b3;
        border-color: #0056b3;
      }
    }
  `;

  const customBase64Uploader = async (event: FileUploadHandlerEvent) => {
    // convert file to base64 encoded
    const file = event.files[0];
    const reader = new FileReader();
    /*let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

    reader.readAsDataURL(blob);

    reader.onloadend = function () {
        const base64data = reader.result;
    };*/
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
          Modifier un cagument
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
            <TextareaAutosize />
          </Typography>
          <Typography gutterBottom></Typography>
          <Typography sx={{ marginTop: 3 }}>
            <FileUpload
              className="p-button"
              mode="basic"
              name="demo[]"
              url="/api/upload"
              accept="image/*"
              customUpload
              uploadHandler={customBase64Uploader}
            />
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
