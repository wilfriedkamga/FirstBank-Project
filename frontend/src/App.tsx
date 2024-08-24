import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes';
import './index.css'
import { PrimeReactProvider } from "primereact/api";
import { generateToken, messaging } from "./firebase";
import { onMessage } from "firebase/messaging";
import { showNotification } from './Front_Usermanagement/Component/PushNotifications/PushNotifications';

function App() {

  const [token, setToken] = useState("");

  function handleError(event: any) {
    if (event.message== 'ResizeObserver loop completed with undelivered notifications') {
      event.stopImmediatePropagation();
    }
  }
 

   useEffect(()=>{
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      showNotification({
        type: 'simple',
        message: payload.notification?.body || 'Vous avez un nouveau message!',
      });
    });
  }, []);

   
    // Écoutez les messages en premier plan
    
 
  
  
  window.addEventListener('error', handleError);
  return (
    <RouterProvider router={router} ></RouterProvider>
  );
}

export default App;
