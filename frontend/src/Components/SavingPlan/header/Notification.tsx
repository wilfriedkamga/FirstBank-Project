import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import NotificationService from "../../../Services/NotificationService";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import {MenuItem} from "@mui/material";
import Variable from "../../../Variable";

interface Notification {
  message: string;
  read: boolean;
}

const NotificationMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [listNotifs, setListNotifs] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const open = Boolean(anchorEl);
  const menuOpen = Boolean(menuAnchorEl);
  const navigate = useNavigate();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationItemClick = (index: number) => {
    // Add your logic to handle item click here
    console.log("Notification clicked:", index);
  };

  const getMyNotifications = (phone:string) => {
    // Replace this with your actual service call
    NotificationService.GetNotificationsByPhone(phone)
      .then((response) => {
        const notifications: Notification[] = response.data.data;
        setListNotifs(notifications);
        setUnreadCount(notifications.filter((notif) => !notif.read).length);
      })
      .catch((error) => {
        console.error("Error fetching notifications", error);
      });
  };

  const markAllAsRead = () => {
    const updatedNotifs = listNotifs.map((notif) => ({
      ...notif,
      read: true,
    }));
    setListNotifs(updatedNotifs);
    setUnreadCount(0);
  };

  useEffect(() => {
    const user=Variable.getLocalStorageItem("user")
    console.log(user)
    getMyNotifications(user.user.phone);
  }, []);

  return (
    <React.Fragment>
      <Tooltip title="Notifications">
        <IconButton onClick={handleNotificationClick}>
          <NotificationsIcon sx={{color:"white", fontSize:"30px"}} />
          {unreadCount > 0 && (
            <Box
              component="span"
              sx={{
                backgroundColor: "gray",
                borderRadius: "50%",
                color: "white",
                fontSize: "10px",
                height: "20px",
                width: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: 0,
                right: 0,
              }}
            >
              {unreadCount}
            </Box>
          )}
        </IconButton>
      </Tooltip>

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
        <Box sx={{ display: "flex", alignItems: "center", padding: 1 }}>
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
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
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
          <MenuItem onClick={markAllAsRead}>Tout marquer comme lu</MenuItem>
          <MenuItem>Paramètres des notifications</MenuItem>
          <MenuItem>Ouvrir les notifications</MenuItem>
        </Menu>
        <Box sx={{ maxHeight: 400, overflow: "auto" }}>
          {listNotifs.map((notif, index) => (
            <React.Fragment key={index}>
              <MenuItem onClick={() => handleNotificationItemClick(index)}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="User Avatar" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={notif.message}
                    secondary="Il y'a 7 semaines"
                    primaryTypographyProps={{
                      noWrap: true,
                      sx: {
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      },
                    }}
                  />
                </ListItem>
              </MenuItem>
              <Divider />
            </React.Fragment>
          ))}
          <MenuItem>
            <Link to="/notifications" style={{ textDecoration: "none", width: "100%" }}>
              <Typography variant="body2" color="primary" align="center">
                Voir toutes les notifications
              </Typography>
            </Link>
          </MenuItem>
        </Box>
      </Menu>
    </React.Fragment>
  );
};

export default NotificationMenu;