import React, { useState, useEffect, useRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { getMessaging, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { Toast } from "primereact/toast";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

// Configure Firebase
const firebaseConfig = {
  apiKey: "AIzaSyArIvyQODOclhpt9B-XzNwbOX2NFZ9gCXA",
  authDomain: "react-pushnotif-spring-boot.firebaseapp.com",
  projectId: "react-pushnotif-spring-boot",
  storageBucket: "react-pushnotif-spring-boot.appspot.com",
  messagingSenderId: "1022805273320",
  appId: "1:1022805273320:web:3116ec09b8a0492244775d",
  measurementId: "G-C1007X55KE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const NotificationSnackbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<
    { title: string; body: string; image?: string } | undefined
  >(undefined);

  useEffect(() => {
    // Listen for messages while the app is in the foreground
    onMessage(messaging, (payload) => {
      toast.current?.show({
        severity: "info",
        summary: payload.notification?.title,
        detail: payload.notification?.body,
        sticky: true,
      });
      console.log("[NotificationSnackbar] Message reçu de firebase: ", payload);
      setMessageInfo({
        title: payload.notification?.title || "Nouvelle notification",
        body:
          payload.notification?.body ||
          "Vous avez reçu une nouvelle notification",
        image: payload.notification?.image, // Optionnel, dépend si l'image est définie
      });
      setOpen(true);
    });
  });

  const toast = useRef<Toast>(null);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={20000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            width: "100%",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent:"space-between",
              padding: 1,
              backgroundColor: "#b00",
              color: "white",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            {messageInfo?.title}{" "}
            <IconButton sx={{position:"relative",left:"5px",color:"white", bottom:"15px"}} onClick={handleClose}>
              <Close />
            </IconButton>{" "}
          </Box>
          <Divider />
          <Box sx={{ display: "flex", padding: 1, flexDirection: "column" }}>
            {messageInfo?.body}
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 1,
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#b00",
                "&:hover": { backgroundColor: "#a00" },
              }}
            >
              Suivre
            </Button>
          </Box>
        </Box>
      </Snackbar>
    </>
  );
};

export default NotificationSnackbar;
