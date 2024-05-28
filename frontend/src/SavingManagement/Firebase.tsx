import {initializeApp} from "firebase/app"
import 'firebase/messaging'
import { getMessaging, getToken } from 'firebase/messaging'

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
export const requestForToken = () => {
    return getToken(messaging, {vapidKey: `BDj5dm7grUD4MfvrdJoNFuoO1v82Cu2b2NVCxn8BjOGS6qFSPIVgOr0JcL5K3WNpnFZDBWeepNvn-8ElwpLQT-E`})
            .then((currentToken:any) => {
                if (currentToken) {
                    console.log(currentToken)
                } else {
                    console.log('No Instance ID token available. Request permission to generate one.')
                }
            })
}