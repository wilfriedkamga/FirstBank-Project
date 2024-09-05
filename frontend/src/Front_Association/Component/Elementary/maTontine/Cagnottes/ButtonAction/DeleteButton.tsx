import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Delete } from "@mui/icons-material";
import { CircularProgress, Divider, IconButton } from "@mui/material";
import { CagnotteModel } from "../MesCagnottes";


interface props{
    handleDelete:(cag:CagnotteModel)=>void;
    cag:CagnotteModel;
}
export default function DeleteButton({handleDelete, cag}:props) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const localHandleDelete=(cag:CagnotteModel)=>{
    setIsLoading(true)

    setTimeout(() => {
        setIsLoading(false)
        handleDelete(cag)
        
    }, 2000);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton size="small" onClick={handleClickOpen}>
        <Delete />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{backgroundColor:"#b00", color:"white"}} id="alert-dialog-title">
          {"Confirmation de suppression ?"}
        </DialogTitle>
        <Divider/>
        <DialogContent>
          <DialogContentText sx={{color:"black"}} id="alert-dialog-description">
            Êtes vous sur de vouloir bien supprimer ce cagument ?
          </DialogContentText>
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button variant="contained" sx={{backgroundColor:"#c00", "&:hover":{backgroundColor:"#a00"}}} onClick={()=>localHandleDelete(cag)}> {!isLoading?"Oui":<CircularProgress size={20} sx={{color:"white", fontWeight:"bold"}}/>} <Delete/></Button>
          <Button variant="contained" sx={{backgroundColor:"#666","&:hover":{backgroundColor:"#444"}}} onClick={handleClose} autoFocus>
           Non
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
