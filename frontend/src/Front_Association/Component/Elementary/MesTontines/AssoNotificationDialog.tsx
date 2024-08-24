import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface AssoNotificationDialogProps {
    open: boolean;
    onClose: () => void;
    message:string;
    title:string;
  }

export default function AssoNotificationDialog({open, onClose, message,title}:AssoNotificationDialogProps) {

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{display:"flex", justifyContent:"center"}}>
          {/** <button className='bg-gray-100 border rounded-lg hover:bg-gray-600 hover:text-white p-2' onClick={onClose}>Annuler</button> */}
          <button className='bg-gray-100 border rounded-lg hover:bg-gray-600 px-4 hover:text-white p-2' onClick={onClose} autoFocus>
            Ok
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
