import * as React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSwipeable } from "react-swipeable";
import logo_caisse from "../../../Utils/Assets/caisse.png";

interface Notification {
  avatarUrl: string;
  message: string;
  timestamp: string;
  secondaryAction?: string;
  unread?: boolean;
  requiredConfirmation?: boolean;
  stateConfirmation?: boolean;
  statusConfirmation?: boolean;
}

const notifications: Notification[] = [
  {
    avatarUrl: logo_caisse,
    message: "Paterne Odilon Yango vous a envoyé une invitation.",
    timestamp: "il y a 3 semaines",
    secondaryAction: "Invitation acceptée",
    unread: true,
    requiredConfirmation: true,
    stateConfirmation:false,
    statusConfirmation:false
  },
  {
    avatarUrl: logo_caisse,
    message: "Paterne Odilon Yango vous a envoyé une invitation.",
    timestamp: "il y a 3 semaines",
    secondaryAction: "Invitation acceptée",
    unread: true,
    requiredConfirmation: true,
    stateConfirmation:false,
    statusConfirmation:false
  },
  {
    avatarUrl: logo_caisse,
    message: "Paterne Odilon Yango vous a envoyé une invitation.",
    timestamp: "il y a 3 semaines",
    secondaryAction: "Invitation acceptée",
    unread: true,
    requiredConfirmation: false,
    stateConfirmation:false,
    statusConfirmation:false
  },
  // Add other notifications here
];

const AllNotifications: React.FC = () => {
  const [notificationsList, setNotificationsList] =
    React.useState<Notification[]>(notifications);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const handleDeleteNotification = () => {
    if (selectedIndex !== null) {
      setNotificationsList((prev) =>
        prev.filter((_, i) => i !== selectedIndex)
      );
    }
    handleMenuClose();
  };

  const handleConfirmNotification=(index:number)=>{
   
    if (index !== null) {
      setNotificationsList(prev => 
        prev.map((notif, index) => 
          index == index
            ? { ...notif, stateConfirmation: true, statusConfirmation: true } // Mise à jour des attributs
            : notif
        )
      );
    }
  

  }
  const handleUnConfirmNotification=(index:number)=>{
    if (index !== null) {
      setNotificationsList(prev => 
        prev.map((notif, index) => 
          index == index
            ? { ...notif, stateConfirmation: true, statusConfirmation: false } // Mise à jour des attributs
            : notif
        )
      );
    }

  }

  const handleHideNotification = () => {
    // Implement hiding logic here if necessary
    handleMenuClose();
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      console.log("Swiped left", eventData);
      // Handle the swipe left action here
    },
    onSwipedRight: (eventData) => {
      console.log("Swiped right", eventData);
      // Handle the swipe right action here
    },
  });

  return (
    <Box
      sx={{
        maxWidth: 680,
        margin: "auto",
        p: 2,
        bgcolor: "#ffffff",
        borderRadius: "8px",
        maxHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Notifications
      </Typography>
      <Container sx={{ backgroundColor: "white" }}>
        {notificationsList.map((notif, index) => (
          <Card
            key={index}
            {...swipeHandlers}
            sx={{
              display: "flex",
              minHeight: "70px",
              position: "relative",
              marginTop: "10px",
              width: "100%",
              marginBottom: "10px",
              maxHeight: "200px",
              "&:hover": {
                backgroundColor: "#ffffff",
                boxShadow: 6,
              },
            }}
          >
            <Avatar
              alt="User Avatar"
              sx={{ width: "50px", height: "50px", margin: "10px" }}
              src={notif.avatarUrl}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Typography component="div" variant="body2">
                  {notif.message}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {notif.timestamp}
                </Typography>
              </CardContent>
              {notif.requiredConfirmation && (
                <div className="flex justify-between relative bottom-3 p-1 gap-5 w-full">
                  {!notif.stateConfirmation ? (
                    <>
                      <button onClick={()=>{handleConfirmNotification(index)}} className="bg-red-600 w-1/2 hover:bg-red-800 rounded-lg text-xs text-white py-1 px-[30px]">
                        ACCEPTER
                      </button>
                      <button onClick={()=>{handleUnConfirmNotification(index)}} className="bg-gray-400 hover:bg-gray-600 w-1/2 text-xs rounded-lg px-[30px] py-1 text-white">
                        REFUSER
                      </button>
                    </>
                  ):(notif.statusConfirmation ? <p className="relative p-1 bottom-2">Vous avez refusé cette invitation !!!</p >:<p className="relative p-1 bottom-2">Vous avez refusé cette invitation !!!</p >)} 
                </div>
              )}
            </Box>
            <Box sx={{ position: "absolute", top: "-10px", right: "0px" }}>
              <IconButton onClick={(event) => handleMenuClick(event, index)}>
                <MoreHorizIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && selectedIndex === index}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 4,
                  sx: {
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleDeleteNotification}>
                  Supprimer cette notification
                </MenuItem>
                <MenuItem onClick={handleHideNotification}>Masquer</MenuItem>
              </Menu>
            </Box>
          </Card>
        ))}
      </Container>
    </Box>
  );
};

export default AllNotifications;
