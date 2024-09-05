import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Delete } from "@mui/icons-material";
import { CircularProgress, Divider, IconButton } from "@mui/material";
import { MembreTontineModel } from "../MesMembresTontines";



interface props{
    handleDelete:(member:MembreTontineModel)=>void;
    member:MembreTontineModel;
}
export default function DeleteButton({handleDelete, member}:props) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const localHandleDelete=(member:MembreTontineModel)=>{
    setIsLoading(true)

    setTimeout(() => {
        setIsLoading(false)
        handleDelete(member)
        
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
            Êtes vous sur de vouloir bien supprimer ce memberument ?
          </DialogContentText>
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button variant="contained" sx={{backgroundColor:"#c00", "&:hover":{backgroundColor:"#a00"}}} onClick={()=>localHandleDelete(member)}> {!isLoading?"Oui":<CircularProgress size={20} sx={{color:"white", fontWeight:"bold"}}/>} <Delete/></Button>
          <Button variant="contained" sx={{backgroundColor:"#666","&:hover":{backgroundColor:"#444"}}} onClick={handleClose} autoFocus>
           Non
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
