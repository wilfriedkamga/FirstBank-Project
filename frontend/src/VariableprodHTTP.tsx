class Variable {
  static routeApi: string = "http://62.169.22.170:8088/";
  static routeApiTontine: string = "http://62.169.22.170:8081";
  static routeApiAssociation: string = "http://62.169.22.170:8082";
  static pathSmsAPI: string =
    "http://9lmmqr.api.infobip.com/sms/2/text/advanced";
  static preTimeOut = 1000;
  static nb_chiffres_telephone = 12;
  static key_localStorage = "";
  static secret_key = "your_secret_key";
  static local_storage_key = "userFB";
  static saving_base_url = "http://62.169.22.170:8085";
  static operation_service_base_url = "http://62.169.22.170:8082";
  static notification_baseUrlc = "http://62.169.22.170:8000";
  static notification_2 = "http://62.169.22.170:8091";

  static recupérer_du_localStorage = (key: string) => {
    const encryptedData = localStorage.getItem(this.local_storage_key);

    if (encryptedData) {
      //const bytes = AES.decrypt(encryptedData, this.secret_key);
      //const decryptedData = JSON.parse(bytes.toString(enc.Utf8));
      const user = JSON.parse(localStorage.getItem(key) || "{}");
      return JSON.parse(encryptedData || "{}");
    }
    return null;
  };

  static getLocalStorageItem = (key: string): any => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };

  static formatDate = (dateArray: [number, number, number]): string => {
    const [year, month, day] = dateArray;
    const date = new Date(year, month - 1, day); // Mois - 1 car les mois sont 0-indexés en JS
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  static setLocalStorageItem = (key: string, data: any): boolean => {
    localStorage.setItem(key, JSON.stringify(data));

    const token = localStorage.getItem(key);

    return token != null && token != "";
  };
  static removeFromLocalStorage = (key: string): void => {
    localStorage.removeItem(key);
  };

  static getParentPath = (url: string): string => {
    // Crée un objet URL à partir de la chaîne fournie

    const lastSlashIndex = url.lastIndexOf("/");

    // Si '/' est trouvé, retourne la sous-chaîne jusqu'à cette position
    if (lastSlashIndex !== -1) {
      return url.substring(0, lastSlashIndex);
    }

    // Si '/' n'est pas trouvé, retourne l'URL originale (ou vous pouvez gérer cela différemment)
    return url;
  };
}

export default Variable;


