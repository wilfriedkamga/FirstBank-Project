// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

// Scripts for firebase and firebase messaging
import {initializeApp} from "firebase/app"
import 'firebase/messaging'
import { getMessaging } from 'firebase/messaging'

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyB0tiMLG14EUrPPlXCw6z2uAImjgfzE-7Y",
    authDomain: "notification-service-c1c19.firebaseapp.com",
    projectId: "notification-service-c1c19",
    storageBucket: "notification-service-c1c19.appspot.com",
    messagingSenderId: "454445125367",
    appId: "1:454445125367:web:f7b12ba65d18142900cdf2",
    measurementId: "G-B8ZL4HJJVX"
}


const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

