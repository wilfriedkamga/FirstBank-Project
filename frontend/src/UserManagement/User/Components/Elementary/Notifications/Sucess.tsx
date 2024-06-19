import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, List, ListItemButton, ListItemText, Slide, Toolbar, Typography } from '@mui/material';
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import styled from '@emotion/styled';



type childComponents={
    view:boolean
}

const Sucess = ({view}:childComponents) => {

    const [open, setOpen] = React.useState<boolean>(view);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <React.Fragment>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{marginLeft:"45vw",  width:"30vw"}}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Sucess notifications
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            L'association a été créee avec success
          </Typography>
          <Typography gutterBottom>
            Le numero du président et du secrétaire sont identiques. Ce qui pour des raisons de sécurité est proscrit.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
)
}

export default Sucess