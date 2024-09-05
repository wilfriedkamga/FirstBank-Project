import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Variable from "../../../Variable";
import NotificationService from "../../../Services/NotificationService";
import NotificationMenuComponent from "./NotificationComponent";
import { NotificationModel } from "../../../Services/Types";
 // Import the new component

interface Notification {
  message: string;
  read: boolean;
}

const NotificationMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [listNotifs, setListNotifs] = useState<NotificationModel[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const open = Boolean(anchorEl);
  const menuOpen = Boolean(menuAnchorEl);

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
    console.log("Notification clicked:", index);
  };

  

  const getMyNotifications = (phone: string) => {
    NotificationService.GetNotificationsByPhone(phone)
      .then((response) => {
        const notifications: NotificationModel[] = response.data.data;
        setListNotifs(notifications);
        setUnreadCount(notifications.filter((notif) => !notif.unread).length);
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
    const user = Variable.getLocalStorageItem("user");
    console.log(user);
    getMyNotifications(user.user.phone);
  }, []);

  return (
    <React.Fragment>
      <Tooltip title="Notifications">
        <IconButton onClick={handleNotificationClick}>
          <NotificationsIcon sx={{ color: "#bb0000", fontSize: "30px" }} />
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
      
      {/* Use the NotificationMenuComponent */}
      <NotificationMenuComponent
        anchorEl={anchorEl}
        open={open}
        menuAnchorEl={menuAnchorEl}
        menuOpen={menuOpen}
        listNotifs={listNotifs}
        handleNotificationClose={handleNotificationClose}
        handleMenuClick={handleMenuClick}
        handleMenuClose={handleMenuClose}
        handleNotificationItemClick={handleNotificationItemClick}
        markAllAsRead={markAllAsRead}
      />
    </React.Fragment>
  );
};

export default NotificationMenu;
