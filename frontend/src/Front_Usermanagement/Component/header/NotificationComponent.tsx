import * as React from "react";
import {
  Box,
  Divider,
  IconButton,
  MenuItem,
  Typography,
  Menu,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  List,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { NotificationModel } from "../../../Services/Types";

interface NotificationMenuComponentProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  menuAnchorEl: null | HTMLElement;
  menuOpen: boolean;
  listNotifs: NotificationModel[];
  handleNotificationClose: () => void;
  handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
  handleNotificationItemClick: (index: number) => void;
  markAllAsRead: () => void;
}


const StyledListItem = styled(ListItem)(({ theme }) => ({
  alignItems: "flex-start",
  backgroundColor: "#f0f2f5",
  borderRadius: "8px",
  marginBottom: "8px",
  padding: "12px",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
  "&.Mui-selected": {
    backgroundColor: "#d6d6d6",
  },
}));

const NotificationMenuComponent: React.FC<NotificationMenuComponentProps> = ({
  anchorEl,
  open,
  menuAnchorEl,
  menuOpen,
  listNotifs,
  handleNotificationClose,
  handleMenuClick,
  handleMenuClose,
  handleNotificationItemClick,
  markAllAsRead,
}) => {

  const [liste, setListe]=React.useState<NotificationModel[]>(listNotifs)

  React.useEffect(()=>{
   setListe(listNotifs)
  })
  

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleNotificationClose}
      PaperProps={{
        sx: {
          width: 350,
          maxHeight: 600,
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", padding: 1}}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Notifications
        </Typography>
        <IconButton onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Divider />
      <Menu
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 0,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 4,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 1,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={markAllAsRead}>
          Tout marquer comme lu
        </MenuItem>
        <MenuItem>Paramètres des notifications</MenuItem>
        <MenuItem>Ouvrir les notifications</MenuItem>
      </Menu>

      
      <Box sx={{ maxHeight: 500, maxWidth: 400, overflow: "x" }}>
        {liste && liste.length!=0 && liste.map((notif, index) => (
          <div key={index}>
            <MenuItem
              sx={{ padding: 1 }}
              onClick={() => handleNotificationItemClick(index)}
              key={index}
            >
              <Box
                sx={{ maxWidth: 10, overflow: "none" }}
                alignItems="flex-start"
                key={index}
              >
                <ListItemAvatar key={index}>
                  <Avatar alt="User Avatar" />
                </ListItemAvatar>
                <ListItemText sx={{ whiteSpace: "nowrap" }}>
                  {notif.message}
                </ListItemText>
                
              </Box>
            </MenuItem>
            <Divider />
          </div>
        ))}
        <MenuItem key={"uniquekey"}>
          <Link
            to="/notifications"
            style={{ textDecoration: "none", width: "100%" }}
          >
            <Typography variant="body2" color="primary" align="center">
              Voir toutes les notifications
            </Typography>
          </Link>
        </MenuItem>
      </Box>
    </Menu>
  );
};

export default NotificationMenuComponent;