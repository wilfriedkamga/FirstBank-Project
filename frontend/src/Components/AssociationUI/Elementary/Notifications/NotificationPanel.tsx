import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { red } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import { useState } from "react";
import { getInitials } from "../Utils";
import { Button } from "@mui/material";
import ScrollDialog from "./ScrollDialog";
import BottomAppBar from "./BottomAppBar";
import Variable from "../../../../Variable";

const userAvatarItems2: userAvatarItem[] = [
  {
    label: "Settings",
    link: "/settings",
    Icon: <Settings fontSize="small" />,
  },
];
const userAvatarItems1: userAvatarItem[] = [
  {
    label: "portail",
    link: "/home",
    Icon: <Avatar />,
  },
  {
    label: "Profil",
    link: "/profile",
    Icon: <Avatar />,
  },
];
type userAvatarItem = {
  label: string;
  link: string;
  Icon: any;
};

export default function NotificationPanel() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [name, setName] = React.useState("");
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<string>("");

  const handleLogout = () => {
    alert("vous allez vous déconnecté");
    Variable.removeFromLocalStorage("user");
    navigate("/");
  };

  React.useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setPhoto(user.user.photo);
    setName(user.user.fullName);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <Button
            sx={{
              fontSize: "50px",
              top: 2,
              right: "10px",
              position: "relative",
            }}
            className={"h-8 text-white font-bold"}
            onClick={handleClick}
          >
            <NotificationsNoneRoundedIcon className=" text-white font-extrabold" />
          </Button>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        color="#000000"
        PaperProps={{
          elevation: 0,
          sx: {
            width: 200,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <ScrollDialog />

        <MenuItem onClick={() => handleLogout()}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
