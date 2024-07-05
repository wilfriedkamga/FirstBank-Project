import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import Header from "../../../../../SavingManagement/components/header/Header";
import ScrollDialog from "./ScrollDialog";
import BottomAppBar from "./BottomAppBar";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button sx={{fontSize:"50px",top:2,right:'10px', position:"relative"}} className={"h-8 text-white font-bold"} onClick={handleClickOpen}>
        <NotificationsNoneRoundedIcon className=" text-white font-extrabold" />
      </Button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor:"#bb0000",color:"#ffffff", marginTop:"1px" }}>
          <Toolbar sx={{backgroundColor:"#bb0000", color:"#ffffff", position:"fixed", width:"100%"}}>
          
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Notifications
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
               <CloseIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <List sx={{marginTop:"10vh"}}>
          <BottomAppBar/>
        </List>
      </Dialog>
    </React.Fragment>
  );
}
