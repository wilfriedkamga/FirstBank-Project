// Give the service worker access to Firebase Messaging.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");


firebase.initializeApp({
  apiKey: "AIzaSyArIvyQODOclhpt9B-XzNwbOX2NFZ9gCXA",
  authDomain: "react-pushnotif-spring-boot.firebaseapp.com",
  projectId: "react-pushnotif-spring-boot",
  storageBucket: "react-pushnotif-spring-boot.appspot.com",
  messagingSenderId: "1022805273320",
  appId: "1:1022805273320:web:3116ec09b8a0492244775d",
  measurementId: "G-C1007X55KE",
});

function showNotification3(body,icon) {
  if (Notification.permission === 'granted') {
    new Notification('Hello!', {
      body: body,
      icon: icon
    });
  }
}

function showNotification(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
}

 const messaging = firebase.messaging();
 
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Message reçu de firebase ", payload);
  showNotification(payload);
});
