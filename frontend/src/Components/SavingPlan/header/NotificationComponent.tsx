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
        <MenuItem onClick={markAllAsRead}>
          Tout marquer comme lu
        </MenuItem>
        <MenuItem>Paramètres des notifications</MenuItem>
        <MenuItem>Ouvrir les notifications</MenuItem>
      </Menu>

      <List sx={{ bgcolor: "background.paper" }}>
        {listNotifs.map((notif, index) => (
          <React.Fragment key={index}>
            <StyledListItem alignItems="flex-start" selected={notif.unread}>
              <ListItemAvatar>
                <Avatar alt="User Avatar" src={""} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: notif.unread ? "bold" : "normal",
                    }}
                  >
                    {notif.message}
                  </Typography>
                }
                secondary={
                  <Box>
                    <Typography sx={{ fontSize: "0.75rem", color: "#65676b" }}>
                      {"Il y'a 5 semaines"}
                    </Typography>
                    {notif.secondaryAction && (
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          color: "#65676b",
                          fontWeight: "bold",
                        }}
                      >
                        {notif.secondaryAction}
                      </Typography>
                    )}
                    {notif.requiredConfirmation && (
                      <Box
                        className="flex gap-5 mt-2 justify-start items-start"
                      >
                        <button className="bg-red-600 hover:bg-red-800 py-1 px-2 text-white font-bold rounded-lg">
                          Accepter
                        </button>
                        <button className="bg-gray-500 py-1 hover:bg-gray-700 px-2 text-white font-bold rounded-lg">
                          Refuser
                        </button>
                      </Box>
                    )}
                  </Box>
                }
              />
            </StyledListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
      <Box sx={{ maxHeight: 400, maxWidth: 400, overflow: "none" }}>
        {listNotifs.map((notif, index) => (
          <React.Fragment key={index}>
            <MenuItem
              sx={{ padding: 1 }}
              onClick={() => handleNotificationItemClick(index)}
            >
              <ListItem
                sx={{ maxWidth: 20, overflow: "none" }}
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar alt="User Avatar" />
                </ListItemAvatar>
                <ListItemText
                  sx={{ whiteSpace: "nowrap" }}
                  primary={
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: notif.unread ? "bold" : "normal",
                      }}
                    >
                      {notif.message}
                    </Typography>
                  }
                  secondary="Il y'a 7 semaines"
                />
              </ListItem>
            </MenuItem>
            <Divider />
          </React.Fragment>
        ))}
        <MenuItem>
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