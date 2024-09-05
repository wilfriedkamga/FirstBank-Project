import { v4 as uuidv4 } from 'uuid';
import { RoleModel } from './Types/RoleModel';

export const rolesData:RoleModel[] = [
    { id: "1", label: 'PRESIDENT', labelV: 'Président',isDeletable:false, nbMax: '1' },
    { id: "2", label: 'VICE-PRESIDENT', labelV: 'Vice-Président' ,isDeletable:false, nbMax: '1'  },
    { id: "3", label: 'SECRETAIRE', labelV: 'Sécretaire' ,isDeletable:false , nbMax: '1' },
    { id: "4", label: 'TRESORIER', labelV: 'Trésorier' ,isDeletable:false , nbMax: '1' },
    { id: "5", label: 'CENSEUR', labelV: 'Censeur' ,isDeletable:false, nbMax: '1'  }
];

export const supportedLanguages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
  ];

  export const unsupportedLanguages = [
    { code: "es", name: "Español" },
    { code: "de", name: "Deutsch" },
    { code: "zh", name: "中文" },
    { code: "ar", name: "العربية" },
    { code: "pt", name: "Português" },
    { code: "ru", name: "Русский" },
    { code: "it", name: "Italiano" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "pl", name: "Polski" },
    { code: "tr", name: "Türkçe" },
    { code: "nl", name: "Nederlands" },
    { code: "sv", name: "Svenska" },
    { code: "no", name: "Norsk" },
    { code: "da", name: "Dansk" },
    { code: "fi", name: "Suomi" },
    { code: "hu", name: "Magyar" },
    { code: "cs", name: "Čeština" },
    { code: "ro", name: "Română" },
    { code: "el", name: "Ελληνικά" },
    { code: "th", name: "ไทย" },
  ];

export const frequencies = ["JOURNALIERE","HEBDOMADAIRE","MENSUELLE","TRIMESTRIELLE","ANNUELLE"];

export const days=["LUNDI","MARDI","MERCREDI","JEUDI","VENDREDI","SAMEDI","DIMANCHE"]