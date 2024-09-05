// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

// Scripts for firebase and firebase messaging
import {initializeApp} from "firebase/app"
import 'firebase/messaging'
import { getMessaging } from 'firebase/messaging'

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyArIvyQODOclhpt9B-XzNwbOX2NFZ9gCXA",
    authDomain: "react-pushnotif-spring-boot.firebaseapp.com",
    projectId: "react-pushnotif-spring-boot",
    storageBucket: "react-pushnotif-spring-boot.appspot.com",
    messagingSenderId: "1022805273320",
    appId: "1:1022805273320:web:3116ec09b8a0492244775d",
    measurementId: "G-C1007X55KE",
}


const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

