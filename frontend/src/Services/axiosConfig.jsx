import axios from 'axios';

// Ajouter un intercepteur de requête
axios.interceptors.request.use(function (config) {
    // Faire quelque chose avant que la requête soit envoyée
    console.log('Requête envoyée:', config);
    return config;
}, function (error) {
    // Faire quelque chose avec l'erreur de la requête
    return Promise.reject(error);
});

// Ajouter un intercepteur de réponse
axios.interceptors.response.use(function (response) {
    // Faire quelque chose avec les données de la réponse
    console.log('Réponse reçue:', response);
    return response;
}, function (error) {
    // Faire quelque chose avec l'erreur de la réponse
    if (error.response) {
        console.log('Erreur de la réponse:', error.response.data);
    }
    return Promise.reject(error);
});

export default axios;