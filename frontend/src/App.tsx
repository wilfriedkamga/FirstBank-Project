import React, { useEffect, useRef, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import "./index.css";
import { PrimeReactProvider } from "primereact/api";
import { generateToken, messaging } from "./firebase";
import { onMessage } from "firebase/messaging";
import { showNotification } from "./Front_Usermanagement/Component/PushNotifications/PushNotifications";
import NotificationSnackbar from "./Front_Usermanagement/Component/PushNotification/NotificationSnackbar";
import { Toast } from "primereact/toast";
import { Button } from "@mui/material";


function App() {
  const [token, setToken] = useState("");

  function handleError(event: any) {
    if (
      event.message ==
      "ResizeObserver loop completed with undelivered notifications"
    ) {
      event.stopImmediatePropagation();
    }
  }

  const toast = useRef<Toast>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [bodyMessage, setBodyMessage]=useState<String>("")
  let message="message Content";
  const show = () => {
    toast.current?.show({
      severity: "info",
      summary: "Info",
      detail: bodyMessage,
    });
  };

  function showNotification2() {
    if (Notification.permission === 'granted') {
      new Notification('Hello!', {
        body: 'This is a simulated push notification.',
        icon: 'https://via.placeholder.com/150'
      });
    }
}


  // Écoutez les messages en premier plan

  window.addEventListener("error", handleError);
  return (
    <>
      <Toast ref={toast} />
      <RouterProvider router={router}></RouterProvider>
      <Button  ref={buttonRef} onClick={show}></Button>
    </>
  );
}

export default App;
