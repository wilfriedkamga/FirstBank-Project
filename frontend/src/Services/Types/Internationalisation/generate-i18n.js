const fs = require('fs');
const path = require('path');

// Chemin du dossier contenant les fichiers de traduction
const translationsDirectory = path.join(__dirname, './FichiersDesLangues');

// Fonction pour générer le fichier i18n.ts
function generateI18nTS() {
  const resources = {};

  // Lire les fichiers JSON dans le dossier des traductions
  const files = fs.readdirSync(translationsDirectory);
  files.forEach((file) => {
    if (file.endsWith('.json')) {
      const lang = file.split('.')[0];
      const translations = JSON.parse(fs.readFileSync(path.join(translationsDirectory, file), 'utf-8'));
      resources[lang] = { translation: translations.translation };
    }
  });

  const i18nTS = `
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: ${JSON.stringify(resources, null, 2).replace(/"(\w+)":/g, '$1:')},
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
  `;

  fs.writeFileSync(path.join(__dirname, '', 'i18n.ts'), i18nTS);
}

generateI18nTS();