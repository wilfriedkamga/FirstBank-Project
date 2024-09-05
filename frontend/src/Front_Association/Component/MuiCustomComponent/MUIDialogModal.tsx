import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  title: string;
  closeModal: () => void;
  children: React.ReactNode;
}

const MUIDialogModal = ({ open, title, closeModal, children }: Props) => {
  const handleClose = (_: any, reason: string) => {
    if (reason !== "backdropClick") {
      closeModal();
    }
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title" fontSize={24}>
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={closeModal} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MUIDialogModal;
