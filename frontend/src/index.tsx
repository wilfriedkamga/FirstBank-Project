import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import 'primereact/resources/themes/saga-blue/theme.css'; // Thème de votre choix
import 'primereact/resources/primereact.min.css'; // Styles de base de Primereact
import 'primeicons/primeicons.css'; // Icônes de Primereact
import { PrimeReactProvider } from 'primereact/api';
import { generateToken } from './firebase';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PrimeReactProvider value={{ unstyled: false }}>
        <App />
    </PrimeReactProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then(async (registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
      // Maintenant, que le Service Worker est enregistré, générez le token
      const token = await generateToken();
      if (token) {
        console.log('firebase :', token);
      }
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
} else {
  console.error('Service Worker is not supported in this browser.');
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
