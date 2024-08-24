// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import NotificationService from "./Services/NotificationService";
import Variable from "./Variable";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

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
export const messaging = getMessaging(app);
//const analytics = getAnalytics(app);
// export const generateToken = async () => {
//   const permission = await Notification.requestPermission();
//   console.log(permission);
//   if (permission === "granted") {
//     const token = await getToken(messaging, {
//       vapidKey:
//         "BAI7U7mbQm9oWxe5dGxZGmJnHtqtCy7CsuHPs_0YLJyWYx_e0B54nBiIZCguQPYeEXF7mcJk2Gu73PYr4oXskKg",
//     });
//     console.log(token);
    
//   } else {
//     console.log("Permission is not granted");
    
//   }
// };

export const generateToken = async () => {
    try {
      // Demander la permission pour les notifications
      const permission = await Notification.requestPermission();
      console.log(permission);
  
      // Vérifier si la permission est accordée
      if (permission === "granted") {
        // Obtenir le token de Firebase Cloud Messaging
        const token = await getToken(messaging, {
          vapidKey: "BAI7U7mbQm9oWxe5dGxZGmJnHtqtCy7CsuHPs_0YLJyWYx_e0B54nBiIZCguQPYeEXF7mcJk2Gu73PYr4oXskKg",
        });
        console.log(token);
        // on va stocker ce token dans le local storage 
        Variable.setLocalStorageItem("fcmToken",token)
        return token; // Retourner le token obtenu
      } else {
        console.log("Permission is not granted");
        return ""; // Retourner une chaîne vide si la permission est refusée
      }
    } catch (error) {
      console.error("Error generating token:", error);
      return ""; // Retourner une chaîne vide en cas d'erreur
    }
  };
  
